# Regra Oficial de Criação de Componentes

## ⚠️ REGRA ABSOLUTA

**NENHUM COMPONENTE EM `src/components/` PODE CONTER LÓGICA**

Exceto componentes UI base (`src/components/ui/`), que são simples e específicos.

- ❌ Shared components: SEM lógica
- ❌ Page components: SEM lógica
- ❌ Layout components: SEM lógica
- ❌ Main-content components: SEM lógica
- ✅ UI components: Podem ter lógica simples (estado visual)

**Toda lógica vai para server-side:**
- `src/hooks/` - Lógica de estado/efeitos
- `src/utils/` - Funções puras
- `src/app/api/` - Route Handlers (BFF)
- `src/data/` - Dados estáticos

---

## 1. Estrutura Obrigatória

### Para Componentes Shared/Pages/Layouts
```
src/components/[categoria]/ComponentName.tsx    ← APENAS JSX + imports
src/types/[categoria]/component-name.types.ts   ← Props (se necessário)
```

### Para Lógica (Server-side)
```
src/hooks/[categoria]/useComponentLogic.hook.ts ← Estado, efeitos
src/utils/component-name.helpers.ts             ← Funções puras
src/data/component-name.data.ts                 ← Dados estáticos
src/app/api/[recurso]/route.ts                  ← BFF (APIs)
```

---

## 2. Regra de Ouro: Browser = UI Pura, Server = Lógica

### ✅ O que vai em `src/components/` (APENAS)
- JSX e renderização
- Imports de hooks, utils, data, types, componentes
- Classes Tailwind
- Condicionais visuais
- Handlers que **delegam para hooks**

### ❌ O que NÃO vai em `src/components/` (NUNCA)
- `useState`, `useEffect` (exceto UI base)
- Parsing, normalização, cálculos
- Máscaras, validações, regras de negócio
- Lógica condicional (use hooks)
- Dados estáticos inline (use `src/data/`)
- Tipagens reutilizáveis (use `src/types/`)

---

## 3. Tipagem: Sem `any` Type

**PROIBIDO:** usar `any` em qualquer situação.

```typescript
// ❌ ERRADO
function Component(props: any) { }

// ✅ CORRETO
import type { ComponentProps } from '@/types/[categoria]/component-name.types'
function Component(props: ComponentProps) { }
```

**Arquivo de tipos:**
```typescript
// src/types/[categoria]/component-name.types.ts
export interface ComponentProps {
    label: string
    onClick: (value: string) => void
    variant?: 'primary' | 'secondary'
}
```

---

## 4. Estrutura de Pastas

```
src/components/
├── ui/                    ← Componentes base (Button, Input, Card)
├── shared/                ← Reutilizáveis entre portais
├── dashboard-layout/      ← Estrutura do dashboard (Sidebar, Topbar)
└── main-content/          ← Conteúdo por portal
    ├── beneficiario/
    ├── dentista/
    └── ...

src/types/
├── ui/                    ← Props de componentes UI
├── shared/                ← Props de componentes shared
├── dashboard/             ← Props de componentes dashboard
├── data/                  ← Tipos de configuração
└── tela-login/            ← Props de componentes de login

src/hooks/
├── hook-fetch-API/        ← Chamadas à BFF (a implementar)
├── tela-login/            ← Isolado: hooks de login
└── hooks-dash/
    ├── hooks-shared/      ← Reutilizáveis em qualquer portal
    └── hooks-UI-UX/       ← Comportamentos visuais

src/data/
├── portals/               ← Configurações por portal
├── mocks/                 ← Dados mock
└── *.data.ts              ← Dados estáticos
```

---

## 5. Exemplo Prático: Componente UI Base

### ✅ CORRETO: `Button.tsx` (UI base, pode ter lógica simples)

```typescript
// src/components/ui/Button.tsx
import type { ButtonProps } from '@/types/ui/button.types'
import { clsx } from 'clsx'

export function Button({ 
    label, 
    onClick, 
    variant = 'primary',
    disabled = false 
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'px-4 py-2 rounded font-semibold transition',
                variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
                variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
                disabled && 'opacity-50 cursor-not-allowed'
            )}
        >
            {label}
        </button>
    )
}
```

