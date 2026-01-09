# Arquitetura - Card Meus Protocolos com Sistema de Prioridade

## Status: ✅ IMPLEMENTADO

Data: 08 de janeiro de 2026

---

## Visão Geral

O componente `CardMeusProtocolos` foi refatorado para implementar um sistema de priorização de protocolos com arquitetura preparada para integração com API. A solução separa claramente lógica pura, hooks React e componentes UI, seguindo as convenções do projeto.

---

## Arquitetura Implementada

### 1. Tipagens (`src/types/ui/sub-card-meus-protocolos.types.ts`)

```typescript
export type ProtocolPriorityType = 'obrigatorio' | 'nao-lido' | null | undefined

export type SubCardMeusProtocolosProps = {
    statusLabel: string
    statusVariant?: 'danger' | 'success' | 'warning' | 'info'
    title: string
    protocolNumber: string
    description?: string
    events: ProtocolEvent[]
    priorityType?: ProtocolPriorityType      // NOVO
    receivedAt: string                        // NOVO (ISO 8601)
}
```

**Mudanças:**
- Adicionado `priorityType` para classificar protocolos
- Adicionado `receivedAt` para ordenação por data

---

### 2. Lógica Pura (`src/utils/protocol-priority.utils.ts`)

```typescript
export function sortProtocolsByPriority(
    items: SubCardMeusProtocolosProps[]
): SubCardMeusProtocolosProps[]
```

**Ordem de Prioridade:**
1. `priorityType === 'obrigatorio'` (aparecem primeiro)
2. `priorityType === 'nao-lido'` (aparecem segundo)
3. Sem prioridade (ordenados por `receivedAt` DESC - mais recentes primeiro)

**Características:**
- Função pura (sem side effects)
- Reutilizável em qualquer contexto
- Testável isoladamente

---

### 3. Componente UI - ProtocolPriorityTag (`src/components/ui/ProtocolPriorityTag.tsx`)

Renderiza badge de prioridade com ícone e texto:

```typescript
type ProtocolPriorityTagProps = {
    priorityType?: ProtocolPriorityType
}

const priorityMap = {
    obrigatorio: { icon: 'iconObrigatorio', text: 'Obrigatório' },
    'nao-lido': { icon: 'iconPointBorderText', text: 'Não lido' },
}
```

**Características:**
- Componente puro (sem estado)
- Tipagem explícita (`PriorityText` + `PriorityMapItem`) impede strings divergentes e evita quebra de layout
- Usa `whitespace-nowrap` para garantir que textos como “Não lido” sejam tratados como uma unidade
- Renderiza `null` se sem prioridade
- Ícones respeitam o tamanho nativo (sem override), mantendo consistência visual

---

### 4. Hook de Fetch (`src/hooks/hook-fetch-API/useProtocolsData.hook.ts`)

```typescript
export function useProtocolsData(portal: string): UseProtocolsDataReturn {
    const { data, loading, error } = useProtocolsData('beneficiario')
}
```

**Funcionalidades:**
- Fetch de `/api/protocolos?portal={portal}`
- Integra `sortProtocolsByPriority()` automaticamente
- Retorna dados já ordenados
- Gerencia loading e error states

**Resposta esperada:**
```typescript
{
    success: boolean
    data: SubCardMeusProtocolosProps[]
    error?: string
}
```

---

### 5. Rota API (BFF) (`src/app/api/protocolos/route.ts`)

Handler GET que:
- Aceita query param `?portal=beneficiario|dentista|...`
- Retorna dados de mocks (hoje) ou backend (futuramente)
- Valida portal e retorna erro 404 se inválido

**Hoje:** Retorna dados de `src/data/mocks/[portal]-home-content.data.ts`

**Futuramente:** Substituir por chamada ao backend real

---

### 6. Componente Compartilhado - CardMeusProtocolos

```typescript
export function CardMeusProtocolos({ 
    title, 
    items, 
    className 
}: CardMeusProtocolosProps) {
    const orderedItems = sortProtocolsByPriority(items)
    
    return (
        <div>
            {orderedItems.map((item) => (
                <SubCardMeusProtocolos key={item.protocolNumber} {...item} />
            ))}
        </div>
    )
}
```

