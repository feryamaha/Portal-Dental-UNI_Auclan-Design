# Arquitetura de Pastas, Arquivos e Componentes

> Documento mestre para criação e manutenção de arquivos. Leia também:
> - @Feature-Documentation/typescript-typing-convention.md
> - @Feature-Documentation/ui-separation-convention.md

---

## 1. Objetivo

Garantir que todo novo arquivo siga o fluxo oficial:

```
UI base (src/components/ui)
        ↓
Blocos compartilhados (src/components/shared e src/components/shared-tela-login)
        ↓
Montagem por domínio (src/components/main-content e src/components/dashboard-layout)
        ↓
Rotas e hidratação (src/app/**)
        ↓
Experiência final no navegador
```

Cada nível conhece somente o nível imediatamente abaixo e usa contratos definidos em `src/types`. Lógica (estado, efeitos, normalização) fica em hooks/utils/data/context.

---

## 2. Visão macro das pastas

```
src/
├── app/                 # Rotas, layouts e hydration
├── components/
│   ├── ui/              # Componentes básicos, sem lógica
│   ├── shared/          # Blocos compartilhados entre telas/portais
│   ├── shared-tela-login/ # Composição específica da tela de login
│   ├── dashboard-layout/ # Sidebar, Topbar e helpers estruturais
│   └── main-content/    # Montagem visual dos portais
├── data/                # Mocks, configs, copy
├── hooks/               # Lógica reutilizável (estado, efeitos)
├── types/               # Tipagens (contratos)
├── utils/ e libs/       # Helpers puros
└── Feature-Documentation/ # Este documento e demais guias
```

---

## 3. Hierarquia de criação

| Ordem | Pasta / arquivo                               | Responsabilidade | Pode importar de | Nomenclatura / Export |
|------|------------------------------------------------|------------------|------------------|-----------------------|
| 1    | `src/components/ui/*`                          | UI pura (Button, Badge, Icon wrappers) | Nada além de `types`, ícones e Tailwind helpers | Arquivo: `PascalCase.tsx`, export: `export function PascalCase()` |
| 2    | `src/components/shared/*`                      | Combina vários UI para formar blocos reutilizáveis | `ui`, `hooks`, `data`, `types`, `utils` | `SliderBanner.tsx`, `ShortcutsSection.tsx` |
| 3    | `src/components/shared-tela-login/*`           | Pedaços específicos da jornada pública | `ui` e `shared` | Não pode importar nada de `main-content` ou rotas autenticadas. |
| 4    | `src/components/dashboard-layout/*`            | Estruturas fixas (Sidebar, Topbar, DivSelectMenu) | `shared`, `ui`, `hooks`, `data/portals` | Não devem instanciar conteúdo dos portais; apenas navegação/ações. |
| 5    | `src/components/main-content/[portal]/*`       | Montagem visual do portal (Home + *Content) | `shared`, `ui`, `data`, `hooks` (apenas de exibição) | Cada portal segue o padrão `PortalRecursoContent`. |
| 6    | `src/app/(dashboard)/portal-[slug]/page.tsx`   | Hidratação (App Router). Um arquivo estático por portal reexporta o dinâmico | Apenas `main-content` | `export { default } from './[slug]/page'` |
| 7    | `src/app/(dashboard)/portal-[slug]/[slug]/page.tsx` | Rota catch-all. Decide qual content renderizar | `hooks` (ex.: `usePortalContentLogic`), `main-content` | Export default com condicional |
| 8    | `src/app/(dashboard)/layout.tsx`               | Envelopa rotas autenticadas com Sidebar + Topbar | `dashboard-layout` | Mantém tipagem inline permitida |
| 9    | `src/app/tela-login`                           | Rotas públicas | `shared-tela-login`, `shared`, `ui` | `[portal]/page.tsx` consome config |
| 10   | `src/app/globals.css`, `layout.tsx`, `page.tsx`, `not-found.tsx`, `favicon.ico` | Setup global e rotas especiais | — | Devem existir exatamente uma vez |

---

## 4. Regras por pasta

### 4.1 `src/components/ui`
- **Sem** hooks ou chamadas a `useState`.
- Recebem somente props tipadas (`import type { … } from '@/types/ui/...`).
- Nome do arquivo = nome do componente (`Badge.tsx`, `NotificationBadge.tsx`).
- Exportação sempre nomeada (`export function Badge()`).

