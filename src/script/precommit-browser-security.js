const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports", "security");
const REPORT_FILE_REGEX = /^browser-security-report-(\d+)\.md$/;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function colorize(text, color) {
  const codes = {
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    reset: "\x1b[0m",
  };
  return `${codes[color]}${text}${codes.reset}`;
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
  return path.join(REPORTS_DIR, `browser-security-report-${nextId}.md`);
}

function findConfigFiles() {
  const configs = {
    nextConfig: null,
    middleware: null,
    layout: null,
  };

  // Buscar next.config.js na raiz
  const nextConfigPath = path.join(ROOT, "next.config.js");
  if (fs.existsSync(nextConfigPath)) {
    try {
      configs.nextConfig = fs.readFileSync(nextConfigPath, "utf-8");
    } catch {}
  }

  // Buscar middleware.ts em qualquer lugar
  const middlewareMatches = searchFiles(/middleware\.ts$/);
  if (middlewareMatches.length > 0) {
    configs.middleware = middlewareMatches[0].content;
  }

  // Buscar layout.tsx em app/
  const layoutMatches = searchFiles(/layout\.tsx$/).filter(m => m.file.includes("app"));
  if (layoutMatches.length > 0) {
    configs.layout = layoutMatches[0].content;
  }

  return configs;
}

function searchFiles(pattern, dir = ROOT, exclude = ["node_modules", ".next", ".git", "dist", "build"]) {
  const results = [];
  const items = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !exclude.includes(item)) {
      results.push(...searchFiles(pattern, fullPath, exclude));
    } else if (stat.isFile() && /\.(js|jsx|ts|tsx|html|json)$/.test(item)) {
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (pattern.test(content)) {
          results.push({ file: path.relative(ROOT, fullPath), content });
        }
      } catch {
        // ignore unreadable files
      }
    }
  }
  return results;
}

