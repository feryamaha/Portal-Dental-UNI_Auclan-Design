# Arquitetura de Pastas, Arquivos e Componentes

## 1. Visão Geral

A arquitetura da dashboard segue o padrão **Next.js App Router** com separação clara entre:
- **Rotas públicas** (`/tela-login`)
- **Rotas autenticadas** (`/portal-*`)
- **Componentes UI** (sem lógica)
- **Lógica** (hooks, utils, context, data, types)

---

## 2. Estrutura de Pastas Raiz

```
src/
├── app/                          # Next.js App Router
├── components/                   # Componentes React
├── context/                      # React Context (estado global)
├── data/                         # Dados estáticos e mocks
├── hooks/                        # Custom hooks (lógica)
├── libs/                         # Bibliotecas e utilitários
├── schema/                       # Validação de dados
├── script/                       # Scripts utilitários
├── types/                        # Tipagens TypeScript
├── utils/                        # Funções utilitárias puras
└── Feature-Documentation/        # Documentação de features
```

---

## 3. Estrutura de `src/app` (Rotas)

```
src/app/
├── layout.tsx                    # Root Layout (HTML, fontes, metadados)
├── page.tsx                      # Rota raiz (/) - redireciona para login
├── globals.css                   # Estilos globais
├── favicon.ico                   # Favicon
│
├── (dashboard)/                  # Grupo de rotas autenticadas
│   ├── layout.tsx               # Layout com Sidebar + Topbar
│   ├── portal-beneficiario/
│   │   └── page.tsx             # Renderiza BeneficiarioHomeContent
│   ├── portal-dentista/
│   │   └── page.tsx             # Renderiza DentistaHome
│   ├── portal-comercial/
│   │   └── page.tsx             # Renderiza ComercialHome
│   ├── portal-empresa/
│   │   └── page.tsx             # Renderiza EmpresaHome
│   └── portal-representante/
│       └── page.tsx             # Renderiza RepresentanteHome
│
├── tela-login/                   # Grupo de rotas públicas
│   ├── layout.tsx               # Layout especifico da tela de login
│   └── [portal]/
│       └── page.tsx             # Renderiza formulário de login dinâmico
│
└── api/                          # Camada BFF (Backend For Frontend)
    └── [recurso]/
        └── route.ts             # Route handlers para integração com APIs externas
```

---

## 4. Estrutura de `src/components`

```
src/components/
├── ui/                           # Componentes UI puros (sem lógica)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── ...
│
├── shared/                       # Componentes reutilizáveis entre portais
│   ├── SliderBanner.tsx         # Banner com slider
│   ├── ShortcutsSection.tsx     # Seção de atalhos
│   ├── NewsHighlightSection.tsx # Seção de notícias
│   ├── CardMeusProtocolos.tsx   # Card de protocolos
│   ├── CardMinhasGuias.tsx      # Card de guias
│   ├── Sidebar.tsx              # Navegação lateral (detecta portal via hook)
│   ├── Topbar.tsx               # Barra superior
│   └── ...
│
└── main-content/                # Componentes específicos por portal
    ├── beneficiario/
    │   ├── BeneficiarioHome.tsx      # Home do beneficiario (UI apenas)
    │   ├── BoletosContent.tsx        # Conteúdo de boletos
    │   ├── CartoesContent.tsx        # Conteúdo de cartões
    │   ├── DadosCadastraisContent.tsx
    │   ├── GuiasContent.tsx
    │   ├── PlanoContent.tsx
    │   └── ProtocolosContent.tsx
    ├── dentista/
    │   └── DentistaHome.tsx          # Home do dentista (UI apenas)
    ├── comercial/
    │   └── ComercialHome.tsx         # Home comercial (UI apenas)
    ├── empresa/
    │   └── EmpresaHome.tsx           # Home empresa (UI apenas)
    └── representante/
        └── RepresentanteHome.tsx     # Home representante (UI apenas)
```

---

## 5. Estrutura de Lógica

### `src/context/` - Estado Global

```
src/context/
├── tela-login/
│   └── portalConfig.ts          # Configuração de portais (campos, labels)
└── dashboard/
    └── Sidebar/
        └── sidebar.ts           # Configuração de sidebar por portal
```

### `src/data/` - Dados Estáticos

```
src/data/
├── mocks/
│   └── beneficiario-home-content.data.ts  # Dados mock (sliders, notícias, etc)
├── sidebarHighlights.ts         # Configuração de highlights do sidebar
└── mock-login/
    └── mock-login-fake.json     # Credenciais de teste e redirecionamentos
```

### `src/hooks/` - Custom Hooks

