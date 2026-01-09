# FAQ / Central de Ajuda no dashboard

## Objetivo
Desenvolvimento da feature FAQ/Ajuda + pequenos ajustes de UI (icons, tema e topbar).

## Arquivos Afetados
- `src/app/globals.css`
- `src/app/api/faq-ajuda/route.ts`
- `src/components/dashboard-layout/Topbar.tsx`
- `src/components/shared-dashboard/FaqAjuda.tsx`
- `src/components/ui/FaqItem.tsx`
- `src/components/ui/HeaderAjuda.tsx`
- `src/components/ui/InputPesquisaAjuda.tsx`
- `src/components/ui/SegmentdControl.tsx`
- `src/hooks/hook-fetch-API/index.ts`
- `src/hooks/hook-fetch-API/useFaqAjudaData.hook.ts`
- `src/hooks/hooks-dash/useFaqAjudaLogic.hook.ts`
- `src/hooks/hooks-dash/useFaqModalControl.hook.ts`
- `src/script/IconsList.tsx`
- `src/data/Faq-ajuda-content.data.ts`
- `src/types/shared/faq-ajuda.types.ts`
- `src/types/ui/input-pesquisa-ajuda.types.ts`
- `tailwind.config.ts`
- `public/assets/icons/icon-close.svg`
- `public/assets/icons/icon-gerenciar-permissoes.svg`
- `public/assets/icons/icon-lupa-pesquisar.svg`

## Ajustes Implementados
### 1. Experiência de FAQ/Ajuda no dashboard
- Novo painel lateral `FaqAjuda` com header, botão de fechar, busca e acordeões.
- Acordeões (`FaqItem`) com controle de abertura única e mensagens vazias amigáveis.

### 2. Dados e lógica dedicada por portal
- Mock estruturado por portal em `Faq-ajuda-content.data.ts` com categorias (Tudo, Sou novo, IRPF, Classificados, Calendário) e itens distintos para dentista/beneficiário.
- Hook de fetch (`useFaqAjudaData`) centralizado no índice de hooks BFF; expõe loading/error/data.
- Hook de orquestração (`useFaqAjudaLogic`) que monta segmented items, estado de categoria, termo de busca e lista filtrada.
- Hook auxiliar `useFaqModalControl` para abrir/fechar o painel de ajuda.
- Tipagens novas para FAQ e input de busca, garantindo contratos fortes entre componentes e BFF.

### 3. Endpoint BFF e integração UI
- Route handler `/api/faq-ajuda` retornando conteúdo mock com contrato `{ success, data, timestamp }`, pronto para trocar por API real.
- Topbar ajustada para acionar o painel de ajuda e consumir o novo hook de controle.

### 4. Ajustes visuais e tokens
- Atualização de `globals.css` e `tailwind.config.ts` com cores/tokens utilizados no FAQ (borda, sombras, espaçamentos) e suporte a novos ícones.
- Inclusão de ícones SVG (fechar, lupa, gerenciar permissões) e registro no catálogo `IconsList.tsx`.

## Benefícios
- **Arquitetura pronta para API**: camada BFF e hooks centralizados facilitam substituir mocks por backend oficial sem quebrar UI.
- **Consistência visual**: componentes e tokens alinhados ao design system pixel perfect ao figma.
