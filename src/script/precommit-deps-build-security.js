#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawn, spawnSync } = require("child_process");
const readline = require("readline");

const ROOT = path.join(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports", "security");
const DEFAULT_REPORT_PREFIX = "security-report-SR";

function parseCliArgs(argv) {
  const result = {};
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const sliced = arg.slice(2);
      const [key, value] = sliced.split("=");
      if (value !== undefined) {
        result[key] = value === "" ? true : value;
      } else if (i + 1 < argv.length && !argv[i + 1].startsWith("--")) {
        result[key] = argv[i + 1];
        i += 1;
      } else {
        result[key] = true;
      }
    } else {
      (result._ || (result._ = [])).push(arg);
    }
    i += 1;
  }
  return result;
}

const CLI_ARGS = parseCliArgs(process.argv.slice(2));
const REPORT_PREFIX = CLI_ARGS["report-prefix"] || DEFAULT_REPORT_PREFIX;
const MAX_OUTPUT_BUFFER =
  CLI_ARGS["max-buffer"] !== undefined
    ? Math.max(50_000, Number(CLI_ARGS["max-buffer"]) * 1024 || 0)
    : 5 * 1024 * 1024; // 5 MB default

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const REPORT_FILE_REGEX = new RegExp(
  `^${escapeRegex(REPORT_PREFIX)}(\\d+)\\.md$`
);
const COLOR = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
};
const STATUS_WEIGHT = {
  failure: 3,
  warning: 2,
  success: 1,
};

const COMMANDS = [
  {
    id: "build",
    title: "Next.js Build",
    command: "yarn",
    args: ["build"],
    parser: parseBuildResult,
    severity: "critical",
    weight: 0.7,
  },
  {
    id: "audit",
    title: "Yarn Audit",
    command: "yarn",
    args: ["audit", "--json"],
    parser: parseYarnAudit,
    severity: "high",
    weight: 0.1,
  },
  {
    id: "osv",
    title: "OSV Scanner",
    command: "osv-scanner",
    args: ["--lockfile", "yarn.lock", "--format=json"],
    parser: parseOsvScanner,
    severity: "high",
    weight: 0.1,
  },
  {
    id: "outdated",
    title: "Yarn Outdated",
    command: "yarn",
    args: ["outdated", "--json"],
    parser: parseYarnOutdated,
    severity: "medium",
    weight: 0.1,
  },
];

function colorize(text, color) {
  const code = COLOR[color] || "";
  return `${code}${text}${COLOR.reset}`;
}

function runCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      shell: true,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });

    const stdoutState = { value: "", truncated: false };
    const stderrState = { value: "", truncated: false };

    const appendLimited = (state, chunk) => {
      if (state.value.length >= MAX_OUTPUT_BUFFER) {
        state.truncated = true;
        return;
      }
      const remaining = MAX_OUTPUT_BUFFER - state.value.length;
      if (chunk.length > remaining) {
        state.value += chunk.slice(0, remaining);
        state.truncated = true;
      } else {
        state.value += chunk;
      }
    };

    child.stdout.on("data", (data) => {
      appendLimited(stdoutState, data.toString());
    });
    child.stderr.on("data", (data) => {
      appendLimited(stderrState, data.toString());
    });

    child.on("error", (error) => {
      stderrState.value += `\n${error?.message || ""}`;
      resolve({
        status: 1,
        stdout: stdoutState.value,
        stderr: stderrState.value,
        error,
      });
    });

    child.on("close", (code) => {
      const truncatedMsg = (state) =>
        state.truncated
          ? `${state.value}\n[output truncated at ${MAX_OUTPUT_BUFFER} chars]`
          : state.value;
      resolve({
        status: typeof code === "number" ? code : 1,
        stdout: truncatedMsg(stdoutState),
        stderr: truncatedMsg(stderrState),
      });
    });
  });
}

function parseBuildResult(result, output) {
  if (result.status === 0) {
    return {
      severity: "success",
      summary: "Compilação Next.js concluída sem erros.",
      current: "Build finalizou com sucesso e assets foram gerados.",
      expected: "Aplicação deve compilar sem falhas antes do deploy.",
      action: "Nenhuma ação necessária.",
      issues: [],
    };
  }

  const snippet = output.split(/\r?\n/).slice(-20).join("\n");
  return {
    severity: "failure",
    summary: "Falha ao executar `yarn build`.",
    current: `Saída final do build:\n${snippet}`,
    expected: "Build deve concluir sem erros para garantir deploy seguro.",
    action:
      "Revise os erros acima, corrija dependências/código e execute novamente.",
    issues: [{ title: "Build quebrado", details: snippet }],
  };
}