---

## 6. Exemplo Prático: Componente Shared (SEM lógica)

### ✅ CORRETO: `SliderBanner.tsx` (APENAS JSX + imports)

```typescript
// src/components/shared/SliderBanner.tsx
import type { SliderBannerProps } from '@/types/shared/slider-banner.types'
import { useSliderBanner } from '@/hooks/hooks-dash/hooks-UI-UX/useSliderBanner.hook'

export function SliderBanner({ items, duration }: SliderBannerProps) {
    // ✅ Lógica vem do hook (server-side)
    const { currentIndex, next, prev } = useSliderBanner({ items, duration })
    
    // ✅ Componente APENAS renderiza
    return (
        <div className="relative">
            <img src={items[currentIndex].image} alt="banner" />
            <button onClick={prev}>←</button>
            <button onClick={next}>→</button>
        </div>
    )
}
```

### ❌ ERRADO: Lógica dentro do componente

```typescript
// ❌ NUNCA FAÇA ISSO
export function SliderBanner({ items, duration }: SliderBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)  // ❌ NÃO!
    
    useEffect(() => {  // ❌ NÃO!
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % items.length)
        }, duration)
        return () => clearInterval(timer)
    }, [items.length, duration])
    
    return (...)
}
```

### ✅ CORRETO: Lógica no hook (server-side)

```typescript
// src/hooks/hooks-dash/hooks-UI-UX/useSliderBanner.hook.ts
import { useState, useEffect } from 'react'
import type { SliderItem } from '@/types/shared/slider-banner.types'

export function useSliderBanner({ items, duration = 5000 }: {
    items: SliderItem[]
    duration?: number
}) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % items.length)
        }, duration)
        return () => clearInterval(timer)
    }, [items.length, duration])

    return {
        currentIndex,
        next: () => setCurrentIndex(prev => (prev + 1) % items.length),
        prev: () => setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
    }
}
```

### Tipos (em `src/types/`)

```typescript
// src/types/shared/slider-banner.types.ts
export interface SliderItem {
    id: string
    image: string
    title: string
}

export interface SliderBannerProps {
    items: SliderItem[]
    duration?: number
}
```

---

## 7. Fluxo de Dados: Browser ← Server

```
┌─────────────────────────────────────────────────────────┐
│ SERVER-SIDE (Node.js)                                   │
├─────────────────────────────────────────────────────────┤
│ • src/hooks/       → Estado, efeitos, lógica            │
│ • src/utils/       → Funções puras, cálculos            │
│ • src/data/        → Dados estáticos, configurações     │
│ • src/app/api/     → Route Handlers (BFF)               │
│ • src/schema/      → Validação (Zod)                    │
└─────────────────────────────────────────────────────────┘
                          ↓
                   (Props + Estado)
                          ↓
┌─────────────────────────────────────────────────────────┐
│ BROWSER (React)                                         │
├─────────────────────────────────────────────────────────┤
│ • src/components/  → APENAS JSX + imports               │
│                      (UI pronta para renderizar)        │
└─────────────────────────────────────────────────────────┘
```

**Componente recebe tudo pronto:**
- Props com dados já processados
- Handlers que delegam para hooks
- Estado já resolvido no server

**Componente APENAS:**
- Renderiza JSX
- Aplica estilos
- Chama handlers

---

## 8. Checklist de Criação

### Antes de criar qualquer componente:

- [ ] **Lógica está em `src/hooks/`?** (estado, efeitos, cálculos)
- [ ] **Dados estáticos em `src/data/`?** (não inline)
- [ ] **Funções puras em `src/utils/`?** (parsing, normalização)
- [ ] **Tipagens em `src/types/`?** (Props, tipos)
- [ ] **Componente tem APENAS JSX?** (sem `useState`, `useEffect`)
- [ ] **Sem `any` type?** (tipagem explícita)
- [ ] **Props tipadas?** (interface ou type)
- [ ] **Imports via `import type`?** (para tipos)

---

## 9. Imports Permitidos em Componentes

