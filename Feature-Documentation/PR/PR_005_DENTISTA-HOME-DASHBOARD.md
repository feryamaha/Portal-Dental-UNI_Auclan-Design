# Desenvolvimento da página Home do Portal Dentista com ecossistema completo de componentes e dados dinâmicos (dashboard)

## Objetivo
Implementar a primeira página completa e funcional do Portal Dentista (HomeDentista), integrando componentes compartilhados, UI específicos, dados dinâmicos via BFF, filtros avançados e arquitetura escalável para futuras páginas de portais. Consolidar dados unificados entre portais e estabelecer padrão de fetch centralizado.

## Arquivos Afetados

### Páginas e Componentes Principais
- `src/components/main-content/dentista/HomeDentista.tsx`
- `src/components/main-content/beneficiario/HomeBeneficiario.tsx`
- `src/components/dashboard-layout/Topbar.tsx`

### Componentes Compartilhados (Shared Dashboard)
- `src/components/shared-dashboard/CardCronograma.tsx` (novo)
- `src/components/shared-dashboard/CardMeusProtocolos.tsx` (modificado)
- `src/components/shared-dashboard/NewsHighlightSection.tsx` (modificado)
- `src/components/shared-dashboard/ShortcutsSection.tsx` (modificado)
- `src/components/shared-dashboard/SliderBanner.tsx` (modificado)

### Componentes UI
- `src/components/ui/Widgets.tsx` (novo)
- `src/components/ui/SegmentdControl.tsx` (novo)
- `src/components/ui/NewsFeatureCard.tsx` (modificado)
- `src/components/ui/NewsListEntry.tsx` (modificado)

### Dados Mock
- `src/data/mocks/cronograma-content.data.ts` (novo)
- `src/data/mocks/slider-banner-content.data.ts` (novo)
- `src/data/mocks/news-highlight-content.data.ts` (novo - consolidado)
- `src/data/mocks/dentista-home-content.data.ts` (modificado)
- `src/data/mocks/beneficiario-home-content.data.ts` (modificado)

### Hooks de Fetch (BFF Layer)
- `src/hooks/hook-fetch-API/useCronogramaData.hook.ts` (novo)
- `src/hooks/hook-fetch-API/useSliderBannerData.hook.ts` (novo)
- `src/hooks/hook-fetch-API/useNewsHighlightData.hook.ts` (novo - refatorado)
- `src/hooks/hook-fetch-API/useProtocolsData.hook.ts` (existente)
- `src/hooks/hook-fetch-API/index.ts` (modificado)
- `src/hooks/hooks-dash/hooks-UI-UX/useSliderBanner.hook.ts` (modificado)

### Rotas API (BFF Backend)
- `src/app/api/cronograma/route.ts` (novo)
- `src/app/api/slider-banner/route.ts` (novo)
- `src/app/api/news-highlight/route.ts` (novo - refatorado)
- `src/app/api/protocolos/route.ts` (existente)

### Tipos TypeScript
- `src/types/shared/card-cronograma.types.ts` (novo)
- `src/types/ui/widgets.types.ts` (novo)
- `src/types/ui/sub-card-meus-protocolos.types.ts` (existente)
- `src/types/shared/slider-banner.types.ts` (existente)
- `src/types/shared/news-highlight-section.types.ts` (existente)

### Utilitários
- `src/utils/protocol-priority.utils.ts` (existente)

### Assets
- `public/assets/images/img-slider-home-dentista.png` (novo)
- `public/assets/images/img-slider-home-dentista-DentalUniClub.png` (novo)

### Documentação
- `Feature-Documentation/REGRAS/API-Context-Portal-Dental-UNI.md` (novo)

## Melhorias Implementadas

### 1. Página HomeDentista com Layout Responsivo Completo
- Componente `HomeDentista.tsx` que orquestra todas as seções da dashboard
- Integração de 6 seções principais:
  - SliderBanner (banners com rotação automática)
  - ShortcutsSection (atalhos rápidos para funcionalidades)
  - NewsHighlightSection (notícias em destaque)
  - CardMeusProtocolos (protocolos com priorização)
  - CardCronograma (cronograma com filtro por tipo)
- Consumo de dados via hooks que chamam Route Handlers (camada BFF) com estados de loading/error

### 2. Página HomeBeneficiario Refatorada
- Alinhamento com padrão de HomeDentista
- Consumo de dados unificados via hooks
- Integração com CardMeusProtocolos e CardMinhasGuias
- Remoção de lógica portal-específica desnecessária

