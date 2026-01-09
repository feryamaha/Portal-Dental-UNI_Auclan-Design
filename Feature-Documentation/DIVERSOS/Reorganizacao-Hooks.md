# Reorganização da Pasta `src/hooks/`

## Data: 30 de Dezembro de 2025

## Objetivo
Reorganizar a pasta `hooks/` seguindo a arquitetura escalável com separação clara de responsabilidades:
- **Isolamento:** tela-login totalmente isolada do dashboard
- **Centralização:** hook-fetch-API centraliza toda comunicação com BFF
- **Reutilização:** hooks-shared para lógica que se repete entre portais
- **UI/UX:** hooks-UI-UX para comportamentos visuais idênticos

---

## Estrutura Anterior

```
src/hooks/
├── hooks-UI-UX/
│   ├── shared/
│   │   ├── use-dashboard-sidebar.hook.ts
│   │   ├── use-dashboard-topbar.hook.ts
│   │   └── use-shortcuts-section.hook.ts
│   ├── dashboard/
│   │   └── use-portal.hook.ts (vazio)
│   ├── tela-login/
│   │   └── LoginFormFields/
│   │       └── loginFormFields.hook.ts
│   └── ui/
│       ├── use-button.hook.ts
│       ├── use-drop-input.hook.ts
│       ├── use-dropdown-menu.hook.ts
│       ├── use-floating-label-input.hook.ts
│       └── use-slider-banner.hook.ts
└── hooks-fectch-API/ (vazio)
```

---

## Estrutura Nova

```
src/hooks/
├── hook-fetch-API/                          # Hooks exclusivos para chamadas à camada BFF
│   ├── index.ts                             # Índice de exports
│   ├── useApi.hook.ts                       # Hook genérico (a implementar)
│   ├── useProtocolos.hook.ts                # (a implementar)
│   ├── useGuias.hook.ts                     # (a implementar)
│   ├── useBoletos.hook.ts                   # (a implementar)
│   ├── useAgendamentos.hook.ts              # (a implementar)
│   └── usePacientes.hook.ts                 # (a implementar)
│
├── tela-login/                              # Isolado – só o que pertence à tela de login
│   ├── index.ts                             # Índice de exports
│   └── useLoginFormFields.hook.ts           # Hook de formulário de login
│
├── hooks-dash/                              # Tudo relacionado ao dashboard autenticado
│   ├── hooks-shared/                        # Hooks 100% reutilizáveis em QUALQUER portal
│   │   ├── index.ts                         # Índice de exports
│   │   ├── usePortalDetector.hook.ts        # Detecta portal via pathname
│   │   ├── useDashboardTopbar.hook.ts       # Lógica de breadcrumbs e topbar
│   │   ├── useShortcutsSection.hook.ts      # Lógica de atalhos
│   │   └── (futuros)
│   │       ├── useAuthSession.hook.ts
│   │       ├── useDebounce.hook.ts
│   │       ├── useClickOutside.hook.ts
│   │       ├── useLocalStorage.hook.ts
│   │       └── useToast.hook.ts
│   │
│   └── hooks-UI-UX/                         # Hooks de comportamento visual
│       ├── index.ts                         # Índice de exports
│       ├── useSliderBanner.hook.ts          # Controle de slider/autoplay
│       ├── useButton.hook.ts                # Lógica de botão
│       ├── useDropInput.hook.ts             # Lógica de drop input
│       ├── useDropdownMenu.hook.ts          # Lógica de dropdown
│       ├── useFloatingLabelInput.hook.ts    # Lógica de floating label
│       └── (futuros)
│           ├── useSidebarControl.hook.ts
│           ├── useTopbarActions.hook.ts
│           ├── useModal.hook.ts
│           ├── useAccordion.hook.ts
│           └── useResponsive.hook.ts
│
└── index.ts                                 # Índice central de todos os hooks
```

---

## Mudanças Realizadas

### 1. Hooks Movidos e Renomeados