```
src/hooks/
└── hooks-UI-UX/
    ├── shared/
    │   └── use-dashboard-sidebar.hook.ts  # Detecta portal via pathname
    └── tela-login/
        └── LoginFormFields/
            └── loginFormFields.hook.ts    # Lógica de formulário de login
```

### `src/types/` - Tipagens TypeScript

```
src/types/
├── context/
│   └── tela-login/
│       └── portal-config.types.ts    # Tipos de configuração de portais
├── app/
│   └── tela-login/
│       └── portal-page.types.ts      # Tipos de props de pages
└── main-content/
    └── main-content-shell.types.ts   # Tipos de componentes (se necessário)
```

### `src/utils/` - Funções Utilitárias

```
src/utils/
└── (funções puras, sem estado)
```

---

## 5.1 Camada BFF (Backend For Frontend) - `src/app/api/`

**Responsabilidade:** Integração com APIs externas e lógica de backend

A pasta `src/app/api/` é uma **camada BFF** que funciona como intermediária entre o frontend e as APIs externas. Utiliza **Route Handlers** do Next.js para criar endpoints que:

- Recebem requisições do frontend
- Fazem chamadas para APIs externas
- Transformam/normalizam dados
- Retornam dados formatados para o frontend
- Gerenciam autenticação e autorização

### Estrutura da Camada BFF

```
src/app/api/
├── auth/
│   ├── login/
│   │   └── route.ts             # POST /api/auth/login
│   └── logout/
│       └── route.ts             # POST /api/auth/logout
│
├── beneficiario/
│   ├── protocolos/
│   │   └── route.ts             # GET /api/beneficiario/protocolos
│   ├── guias/
│   │   └── route.ts             # GET /api/beneficiario/guias
│   └── boletos/
│       └── route.ts             # GET /api/beneficiario/boletos
│
├── dentista/
│   ├── agendamentos/
│   │   └── route.ts             # GET /api/dentista/agendamentos
│   └── pacientes/
│       └── route.ts             # GET /api/dentista/pacientes
│
└── [portal]/
    └── [recurso]/
        └── route.ts             # Route handler genérico
```

### Exemplo de Route Handler

```typescript
// src/app/api/beneficiario/protocolos/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        // 1. Validar autenticação
        const token = request.headers.get('authorization')
        if (!token) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            )
        }

        // 2. Chamar API externa
        const response = await fetch('https://api.externa.com/protocolos', {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        })

        // 3. Normalizar dados
        const data = await response.json()
        const normalized = data.map(item => ({
            id: item.id,
            numero: item.protocol_number,
            data: item.created_at,
            status: item.status_code,
        }))

        // 4. Retornar dados formatados
        return NextResponse.json(normalized)
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar protocolos' },
            { status: 500 }
        )
    }
}
```

### Fluxo de Requisição BFF

```
Frontend (src/components/)
    ↓ (fetch)
src/app/api/[portal]/[recurso]/route.ts (BFF)
    ↓ (fetch)
API Externa
    ↓ (resposta)
BFF normaliza dados
    ↓ (resposta)
Frontend recebe dados formatados
```

### Vantagens da Camada BFF

- ✅ **Separação de Responsabilidades:** Frontend não conhece detalhes da API externa
- ✅ **Normalização de Dados:** Transforma dados da API para formato esperado pelo frontend
- ✅ **Segurança:** Tokens e credenciais ficam no servidor (não expostos no cliente)
- ✅ **Tratamento de Erros:** Centralizado no backend
- ✅ **Caching:** Possibilidade de implementar cache de requisições
- ✅ **Transformação de Dados:** Adapta resposta da API para necessidades do frontend

---

## 6. Fluxo de Renderização Completo

### Fluxo de Autenticação (Login)

```
1. Usuário acessa /
   ↓
2. src/app/page.tsx redireciona para /tela-login/beneficiario
   ↓
3. src/app/tela-login/layout.tsx (sem Sidebar/Topbar)
   ↓
4. src/app/tela-login/[portal]/page.tsx
   ├─ Renderiza SectionContentLeft
   └─ Renderiza SectionContentRight (formulário)
   ↓
5. useLoginFormFields hook valida credenciais
   ↓
6. Se válido, redireciona para /portal-beneficiario (via mock-login-fake.json)
```

### Fluxo de Dashboard (Autenticado)

