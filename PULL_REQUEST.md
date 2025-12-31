# Titulo da PR
Refactor: Arquitetura de UI pura com escalabilidade para desenvolvimento de múltiplos portais

## Objetivo

Estruturar a dashboard para escalabilidade de desenvolvimento dos portais, criando e ajustando a arquitetura base necessária para iniciar o desenvolvimento dos portais sem duplicação de código.

## Arquivos Afetados

### Alterados

- `README.md`
- `src/app/globals.css`
- `src/app/(dashboard)/layout.tsx`
- `src/app/tela-login/[portal]/page.tsx`

- `src/components/dashboard/Sidebar.tsx`
- `src/components/dashboard/Topbar.tsx`
- `src/components/dashboard/DivSelectMenu.tsx`
- `src/components/dashboard/SidebarHighlight.tsx`

- `src/components/main-content/MainContentShell.tsx`
- `src/components/main-content/beneficiario/HomeContent.tsx`

- `src/components/shared/ShortcutsSection.tsx`
- `src/components/shared/SliderBanner.tsx`
- `src/components/shared/NewsHighlightSection.tsx`
- `src/components/shared/CardMeusProtocolos.tsx`
- `src/components/shared/CardMinhasGuias.tsx`

- `src/components/tela-login/LoginDentistaFields.tsx`
- `src/components/tela-login/LoginFormFields.tsx`
- `src/components/tela-login/LoginFormHeader.tsx`
- `src/components/tela-login/PortalTypeLabel.tsx`
- `src/components/tela-login/SectionContentLeft.tsx`
- `src/components/tela-login/SectionContentRight.tsx`
- `src/components/tela-login/TermoPoliticaUso.tsx`

- `src/components/ui/Badge.tsx`
- `src/components/ui/Breadcrumbs.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/DropInput.tsx`
- `src/components/ui/Dropdown.tsx`
- `src/components/ui/FloatingLabelInput.tsx`
- `src/components/ui/LoadingState.tsx`
- `src/components/ui/NewsFeatureCard.tsx`
- `src/components/ui/NewsListEntry.tsx`
- `src/components/ui/NewsSectionHeader.tsx`
- `src/components/ui/ShortcutCard.tsx`
- `src/components/ui/SliderControl.tsx`
- `src/components/ui/SubCardMeusProtocolos.tsx`
- `src/components/ui/SubCardMinhasGuias.tsx`

- `src/context/dashboard/Sidebar/sidebar.ts`
- `src/context/dashboard/Topbar/topbar.ts`
- `src/context/tela-login/portalConfig.ts`
- `src/context/tela-login/portalCopy.ts`

### Criados (extrações)

- `src/utils/dashboard-path.helpers.ts`
- `src/utils/brazil-states-options.helpers.ts`
- `src/utils/input-mask.helpers.ts`
- `src/utils/react-hook-form-error-message.helpers.ts`

- `src/hooks/hooks-UI-UX/shared/use-dashboard-sidebar.hook.ts`
- `src/hooks/hooks-UI-UX/shared/use-dashboard-topbar.hook.ts`
- `src/hooks/hooks-UI-UX/shared/use-shortcuts-section.hook.ts`

- `src/hooks/hooks-UI-UX/ui/use-slider-banner.hook.ts`
- `src/hooks/hooks-UI-UX/ui/use-drop-input.hook.ts`
- `src/hooks/hooks-UI-UX/ui/use-dropdown-menu.hook.ts`
- `src/hooks/hooks-UI-UX/ui/use-floating-label-input.hook.ts`
- `src/hooks/hooks-UI-UX/ui/use-button.hook.ts`

- `src/data/mocks/beneficiario-home-content.data.ts`

- `src/types/**`

- `Feature-Documentation/ui-separation-convention.md`
- `Feature-Documentation/typescript-typing-convention.md`
- `Feature-Documentation/Acessibilidade-Teclado.md`
- `Feature-Documentation/Regra-Criacao-Componentes.md`

## Fluxo de Renderização (Arquitetura de Componentes)

A estrutura de componentes segue um fluxo hierárquico claro:

1. **`src/components/ui/**`** - Componentes micro (render-only, reutilizáveis)
   - Button, Input, Dropdown, Badge, etc.
   - Sem lógica de negócio, apenas UI pura

2. **`src/components/shared/**`** - Componentes compostos (agregam UI + lógica)
   - ShortcutsSection, SliderBanner, NewsHighlightSection, etc.
   - Orquestram componentes UI e hooks

3. **`src/components/main-content/**`** - Componentes de conteúdo principal
   - HomeContent, MainContentShell, etc.
   - Agregam componentes shared e definem layout de seção

4. **`src/app/**/page.tsx`** - Páginas (entry points)
   - Agregam componentes main-content
   - Definem layout de página completo

Este fluxo garante reutilização máxima e separação clara de responsabilidades e escalabilidade.

## Melhorias Implementadas

- Extração de parsing/normalização de rota para `src/utils/dashboard-path.helpers.ts` (ex.: normalização de pathname, detecção de link ativo e utilitários de breadcrumb).
- Criação de hooks de orquestração para Sidebar/Topbar e seções compostas:
  - `useDashboardSidebar`
  - `useDashboardTopbar`
  - `useShortcutsSection`
- Extração de lógica de UI state (interação/controle) para hooks dedicados em `src/hooks/hooks-UI-UX/ui/**` (ex.: `useDropInput`, `useSliderBanner`, `useFloatingLabelInput`, `useButton`, `useDropdownMenu`).
- Centralização de mocks/datasets do conteúdo de Home do beneficiário em `src/data/mocks/beneficiario-home-content.data.ts`.
- Extração de mapeamento de estados brasileiros (options) para `src/utils/brazil-states-options.helpers.ts`.
- Criação/organização de tipagens em `src/types/**` para manter contratos fora dos componentes.
- Implementação de acessibilidade completa por teclado:
  - `focus-visible` com outline em todos os elementos interativos
  - Ordem de tabulação: Sidebar (tabIndex=1) → Topbar (tabIndex=2) → Main Content (tabIndex=3)
  - Navegação por setas em dropdowns (ArrowUp, ArrowDown)
  - Submissão de formulários via Enter
  - Focus trap em modais
  - `aria-expanded` em dropdowns
  - `aria-pressed` em toggle buttons
  - `aria-label` em botões de ícone
- Documentação de convenções:
  - Convenção de UI pura (separação de responsabilidades)
  - Convenção de tipagens TypeScript
  - Checklist de acessibilidade por teclado
  - Regras obrigatórias para criação de componentes
- Atualização do `README.md` com estrutura do projeto e scripts úteis.

## Benefícios

- Componentes de `src/components/**` ficam mais simples, previsíveis e auditáveis (render-only).
- Lógica e parsing reutilizáveis ficam centralizados (menos duplicação e menos risco de divergência).
- Facilita manutenção e evolução (novas telas reaproveitam hooks/utils/data sem tocar em UI).
- Tipagens padronizadas e reutilizáveis via `src/types/**`.
- Acessibilidade por teclado garantida em todos os componentes.
- Documentação clara guia desenvolvimento futuro de novos portais.
- Estrutura escalável permite reutilização entre múltiplos portais.

## Notas

- Esta PR foca em **separação de responsabilidades**, organização de arquitetura e acessibilidade por teclado, mantendo UI/UX e comportamento existentes.
