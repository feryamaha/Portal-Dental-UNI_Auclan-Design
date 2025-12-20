# Guia para clonar a arquitetura do site institucional

Este guia descreve como iniciar um novo projeto (dashboard) da Dental UNI reutilizando a mesma arquitetura, versões de dependências, estrutura de pastas e práticas de segurança do site institucional Odontolife (usado aqui como referência estável).

## Stack e versões (fixar iguais)
- **Next.js:** 15.5.9 (App Router)  
- **React / React DOM:** 19.2.3  
- **TypeScript:** 5.7.3  
- **Tailwind CSS:** ^3.4.1 + PostCSS (tailwindcss plugin)  
- **Axios:** ^1.11.0 (BFF server-side)  
- **Formulários/validação:** react-hook-form ^7.54.2, zod ^3.24.2, @hookform/resolvers ^4.1.2  
- **UI/utilitários:** clsx ^2.1.1, tailwind-merge ^3.4.0, tailwind-scrollbar ^3.1.0, react-input-mask ^2.0.4, react-markdown ^10.1.0, swiper ^11.2.4  
- **Conteúdo rich text:** quill ^2.0.3, @tiptap/react|starter-kit|pm ^3.4.1  
- **Mapas/analytics/cookies:** @react-google-maps/api ^2.20.6, @microsoft/clarity ^1.0.0, js-cookie ^3.0.5  
- **Webpack SVGR:** @svgr/webpack ^8.1.0 (registrado via webpack override)  
- **DevDeps:** @types/node ^20, @types/react 19.2.7, @types/react-dom 19.2.3 (overrides travadas), postcss ^8, sharp ^0.34.5

## Configurações fundamentais
- **next.config.js:**
  - `reactStrictMode: true`, `poweredByHeader: false`.  
  - Alias `@` -> `src`.  
  - Domains liberados para imagens.  
  - Headers estáticos de segurança (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy); CSP dinâmica vem do middleware.  
- **Middleware (src/middleware.ts):**
  - Gera `nonce` criptográfico por requisição e injeta em `X-Nonce`.  
  - Remove header `Server`.  
  - CSP Level 3 com `strict-dynamic`, whitelist de fontes/estilos/imagens/connect e fallback Vercel; permite `unsafe-eval` apenas em dev.  
  - Proteção de rota de protocolo via cookie `protocol_access`.  
  - Matcher global exceto `_next/static|_next/image|favicon.ico`.  
- **TypeScript (tsconfig.json):** `strict: true`, `moduleResolution: bundler`, `baseUrl: ./src`, paths `@/* -> ./*` e `./src/*`, JSX preserve.  
- **Tailwind (tailwind.config.ts):** conteúdo aponta para `src/pages`, `src/components`, `src/app`; tema estendido com paleta corporativa, fontes Lato/Inter, sombras e backgrounds; containers centralizados; breakpoints mobile-first; sem plugins extras.  
- **PostCSS (postcss.config.mjs):** apenas `tailwindcss` plugin.  
- **Globais (src/app/globals.css):** registra fonte Lato local, aplica fontes Inter/Lato, suavização, resets de inputs, animações de modal mobile/desktop.

## Estrutura recomendada
- `src/middleware.ts` — middleware Edge com CSP/nonce e regras de acesso.  
- `src/app/` — App Router com layouts, páginas e **Route Handlers** `/api/**` para camada BFF (manter endpoints internos e fetch nativo no cliente).  
- `src/lib/api-client.ts` — axios configurado server-side com baseURL e headers de credenciais; interceptores de erro.  
- `src/lib/env.ts` — validação de variáveis obrigatórias no server.  
- `src/components`, `contexts`, `hooks`, `schemas`, `types`, `constants`, `utils`, `assets` — manter convenções de coesão existentes.  
- Alias `@` para importar a partir de `src`.  
- Layout root (`src/app/layout.tsx`) lê `X-Nonce` do middleware, injeta em `<head>`/`<body>`, registra fontes e providers globais (Clarity, UserWay, WhatsButton, contextos). Replicar pattern para dashboard.

## Scripts e tooling
- `dev`, `build`, `start`, `lint (next lint)`.  
- `generate:icons` (usa `scripts/generateIcons.js`).  
- Hooks de pré-commit (dependências/segurança/navegador/arquitetura) existem em `scripts/` — manter equivalentes (conteúdo está em scripts ignorados pelo .gitignore, mas preserve nomes e chamadas para compatibilidade).  
- Sem Jest configurado neste projeto; apenas lint.

## Variáveis de ambiente
- Obrigatórias (validadas em runtime server): `CLIENT_ID`, `CLIENT_TOKEN`.  
- O axios usa `API_BASE_URL` (default `https://api.dentaluni.com.br`).  
- Configure `.env` no novo projeto (mesmas chaves) e injete em ambiente de deploy.  
- Validação automática ocorre em `src/lib/env.ts` (server-side); o `api-client` avisa se faltar (dev) e falha em runtime se ausente.