```typescript
// ✅ PERMITIDO (browser carrega UI pronta)
import type { ComponentProps } from '@/types/...'
import { useHook } from '@/hooks/...'           // Lógica do servidor
import { helperFunction } from '@/utils/...'    // Funções puras
import { staticData } from '@/data/...'         // Dados estáticos
import { OtherComponent } from '@/components/...'
import { clsx } from 'clsx'

// ❌ PROIBIDO (lógica no browser)
import { useState } from 'react'                // ❌ Use hooks
import { useEffect } from 'react'               // ❌ Use hooks
import { complexLogic } from './local-logic'    // ❌ Use src/utils/
import { data } from './data'                   // ❌ Use src/data/
```

---

## 10. Validação Final

Antes de commitar:

```bash
# Verificar tipagem
yarn tsc --noEmit

# Verificar se compila
yarn build

# Verificar se há useState/useEffect em componentes (exceto UI base)
grep -r "useState\|useEffect" src/components/shared/ src/components/main-content/ src/components/dashboard-layout/
```

Se encontrar `useState` ou `useEffect` fora de `src/components/ui/`, **MOVER PARA HOOK IMEDIATAMENTE**.

---

## 11. Acessibilidade por Teclado (OBRIGATÓRIO)

### Navegação por Teclado

Todo elemento interativo **DEVE** ser navegável por teclado:

```typescript
// ✅ CORRETO - Elemento focável
<button className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
    Click
</button>

// ❌ ERRADO - Sem indicador visual de foco
<button className="...">Click</button>
```

### Focus Visible em Todos os Elementos Interativos

```typescript
// Padrão obrigatório para buttons, links, inputs
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
```

### Aria Labels em Botões de Ícone

```typescript
// ✅ CORRETO
<button aria-label="Abrir notificações">
    <Icon name="bell" />
</button>

// ❌ ERRADO
<button>
    <Icon name="bell" />
</button>
```

### Navegação em Dropdowns com Setas

```typescript
// ✅ CORRETO - Suporta ↑↓ para navegar
const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev + 1) % options.length)
    }
    if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length)
    }
    if (e.key === 'Enter') {
        e.preventDefault()
        handleSelect(options[highlightedIndex].value)
    }
    if (e.key === 'Escape') {
        setIsOpen(false)
    }
}
```

### Aria Attributes Obrigatórios

```typescript
// Dropdowns
<button aria-expanded={isOpen} aria-haspopup="listbox">
    {displayValue}
</button>

// Toggle buttons
<button aria-pressed={isActive}>
    {label}
</button>

// Elementos decorativos
<span aria-hidden>decorative icon</span>

// Breadcrumbs
<nav aria-label="breadcrumb">
    <li aria-current="page">{current}</li>
</nav>
```

### Submissão via Enter

```typescript
// ✅ CORRETO - Form submete com Enter
<form onSubmit={handleSubmit}>
    <input type="text" />
    <button type="submit">Enviar</button>
</form>

// ✅ CORRETO - Input com Enter
const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
    }
}
```

### Checklist de Acessibilidade

- [ ] Elemento é focável (Tab)?
- [ ] Elemento tem `focus-visible` com indicador visual?
- [ ] Botões de ícone têm `aria-label`?
- [ ] Dropdowns suportam setas (↑↓)?
- [ ] Dropdowns suportam Enter para selecionar?
- [ ] Dropdowns suportam Escape para fechar?
- [ ] Modais têm focus trap?
- [ ] Formulários submetem com Enter?
- [ ] Elementos decorativos têm `aria-hidden`?

---

## 12. Resumo Absoluto

| Responsabilidade | Onde | Exemplo |
|---|---|---|
| **Estado** | `src/hooks/` | `const [count, setCount] = useState(0)` |
| **Efeitos** | `src/hooks/` | `useEffect(() => {...}, [])` |
| **Cálculos** | `src/utils/` | `function normalizeData(data) {...}` |
| **Dados** | `src/data/` | `export const CONFIG = {...}` |
| **Tipagens** | `src/types/` | `export interface Props {...}` |
| **Renderização** | `src/components/` | `return <div>...</div>` |
| **Acessibilidade** | Todos os componentes | `focus-visible`, `aria-label`, navegação por teclado |

---

**Última atualização:** 31 de dezembro de 2025

**REGRA FINAL:** Browser = UI pronta. Server = Lógica. Teclado = Acessível. Ponto.