| Arquivo Anterior | Novo Arquivo | Motivo |
|------------------|--------------|--------|
| `hooks-UI-UX/shared/use-dashboard-sidebar.hook.ts` | `hooks-dash/hooks-shared/usePortalDetector.hook.ts` | Renomeado para refletir responsabilidade real (detecta portal) |
| `hooks-UI-UX/shared/use-dashboard-topbar.hook.ts` | `hooks-dash/hooks-shared/useDashboardTopbar.hook.ts` | Movido para hooks-shared (reutilizável) |
| `hooks-UI-UX/shared/use-shortcuts-section.hook.ts` | `hooks-dash/hooks-shared/useShortcutsSection.hook.ts` | Movido para hooks-shared (reutilizável) |
| `hooks-UI-UX/ui/use-slider-banner.hook.ts` | `hooks-dash/hooks-UI-UX/useSliderBanner.hook.ts` | Movido para hooks-dash (comportamento visual) |
| `hooks-UI-UX/ui/use-button.hook.ts` | `hooks-dash/hooks-UI-UX/useButton.hook.ts` | Movido para hooks-dash (comportamento visual) |
| `hooks-UI-UX/ui/use-drop-input.hook.ts` | `hooks-dash/hooks-UI-UX/useDropInput.hook.ts` | Movido para hooks-dash (comportamento visual) |
| `hooks-UI-UX/ui/use-dropdown-menu.hook.ts` | `hooks-dash/hooks-UI-UX/useDropdownMenu.hook.ts` | Movido para hooks-dash (comportamento visual) |
| `hooks-UI-UX/ui/use-floating-label-input.hook.ts` | `hooks-dash/hooks-UI-UX/useFloatingLabelInput.hook.ts` | Movido para hooks-dash (comportamento visual) |
| `hooks-UI-UX/tela-login/LoginFormFields/loginFormFields.hook.ts` | `tela-login/useLoginFormFields.hook.ts` | Movido para tela-login (isolado) |

### 2. Imports Atualizados

Todos os componentes que usam esses hooks tiveram seus imports atualizados:

- ✅ `src/components/dashboard/Sidebar.tsx`
- ✅ `src/components/dashboard/Topbar.tsx`
- ✅ `src/components/shared-dashboard/ShortcutsSection.tsx`
- ✅ `src/components/shared-dashboard/SliderBanner.tsx`
- ✅ `src/components/ui/Button.tsx`
- ✅ `src/components/ui/DropInput.tsx`
- ✅ `src/components/ui/Dropdown.tsx`
- ✅ `src/components/ui/FloatingLabelInput.tsx`
- ✅ `src/components/shared-tela-login/SectionContentRight.tsx`

### 3. Arquivos de Índice Criados

Criados arquivos `index.ts` em cada pasta para facilitar imports:

- ✅ `src/hooks/index.ts` - Índice central
- ✅ `src/hooks/hook-fetch-API/index.ts`
- ✅ `src/hooks/tela-login/index.ts`
- ✅ `src/hooks/hooks-dash/hooks-shared/index.ts`
- ✅ `src/hooks/hooks-dash/hooks-UI-UX/index.ts`

### 4. Pastas Antigas Removidas

- ✅ Removida: `src/hooks/hooks-UI-UX/` (antiga estrutura)
- ✅ Removida: `src/hooks/hooks-fectch-API/` (vazia)

---

## Benefícios da Nova Estrutura

### 1. **Isolamento Completo**
```
tela-login/ ← Totalmente isolado
    ↓
    Nada do dashboard vaza pra cá
    Nada de tela-login vaza pro dashboard
```

### 2. **Centralização de Fetch**
```
hook-fetch-API/ ← Um único lugar para toda comunicação com BFF
    ├── useApi (genérico com token, error handling, loading)
    ├── useProtocolos (reutilizável em beneficiário, empresa, etc)
    ├── useGuias
    ├── useBoletos
    └── ...
```

