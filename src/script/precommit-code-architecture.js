const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports", "security");
const REPORT_FILE_REGEX = /^architecture-report-(\d+)\.md$/;

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
  return path.join(REPORTS_DIR, `architecture-report-${nextId}.md`);
}

function readPackageJson() {
  const pkgPath = path.join(ROOT, "package.json");
  if (!fs.existsSync(pkgPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  } catch {
    return null;
  }
}

function readNextConfig() {
  const configPath = path.join(ROOT, "next.config.js");
  if (!fs.existsSync(configPath)) return null;
  try {
    return fs.readFileSync(configPath, "utf-8");
  } catch {
    return null;
  }
}

function readTsConfig() {
  const configPath = path.join(ROOT, "tsconfig.json");
  if (!fs.existsSync(configPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    return null;
  }
}

function readTailwindConfig() {
  const configPath = path.join(ROOT, "tailwind.config.js");
  if (!fs.existsSync(configPath)) return null;
  try {
    return fs.readFileSync(configPath, "utf-8");
  } catch {
    return null;
  }
}

function searchFiles(pattern, dir = ROOT, exclude = ["node_modules", ".next", ".git", "dist", "build", "reports"]) {
  const results = [];
  const items = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !exclude.includes(item)) {
      results.push(...searchFiles(pattern, fullPath, exclude));
    } else if (stat.isFile() && /\.(js|jsx|ts|tsx)$/.test(item)) {
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

function findFilesByExtension(extensions, dir = ROOT, exclude = ["node_modules", ".next", ".git", "dist", "build", "reports"]) {
  const results = [];
  const items = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !exclude.includes(item)) {
      results.push(...findFilesByExtension(extensions, fullPath, exclude));
    } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
      results.push(path.relative(ROOT, fullPath));
    }
  }
  return results;
}

function checkReactPatterns() {
  const issues = [];
  const passes = [];

  // Hooks em loops/condições
  const hooksInLoops = searchFiles(/(if|for|while|switch)\s*\([^)]*\)\s*[\s\S]*?(useState|useEffect|useContext|useMemo|useCallback)/);
  if (hooksInLoops.length > 0) {
    issues.push({
      check: "Hooks em loops/condições",
      status: "FAIL",
      impact: "Hooks sendo chamados dentro de estruturas condicionais ou laços",
      fix: "Mover hooks para o topo do componente, fora de loops/condições",
      files: hooksInLoops.map(m => m.file),
    });
  } else {
    passes.push({
      check: "Hooks no topo",
      status: "PASS",
      impact: "Hooks chamados apenas no topo dos componentes",
    });
  }

  // useEffect sem dependências
  const useEffectNoDeps = searchFiles(/useEffect\s*\(\s*\([^)]*\)\s*=>\s*{[^}]*},?\s*\)/);
  if (useEffectNoDeps.length > 0) {
    issues.push({
      check: "useEffect sem array de dependências",
      status: "FAIL",
      impact: "useEffect sem array de dependências pode causar loops infinitos",
      fix: "Adicionar array de dependências correto ao useEffect",
      files: useEffectNoDeps.map(m => m.file),
    });
  } else {
    passes.push({
      check: "useEffect com dependências",
      status: "PASS",
      impact: "useEffect com arrays de dependências configurados",
    });
  }

  // Componentes monolíticos (>200 linhas)
  const largeComponents = findFilesByExtension([".jsx", ".tsx"])
    .filter(file => {
      try {
        const content = fs.readFileSync(path.join(ROOT, file), "utf-8");
        return content.split("\n").length > 200;
      } catch {
        return false;
      }
    });

  if (largeComponents.length > 0) {
    issues.push({
      check: "Componentes monolíticos",
      status: "FAIL",
      impact: `Componentes com mais de 200 linhas detectados: ${largeComponents.length}`,
      fix: "Dividir componentes grandes em componentes menores e reutilizáveis",
      files: largeComponents,
    });
  } else {
    passes.push({
      check: "Tamanho de componentes",
      status: "PASS",
      impact: "Componentes com tamanho adequado (<200 linhas)",
    });
  }

  // Keys únicas em listas
  const missingKeys = searchFiles(/\.map\s*\([^)]*\)\s*=>\s*<[^>]+(?![^>]*key=)/);
  if (missingKeys.length > 0) {
    issues.push({
      check: "Keys em listas",
      status: "FAIL",
      impact: "Listas renderizadas sem keys únicas",
      fix: "Adicionar prop 'key' única em cada item de lista",
      files: missingKeys.map(m => m.file),
    });
  } else {
    passes.push({
      check: "Keys em listas",
      status: "PASS",
      impact: "Listas com keys únicas configuradas",
    });
  }

  return { issues, passes };
}

