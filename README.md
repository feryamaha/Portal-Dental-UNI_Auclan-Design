# Portal Dental UNI – Dashboard

Uma dashboard multi-portal moderna desenvolvida em Next.js, projetada para atender diferentes perfis de usuários da Dental UNI: Beneficiário, Dentista, Comercial (Corretor), Empresa e Representante.

Cada portal oferece funcionalidades personalizadas, como acesso a protocolos, guias, boletos, agendamentos, pacientes e muito mais – tudo com uma arquitetura escalável e foco em reutilização de componentes e lógica.

## Pré-requisitos

- Node.js 22.16.0 (definido em `.nvmrc`; use `nvm use`)
- Corepack habilitado (`corepack enable`) para expor o Yarn 4.12

## Setup rápido (Yarn Berry)

```bash
# 1. (Opcional) clonar o repositório
git clone <url-do-repositorio>
cd portal-dentaluni

# 2. Garantir Node e Yarn corretos
nvm use 22.16.0
corepack enable

# 3. (Somente quando houver mudanças de dependências)
yarn install --immutable   # usa Plug'n'Play e não cria node_modules
```

Graças ao **Zero‑Install**, quem clonar o repositório já consegue rodar `yarn dev` sem executar `yarn install`, pois todo o cache está versionado em `.yarn/cache`.

## Como Rodar

```bash
yarn dev  
```
Acesse em: http://localhost:3000
A raiz (/) redireciona automaticamente para a tela de login.

## Ambiente Yarn Berry (PnP)

O projeto usa **Yarn 4.12 (Berry) com Plug’n’Play e Zero‑Install**. Para garantir todos os benefícios:

```bash
nvm use 22.16.0                  # lê a versão do arquivo .nvmrc
corepack enable                  # habilita o Yarn 4 via Corepack
yarn install --immutable         # valida o lock e não cria node_modules
yarn install --check-cache       # verifica checksums do cache .yarn/cache
```

- O cache local vive em `.yarn/cache/*.zip`, permitindo clonar e rodar sem `yarn install` (Zero‑Install).
- O PnP está descrito em `.pnp.cjs/.pnp.loader.mjs`, garantindo builds idênticos em qualquer SO.
- O SDK do editor está em `.yarn/sdks/typescript`; no Windsurf configure `TypeScript › Tsdk` para `./.yarn/sdks/typescript/lib` e recarregue o servidor TS.
- Dependências extras exigidas pelos peers são resolvidas via `.yarnrc.yml` (ex.: `packageExtensions` garantindo `@floating-ui/dom` para `@tiptap/react`), eliminando “dependências fantasmas”.
- Para aplicar correções em bibliotecas terceiras use:
  ```bash
  yarn patch pacote@versao
  # edite a pasta temporária mostrada no terminal
  yarn patch-commit "CAMINHO_DA_PASTA"
  ```
  O patch fica registrado em `.yarn/patches/`, mantendo manutenção rápida.

### Benefícios assegurados
1. **Instalações instantâneas** – `yarn install --immutable` usa apenas o cache zipado.
2. **Zero‑Installs** – basta clonar e rodar `yarn dev`, pois o cache está versionado.
3. **Sem dependências fantasmas** – peers faltantes quebram o build imediatamente.
4. **Cache compacto** – `.yarn/cache` substitui o `node_modules` gigante.
5. **Integração nativa com TypeScript** – SDK local garante IntelliSense alinhado ao PnP.
6. **Portabilidade total** – `.pnp.cjs` mapeia os pacotes de forma determinística entre sistemas.
7. **Manutenção facilitada** – `yarn patch` aplica hotfixes em segundos.
8. **Segurança reforçada** – `yarn install --check-cache` valida checksums antes de executar.

## Build

```bash
yarn build && yarn start
```

## Scripts Úteis
yarn build
yarn start  
yarn lint
yarn generate:icons ou node .\src\script\generateIcons.js
node .\src\script\convert-images-to-webp.mjs 

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5.7
- Tailwind CSS 3.4
- React Hook Form + Zod

## Arquitetura e Documentação

O projeto segue princípios rígidos de separação de responsabilidades (UI pura em components/, lógica em hooks/, tipagens centralizadas em types/, etc.).
Para detalhes completos:

- Estrutura de pastas e fluxos: Veja `Feature-Documentation/Arquitetura-pastas-arquivos.md`
- Regras de criação de componentes: `Feature-Documentation/Regra-Criacao-Componentes.md`
- Tela de Login: `Feature-Documentation/tela-login.md`

Veja `Feature-Documentation/` para documentação completa.

## Licença

Projeto interno e confidencial da Dental UNI.
Desenvolvido e mantido pela equipe Auclan Design.
Uso restrito – não distribuir ou publicar externamente.