function parseJsonLines(output) {
  const lines = output.split(/\r?\n/);
  const jsonEntries = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      jsonEntries.push(JSON.parse(trimmed));
    } catch {
      // ignore non-json lines
    }
  }
  return jsonEntries;
}

function parseYarnAudit(result, output) {
  const entries = parseJsonLines(output);
  const advisories = [];
  let summary = null;

  entries.forEach((entry) => {
    if (entry.type === "auditSummary") {
      summary = entry.data;
    }
    if (entry.type === "auditAdvisory" && entry.data?.advisory) {
      advisories.push(entry.data.advisory);
    }
  });

  const totalVuln = summary
    ? Object.values(summary.vulnerabilities || {}).reduce(
        (acc, value) => acc + Number(value || 0),
        0
      )
    : advisories.length;

  if (totalVuln > 0 || result.status !== 0) {
    return {
      severity: "failure",
      summary: `Vulnerabilidades detectadas pelo yarn audit (${totalVuln}).`,
      current: advisories
        .map(
          (adv) =>
            `• ${adv.module_name} (${adv.severity}) - ${adv.title || ""}`
        )
        .join("\n") || output.slice(0, 500),
      expected: "Nenhuma vulnerabilidade conhecida nas dependências.",
      action:
        "Atualize ou substitua os pacotes vulneráveis antes de prosseguir.",
      issues: advisories.map((adv) => ({
        title: `${adv.module_name} - ${adv.severity}`,
        details: adv.overview || adv.recommendation || "",
      })),
    };
  }

  if (result.status !== 0) {
    return {
      severity: "warning",
      summary:
        "yarn audit não retornou dados interpretáveis, mas nenhuma vulnerabilidade foi listada.",
      current: output.slice(0, 400) || "Sem saída relevante.",
      expected: "Audit deveria concluir informando zero vulnerabilidades.",
      action:
        "Reexecute `yarn audit --json` para garantir a análise ou verifique conectividade.",
      issues: [],
    };
  }

  return {
    severity: "success",
    summary: "Sem vulnerabilidades conhecidas via yarn audit.",
    current:
      "Todas as dependências diretas/indiretas livres de CVEs reportados.",
    expected: "Manter zero vulnerabilidades conhecidas.",
    action: "Nenhuma ação necessária.",
    issues: [],
  };
}

function parseOsvScanner(result, output) {
  let payload = null;
  try {
    payload = JSON.parse(output || "{}");
  } catch {
    // ignore parse error, fallback to exit code
  }

  const findings = payload?.results
    ? payload.results.flatMap((entry) => entry.vulnerabilities || [])
    : [];

  const commandFailed = result.status !== 0;
  if (findings.length > 0) {
    return {
      severity: "failure",
      summary: `OSV Scanner encontrou ${findings.length} vulnerabilidade(s).`,
      current: findings
        .map(
          (vuln) =>
            `• ${vuln.id} - ${vuln.summary || "Sem resumo"} (${vuln.severity?.[0]?.score || "N/A"})`
        )
        .join("\n"),
      expected: "Lockfile deve estar livre de vulnerabilidades no banco OSV.",
      action: "Atualize os pacotes afetados ou aplique patches recomendados.",
      issues: findings.map((vuln) => ({
        title: vuln.id,
        details: vuln.details || vuln.summary || "",
      })),
    };
  }

  if (commandFailed) {
    return {
      severity: "failure",
      summary: "OSV Scanner não conseguiu validar o lockfile.",
      current:
        output.slice(0, 400) || "Sem saída disponível. Verifique o comando.",
      expected: "Scanner deve cruzar o lockfile com OSV.dev para liberar o commit.",
      action:
        "Revise a instalação do `osv-scanner` e repita a verificação até obter sucesso.",
      issues: [],
    };
  }

  return {
    severity: "success",
    summary: "OSV Scanner não encontrou vulnerabilidades.",
    current: "`yarn.lock` está consistente com o baseline seguro do OSV.",
    expected: "Manter o lockfile livre de vulnerabilidades públicas.",
    action: "Nenhuma ação necessária.",
    issues: [],
  };
}

