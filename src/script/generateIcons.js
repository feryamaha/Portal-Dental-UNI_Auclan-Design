const fs = require("fs");
const path = require("path");

// Para executar (CJS): node .\src\script\generateIcons.js
const iconsDir = path.join(process.cwd(), "public", "assets", "icons");
const outputFile = path.join(process.cwd(), "src", "script", "IconsList.tsx");
const outputDir = path.dirname(outputFile);

const toCamelCase = (str) =>
  str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());

const svgOriginalColors = [
  "icon-favicon-dental.svg",
  "icon-avatar.svg"

];

// ✅ NOVA FUNÇÃO: Converter atributos HTML → React (camelCase)
function convertSVGAttributes(svg) {
  const attrMap = {
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'flood-opacity': 'floodOpacity',
    'color-interpolation-filters': 'colorInterpolationFilters',
    'clip-path': 'clipPath',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'stroke-miterlimit': 'strokeMiterlimit',
    'fill-opacity': 'fillOpacity',
    'stroke-opacity': 'strokeOpacity',
  };

  let converted = svg;
  Object.entries(attrMap).forEach(([htmlAttr, reactAttr]) => {
    const regex = new RegExp(`${htmlAttr}="([^"]*)"`, 'g');
    converted = converted.replace(regex, `${reactAttr}="$1"`);
  });

  return converted;
}

// SAFELY convert xmlns:xlink, xlink:href and other SVG quirks for JSX
function sanitizeSVGforJSX(svgContent) {
  // ✅ ADICIONE a conversão de atributos AQUI
  svgContent = convertSVGAttributes(svgContent);

  return svgContent
    .replace(/<?xml.*?\?>|<!DOCTYPE.*?>|<!--.*?-->/gs, "")
    .replace(/\s+xmlns:xlink=/g, " xmlnsXlink=")
    .replace(/xlink:href=/g, "xlinkHref=")
    .replace(/xml:space=/g, "xmlSpace=")
    .replace(/>\s+</g, "><")
    .replace(/&apos;/g, "'");
}

// NOVO:
function convertSVGStyleToObject(svg) {
  return svg.replace(/style="([^"]*)"/g, (_, styleStr) => {
    const objEntries = styleStr
      .split(";")
      .map(s => s.trim())
      .filter(Boolean)
      .map(entry => {
        let [prop, val] = entry.split(":");
        if (!prop || !val) return null;
        prop = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        return `${prop}: "${val.trim()}"`;
      })
      .filter(Boolean);

    if (objEntries.length === 0) {
      return 'style={undefined}';
    }

    return `style={{ ${objEntries.join(", ")} }}`;
  });
}

const svgToComponent = (name, svgContent) => {
  svgContent = sanitizeSVGforJSX(svgContent);
  svgContent = convertSVGStyleToObject(svgContent);

  svgContent = svgContent
    .replace(
      /(stroke|fill)="(#[0-9A-Fa-f]{3,6}|rgb\(.*?\)|[a-zA-Z]+)"/g,
      (_, attr, color) =>
        color.toLowerCase() === "none"
          ? `${attr}="none"`
          : `${attr}="currentColor"`
    )
    .replace("<svg", "<svg {...props}");

  return `const ${name} = (props: React.SVGProps<SVGSVGElement>) => (${svgContent});`;
};

const svgToComponentWithOriginalColors = (
  name,
  svgContent,
  originalFileName
) => {
  svgContent = sanitizeSVGforJSX(svgContent).trim();
  if (svgOriginalColors.includes(originalFileName)) {
    svgContent = convertSVGStyleToObject(svgContent);
    const processedContent = svgContent.replace("<svg", "<svg {...props}");
    return `const ${name} = (props: React.SVGProps<SVGSVGElement>) => (${processedContent});`;
  }
  return svgToComponent(name, svgContent);
};

const generateIconsFile = () => {
  if (!fs.existsSync(iconsDir)) {
    console.error(`❌ A pasta de ícones não existe: ${iconsDir}`);
    return;
  }
  const files = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith(".svg"));
  if (files.length === 0) {
    console.warn("⚠️ Nenhum arquivo .svg encontrado em", iconsDir);
  }
  let imports = "import React from 'react';\n\n";
  let components = "";
  let exports = "export const icons = {\n";
  files.forEach((file) => {
    const filePath = path.join(iconsDir, file);
    let svgContent = fs.readFileSync(filePath, "utf-8");
    const fileName = path.basename(file, ".svg");
    const componentName = toCamelCase(fileName);
    components +=
      svgToComponentWithOriginalColors(componentName, svgContent, file) +
      "\n\n";
    exports += `  ${componentName}: ${componentName},\n`;
  });
  exports += "};\n";
  const finalContent = `${imports}${components}${exports}`;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputFile, finalContent, "utf-8");
  const originalIcons = files.filter((file) =>
    svgOriginalColors.includes(file)
  );
  if (originalIcons.length > 0) {
    console.log(
      `🎨 Ícones com cores originais mantidas (${originalIcons.length}):`
    );
    originalIcons.forEach((icon) => console.log(`   - ${icon}`));
  }
  console.log(`✅ Arquivo de ícones gerado com sucesso: ${outputFile}`);
  console.log(`📋 Total de ícones processados: ${files.length}`);
};

generateIconsFile();