### 3. CardCronograma com Sistema de Filtro Avançado
- Componente `CardCronograma.tsx` com `SegmentedControl` para alternar entre:
  - "Cronograma de Produção": mostra apenas eventos com `type: 'PROD'`
  - "Calendário Geral": mostra todos os eventos (PROD + GERAL)
- Integração com `NewsSectionHeader` para header reutilizável
- Lógica de filtro robusta no frontend baseada em campo `type`
- Renderização dinâmica de eventos via componente `Widgets`
- Estrutura de dados com 12 meses × 5 eventos cada
- Suporte a scroll interno com `overflow-y-auto`

### 4. Componente SegmentedControl Reutilizável
- Componente `SegmentdControl.tsx` reutilizado do UI-KIT-AUCLAN-DESIGN com:
  - Suporte a múltiplos tamanhos (sm, md, lg)
  - Navegação por teclado (ArrowLeft, ArrowRight)
  - Estados hover e selected com transições suaves
  - Suporte a ícones opcionais
  - Acessibilidade com `aria-selected`
  - Tipagem explícita com interfaces

### 5. Componente Widgets para Renderização de Eventos
- Componente `Widgets.tsx` reutilizado do UI-KIT-AUCLAN-DESIGN que:
  - Renderiza eventos com visual de calendário (dia/mês)
  - Exibe título, data completa, dia da semana
  - Suporta className customizável para styling externo
  - Tipagem explícita em `WidgetsProps`
  - Integração com Icon system

### 6. Sistema de Tipos para Cronograma
- Criação de `card-cronograma.types.ts` com interfaces:
  - `CronogramaEvent`: evento com id, title, date, dayOfWeek, day, month, type
  - `CronogramaMonth`: mês com array de eventos
  - `CronogramaData`: estrutura raiz com producao e calendario
  - `CardCronogramaProps`: contrato do componente
- Tipagem forte garante segurança em toda a cadeia

### 7. Mock Data Expandido e Estruturado para simular dados da API.
- `cronograma-content.data.ts`: 12 meses × 5 eventos (60 total)
  - Seção `producao`: eventos com `type: 'PROD'`
  - Seção `calendario`: eventos com `type: 'PROD'` ou `type: 'GERAL'`
  - Distribuição realista ao longo do ano
- `slider-banner-content.data.ts`: banners específicos por portal
  - `sliderItemsBeneficiario`: 4 banners informativos
  - `sliderItemsDentista`: 4 banners clínicos/administrativos
  - Referências a imagens PNG/WebP otimizadas
- `news-highlight-content.data.ts`: dados consolidados
  - Feature article com imagem, título e data
  - 3 artigos adicionais para lista
  - Dados unificados entre portais
- `dentista-home-content.data.ts`: protocolos e guias específicos
  - 5 protocolos com priorityType (obrigatorio/nao-lido)
  - 5 guias com status variados
  - Timestamps realistas para ordenação
- `beneficiario-home-content.data.ts`: dados para portal beneficiário
  - 5 protocolos com prioridades
  - 3 guias com informações de CRO

### 8. Hooks de Fetch Centralizado (Camada 1 - Hook React)
- `useCronogramaData.hook.ts`:
  - Fetch de `/api/cronograma` (Route Handler)
  - Gerencia loading, error, data
  - **Sem alterações necessárias** após integração com API oficial
- `useSliderBannerData.hook.ts`:
  - Fetch de `/api/slider-banner?portal={portal}` (Route Handler)
  - Suporte a múltiplos portais
  - Tratamento de erros robusto
  - **Sem alterações necessárias** após integração com API oficial
- `useNewsHighlightData.hook.ts` (refatorado):
  - Fetch de `/api/news-highlight` (Route Handler)
  - Dados unificados para todos os portais
  - **Sem alterações necessárias** após integração com API oficial
- `useProtocolsData.hook.ts` (existente):
  - Fetch de `/api/protocolos?portal={portal}` (Route Handler)
  - Ordenação automática por prioridade
  - **Sem alterações necessárias** após integração com API oficial
- Centralização em `src/hooks/hook-fetch-API/index.ts`
- **Padrão 3-Layer**: Hooks chamam Route Handlers (camada BFF) sem conhecer a origem dos dados. Contrato mantido em qualquer integração.

### 9. Route Handlers (Camada 2 - BFF Backend)
- `/api/cronograma` (GET):
  - Retorna `cronogramaContent` (dados mock)
  - Resposta padronizada: `{ success: true, data: CronogramaData, timestamp }`
  - Cache control headers: `public, s-maxage=60`
  - **Integração com API oficial**: substituir `cronogramaContent` por `fetch(process.env.API_BASE_URL + '/cronograma')`
  - **Contrato mantido**: resposta continua idêntica
