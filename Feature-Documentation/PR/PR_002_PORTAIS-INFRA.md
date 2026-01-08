# Adequações de infraestrutura e UI dos portais (shared)

## Objetivo
Preparar a base de portais para escala, alinhando estrutura de pastas/rotas, contratos de lógica de renderização e microajustes visuais conforme o Figma.

## Arquivos Afetados
- `next.config.js`
- `src/app/(dashboard)/portal-*/page.tsx`
- `src/app/(dashboard)/portal-*/[slug]/page.tsx`
- `src/components/main-content/**`
- `src/components/dashboard-layout/**`
- `src/components/shared-dashboard/**`
- `src/components/ui/**`
- `src/data/**`
- `src/hooks/hooks-dash/usePortalContentLogic.hook.ts`
- `src/utils/dashboard-path.helpers.ts`

## Adequações Implementadas
### 1. Estrutura de rotas e lógica dos portais
- Criação da rota dinâmica `[slug]/page.tsx` para cada portal, com `page.tsx` raiz reexportando o mesmo componente.
- Novo hook `usePortalContentLogic` interpreta o pathname e ativa o conteúdo correto sem duplicar arquivos de página.
- Atualização dos helpers de caminho e configs (`portal-config`, `sidebar-config`, `portal-copy`, `sidebarHighlights`) para refletir a nova arquitetura.

### 2. Componentização e nomenclaturas consistentes
- Renomeação dos componentes de conteúdo dos portais (Beneficiário, Dentista, Empresa, Comercial, Representante) para o padrão `{Portal}{Feature}Content`.
- Desacoplamento dos cards e seções compartilhadas (CardMeusProtocolos, CardMinhasGuias, NewsHighlightSection, ShortcutsSection) para obedecer os contratos de UI/logic estabelecidos.

### 3. Adequações de UI e microinterações
- Ajustes de tipografia e cores em Sidebar, Topbar, SidebarHighlight, ShortcutCard, badges e seções de notícias para seguir o design system atualizado.
- Criação do componente `NotificationBadge` e feedback visual refinado no `SliderControl` (setas e play/pause com estados manual/automático).

## Benefícios
- **Escalabilidade de rotas**: novo modelo capta todas as páginas de um portal a partir de um único ponto, evitando 404 e facilitando futuras adições.
- **Contratos claros**: naming convention e hook dedicado tornam mais simples localizar e manter cada componente.
- **Base visual consistente**: UI alinhada ao Figma, com badges, cards e controles padronizados, pronta para evoluções de conteúdo.
