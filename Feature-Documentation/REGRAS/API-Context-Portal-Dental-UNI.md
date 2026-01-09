# API Context - Portal Dental UNI Dashboard

## 1. Visão Geral e Fluxo de Dados

Este documento descreve a arquitetura de API do projeto Portal Dental UNI Dashboard, implementado com Next.js App Router. Usamos uma abordagem de Backend-for-Frontend (BFF) onde as APIs servem como uma camada de abstração entre o frontend e o banco de dados simulado (JSONs) ou APIs externas.

### Fluxo Padrão de Dados

O projeto segue um fluxo padrão bem definido:

1. **Requisição do Cliente**: O navegador (cliente) solicita dados através de hooks React
2. **Hook de Fetch**: O hook centraliza a chamada à API com tratamento de erros e loading
3. **Route Handler (BFF)**: O servidor recebe a requisição e a processa
4. **Consulta aos Dados**: A API consulta arquivos JSON em `src/data/` ou APIs externas
5. **Processamento e Resposta**: A API formata e retorna dados padronizados
6. **Atualização do Estado**: O hook atualiza o estado do componente com os dados

```
Componente → Hook → Route Handler → JSON/API → Resposta JSON → Hook → Componente
```

### Padrão BFF (Backend-for-Frontend)

#### O que é o padrão BFF?

O padrão BFF propõe a criação de uma camada de backend dedicada e otimizada para o frontend do dashboard, abstraindo a complexidade de múltiplos serviços de backend.

#### Características e Benefícios do BFF

**Abstração e Simplificação**
- O BFF atua como um "meio-campo", isolando o frontend da complexidade de APIs externas
- Em vez de o frontend fazer várias chamadas, ele faz uma única chamada ao seu BFF

**Otimização de Dados**
- O BFF garante que o frontend receba apenas os dados necessários
- Evita tráfego desnecessário, melhorando o desempenho
- Crucial para dashboards com múltiplos widgets

**Segurança**
- Centraliza validações e regras de negócio
- Oculta informações confidenciais do cliente
- Gerencia tokens de autenticação

**Desacoplamento**
- Permite que equipes de frontend e backend trabalhem de forma independente
- Mudanças em APIs externas não quebram necessariamente o frontend

## 2. Estrutura de Pastas e Arquivos

```
src/
├─ app/api/                           # Route Handlers (Next.js App Router)
│  ├─ protocolos/                     # API de protocolos
│  │  └─ route.ts                     # GET /api/protocolos
│  └─ [futuras APIs]                  # Expandir conforme necessidade
│
├─ hooks/hook-fetch-API/              # Hooks React customizados para API
│  ├─ index.ts                        # Export central
│  ├─ useProtocolsData.hook.ts        # Hook específico de protocolos
│  └─ [futuros hooks]                 # useGuias, useBoletos, etc.
│
├─ components/ui/                     # Componentes de UI reutilizáveis
│  ├─ LoadingState.tsx                # Componente de loading
│  ├─ SubCardMeusProtocolos.tsx       # Card de protocolos
│  └─ [outros componentes]            # Componentes de UI
│
├─ data/                              # Dados mock e configurações
│  ├─ mock-login/                     # Dados de login mock
│  ├─ mocks/                          # Dados mock para APIs
│  │  └─ protocols.json               # Mock de protocolos
│  └─ portals/                        # Configurações por portal
│
├─ utils/                             # Utilitários
│  ├─ protocol-priority.utils.ts      # Ordenação de protocolos
│  └─ [outros utilitários]            # Helpers diversos
│
└─ types/                             # Tipos TypeScript
   ├─ api/                            # Tipos de API (quando necessário)
   ├─ ui/                             # Tipos de componentes UI
   └─ dashboard/                      # Tipos do dashboard
```

## 3. Padrão de Integração de APIs (Portal Dashboard Standard)

### 3.1. Arquitetura de Camadas (Padrão 3-Layer)

**OBRIGATÓRIO:** Todas as integrações de API devem seguir o padrão **3-Layer Architecture**:

```
┌─────────────────────────────────────────┐
│ 1. Hook React (Camada de Consumo)      │
│    - Gerencia estado (loading, error)  │
│    - Centraliza lógica de fetch        │
│    - Tratamento de erros               │
│    - Reutilização entre componentes    │
└─────────────────────────────────────────┘
                   ↓ chama
┌─────────────────────────────────────────┐
│ 2. Route Handler (Camada BFF)          │
│    - Validação de parâmetros           │
│    - Transformação de dados            │
│    - Caching e headers HTTP             │
│    - Integração com APIs externas       │
└─────────────────────────────────────────┘
                   ↓ usa
┌─────────────────────────────────────────┐
│ 3. JSON Mock / API Externa              │
│    - Fonte de dados                     │
│    - Pode ser substituída sem mudar hook│
│    - Abstração completa                 │
└─────────────────────────────────────────┘
```

**Responsabilidades por Camada:**