- `/api/slider-banner` (GET):
  - Query param `portal` obrigatório
  - Retorna banners específicos por portal (dados mock)
  - Validação de portal com erro 404
  - Resposta: `{ success: true, data: SliderBannerItem[] }`
  - **Integração com API oficial**: substituir `portalSliders[portal]` por `fetch(process.env.API_BASE_URL + '/slider-banner?portal=' + portal)`
- `/api/news-highlight` (GET):
  - Retorna dados unificados (dados mock)
  - Sem query parameters
  - Resposta: `{ success: true, data: NewsHighlightSectionProps }`
  - **Integração com API oficial**: substituir `newsHighlight` por `fetch(process.env.API_BASE_URL + '/news-highlight')`
- `/api/protocolos` (GET):
  - Query param `portal` obrigatório
  - Retorna protocolos específicos por portal (dados mock)
  - Resposta: `{ success: true, data: SubCardMeusProtocolosProps[] }`
  - **Integração com API oficial**: substituir `protocolosMock` por `fetch(process.env.API_BASE_URL + '/protocolos?portal=' + portal)`
- **Padrão BFF Estabelecido**: Route Handlers abstraem origem dos dados (mock ou API real). Frontend não conhece diferença. Integração com API oficial apenas altera linhas de fetch nos Route Handlers, mantendo contratos e estrutura intactos.

### 10. Consolidação de Dados de Notícias
- Unificação de `newsHighlightBeneficiario` e `newsHighlightDentista`
- Criação de export único `newsHighlight`
- Redução de duplicação de dados
- Simplificação de manutenção

### 11. Refatoração de Componentes de Notícias
- `NewsHighlightSection.tsx`:
  - Remoção de lógica portal-específica
  - Consumo de dados unificados
  - Props title e ctaLabel customizáveis
- `NewsFeatureCard.tsx`:
  - Tipagem explícita
  - Suporte a imagens responsivas
- `NewsListEntry.tsx`:
  - Tipagem explícita
  - Suporte a className customizável

### 12. Refatoração de CardMeusProtocolos
- Integração com `NewsSectionHeader`
- Consumo de dados via props
- Aplicação automática de ordenação por prioridade
- Renderização de `SubCardMeusProtocolos`

### 13. Refatoração de ShortcutsSection
- Integração com hook `useShortcutsSection`
- Suporte a portal-specific shortcuts
- Renderização de `ShortcutCard`

### 14. Refatoração de SliderBanner
- Integração com hook `useSliderBanner`
- Suporte a rotação automática com duration customizável
- Integração com `SliderControl`
- Renderização de imagens com Next.js Image

### 15. Hook useSliderBanner Melhorado
- Gerenciamento de estado de slide atual
- Suporte a play/pause automático
- Navegação manual via prev/next/goTo
- Cálculo de imagens para SliderControl
- Efeitos colaterais bem estruturados

### 16. Topbar Refatorada
- Integração com `ModalUserMenu`
- Exibição de informações do usuário
- Breadcrumbs dinâmicos
- Quick links e ações contextuais

### 17. Documentação de Arquitetura API
- Novo arquivo `Feature-Documentation/REGRAS/API-Context-Portal-Dental-UNI.md`
- Documentação completa do padrão BFF
- Exemplos de implementação
- Padrões de resposta padronizados

### 18. Assets Otimizados
- Imagens PNG para banners do dentista
- Suporte a WebP com fallback
- Otimização de tamanho e qualidade

## Benefícios

- **Dashboard Dentista Completa e Funcional**: Primeira página totalmente implementada com componentes integrados/reutilizaveis e dados dinâmicos
- **Reutilização de Componentes**: CardCronograma, Widgets, SegmentedControl e NewsSectionHeader são genéricos e aplicáveis a outros portais
- **Consolidação de Dados**: Unificação de dados de notícias reduz duplicação e facilita manutenção
- **Tipagem Forte**: TypeScript com interfaces explícitas garante segurança de tipos em toda a cadeia
- **Pronto para Backend**: Camada BFF (Route Handlers) preparada para integração com API oficial. Basta substituir dados mock por chamadas HTTP nos Route Handlers. Hooks, componentes e tipos permanecem intactos
- **Manutenibilidade**: Código bem estruturado, tipado e documentado, seguindo convenções do projeto
- **Escalabilidade**: Arquitetura modular completamente pronta para escalar nos outros portais e suas paginas com pequenos ajustes pontuais