function checkNextJSPatterns() {
  const issues = [];
  const passes = [];

  // Server Components vs Client Components
  const clientComponents = findFilesByExtension([".tsx", ".jsx"])
    .filter(file => {
      try {
        const content = fs.readFileSync(path.join(ROOT, file), "utf-8");
        return content.includes("'use client'");
      } catch {
        return false;
      }
    });

  const serverAPICalls = searchFiles(/fetch\s*\(/).filter(m => 
    !clientComponents.includes(m.file) && !m.file.includes("node_modules")
  );

  if (serverAPICalls.length > 0) {
    passes.push({
      check: "Fetch server-side",
      status: "PASS",
      impact: "Chamadas fetch em Server Components (boa prática)",
    });
  } else {
    issues.push({
      check: "Fetch server-side",
      status: "FAIL",
      impact: "Possível uso excessivo de fetch no client-side",
      fix: "Mover chamadas de API para Server Components ou API Routes",
    });
  }

  // API Routes
  const apiRoutes = findFilesByExtension([".ts", ".js"])
    .filter(file => file.includes("app/api/") && file.includes("route."));

  if (apiRoutes.length > 0) {
    passes.push({
      check: "API Routes",
      status: "PASS",
      impact: `API Routes detectadas: ${apiRoutes.length}`,
    });
  } else {
    issues.push({
      check: "API Routes",
      status: "FAIL",
      impact: "Nenhuma API Route detectada (possível consumo direto de APIs externas)",
      fix: "Implementar BFF com API Routes para consumo de APIs externas",
    });
  }

  // Middleware
  const middleware = fs.existsSync(path.join(ROOT, "middleware.ts"));
  if (middleware) {
    passes.push({
      check: "Middleware",
      status: "PASS",
      impact: "Middleware implementado para auth/redirecionamento",
    });
  } else {
    issues.push({
      check: "Middleware",
      status: "FAIL",
      impact: "Middleware não implementado",
      fix: "Implementar middleware para autenticação e redirecionamentos",
    });
  }

  // Otimização de imagens
  const imageOptimization = searchFiles(/<Image\s/);
  if (imageOptimization.length > 0) {
    passes.push({
      check: "Otimização de imagens",
      status: "PASS",
      impact: "Componente Image do Next.js sendo utilizado",
    });
  } else {
    issues.push({
      check: "Otimização de imagens",
      status: "FAIL",
      impact: "Possível uso de img tag sem otimização",
      fix: "Utilizar componente Image do Next.js para imagens",
    });
  }

  return { issues, passes };
}

function checkTypeScriptPatterns() {
  const issues = [];
  const passes = [];
  const tsConfig = readTsConfig();

  // Strict mode
  if (tsConfig?.compilerOptions?.strict) {
    passes.push({
      check: "TypeScript strict",
      status: "PASS",
      impact: "Modo strict do TypeScript habilitado",
    });
  } else {
    issues.push({
      check: "TypeScript strict",
      status: "FAIL",
      impact: "Modo strict do TypeScript não habilitado",
      fix: "Habilitar strict: true no tsconfig.json",
    });
  }

  // Uso de 'any'
  const anyUsage = searchFiles(/:\s*any\b|<any>/);
  if (anyUsage.length > 0) {
    issues.push({
      check: "Uso de 'any'",
      status: "FAIL",
      impact: `Uso de 'any' detectado em ${anyUsage.length} arquivo(s)`,
      fix: "Substituir 'any' por tipos específicos ou 'unknown'",
      files: anyUsage.map(m => m.file),
    });
  } else {
    passes.push({
      check: "Uso de 'any'",
      status: "PASS",
      impact: "Nenhum uso de 'any' detectado",
    });
  }

  // Props tipadas
  const untypedProps = searchFiles(/interface\s+Props\s*{[\s\S]*?}/).filter(m => {
    const content = fs.readFileSync(path.join(ROOT, m.file), "utf-8");
    return !content.includes("React.FC") && !content.includes(": React.FC");
  });

  if (untypedProps.length === 0) {
    passes.push({
      check: "Props tipadas",
      status: "PASS",
      impact: "Componentes com props tipadas",
    });
  } else {
    issues.push({
      check: "Props tipadas",
      status: "FAIL",
      impact: "Possíveis componentes sem props tipadas",
      fix: "Adicionar interfaces para props dos componentes",
    });
  }

  return { issues, passes };
}

function checkTailwindPatterns() {
  const issues = [];
  const passes = [];
  const tailwindConfig = readTailwindConfig();

  // Purge/Content configuration
  if (tailwindConfig && (tailwindConfig.includes("content:") || tailwindConfig.includes("purge:"))) {
    passes.push({
      check: "Tailwind content/purge",
      status: "PASS",
      impact: "Configuração de content/purge detectada",
    });
  } else {
    issues.push({
      check: "Tailwind content/purge",
      status: "FAIL",
      impact: "Configuração de content/purge não detectada",
      fix: "Configurar content/purge no tailwind.config.js",
    });
  }

  // Uso excessivo de @apply
  const applyUsage = searchFiles(/@apply/);
  if (applyUsage.length > 5) {
    issues.push({
      check: "@apply excessivo",
      status: "FAIL",
      impact: `Uso excessivo de @apply em ${applyUsage.length} arquivo(s)`,
      fix: "Preferir classes utility-first em vez de @apply",
      files: applyUsage.map(m => m.file),
    });
  } else {
    passes.push({
      check: "@apply moderado",
      status: "PASS",
      impact: "Uso moderado de @apply",
    });
  }

  // Classes responsivas
  const responsiveClasses = searchFiles(/(sm:|md:|lg:|xl:|2xl:)/);
  if (responsiveClasses.length > 0) {
    passes.push({
      check: "Classes responsivas",
      status: "PASS",
      impact: "Classes responsivas do Tailwind sendo utilizadas",
    });
  } else {
    issues.push({
      check: "Classes responsivas",
      status: "FAIL",
      impact: "Poucas ou nenhuma classe responsiva detectada",
      fix: "Implementar design responsivo com classes do Tailwind",
    });
  }

  return { issues, passes };
}

function checkProjectStructure() {
  const issues = [];
  const passes = [];

  const expectedDirs = [
    "src/app",
    "src/components",
    "src/lib",
    "src/types",
    "src/hooks",
    "src/context",
    "src/services",
    "src/utils",
  ];

  const existingDirs = expectedDirs.filter(dir => fs.existsSync(path.join(ROOT, dir)));

  if (existingDirs.length >= expectedDirs.length * 0.7) {
    passes.push({
      check: "Estrutura de pastas",
      status: "PASS",
      impact: `Estrutura bem organizada com ${existingDirs.length}/${expectedDirs.length} pastas esperadas`,
    });
  } else {
    issues.push({
      check: "Estrutura de pastas",
      status: "FAIL",
      impact: `Estrutura incompleta: ${existingDirs.length}/${expectedDirs.length} pastas esperadas`,
      fix: "Criar estrutura de pastas seguindo boas práticas Next.js",
    });
  }

  // Separação UI vs lógica
  const uiComponents = findFilesByExtension([".tsx", ".jsx"])
    .filter(file => file.includes("components/ui/"));

  const businessComponents = findFilesByExtension([".tsx", ".jsx"])
    .filter(file => file.includes("components/") && !file.includes("components/ui/"));

  if (uiComponents.length > 0 && businessComponents.length > 0) {
    passes.push({
      check: "Separação UI/lógica",
      status: "PASS",
      impact: "Componentes UI separados da lógica de negócio",
    });
  } else {
    issues.push({
      check: "Separação UI/lógica",
      status: "FAIL",
      impact: "Possível mistura entre UI e lógica de negócio",
      fix: "Separar componentes UI em components/ui/",
    });
  }

  return { issues, passes };
}

function generateReport(results, timestamp, projectInfo) {
  const allIssues = results.flatMap(r => r.issues);
  const allPasses = results.flatMap(r => r.passes);
  const criticalIssues = allIssues.filter(i => i.status === "FAIL");

  const status = criticalIssues.length > 0 ? "🔴 Crítico" : allIssues.length > 0 ? "🟡 Atenção" : "🟢 Bom";

  const sections = [
    `# Relatório de Arquitetura de Código - ${timestamp}`,
    "",
    "## Informações do Projeto",
    "",
    `- **Framework**: Next.js ${projectInfo.nextVersion || "desconhecido"}`,
    `- **TypeScript**: ${projectInfo.typescriptVersion || "não detectado"}`,
    `- **React**: ${projectInfo.reactVersion || "desconhecido"}`,
    `- **App Router**: ${projectInfo.appRouter ? "Sim" : "Não"}`,
    "",
    "## Resumo Geral",
    "",
    `| Categoria | Status | Problemas |`,
    `| --- | --- | --- |`,
    `| React Patterns | ${results[0]?.issues.length > 0 ? "🔴 Falha" : "🟢 OK"} | ${results[0]?.issues.length || 0} |`,
    `| Next.js Patterns | ${results[1]?.issues.length > 0 ? "🔴 Falha" : "🟢 OK"} | ${results[1]?.issues.length || 0} |`,
    `| TypeScript | ${results[2]?.issues.length > 0 ? "🔴 Falha" : "🟢 OK"} | ${results[2]?.issues.length || 0} |`,
    `| Tailwind CSS | ${results[3]?.issues.length > 0 ? "🔴 Falha" : "🟢 OK"} | ${results[3]?.issues.length || 0} |`,
    `| Estrutura | ${results[4]?.issues.length > 0 ? "🔴 Falha" : "🟢 OK"} | ${results[4]?.issues.length || 0} |`,
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
  sections.push("- Seguir convenções do React.dev e Next.js.org");
  sections.push("- Manter componentes pequenos e focados");
  sections.push("- Usar TypeScript strict e evitar 'any'");
  sections.push("- Implementar BFF com API Routes");
  sections.push("- Separar UI components da lógica de negócio");
  sections.push("- Usar classes utility-first do Tailwind");
  sections.push("- Implementar testes unitários e de integração");
  sections.push("");
  sections.push("---");
  sections.push(`*Relatório gerado em ${new Date().toLocaleString("pt-BR")}*`);

  return sections.join("\n");
}

function main() {
  console.log(colorize("🏗️ Iniciando auditoria de arquitetura de código...", "yellow"));

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  
  const pkg = readPackageJson();
  const nextConfig = readNextConfig();

  const projectInfo = {
    nextVersion: pkg?.dependencies?.next || pkg?.devDependencies?.next,
    reactVersion: pkg?.dependencies?.react || pkg?.devDependencies?.react,
    typescriptVersion: pkg?.devDependencies?.typescript,
    appRouter: fs.existsSync(path.join(ROOT, "src", "app")),
  };

  const results = [
    checkReactPatterns(),
    checkNextJSPatterns(),
    checkTypeScriptPatterns(),
    checkTailwindPatterns(),
    checkProjectStructure(),
  ];

  const reportContent = generateReport(results, timestamp, projectInfo);
  const reportPath = getNextReportFilename();
  fs.writeFileSync(reportPath, reportContent, "utf-8");

  console.log(colorize(`Relatório salvo em ${path.relative(ROOT, reportPath)}.`, "green"));

  const allIssues = results.flatMap(r => r.issues);
  const criticalIssues = allIssues.filter(i => i.status === "FAIL");

  if (criticalIssues.length > 0) {
    console.log(colorize("[Scanner] Problemas críticos de arquitetura detectados.", "red"));
    process.exit(1);
  } else if (allIssues.length > 0) {
    console.log(colorize("[Scanner] Alertas de arquitetura identificados.", "yellow"));
    process.exit(0);
  } else {
    console.log(colorize("[Scanner] Arquitetura conforme as boas práticas.", "green"));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
