# Titulo da PR
Desenvolvimento inicial da UI da dashboard com Sidebar e Topbar dinâmicos

## Objetivo

Consolidar a primeira interface padrão da dashboard aplicando o layout e a navegação: 
- Sidebar com ícones e Topbar com breadcrumbs dinâmicos que refletem o item ativo da Sidebar.

## Arquivos criados

- `src/components/dashboard/Sidebar.tsx`
- `src/components/dashboard/SidebarHighlight.tsx`
- `src/components/dashboard/DivSelectMenu.tsx`
- `src/context/dashboard/Sidebar/sidebar.ts`
- `src/data/sidebarHighlights.ts`
- `src/components/dashboard/Topbar.tsx`
- `src/components/ui/Breadcrumbs.tsx`
- `src/context/dashboard/Topbar/topbar.ts`
- `src/components/ui/Badge.tsx`
- `src/components/main-content/beneficiario/*.tsx`
- `src/app/(dashboard)/dash-beneficiario/*/page.tsx`
- `src/script/IconsList.tsx`
- `src/script/generateIcons.js`
- `public/assets/icons/icon-*.svg`

## Desenvolvimento da interface base

- Interface inicial pronta: 
Sidebar, Topbar e Main Content seguem o mesmo padrão visual e estrutural do figma, servindo como blueprint para os demais portais.
- Escalabilidade garantida: 
basta registrar novos menus/conteúdos nos contextos para replicar o layout completo sem mexer na base.