**Hook React** (`src/hooks/hook-fetch-API/*Hook.ts`):
- Gerencia estado de loading, error e data
- Centraliza lógica de fetch e tratamento de erros
- É reutilizável entre múltiplos componentes
- Não contém lógica de UI, apenas dados

**Route Handler** (`src/app/api/**/route.ts`):
- Recebe requisições HTTP
- Valida parâmetros e query strings
- Transforma dados brutos para o formato esperado
- Implementa caching via headers HTTP
- Retorna resposta padronizada

**Dados** (`src/data/mocks/*.json` ou API externa):
- Fonte de dados (mock ou real)
- Pode ser substituída sem alterar hooks
- Estrutura otimizada para consumo do BFF

### 3.2. Exemplo de Implementação

```typescript
// 1. Hook React (src/hooks/hook-fetch-API/useProtocolsData.hook.ts)
export function useProtocolsData(portal: string): UseProtocolsDataReturn {
    const [data, setData] = useState<SubCardMeusProtocolosProps[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProtocols = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`/api/protocolos?portal=${portal}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch protocols: ${response.statusText}`)
                }

                const result = await response.json()

                if (!result.success) {
                    throw new Error(result.error || 'Unknown error')
                }

                const sortedData = sortProtocolsByPriority(result.data)
                setData(sortedData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred')
                setData([])
            } finally {
                setLoading(false)
            }
        }

        fetchProtocols()
    }, [portal])

    return { data, loading, error }
}

// 2. Route Handler (src/app/api/protocolos/route.ts)
import { NextResponse } from 'next/server'
import protocolsMock from '@/data/mocks/protocols.json'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const portal = searchParams.get('portal') || 'beneficiario'

        // Filtra protocols por portal
        const filteredProtocols = protocolsMock.filter(p => p.portal === portal)

        return NextResponse.json({
            success: true,
            data: filteredProtocols,
            timestamp: new Date().toISOString()
        }, {
            headers: { 'Cache-Control': 'public, s-maxage=60' }
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch protocols',
                statusCode: 500
            },
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}

// 3. Componente (qualquer componente que usa)
const { data, loading, error } = useProtocolsData(portal)

if (loading) return <LoadingState />
if (error) return <ErrorState message={error} />

return (
    <div>
        {data.map(protocol => (
            <SubCardMeusProtocolos key={protocol.id} {...protocol} />
        ))}
    </div>
)
```

## 4. Padrão de Resposta (Consistência)

### 4.1. Formato Padronizado de Sucesso

```typescript
NextResponse.json({
  success: true,
  data: result, // ← Dados da resposta
  timestamp: new Date().toISOString(),
  metadata?: { // ← Opcional: metadados adicionais
    total?: number,
    cached?: boolean,
    portal?: string
  }
}, { status: 200 })
```

### 4.2. Formato Padronizado de Erro

```typescript
NextResponse.json({
  success: false,
  error: {
    code: string,           // ← Código do erro (ex: 'VALIDATION_ERROR')
    message: string,        // ← Mensagem legível
    details?: unknown,     // ← Detalhes opcionais
    statusCode: number      // ← HTTP status code
  },
  timestamp: new Date().toISOString()
}, { status: error.statusCode })
```

### 4.3. Interface TypeScript

```typescript
// src/types/api/api-response.types.ts
export interface ApiSuccessResponse<T> {
  success: true
  data: T
  timestamp: string
  metadata?: Record<string, unknown>
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
    statusCode: number
  }
  timestamp: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
```

## 5. Estratégia de Caching

### 5.1. Dados Dinâmicos (Dashboard)

Para dados que mudam frequentemente (protocolos, guias, etc.):

```typescript
// Cache curto para dados dinâmicos
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
  }
})
```

### 5.2. Dados Estáticos (Configurações)

Para configurações e dados que raramente mudam:

```typescript
// Cache longo para dados estáticos
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
  }
})
```

### 5.3. Sem Cache (Dados Sensíveis)

Para dados sensíveis ou em tempo real:

```typescript
// Sem cache para dados críticos
export const dynamic = 'force-dynamic' // ← OBRIGATÓRIO

return NextResponse.json(data)
```

## 6. Endpoints Existentes e Futuros

### 6.1. Endpoints Implementados

#### GET /api/protocolos
- **Função:** Retorna lista de protocolos do usuário por portal
- **Parâmetros:** `portal` (query string)
- **Response:** `{ success: true, data: Protocol[], timestamp }`
- **Consumidores:** Dashboard principal, cards de protocolos
- **Mock:** `src/data/mocks/protocols.json`

### 6.2. Endpoints Planejados

#### GET /api/guias
- **Função:** Retorna guias do usuário por portal
- **Parâmetros:** `portal`, `status`, `periodo`
- **Response:** Guias filtradas e paginadas

#### GET /api/boletos
- **Função:** Retorna boletos em aberto
- **Parâmetros:** `portal`, `status`
- **Response:** Boletos com vencimento e valor