function parseYarnOutdated(result, output) {
  const entries = parseJsonLines(output);
  const tableEntry = entries.find((entry) => entry.type === "table");

  const outdatedPackages =
    tableEntry?.data?.body?.map((row) => ({
      name: row[0],
      current: row[1],
      wanted: row[2],
      latest: row[3],
      type: row[4],
    })) || [];

  if (outdatedPackages.length > 0) {
    const lines = outdatedPackages
      .map(
        (pkg) =>
          `• ${pkg.name} (${pkg.type}) - atual ${pkg.current}, recomendado ${pkg.wanted}, latest ${pkg.latest}`
      )
      .join("\n");

    return {
      severity: "warning",
      summary: `${outdatedPackages.length} pacote(s) desatualizado(s).`,
      current: lines,
      expected: "Todas as dependências alinhadas com as versões recomendadas.",
      action:
        "Avalie cada pacote e atualize versões para reduzir riscos e débitos técnicos.",
      issues: outdatedPackages.map((pkg) => ({
        title: pkg.name,
        details: `Atual: ${pkg.current} | Recomendado: ${pkg.wanted} | Latest: ${pkg.latest}`,
      })),
    };
  }

  const exitFailure = result.status !== 0;
  if (exitFailure) {
    return {
      severity: "warning",
      summary:
        "Não foi possível determinar pacotes desatualizados (verifique a saída).",
      current: output.slice(0, 400),
      expected: "Script deveria listar dependências ou confirmar todas atualizadas.",
      action: "Revise o log e execute manualmente `yarn outdated --json`.",
      issues: [],
    };
  }

  return {
    severity: "success",
    summary: "Todas as dependências estão atualizadas.",
    current: "Nenhum pacote listado como desatualizado.",
    expected: "Manter dependências estáveis antes do commit/push.",
    action: "Nenhuma ação necessária.",
    issues: [],
  };
}

function formatStatus(status) {
  const labelMap = {
    success: "🟢 OK",
    warning: "🟡 Alerta",
    failure: "🔴 Problema",
  };
  return labelMap[status] || status;
}

function formatStatusLabel(status) {
  const labelMap = {
    success: "OK",
    warning: "Alerta",
    failure: "Problema",
  };
  return labelMap[status] || status;
}

function buildReport(results, timestamp, reportPath) {
  const header = `# Relatório de Segurança - ${timestamp}\n\n`;

  const summaryRows = results
    .map(
      (result) =>
        `| ${result.title} | ${formatStatus(result.severity)} | ${result.summary.replace(
          /\n/g,
          " "
        )} |`
    )
    .join("\n");

  const summaryTable = `## Resumo Geral\n\n| Comando | Status | Observações |\n| --- | --- | --- |\n${summaryRows}\n\n`;

  const detailBlocks = results
    .map((result, index) => {
      const issuesList =
        result.issues.length > 0
          ? result.issues
              .map((issue) => `- ${issue.title}: ${issue.details}`)
              .join("\n")
          : "- Nenhum item adicional.";

      const actionText =
        result.severity === "success"
          ? "Monitorar continuamente."
          : result.action;

      return `### ${index + 1}. ${result.title}\n- Status: ${formatStatusLabel(
        result.severity
      )}\n- Como está: ${result.current}\n- Como deveria estar: ${
        result.expected
      }\n- Ação recomendada: ${actionText}\n- Itens:\n${issuesList}\n`;
    })
    .join("\n");

  const footer = `\n---\nRelatório gerado automaticamente e salvo em \`${path.relative(
    ROOT,
    reportPath
  )}\`.\n`;

  return `${header}${summaryTable}${detailBlocks}${footer}`;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function sortResults(results) {
  return [...results].sort((a, b) => {
    const weightDiff =
      (STATUS_WEIGHT[b.severity] || 0) - (STATUS_WEIGHT[a.severity] || 0);
    if (weightDiff !== 0) return weightDiff;
    return (COMMANDS.findIndex((cmd) => cmd.title === a.title) || 0) -
      (COMMANDS.findIndex((cmd) => cmd.title === b.title) || 0);
  });
}

function getNextReportFilename() {
  ensureDir(REPORTS_DIR);
  const existing = fs.existsSync(REPORTS_DIR)
    ? fs.readdirSync(REPORTS_DIR)
    : [];
  const maxId = existing.reduce((acc, file) => {
    const match = file.match(REPORT_FILE_REGEX);
    if (match) {
      const num = parseInt(match[1], 10);
      return Number.isNaN(num) ? acc : Math.max(acc, num);
    }
    return acc;
  }, 0);
  const nextId = maxId + 1;
  return {
    filename: `${REPORT_PREFIX}${nextId}.md`,
    id: nextId,
  };
}

class ProgressBar {
  constructor(weights) {
    this.weights = weights;
    this.totalWeight =
      weights.reduce((sum, value) => sum + value, 0) || weights.length || 1;
    this.completedWeight = 0;
    this.currentWeight = weights[0] || 0;
    this.width = 30;
    this.currentLabel = "Iniciando...";
    this.currentCommandProgress = 0;
    this.interval = null;
    this.lastRenderTime = 0;
    this.lastPercent = -1;
    this.lastLabel = "";
    this.lineActive = false;
  }

  start() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.completed >= this.total) return;
      const maxProgress = 0.98;
      if (this.currentCommandProgress < maxProgress) {
        this.currentCommandProgress = Math.min(
          maxProgress,
          this.currentCommandProgress + 0.01
        );
        this.render();
      }
    }, 150);
    this.render(true);
  }

  updateLabel(label) {
    this.currentLabel = label;
    this.render(true);
  }

  startCommand(label, weight = 0) {
    this.currentCommandProgress = 0;
    this.currentWeight = weight;
    this.currentLabel = label || "Preparando...";
    this.render(true);
  }

  increment(weight = 0) {
    this.currentCommandProgress = 1;
    this.render(true);
    this.completedWeight += weight;
    this.currentCommandProgress = 0;
    this.render(true);
  }

  render(force = false) {
    const ratio =
      this.totalWeight === 0
        ? 1
        : Math.min(
            1,
            (this.completedWeight +
              this.currentWeight * this.currentCommandProgress) /
              this.totalWeight
          );
    const percent = Math.min(100, Math.round(ratio * 100));
    const filled = Math.round((percent / 100) * this.width);
    const bar = `${"█".repeat(filled)}${" ".repeat(this.width - filled)}`;
    if (
      !force &&
      Date.now() - this.lastRenderTime < 500 &&
      percent === this.lastPercent &&
      this.currentLabel === this.lastLabel
    ) {
      return;
    }
    this.lastRenderTime = Date.now();
    this.lastPercent = percent;
    this.lastLabel = this.currentLabel;
    const progressLabel = `${percent}% ${this.currentLabel}`;
    this.renderLine(`|${bar}| ${progressLabel}`);
  }

  finish() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.completed = this.total;
    this.currentCommandProgress = 0;
    this.currentLabel = "Concluído";
    this.render(true);
    this.renderLine("", true);
  }

  renderLine(text, finalize = false) {
    if (!this.lineActive) {
      process.stdout.write(text);
      this.lineActive = true;
    } else {
      readline.cursorTo(process.stdout, 0);
      readline.clearLine(process.stdout, 0);
      process.stdout.write(text);
    }

    if (finalize) {
      process.stdout.write("\n");
      this.lineActive = false;
    }
  }
}