### 3. **Reutilização Máxima**
```
hooks-dash/hooks-shared/ ← Lógica que se repete em TODOS os portais
    ├── usePortalDetector (detecta portal via pathname)
    ├── useDashboardTopbar (breadcrumbs, topbar)
    ├── useShortcutsSection (atalhos)
    └── (futuros: useAuthSession, useDebounce, useClickOutside, etc)
```

### 4. **Comportamentos Visuais Centralizados**
```
hooks-dash/hooks-UI-UX/ ← Comportamentos idênticos entre portais
    ├── useSliderBanner (autoplay, navegação)
    ├── useButton (estados, variantes)
    ├── useDropInput (seleção, filtro)
    ├── useDropdownMenu (abrir/fechar)
    ├── useFloatingLabelInput (foco, validação)
    └── (futuros: useSidebarControl, useModal, useAccordion, etc)
```

---

## Próximos Passos

### 1. Implementar Hooks de Fetch (hook-fetch-API/)
```typescript
// useApi.hook.ts - Hook genérico base
export function useApi<T>(endpoint: string, options?: ApiOptions) {
    // Gerencia token, error handling, loading, retry
}

// useProtocolos.hook.ts - Reutilizável em beneficiário, empresa, etc
export function useProtocolos(portalSlug: PortalSlug) {
    // Usa useApi para buscar protocolos
}
```

### 2. Implementar Hooks Reutilizáveis (hooks-dash/hooks-shared/)
```typescript
// useAuthSession.hook.ts
export function useAuthSession() {
    // Verifica autenticação, lê token/cookie, redireciona se necessário
}

// useDebounce.hook.ts
export function useDebounce<T>(value: T, delay: number) {
    // Para buscas e filtros que vão repetir em vários portais
}

// useClickOutside.hook.ts
export function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
    // Para fechar modais/dropdowns
}
```

### 3. Implementar Hooks de UI/UX (hooks-dash/hooks-UI-UX/)
```typescript
// useSidebarControl.hook.ts
export function useSidebarControl() {
    // Controla abrir/fechar sidebar, estado mobile/desktop
}

// useModal.hook.ts
export function useModal() {
    // Hook genérico para abrir/fechar modais com escape e overlay
}

// useResponsive.hook.ts
export function useResponsive() {
    // Detecta breakpoints ou media queries customizadas do Tailwind
}
```

---

## Convenção de Nomenclatura

### Nomes de Hooks
- ✅ **Correto:** `usePortalDetector.hook.ts`, `useDashboardTopbar.hook.ts`
- ✅ **Alternativa:** `usePortalDetector.ts` (sem `.hook`)
- ❌ **Evitar:** `use-portal-detector.hook.ts` (use camelCase)

### Exports
```typescript
// ✅ Correto
export function usePortalDetector() { ... }
export { usePortalDetector } from './usePortalDetector.hook'

// ❌ Evitar
export const usePortalDetector = () => { ... }
```

---

## Checklist de Validação

- ✅ Estrutura de pastas criada
- ✅ Hooks movidos para locais corretos
- ✅ Imports atualizados em todos os componentes
- ✅ Arquivos de índice criados
- ✅ Pastas antigas removidas
- ⏳ Implementar hooks de fetch (hook-fetch-API/)
- ⏳ Implementar hooks reutilizáveis (hooks-dash/hooks-shared/)
- ⏳ Implementar hooks de UI/UX (hooks-dash/hooks-UI-UX/)

---

## Resumo

A pasta `hooks/` foi **100% reorganizada** seguindo a arquitetura escalável proposta:

1. **Isolamento:** tela-login separado do dashboard
2. **Centralização:** hook-fetch-API para toda comunicação com BFF
3. **Reutilização:** hooks-shared para lógica que se repete
4. **UI/UX:** hooks-UI-UX para comportamentos visuais

A estrutura agora está **pronta para escalar** com novos portais e funcionalidades sem duplicação de código.
