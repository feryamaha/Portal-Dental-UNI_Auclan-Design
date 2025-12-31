# Titulo da PR
Refactor: Arquitetura de UI pura (extração de lógica/dados/tipagens para hooks, utils, data e types)

## Objetivo

Garantir que os componentes dentro de `src/components/**` contenham **apenas código de UI (render-only)**, extraindo:
- lógica de estado/interação (hooks)
- helpers e parsing (utils)
- dados/mocks (data)
- tipagens e contratos (types)

Sem alterar o comportamento visual/funcional da aplicação.

## Arquivos Afetados

### Alterados

- `README.md`
- `src/app/tela-login/[portal]/page.tsx`
- `src/context/dashboard/Sidebar/sidebar.ts`
- `src/context/dashboard/Topbar/topbar.ts`
- `src/context/tela-login/portalConfig.ts`
- `src/context/tela-login/portalCopy.ts`

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

- `src/types/**` (novas tipagens para componentes/contextos/UI)

## Divergências em relação ao design/arquitetura antes

- Componentes de UI em `src/components/**` continham parsing de rota, seleção de itens ativos, normalizações e helpers locais.
- Alguns componentes mantinham transformações de dados e mocks inline, dificultando reuso e auditoria.
- Tipagens e contratos estavam acoplados ao componente, levando lógica/typing a viver no mesmo arquivo de UI.

## Melhorias Implementadas

- Extração de parsing/normalização de rota para `src/utils/dashboard-path.helpers.ts` (ex.: normalização de pathname, detecção de link ativo e utilitários de breadcrumb).
- Criação de hooks de orquestração para Sidebar/Topbar e seções compostas:
  - `useDashboardSidebar`
  - `useDashboardTopbar`
  - `useShortcutsSection`
- Extração de lógica de UI state (interação/controle) para hooks dedicados em `src/hooks/hooks-UI-UX/ui/**` (ex.: `useDropInput`, `useSliderBanner`).
- Centralização de mocks/datasets do conteúdo de Home do beneficiário em `src/data/mocks/beneficiario-home-content.data.ts`.
- Extração de mapeamento de estados brasileiros (options) para `src/utils/brazil-states-options.helpers.ts`.
- Criação/organização de tipagens em `src/types/**` para manter contratos fora dos componentes.
- Atualização do `README.md` com:
  - regra de ouro de **UI pura** em `src/components/**`
  - estrutura do projeto
  - scripts úteis (incluindo comandos `node` para automações)

## Benefícios

- Componentes de `src/components/**` ficam mais simples, previsíveis e auditáveis (render-only).
- Lógica e parsing reutilizáveis ficam centralizados (menos duplicação e menos risco de divergência).
- Facilita manutenção e evolução (novas telas reaproveitam hooks/utils/data sem tocar em UI).
- Tipagens padronizadas e reutilizáveis via `src/types/**`.

## Notas

- Esta PR foca em **separação de responsabilidades** e organização de arquitetura, mantendo UI/UX e comportamento existentes.
