import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Como executar a partir da raiz do projeto:
// - PowerShell / CMD: node .\src\script\convert-images-to-webp.mjs
// - Git Bash / WSL / Unix: node ./src/script/convert-images-to-webp.mjs
// - Yarn (qualquer shell): yarn convert:images

const IMAGES_ROOT = path.join(process.cwd(), 'public', 'assets', 'images')

async function convertPngToWebp(filePath) {
  const ext = path.extname(filePath)
  if (ext.toLowerCase() !== '.png') return

  const webpPath = filePath.replace(/\.png$/i, '.webp')

  // Se o .webp já existir, não faz nada
  if (fs.existsSync(webpPath)) {
    console.log(`SKIP (já existe): ${path.relative(process.cwd(), webpPath)}`)
    return
  }

  console.log(`Convertendo: ${path.relative(process.cwd(), filePath)} -> ${path.relative(process.cwd(), webpPath)}`)

  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(webpPath)
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(fullPath)
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      await convertPngToWebp(fullPath)
    }
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_ROOT)) {
    console.error(`Pasta não encontrada: ${IMAGES_ROOT}`)
    process.exit(1)
  }

  console.log(`Iniciando conversão PNG -> WEBP em: ${IMAGES_ROOT}`)
  await walk(IMAGES_ROOT)
  console.log('Conversão concluída.')
}

main().catch((err) => {
  console.error('Erro ao converter imagens:', err)
  process.exit(1)
})