```
1. Usuário acessa /portal-beneficiario
   ↓
2. src/app/layout.tsx (Root Layout)
   ├─ Setup HTML, fontes, metadados
   └─ Renderiza {children}
   ↓
3. src/app/(dashboard)/layout.tsx (Dashboard Layout)
   ├─ Renderiza <Sidebar />
   │  └─ use-dashboard-sidebar hook detecta portal via pathname
   ├─ Renderiza <Topbar />
   └─ Renderiza <main>{children}</main>
   ↓
4. src/app/(dashboard)/portal-beneficiario/page.tsx
   └─ Renderiza <BeneficiarioHomeContent />
   ↓
5. src/components/main-content/beneficiario/BeneficiarioHome.tsx
   ├─ Renderiza <SliderBanner /> (shared)
   ├─ Renderiza <ShortcutsSection /> (shared)
   ├─ Renderiza <NewsHighlightSection /> (shared)
   ├─ Renderiza <CardMeusProtocolos /> (shared)
   └─ Renderiza <CardMinhasGuias /> (shared)
   ↓
6. Componentes UI renderizam elementos HTML puros
```

---

## 7. Separação de Responsabilidades

### Camada 1: Root Layout (`src/app/layout.tsx`)

**Responsabilidade:** Setup global da aplicação

```tsx
- Configuração de metadados (title, description, favicon)
- Carregamento de fontes globais (Lato, Inter, Open Sans)
- Setup HTML/head/body com nonce (CSP)
- Renderização de {children}
```

**Necessário?** ✅ **SIM** - Obrigatório no Next.js App Router

---

### Camada 2: Root Page (`src/app/page.tsx`)

**Responsabilidade:** Rota raiz e orquestração inicial

```tsx
- Redireciona para /tela-login/beneficiario
- Evita página em branco na raiz
```

**Necessário?** ✅ **SIM** - Essencial para fluxo inicial

---

### Camada 3: Dashboard Layout (`src/app/(dashboard)/layout.tsx`)

**Responsabilidade:** Layout específico para rotas autenticadas

```tsx
- Renderiza Sidebar (navegação lateral)
- Renderiza Topbar (barra superior)
- Envolve {children} com estrutura flex (min-h-screen, layout 2-colunas)
```

**Necessário?** ✅ **SIM** - Essencial para:
- Aplicar layout específico apenas às rotas `/portal-*`
- Não renderizar Sidebar/Topbar em `/tela-login`
- Separação clara entre rotas autenticadas e públicas

---

### Camada 4: Portal Pages (`src/app/(dashboard)/portal-*/page.tsx`)

**Responsabilidade:** Renderizar conteúdo específico do portal

```tsx
- Importa componente Home do portal
- Renderiza apenas o conteúdo (sem Sidebar/Topbar)
- Deixa layout raiz gerenciar estrutura
```

**Exemplo:**
```tsx
import { BeneficiarioHomeContent } from '@/components/main-content/beneficiario/BeneficiarioHome'

export default function PortalBeneficiarioPage() {
    return <BeneficiarioHomeContent />
}
```

---

### Camada 5: Portal Home Components (`src/components/main-content/[portal]/*Home.tsx`)

**Responsabilidade:** Composição de UI para home do portal

```tsx
- Renderiza apenas JSX (sem lógica)
- Importa componentes shared
- Importa dados de src/data/mocks
- Aplica padding via Tailwind (p-[24px_32px_0px_32px])
```

**Exemplo:**
```tsx
export function BeneficiarioHomeContent() {
    return (
        <section className="w-full mx-auto p-[24px_32px_0px_32px]">
            <SliderBanner items={sliderItems} duration={SLIDER_DURATION} />
            <ShortcutsSection portal="beneficiario" shortcutIds={[...]} />
            {/* mais componentes */}
        </section>
    )
}
```

---

### Camada 6: Shared Components (`src/components/shared/*`)

**Responsabilidade:** Componentes reutilizáveis entre portais

```tsx
- Renderizam UI pura
- Recebem dados via props
- Importam componentes UI
- Podem usar hooks (se necessário para comportamento)
```

---

### Camada 7: UI Components (`src/components/ui/*`)

**Responsabilidade:** Componentes base sem lógica

```tsx
- Button, Input, Card, etc
- Apenas renderizam HTML + Tailwind
- Recebem props para customização
```

---

## 8. Fluxo de Dados

```
src/data/mocks/
    ↓ (importado por)
src/components/main-content/[portal]/*Home.tsx
    ↓ (renderizado por)
src/app/(dashboard)/portal-*/page.tsx
    ↓ (envolvido por)
src/app/(dashboard)/layout.tsx (Sidebar + Topbar)
    ↓ (envolvido por)
src/app/layout.tsx (HTML + fontes)
```

---

## 9. Fluxo de Lógica

```
src/hooks/
    ↓ (importado por)
src/components/shared/*
    ↓ (importado por)
src/components/main-content/[portal]/*Home.tsx
    ↓ (renderizado por)
src/app/(dashboard)/portal-*/page.tsx
```

---

## 10. Convenções de Nomenclatura