function checkCSP(nextConfig, layout, middleware) {
  const issues = [];
  const passes = [];

  if (!nextConfig) {
    issues.push({
      check: "next.config.js",
      status: "FAIL",
      impact: "Sem configuração de CSP detectada",
      fix: "Adicionar headers CSP em next.config.js ou middleware",
    });
  } else {
    if (nextConfig.includes("Content-Security-Policy") || nextConfig.includes("script-src")) {
      if (nextConfig.includes("unsafe-inline") || nextConfig.includes("unsafe-eval")) {
        issues.push({
          check: "CSP unsafe-inline/unsafe-eval",
          status: "FAIL",
          impact: "Risco de XSS via scripts inseguros",
          fix: "Remover unsafe-inline/unsafe-eval, usar nonce ou strict-dynamic",
        });
      } else {
        passes.push({
          check: "CSP sem unsafe",
          status: "PASS",
          impact: "CSP configurado sem práticas inseguras",
        });
      }
    } else {
      issues.push({
        check: "CSP ausente",
        status: "FAIL",
        impact: "Sem proteção contra XSS e injeção de conteúdo",
        fix: "Configurar Content-Security-Policy headers",
      });
    }
  }

  // Verificação de nonce com case-insensitive
  if (middleware && /nonce/i.test(middleware)) {
    passes.push({
      check: "Nonce em middleware",
      status: "PASS",
      impact: "Nonce gerado por request para CSP",
    });
  } else {
    issues.push({
      check: "Nonce ausente",
      status: "FAIL",
      impact: "Sem nonce dinâmico para scripts",
      fix: "Implementar geração de nonce em middleware",
    });
  }

  // Verificação de nonce no layout com case-insensitive
  if (layout && /headers\(\)\.get\(['"].*nonce.*['"]\)/i.test(layout)) {
    passes.push({
      check: "Nonce no layout",
      status: "PASS",
      impact: "Nonce injetado no layout",
    });
  }

  return { issues, passes };
}

function checkSecurityHeaders(nextConfig) {
  const issues = [];
  const passes = [];
  const requiredHeaders = [
    { name: "X-Frame-Options", recommended: "DENY or SAMEORIGIN" },
    { name: "X-Content-Type-Options", recommended: "nosniff" },
    { name: "X-DNS-Prefetch-Control", recommended: "off" },
    { name: "Strict-Transport-Security", recommended: "max-age=63072000" },
    { name: "Permissions-Policy", recommended: "configured restrictively" },
    { name: "Referrer-Policy", recommended: "strict-origin-when-cross-origin" },
  ];

  if (!nextConfig) {
    requiredHeaders.forEach(header => {
      issues.push({
        check: header.name,
        status: "FAIL",
        impact: `Header ${header.name} ausente`,
        fix: `Adicionar ${header.name}: ${header.recommended}`,
      });
    });
  } else {
    requiredHeaders.forEach(header => {
      if (nextConfig.includes(header.name)) {
        passes.push({
          check: header.name,
          status: "PASS",
          impact: `Header ${header.name} configurado`,
        });
      } else {
        issues.push({
          check: header.name,
          status: "FAIL",
          impact: `Header ${header.name} ausente`,
          fix: `Adicionar ${header.name}: ${header.recommended}`,
        });
      }
    });

    if (nextConfig.includes("X-Powered-By") || !nextConfig.includes("poweredBy: false")) {
      issues.push({
        check: "X-Powered-By exposto",
        status: "FAIL",
        impact: "Exposição de stack technology",
        fix: "Adicionar poweredBy: false em next.config.js",
      });
    } else {
      passes.push({
        check: "X-Powered-By removido",
        status: "PASS",
        impact: "Header de tecnologia removido",
      });
    }
  }

  return { issues, passes };
}

function checkXSSPatterns() {
  const issues = [];
  const passes = [];

  const dangerousPatterns = [
    { pattern: /dangerouslySetInnerHTML/, desc: "dangerouslySetInnerHTML" },
    { pattern: /innerHTML\s*=/, desc: "innerHTML" },
    { pattern: /eval\s*\(/, desc: "eval()" },
    { pattern: /new Function\s*\(/, desc: "new Function()" },
    { pattern: /setTimeout\s*\(\s*["']/, desc: "setTimeout com string" },
    { pattern: /setInterval\s*\(\s*["']/, desc: "setInterval com string" },
  ];

  dangerousPatterns.forEach(({ pattern, desc }) => {
    const matches = searchFiles(pattern);
    if (matches.length > 0) {
      issues.push({
        check: desc,
        status: "FAIL",
        impact: `Padrão perigoso detectado em ${matches.length} arquivo(s)`,
        fix: `Remover ou sanitizar uso de ${desc}`,
        files: matches.map(m => m.file),
      });
    } else {
      passes.push({
        check: desc,
        status: "PASS",
        impact: `Nenhum uso de ${desc} detectado`,
      });
    }
  });

  return { issues, passes };
}

function checkSensitiveExposure() {
  const issues = [];
  const passes = [];

  const sensitivePatterns = [
    { pattern: /process\.env\./, desc: "process.env no frontend" },
    { pattern: /NEXT_PUBLIC_.*(KEY|SECRET|TOKEN|PASS)/i, desc: "NEXT_PUBLIC com segredos" },
    { pattern: /(api_key|secret|token|password|passwd)/i, desc: "Possíveis segredos hardcoded" },
  ];

  sensitivePatterns.forEach(({ pattern, desc }) => {
    const matches = searchFiles(pattern);
    const filtered = matches.filter(m => !m.file.includes("node_modules") && !m.file.includes(".next"));
    if (filtered.length > 0) {
      issues.push({
        check: desc,
        status: "FAIL",
        impact: `Possível exposição de dados sensíveis em ${filtered.length} arquivo(s)`,
        fix: `Remover segredos do código frontend, usar variáveis de ambiente server-side`,
        files: filtered.map(m => m.file),
      });
    } else {
      passes.push({
        check: desc,
        status: "PASS",
        impact: `Nenhuma exposição de ${desc} detectada`,
      });
    }
  });

  return { issues, passes };
}

function checkExternalResources() {
  const issues = [];
  const passes = [];

  const externalScriptPattern = /<script[^>]+src=["']https?:\/\/[^"']+["']/;
  const externalLinkPattern = /<link[^>]+href=["']https?:\/\/[^"']+["']/;
  const integrityPattern = /integrity=/;

  const scriptMatches = searchFiles(externalScriptPattern);
  const linkMatches = searchFiles(externalLinkPattern);

  const allExternal = [...scriptMatches, ...linkMatches];
  if (allExternal.length > 0) {
    const withoutIntegrity = allExternal.filter(match => !integrityPattern.test(match.content));
    if (withoutIntegrity.length > 0) {
      issues.push({
        check: "SRI ausente",
        status: "FAIL",
        impact: `Recursos externos sem Subresource Integrity em ${withoutIntegrity.length} arquivo(s)`,
        fix: "Adicionar atributo integrity e crossorigin em recursos externos",
        files: withoutIntegrity.map(m => m.file),
      });
    } else {
      passes.push({
        check: "SRI presente",
        status: "PASS",
        impact: "Recursos externos com integridade verificada",
      });
    }
  } else {
    passes.push({
      check: "Recursos externos",
      status: "PASS",
      impact: "Nenhum recurso externo detectado",
    });
  }

  return { issues, passes };
}

function generateReport(results, timestamp) {
  const allIssues = results.flatMap(r => r.issues);
  const allPasses = results.flatMap(r => r.passes);
  const criticalIssues = allIssues.filter(i => i.status === "FAIL" && i.impact.includes("Crítico"));

  const status = criticalIssues.length > 0 ? "🔴 Crítico" : allIssues.length > 0 ? "🟡 Atenção" : "🟢 Bom";

  const sections = [
    `# Relatório de Segurança Browser - ${timestamp}`,
    "",
    "## Resumo Geral",
    "",
    `| Categoria | Status | Observações |`,
    `| --- | --- | --- |`,
    `| CSP | ${results[0]?.issues.some(i => i.check.includes("CSP")) ? "🔴 Falha" : "🟢 OK"} | ${results[0]?.issues.filter(i => i.check.includes("CSP")).length || 0} problema(s) |`,
    `| Headers OWASP | ${results[1]?.issues.length > 0 ? "🔴 Falha" : "🟢 OK"} | ${results[1]?.issues.length || 0} problema(s) |`,
    `| XSS/Scripts Inseguros | ${results[2]?.issues.length > 0 ? "🔴 Falha" : "🟢 OK"} | ${results[2]?.issues.length || 0} problema(s) |`,
    `| Exposição de Dados | ${results[3]?.issues.length > 0 ? "🔴 Falha" : "🟢 OK"} | ${results[3]?.issues.length || 0} problema(s) |`,
    `| Recursos Externos | ${results[4]?.issues.length > 0 ? "🟡 Atenção" : "🟢 OK"} | ${results[4]?.issues.length || 0} problema(s) |`,
    "",
    `**Status Geral: ${status}**`,
    "",
  ];

  // Detalhes dos problemas
  if (allIssues.length > 0) {
    sections.push("## Problemas Identificados", "");
    allIssues.forEach((issue, idx) => {
      sections.push(`### ${idx + 1}. ${issue.check}`);
      sections.push(`- **Status**: ${issue.status}`);
      sections.push(`- **Impacto**: ${issue.impact}`);
      sections.push(`- **Correção**: ${issue.fix}`);
      if (issue.files) {
        sections.push(`- **Arquivos**: ${issue.files.join(", ")}`);
      }
      sections.push("");
    });
  }

  // Verificações que passaram
  if (allPasses.length > 0) {
    sections.push("## Verificações Aprovadas", "");
    allPasses.forEach((check, idx) => {
      sections.push(`✅ ${check.check}: ${check.impact}`);
    });
    sections.push("");
  }

  sections.push("## Recomendações Gerais");
  sections.push("- Implementar CSP com nonce em produção");
  sections.push("- Configurar todos os headers OWASP recomendados");
  sections.push("- Remover padrões XSS e eval do código");
  sections.push("- Não expor segredos ou variáveis sensíveis no frontend");
  sections.push("- Usar SRI para recursos externos");
  sections.push("- Considerar implementar Trusted Types para maior proteção");
  sections.push("");
  sections.push("---");
  sections.push(`*Relatório gerado em ${new Date().toLocaleString("pt-BR")}*`);

  return sections.join("\n");
}

function main() {
  console.log(colorize("🔍 Iniciando auditoria de segurança browser...", "yellow"));

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  
  const configs = findConfigFiles();

  const results = [
    checkCSP(configs.nextConfig, configs.layout, configs.middleware),
    checkSecurityHeaders(configs.nextConfig),
    checkXSSPatterns(),
    checkSensitiveExposure(),
    checkExternalResources(),
  ];

  const reportContent = generateReport(results, timestamp);
  const reportPath = getNextReportFilename();
  fs.writeFileSync(reportPath, reportContent, "utf-8");

  console.log(colorize(`Relatório salvo em ${path.relative(ROOT, reportPath)}.`, "green"));

  const allIssues = results.flatMap(r => r.issues);
  const criticalIssues = allIssues.filter(i => i.status === "FAIL" && i.impact.includes("Crítico"));

  if (criticalIssues.length > 0) {
    console.log(colorize("[Scanner] Problemas críticos de segurança detectados.", "red"));
    process.exit(1);
  } else if (allIssues.length > 0) {
    console.log(colorize("[Scanner] Alertas de segurança identificados.", "yellow"));
    process.exit(0);
  } else {
    console.log(colorize("[Scanner] Nenhum problema de segurança identificado.", "green"));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