#### GET /api/dados-cadastrais
- **Função:** Retorna dados cadastrais do usuário
- **Parâmetros:** `portal`, `userId`
- **Response:** Dados pessoais e de contato

#### POST /api/atualizar-dados
- **Função:** Atualiza dados cadastrais
- **Payload:** Dados atualizados do usuário
- **Response:** Confirmação de atualização

## 7. Convenções e Boas Práticas

### 7.1. Nomenclatura de Arquivos

- **Hooks:** `use[NomeEntidade].hook.ts` (ex: `useProtocolsData.hook.ts`)
- **Route Handlers:** `route.ts` em pastas nominais (ex: `/api/protocolos/route.ts`)
- **Tipos:** `[dominio]-[entidade].types.ts` (ex: `api-response.types.ts`)
- **Mocks:** `[entidade].json` (ex: `protocols.json`)

### 7.2. Estrutura de Hooks

```typescript
// Padrão obrigatório para hooks de API
export function use[NomeEntidade](params: ParamsType): UseReturn {
    const [data, setData] = useState<DataType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Lógica de fetch
    }, [dependencies])

    return { data, loading, error }
}
```

### 7.3. Tratamento de Erros

- Sempre retornar erro padronizado do Route Handler
- Hook deve capturar e expor mensagem de erro
- Componente deve exibir estado de erro apropriado
- Log de erros no servidor para debugging

### 7.4. Loading States

- Hook deve gerenciar estado de loading
- Componente deve exibir loading apropriado
- Usar componente `LoadingState` para consistência

## 8. Migração de Mock para API Real

### 8.1. Processo de Migração

1. **Manter Contrato do Hook:** Não alterar interface do hook
2. **Atualizar Route Handler:** Substituir mock por chamada à API externa
3. **Manter Formato de Resposta:** Manter mesmo formato de resposta
4. **Atualizar Tipos:** Ajustar tipos se necessário
5. **Testes:** Validar integração completa

### 8.2. Exemplo de Migração

```typescript
// ANTES (Mock)
export async function GET(request: Request) {
    const protocols = protocolsMock.filter(p => p.portal === portal)
    return NextResponse.json({ success: true, data: protocols })
}

// DEPOIS (API Real)
export async function GET(request: Request) {
    try {
        const token = request.headers.get('authorization')
        const response = await fetch(`${process.env.API_BASE_URL}/protocols`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        
        const protocols = await response.json()
        const transformed = transformProtocolsData(protocols) // Formata para o frontend
        
        return NextResponse.json({ success: true, data: transformed })
    } catch (error) {
        // Tratamento de erro
    }
}
```

## 9. Validação e Tipagem

### 9.1. Validação de Parâmetros

```typescript
import { z } from 'zod'

const protocolQuerySchema = z.object({
    portal: z.enum(['beneficiario', 'dentista', 'comercial', 'empresa', 'representante'])
})

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = protocolQuerySchema.parse(Object.fromEntries(searchParams))
    
    // Usar query.portal validado
}
```

### 9.2. Tipos Compartilhados

```typescript
// src/types/api/protocol.types.ts
export interface Protocol {
    id: string
    title: string
    status: 'pending' | 'approved' | 'rejected'
    priority: 'low' | 'medium' | 'high'
    portal: string
    createdAt: string
    updatedAt: string
}

export interface ProtocolResponse {
    protocols: Protocol[]
    total: number
}
```

## 10. Monitoramento e Debugging

### 10.1. Logs no Servidor

```typescript
// Route Handler com logs
export async function GET(request: Request) {
    console.log(`📡 API Request: GET /api/protocolos?portal=${portal}`)
    
    try {
        const result = await fetchProtocols(portal)
        console.log(`✅ API Response: ${result.data.length} protocols found`)
        
        return NextResponse.json(result)
    } catch (error) {
        console.error(`❌ API Error:`, error)
        return NextResponse.json(errorResponse, { status: 500 })
    }
}
```

### 10.2. Debugging no Cliente

```typescript
// Hook com logs de debugging
useEffect(() => {
    console.log(`🔄 Fetching protocols for portal: ${portal}`)
    
    fetchProtocols()
        .then(data => {
            console.log(`✅ Protocols loaded:`, data.length)
            setData(data)
        })
        .catch(error => {
            console.error(`❌ Failed to load protocols:`, error)
            setError(error.message)
        })
        .finally(() => {
            setLoading(false)
        })
}, [portal])
```

---

## Conclusão

Este padrão BFF para o Portal Dental UNI Dashboard garante:

✅ **Consistência:** Todos os endpoints seguem o mesmo padrão
✅ **Manutenibilidade:** Separação clara de responsabilidades
✅ **Performance:** Caching adequado para cada tipo de dado
✅ **Segurança:** Validação e tratamento centralizados
✅ **Flexibilidade:** Fácil migração de mock para APIs reais
✅ **Reutilização:** Hooks podem ser usados em múltiplos componentes

Ao seguir este padrão, garantimos uma arquitetura robusta e escalável para o dashboard dental.
