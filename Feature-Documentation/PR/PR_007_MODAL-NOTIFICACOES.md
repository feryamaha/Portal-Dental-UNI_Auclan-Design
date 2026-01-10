# Modal de Notificações (dashboard) com indicador, divisor temporal e dados mockados por portal

## Objetivo
Desenvolvimento do modal de notificações

## Arquivos Afetados
- `src/components/shared-dashboard/ModalNotificacoes.tsx`
- `src/components/ui/SubCardNotificacoes.tsx`
- `src/components/ui/HeaderNotificacoes.tsx`
- `src/components/dashboard-layout/Topbar.tsx`
- `src/components/ui/Button.tsx`
- `src/data/Notificacoes-content.data.ts`
- `src/hooks/hook-fetch-API/useNotificacoesData.hook.ts`
- `src/hooks/hook-fetch-API/index.ts`
- `src/hooks/hooks-dash/useNotificacoesModalControl.hook.ts`
- `src/types/shared/notificacoes.types.ts`
- `src/app/api/notificacoes/` (route handler e mocks)
- `src/script/IconsList.tsx`
- `public/assets/icons/icon-divisor-tracejado.svg`
- `public/assets/icons/icon-duplo-check.svg`
- `public/assets/images/bg-opacity-modal-compare-plans.webp`

## Melhorias Implementadas
1. Modal de Notificações
   - Layout por mês em blocos (`rounded-2xl`) com cabeçalho de mês/ano e cards verticais.
   - Divisor tracejado alinhado à coluna de ícones entre notificações do mesmo mês, sem aparecer no último item.
   - Fade/overlay no rodapé (imagem esmaecida) e padding aplicado apenas ao último mês para evitar sobreposição.
   - Scrollbar oculta para não empurrar conteúdo; conteúdo ocupa 100% da largura interna.
2. Cards de notificação (`SubCardNotificacoes`)
   - Ícone com badge, botões “Ir até lá” e “Marcar como lido”, tipagem explícita com `lida?`.
   - Ajustes de espaçamento e largura fluida (`flex-1`).
3. Topbar
   - Indicador de notificações exibido apenas no botão de sino quando `unreadCount > 0`.
4. Dados e API mock
   - Mock de notificações por portal (dentista) com múltiplos meses e dezenas de itens para testes.
   - Route handler `/api/notificacoes` servindo dados mockados; hook `useNotificacoesData` com `unreadCount` e `markAsRead`.
5. Tipos e ícones
   - Tipos de notificações com `lida`, `unreadCount`, `markAsRead`.
   - Inclusão de ícones do divisor tracejado e duplo check; imagem de fade para o rodapé.