### 4.2 `src/components/shared`
- Utilizam UI + hooks + dados.
- Podem conter pequena lógica de apresentação (ex.: ordenação visual).
- Devem expor props em `src/types/shared/*.types.ts`.
- São responsáveis por manter o contrato visual do Figma (classes, spacing).

### 4.3 `src/components/shared-tela-login`
- Mesmas regras de `shared`, porém focadas no fluxo público.
- Não podem importar nada de `main-content` ou rotas autenticadas.

### 4.4 `src/components/dashboard-layout`
- `Sidebar.tsx`, `Topbar.tsx`, `SidebarHighlight.tsx`, etc.
- Consomem configs vindas de `src/data/portals`.
- Não devem instanciar conteúdo dos portais; apenas navegação/ações.
- Quando houver badges/indicadores, componentizar em `ui`.

### 4.5 `src/components/main-content`
- Estrutura:
  ```
  src/components/main-content/
  ├── beneficiario/
  │   ├── HomeBeneficiario.tsx
  │   ├── BeneficiarioProtocolosContent.tsx
  │   └── ...
  ├── dentista/
  │   ├── HomeDentista.tsx
  │   └── DentistaProtocolosContent.tsx
  └── ...
  ```
- Cada portal segue o padrão `PortalRecursoContent`.
- `Home{Portal}` orquestra sliders, cards, atalhos e cards compartilhados.
- Conteúdos individuais servem à rota dinâmica (e devem ser apenas JSX).
- Não importar `next/navigation` nem manipular rota diretamente.

### 4.6 `src/app`
- `layout.tsx`: setup global (fonts, metadata, `<body>`).
- `page.tsx`: redireciona para `/tela-login/beneficiario`.
- `globals.css`: tokens de cor, reset, utilitários.
- `not-found.tsx`: fallback genérico.
- `(dashboard)/layout.tsx`: injeta Sidebar + Topbar.
- `portal-{slug}/page.tsx` reexporta `[slug]/page`.
- `[slug]/page.tsx`: rota dinâmica. Deve:
  ```tsx
  'use client'
  import { usePortalContentLogic } from '@/hooks/...'

  export default function PortalBeneficiarioDynamicPage() {
      const { currentContent } = usePortalContentLogic()
      return (
          <>{/* conteúdo */}</>
      )
  }
  ```
- `/tela-login`: possui layout próprio (sem Sidebar/Topbar) e rota dinâmica `[portal]` que lê configs em `src/data/mock-login`.

### 4.7 `src/data`
- Subpastas:
  - `mocks/`: dados fake para slider, notícias, protocolos.
  - `portals/`: `sidebar-config.ts`, `topbar-config.ts`, `portal-copy.ts`.
  - `mock-login/`: credenciais e redirecionamentos.
- Chaves devem usar os slugs oficiais (`beneficiario`, `dentista`, `comercial`, `empresa`, `representante`).

### 4.8 `src/hooks`
- Organização atual:
  ```
  src/hooks/hooks-dash/
  ├── hooks-shared/
  │   └── usePortalDetector.hook.ts
  └── usePortalContentLogic.hook.ts
  ```
- `usePortalContentLogic` controla o estado `currentContent` lendo `pathname`. Qualquer condicional de render baseada em rota deve usar esse hook (não replicar lógica nas páginas).

### 4.9 `src/types`
- Todos os contratos vivem aqui.
- Nome do arquivo: `kebab-case` + `.types.ts`.
- Nome de interface: `ComponentNameProps`, `SidebarSection`, `PortalSlug`, etc.
- Lembre de reexportar tipos quando facilitar consumo (`export type { SidebarSection } from '@/types/dashboard/sidebar.types'`).

---

## 5. Rotas, hidratação e navegação

1. `src/app/layout.tsx` configura HTML e fontes.
2. `src/app/page.tsx` redireciona para `/tela-login/beneficiario`.
3. `/tela-login/[portal]/page.tsx` usa componentes de `shared-tela-login` + UI.
4. Após autenticar, `mock-login-fake.json` aponta para `/portal-{slug}`.
5. `src/app/(dashboard)/layout.tsx` carrega Sidebar + Topbar.
6. `portal-{slug}/page.tsx` reexporta `[slug]/page`.
7. `[slug]/page.tsx` consulta `usePortalContentLogic` e renderiza o content correto.
8. Componentes de conteúdo consultam dados em `src/data` e usam blocos de `shared`/`ui`.