### Componentes

- **UI Components:** `Button.tsx`, `Input.tsx`, `Card.tsx`
- **Shared Components:** `SliderBanner.tsx`, `ShortcutsSection.tsx`
- **Portal Home Components:** `BeneficiarioHome.tsx`, `DentistaHome.tsx`
- **Portal Content Components:** `BoletosContent.tsx`, `CartoesContent.tsx`

### Funções Exportadas

- **Componentes:** `export function ComponentName() { ... }`
- **Hooks:** `export function useHookName() { ... }`
- **Utilitários:** `export function utilityName() { ... }`

### Tipos

- **Tipos de Props:** `ComponentNameProps`
- **Tipos de Contexto:** `ContextNameType`
- **Tipos de Dados:** `DataNameType`

---

## 11. Arquivos Necessários vs Desnecessários

| Arquivo | Necessário? | Motivo |
|---------|-----------|--------|
| `src/app/layout.tsx` | ✅ SIM | Setup global obrigatório |
| `src/app/page.tsx` | ✅ SIM | Rota raiz e redirecionamento inicial |
| `src/app/(dashboard)/layout.tsx` | ✅ SIM | Layout específico com Sidebar/Topbar |
| `src/components/main-content/MainContentShell.tsx` | ❌ NÃO | Apenas wrapper de padding, removido |

---

## 12. Próximas Etapas de Desenvolvimento

### Para cada novo portal:

1. **Criar página:** `src/app/(dashboard)/portal-[nome]/page.tsx`
   ```tsx
   import { [Nome]Home } from '@/components/main-content/[nome]/[Nome]Home'
   
   export default function Portal[Nome]Page() {
       return <[Nome]Home />
   }
   ```

2. **Criar componente Home:** `src/components/main-content/[nome]/[Nome]Home.tsx`
   ```tsx
   export function [Nome]Home() {
       return (
           <section className="w-full mx-auto p-[24px_32px_0px_32px]">
               {/* composição de componentes shared */}
           </section>
       )
   }
   ```

3. **Criar componentes de conteúdo:** `src/components/main-content/[nome]/[Conteudo]Content.tsx`
   ```tsx
   export function [Nome][Conteudo]Content() {
       return (
           <section className="w-full mx-auto p-[24px_32px_0px_32px]">
               {/* conteúdo específico */}
           </section>
       )
   }
   ```

4. **Atualizar configurações:**
   - `src/context/dashboard/Sidebar/sidebar.ts` - Adicionar items do sidebar
   - `src/data/sidebarHighlights.ts` - Adicionar highlights
   - `src/data/mock-login/mock-login-fake.json` - Adicionar credenciais e redirecionamento

---

## 13. Princípios Arquiteturais

### UI Separation Convention

- ✅ **Componentes em `main-content/` contêm APENAS JSX**
- ✅ **Lógica fica em `hooks/`, `utils/`, `context/`, `data/`, `types/`**
- ✅ **Imports permitidos:** `components/ui`, `components/shared`, `hooks`, `utils`, `data`, `context`, `types`
- ❌ **Imports proibidos:** Lógica complexa, estado direto, side-effects

### TypeScript Typing Convention

- ✅ **Todas as tipagens centralizadas em `src/types/`**
- ✅ **Props de componentes tipadas explicitamente**
- ✅ **Tipos como contratos entre camadas**
- ❌ **Proibido usar `any`**

---

## 14. Resumo Visual

```
┌─────────────────────────────────────────────────────────────┐
│                    src/app/layout.tsx                       │
│              (HTML, fontes, metadados globais)              │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼─────────────┐    ┌─────────▼──────────────┐
│  /tela-login        │    │  /(dashboard)          │
│  (layout público)   │    │  (layout autenticado)  │
└───────┬─────────────┘    └──────────┬──────────────┘
        │                             │
        │                    ┌────────┴────────┐
        │                    │                 │
        │            ┌───────▼────────┐  ┌────▼────────┐
        │            │ portal-*       │  │ Sidebar     │
        │            │ page.tsx       │  │ Topbar      │
        │            └───────┬────────┘  └─────────────┘
        │                    │
        │            ┌───────▼────────────────┐
        │            │ *Home.tsx              │
        │            │ (main-content)         │
        │            └───────┬────────────────┘
        │                    │
        │            ┌───────▼────────────────┐
        │            │ Shared Components      │
        │            │ (SliderBanner, etc)    │
        │            └───────┬────────────────┘
        │                    │
        │            ┌───────▼────────────────┐
        │            │ UI Components          │
        │            │ (Button, Card, etc)    │
        │            └────────────────────────┘
```

---

**Última atualização:** 30 de dezembro de 2025
