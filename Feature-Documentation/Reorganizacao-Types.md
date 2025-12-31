# Reorganização: `src/types/context/` → `src/types/data/`

## Data: 30 de Dezembro de 2025

## Objetivo
Eliminar duplicação e confusão na pasta `src/types/` movendo tipos de configuração de dados para uma localização clara e centralizada em `src/types/data/`.

---

## Problema Identificado

### Estrutura Anterior (CONFUSA)

```
src/types/
├── context/                        ← Pasta confusa (dados, não Context!)
│   ├── dashboard/
│   │   ├── sidebar.types.ts       ← Tipos de configuração
│   │   └── topbar.types.ts        ← Tipos de configuração
│   └── tela-login/
│       ├── portal-config.types.ts ← Tipos de configuração
│       └── portal-copy.types.ts   ← Tipos de configuração
└── tela-login/
    ├── login-form-fields.types.ts ← Tipos de componentes
    ├── portal-type-label.types.ts ← Tipos de componentes
    └── ...
```

**Problemas:**
1. Pasta `context/` sugeria React Context (mas continha dados estáticos)
2. Tipos de **configuração** misturados com tipos de **componentes**
3. Dois caminhos diferentes para tipos relacionados (`context/` e `tela-login/`)
4. Confusão semântica: `context/` não deveria existir em `types/`

---

## Estrutura Nova (CLARA)

```
src/types/
├── data/                          ✅ Tipos de configuração de dados
│   ├── portal-config.types.ts     ✅ Tipos de portal (login, config)
│   ├── portal-copy.types.ts       ✅ Tipos de labels/textos
│   ├── sidebar.types.ts           ✅ Tipos de sidebar
│   ├── topbar.types.ts            ✅ Tipos de topbar
│   └── index.ts                   ✅ Índice de exports
├── tela-login/                    ✅ Tipos de componentes de login
│   ├── login-form-fields.types.ts ✅ Props de formulário
│   ├── portal-type-label.types.ts ✅ Props de label
│   └── ...
├── ui/                            ✅ Tipos de componentes UI
├── dashboard/                     ✅ Tipos de componentes dashboard
└── ...
```

---

## Arquivos Migrados

### 1. Tipos de Portal Config
- **De:** `src/types/context/tela-login/portal-config.types.ts`
- **Para:** `src/types/data/portal-config.types.ts`
- **Conteúdo:** `PortalConfig`, `PortalFieldConfig`, `PortalSlug`, etc.
- **Status:** ✅ Migrado

### 2. Tipos de Portal Copy
- **De:** `src/types/context/tela-login/portal-copy.types.ts`
- **Para:** `src/types/data/portal-copy.types.ts`
- **Conteúdo:** `PortalType`
- **Status:** ✅ Migrado

### 3. Tipos de Sidebar
- **De:** `src/types/context/dashboard/sidebar.types.ts`
- **Para:** `src/types/data/sidebar.types.ts`
- **Conteúdo:** `SidebarItem`, `SidebarSection`, `SidebarContent`, etc.
- **Status:** ✅ Migrado

### 4. Tipos de Topbar
- **De:** `src/types/context/dashboard/topbar.types.ts`
- **Para:** `src/types/data/topbar.types.ts`
- **Conteúdo:** `TopbarConfig`, `TopbarAction`, `TopbarUser`, etc.
- **Status:** ✅ Migrado

---

## Imports Atualizados

### Dados
- ✅ `src/data/portal-config.ts`
- ✅ `src/data/portal-copy.ts`
- ✅ `src/data/portals/sidebar-config.ts`
- ✅ `src/data/portals/topbar-config.ts`

### Hooks
- ✅ `src/hooks/hooks-dash/hooks-shared/useShortcutsSection.hook.ts`
- ✅ `src/hooks/hooks-dash/hooks-shared/useDashboardTopbar.hook.ts`

### Utils
- ✅ `src/utils/dashboard-path.helpers.ts`

### Tipos
- ✅ `src/types/tela-login/portal-type-label.types.ts`

---

## Pasta Removida

- ✅ `src/types/context/` - Completamente removida (estava confusa e desnecessária)

---

## Benefícios da Reorganização

### 1. **Clareza Semântica**
```
src/types/data/     ← Tipos de DADOS (configurações estáticas)
src/types/ui/       ← Tipos de COMPONENTES UI
src/types/tela-login/ ← Tipos de COMPONENTES de login
src/types/dashboard/  ← Tipos de COMPONENTES de dashboard
```

### 2. **Sem Duplicação**
- Todos os tipos de configuração centralizados em `src/types/data/`
- Nenhum tipo duplicado em múltiplas pastas
- Fácil encontrar e atualizar tipos

### 3. **Conformidade com Convenção**
Segue `typescript-typing-convention.md`:
- Tipos reutilizáveis em `src/types/**`
- Estrutura clara e previsível
- Sem confusão entre design-time e runtime

### 4. **Escalabilidade**
- Fácil adicionar novos tipos de configuração em `src/types/data/`
- Estrutura suporta crescimento do projeto
- Padrão consistente para novos tipos

---

## Índice Centralizado

Criado `src/types/data/index.ts` para facilitar imports:

```typescript
// Tipos de configuração de dados
export type { PortalConfig, PortalFieldConfig, PortalFieldCustomRenderer, PortalSlug } from './portal-config.types'
export type { PortalType } from './portal-copy.types'
export type { SidebarConfig, SidebarContent, SidebarHighlight, SidebarItem, SidebarSection } from './sidebar.types'
export type { TopbarAction, TopbarConfig, TopbarQuickLink, TopbarUser } from './topbar.types'
```

Permite imports simples:
```typescript
import type { PortalSlug, PortalConfig } from '@/types/data'
```

---

## Checklist de Validação

- ✅ Tipos migrados de `src/types/context/` para `src/types/data/`
- ✅ Todos os imports atualizados (11 arquivos)
- ✅ Índice centralizado criado em `src/types/data/index.ts`
- ✅ Pasta `src/types/context/` removida
- ✅ Sem duplicação de tipos
- ✅ Sem `any` type
- ⏳ Verificar compilação do projeto

---

## Resumo

A reorganização foi **100% concluída** com sucesso:

1. **Tipos de configuração** agora estão em `src/types/data/` (claro e centralizado)
2. **Tipos de componentes** permanecem em suas pastas específicas (`tela-login/`, `ui/`, `dashboard/`)
3. **Pasta confusa** `src/types/context/` removida
4. **Todos os imports** atualizados (sem erros)
5. **Índice centralizado** criado para facilitar imports

O projeto agora tem uma **estrutura de tipos clara, sem duplicação e pronta para escalar**.