### Naming das rotas
- Diretórios: `portal-beneficiario`, `portal-dentista`, `portal-comercial`, `portal-empresa`, `portal-representante`.
- Rota dinâmica: `[slug]/page.tsx` (singular). Não criar `[...slug]`.
- Segmentos esperados (`/portal-beneficiario/protocolos`, etc.) devem existir como `id` em `sidebar-config`.

---

## 6. Convenções de nomes e exports

| Contexto                         | Formato obrigatório                                     | Exemplo                           |
|---------------------------------|----------------------------------------------------------|-----------------------------------|
| Arquivos UI                     | `PascalCase.tsx`                                         | `NotificationBadge.tsx`           |
| Componentes shared              | `PascalCase.tsx`                                         | `ShortcutsSection.tsx`            |
| Conteúdo de portal              | `{Portal}{Funcao}Content.tsx`                            | `BeneficiarioBoletosContent.tsx`  |
| Hooks                           | `useNomeFuncao.hook.ts`                                  | `usePortalContentLogic.hook.ts`   |
| Helpers                         | `*.helpers.ts`                                           | `dashboard-path.helpers.ts`       |
| Tipagens                        | `kebab-case.types.ts`                                    | `sidebar-config.types.ts`         |
| Exports                         | Nomeados, alinhados ao nome do arquivo                   | `export function HomeEmpresa()`   |
| Diretórios de portal            | `portal-{slug}` no `src/app/(dashboard)`; `{slug}` em `main-content` | `portal-beneficiario`, `beneficiario/` |

---

## 7. Fluxo para criar um novo bloco/portal

1. **Definir UI base** em `src/components/ui` (criar somente se não existir).
2. **Montar bloco shared** reutilizando a UI.
3. **Adicionar variação específica**:
   - Para login: `src/components/shared-tela-login`.
   - Para dashboard: `src/components/dashboard-layout` ou `src/components/main-content/[portal]`.
4. **Atualizar dados**:
   - `src/data/portals/sidebar-config.ts` (menus e badges).
   - `src/data/portals/topbar-config.ts`.
   - `src/data/sidebarHighlights.ts`.
   - `src/data/mock-login/mock-login-fake.json` (se houver novo portal).
5. **Atualizar hooks/config** se necessário (`usePortalContentLogic`, helpers de path).
6. **Garantir rota**:
   - `src/app/(dashboard)/portal-{slug}/page.tsx` reexporta `[slug]/page`.
   - `[slug]/page.tsx` conhece todos os `currentContent`.
7. **Testar** `yarn build` (typecheck + lint) antes do commit.

---

## 8. Fluxos de dados e lógica

```
src/data/** (mocks, configs, copy)
      ↓
src/components/shared e shared-tela-login (blocos visuais)
      ↓
src/components/main-content/[portal] (montagem da página)
      ↓
src/app/(dashboard)/portal-*/[slug]/page.tsx (hidratação condicional)
      ↓
Layout do dashboard (Sidebar + Topbar)
      ↓
Experiência final no navegador
```

Lógica (estado, side-effects, roteamento) reside em `src/hooks`:
- `usePortalDetector` → identifica portal na Sidebar.
- `usePortalContentLogic` → entende o slug e escolhe o conteúdo.
Nenhum componente em `main-content` deve recriar essas regras.

---

## 9. Checklist antes de abrir PR

- [ ] Seguiu o fluxo UI → shared → montagem → rota.
- [ ] Tipagens adicionadas em `src/types` e importadas com `import type`.
- [ ] Nenhum `any`, `useState` ou `useEffect` dentro de UI básica.
- [ ] `sidebar-config`, `topbar-config`, `portal-copy`, `sidebarHighlights` atualizados quando necessário.
- [ ] `usePortalContentLogic` conhece todos os slugs usados no sidebar.
- [ ] `yarn build` ok antes do push.

---

**Última atualização:** 7 de janeiro de 2026