**Responsabilidades:**
- Recebe array de protocolos
- Aplica ordenação via `sortProtocolsByPriority()`
- Renderiza lista ordenada

---

### 7. Componente UI - SubCardMeusProtocolos

```typescript
export function SubCardMeusProtocolos({
    statusLabel,
    statusVariant,
    title,
    protocolNumber,
    description,
    events,
    priorityType,  // NOVO
}: SubCardMeusProtocolosProps) {
    return (
        <div>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
            {priorityType && <ProtocolPriorityTag priorityType={priorityType} />}
            {/* ... resto do card ... */}
        </div>
    )
}
```

**Mudanças:**
- Renderiza `ProtocolPriorityTag` dinamicamente
- Remove hardcoded "Obrigatório"

---

### 8. Dados de Teste (`src/data/mocks/`)

**beneficiario-home-content.data.ts:**
- 1 protocolo com `priorityType: 'obrigatorio'`
- 1 protocolo com `priorityType: 'nao-lido'`
- 3 protocolos sem prioridade (ordenados por data)

**dentista-home-content.data.ts:**
- Mesma estrutura que beneficiário
- Dados exclusivos para portal dentista

---

### 9. Index de Hooks BFF (`src/hooks/hook-fetch-API/index.ts`)

```typescript
// Camada BFF - Hooks para chamadas à camada BFF e APIs externas
// Todos os hooks de fetch centralizam token, error handling, loading, normalização

export { useProtocolsData } from './useProtocolsData.hook'
```

**Objetivo:**
- Centralizar exports dos hooks de fetch
- Facilitar imports (`import { useProtocolsData } from '@/hooks/hook-fetch-API'`)
- Manter lista comentada de futuros hooks (`useGuias`, `useBoletos`, etc.) como roadmap

---

## Fluxo de Dados

```
┌─────────────────────────────────────────────┐
│ Mocks (beneficiario/dentista-home-content)  │
│ - protocolosMock com priorityType + receivedAt
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│ API Route (/api/protocolos)                 │
│ - GET ?portal=beneficiario|dentista         │
│ - Retorna { success, data, error? }         │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│ Hook useProtocolsData                       │
│ - Fetch + integra sortProtocolsByPriority   │
│ - Retorna { data, loading, error }          │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│ CardMeusProtocolos                          │
│ - Aplica sortProtocolsByPriority            │
│ - Mapeia items ordenados                    │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│ SubCardMeusProtocolos                       │
│ - Renderiza card individual                 │
│ - Renderiza ProtocolPriorityTag             │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│ ProtocolPriorityTag                         │
│ - Renderiza badge com ícone + texto         │
└─────────────────────────────────────────────┘
```

---

## Convenções Seguidas

✅ **Lógica pura** → `src/utils/`  
✅ **Hooks React** → `src/hooks/hook-fetch-API/`  
✅ **Componentes UI** → `src/components/ui/`  
✅ **Tipos centralizados** → `src/types/ui/`  
✅ **Separação de responsabilidades**  
✅ **Nomenclatura conforme projeto**  

---

## Integração com API Real

Quando integrar com backend:

1. **Manter rota `/api/protocolos`** (mesmo contrato)
2. **Substituir imports de mocks** por chamadas ao backend
3. **Manter `sortProtocolsByPriority()`** no frontend (ou mover para backend)
4. **Sem mudanças em componentes** (contrato mantido)

**Exemplo:**
```typescript
// Antes
import { protocolosMock } from '@/data/mocks/beneficiario-home-content.data'
const protocols = beneficiarioProtocolosMock

// Depois
const response = await fetch('https://api.backend.com/protocolos?portal=beneficiario')
const { data: protocols } = await response.json()
```

---

## Próximos Passos

- [ ] Integrar `useProtocolsData` em componentes que precisam dados dinâmicos
- [ ] Adicionar testes unitários para `sortProtocolsByPriority()`
- [ ] Expandir tipos de prioridade conforme necessário
- [ ] Implementar cache de dados (opcional)
- [ ] Adicionar paginação (opcional)

---

**Última atualização:** 08 de janeiro de 2026

**Status:** ✅ Arquitetura pronta para produção e integração com API
