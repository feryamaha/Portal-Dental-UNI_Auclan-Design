# Menu contextual do usuário na Topbar e utilitários de suporte (dashboard)

## Objetivo
Desenvolver o menu do usuário na Topbar, garantindo visual alinhado ao Figma, conteúdo dinâmico por portal, ações de logout e CTAs oficiais.

## Arquivos Afetados
- `src/components/dashboard-layout/Topbar.tsx`
- `src/components/dashboard-layout/ModalUserMenu.tsx`
- `src/components/ui/GooglePlayAppleStore.tsx`
- `src/components/ui/Logout.tsx`
- `src/data/portals/user-menu-config.ts`
- `src/types/dashboard/modal-user-menu.types.ts`
- `src/types/ui/google-play-apple-store.types.ts`
- `src/types/ui/logout.types.ts`
- `public/assets/images/apple-store.webp`
- `public/assets/images/play-store.webp`
- `public/assets/images/map-dental-bg.webp`

## Ajustes Implementados

### 1. Conteúdo dinâmico e componentes utilitários
- `user-menu-config.ts` concentra todo o conteúdo do menu por portal (`PortalSlug`), permitindo personalizar seções, ícones e badges sem alterar componentes.
- Novas tipagens (`modal-user-menu.types`, `google-play-apple-store.types`, `logout.types`) formalizam o contrato de dados.
- `GooglePlayAppleStore` e `Logout` encapsulam UI de CTA externo e ação de saída com estados hover consistentes, além de consumir as imagens WebP otimizadas.
- As imagens PNG antigas foram convertidas para `.webp` (buildado com `sharp`) preservando qualidade e reduzindo tamanho.


## Benefícios
- **Menu unificado e fiel ao design**: entrega o mesmo padrão visual e comportamental em todos os portais.
- **Conteúdo configurável por portal**: ajustes em `user-menu-config` adicionam/alteram itens sem tocar em layout ou lógica.
- **Fluxo de saída e CTAs confiáveis**: componentes `Logout` e `GooglePlayAppleStore` garantem UX e acessos oficiais.