async function main() {
  ensureDir(REPORTS_DIR);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const { filename: reportFilename, id: reportId } = getNextReportFilename();
  const reportPath = path.join(REPORTS_DIR, reportFilename);
  const progress = new ProgressBar(COMMANDS.map((cmd) => cmd.weight || 1));
  progress.start();
  const results = [];

  for (const cmd of COMMANDS) {
    progress.startCommand(`Executando ${cmd.title}`, cmd.weight || 1);
    const execResult = await runCommand(cmd.command, cmd.args);
    const combinedOutput = `${execResult.stdout}\n${execResult.stderr}`;
    let parsed;
    try {
      parsed = cmd.parser(execResult, combinedOutput);
    } catch (error) {
      parsed = {
        severity: "failure",
        summary: `Erro ao interpretar saída de ${cmd.title}.`,
        current: error.message,
        expected: "Parser deveria retornar status válido.",
        action: "Reveja o script e a saída do comando.",
        issues: [],
      };
    }

    results.push({
      id: cmd.id,
      title: cmd.title,
      severity: parsed.severity,
      summary: parsed.summary,
      current: parsed.current,
      expected: parsed.expected,
      action: parsed.action,
      issues: parsed.issues || [],
      rawOutput: combinedOutput,
    });
    progress.increment(cmd.weight || 1);
  }
  progress.updateLabel("Concluído");
  progress.finish();

  const sortedResults = sortResults(results);
  const reportContent = buildReport(sortedResults, timestamp, reportPath);
  fs.writeFileSync(reportPath, reportContent, "utf-8");

  console.log(
    colorize(
      `\nRelatório salvo em ${path.relative(ROOT, reportPath)}.`,
      "white"
    )
  );

  const osvFailure = results.some(
    (result) => result.id === "osv" && result.severity === "failure"
  );
  const otherFailures = results.some(
    (result) => result.id !== "osv" && result.severity === "failure"
  );
  const blockingFailure = osvFailure || otherFailures;

  if (blockingFailure) {
    console.log(
      colorize(
        "[Scanner] Problemas críticos detectados (OSV ou build).",
        "red"
      )
    );
  } else {
    console.log(colorize("[Scanner] Nenhum problema identificado.", "green"));
  }

  if (blockingFailure) {
    console.log(
      colorize(
        "Problemas críticos impedem commit/push automático.",
        "red"
      )
    );
  }

  const exitCode = blockingFailure ? 1 : 0;
  process.exit(exitCode);
}

main();