## Camada BFF (Route Handlers)
- Todos os fetches do cliente devem apontar para `/api/...` internos.  
- Route Handlers usam `apiClient`/`apiClient2` com timeout 30s e headers com credenciais.  
- Respostas tipicamente retornam `NextResponse.json` com cache (`s-maxage` + `stale-while-revalidate`) quando aplicável.  
- Siga exemplos em `src/app/api/*/route.ts` (e subpastas) para replicar padrões de construção de endpoint, tratamento de query params e handling de erros.  
- Garanta que nenhuma credencial apareça em código client-side.

## Segurança
- Middleware + headers estáticos implementam CSP Level 3, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy; remove `Server`.  
- CSP considera ambiente dev e host Vercel; preserve lógica ao migrar.  
- Uso de nonce deve ser repassado para `<head>` e `<body>` no layout para inline scripts/estilos seguros.

## Passo a passo para iniciar o novo dashboard
1) Crie projeto Next.js **App Router** e substitua `package.json` pelas mesmas versões acima (fixe sem caret para `next`, `react`, `react-dom`, `typescript`, `@types/react*`).  
2) Copie `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `src/middleware.ts`, `src/app/globals.css` e ajuste paths conforme necessário.  
3) Configure alias `@` -> `src` (webpack e tsconfig).  
4) Recrie estrutura de pastas `src/app`, `src/lib`, `src/components`, `src/contexts`, etc., mantendo separação de Client/Server Components e Route Handlers `/api/**` para o BFF.  
5) Configure variáveis `CLIENT_ID`, `CLIENT_TOKEN`, `API_BASE_URL` no ambiente (e Vercel se usar).  
6) Instale dependências com **Yarn** (`yarn install`) e use scripts `yarn dev`, `yarn build`, `yarn start`, `yarn lint`.  
7) Reimplemente providers globais (Clarity, UserWay, contextos) no `RootLayout` e propague `nonce` do header `X-Nonce`.  
8) Para SVGs, mantenha `@svgr/webpack` via override de webpack em `next.config.js`.  
9) Preserve políticas de cache/erro dos Route Handlers (ex.: `NextResponse.json` + headers de `Cache-Control`).

## Observações
- Pastas `docs`, `docs-refactor`, `prompts`, `scripts`, `img-odontolife` estão ignoradas; o projeto principal se baseia em código dentro de `src/` e configs de raiz.  
- `.env` e `.env.example` estão ignorados; use as chaves descritas acima.

## Seção CLI (copiar/colar) para subir um novo dashboard idêntico
> Pré: manter Node 22.16.0 (já em `.nvmrc`) e Yarn 1.22.x. Projeto de referência: institucional Dental UNI (Odontolife).

```powershell
# 0) Ir para o diretório de projetos local
Set-Location C:\DevProj

# 1) Criar pasta do novo dashboard
mkdir dashboard-dentaluni
cd dashboard-dentaluni

# 2) Fixar Node (opcional se já usa nvm)
echo 22.16.0 > .nvmrc

# 3) Copiar package.json e yarn.lock do projeto de referência (versões 1:1)
copy ..\odontofile-institucional\package.json .
copy ..\odontofile-institucional\yarn.lock .

# (Opcional) Renomear o "name" do package.json para o novo dashboard
(Get-Content package.json) -replace '"name": "odontolife"', '"name": "dashboard-dentaluni"' | Set-Content package.json

# 4) Instalar dependências obedecendo o lockfile
yarn install --frozen-lockfile

# 5) Copiar SOMENTE configs/base do projeto de referência (nenhum outro arquivo)
copy ..\odontofile-institucional\next.config.js .
copy ..\odontofile-institucional\tsconfig.json .
copy ..\odontofile-institucional\tailwind.config.ts .
copy ..\odontofile-institucional\postcss.config.mjs .

# 6) Criar estrutura mínima (nenhum arquivo adicional)
mkdir src\app\api -Force | Out-Null
mkdir src\app\page -Force | Out-Null
mkdir public\assets\images -Force | Out-Null
mkdir public\assets\icons -Force | Out-Null
mkdir public\assets\fonts -Force | Out-Null
mkdir src\components\shared -Force | Out-Null
mkdir src\components\ui -Force | Out-Null
mkdir src\components\MainContent -Force | Out-Null
mkdir src\hooks\hooks-UI-UX -Force | Out-Null
mkdir src\hooks\hooks-fectch-API -Force | Out-Null
mkdir src\context -Force | Out-Null
mkdir src\libs -Force | Out-Null
mkdir src\schema -Force | Out-Null
mkdir src\types -Force | Out-Null
mkdir src\script -Force | Out-Null
mkdir src\utils -Force | Out-Null
mkdir src\data\mocks -Force | Out-Null
mkdir docs\docs-prompts -Force | Out-Null
mkdir docs\docs-refactor -Force | Out-Null

# 7) Rodar projeto
yarn dev
```