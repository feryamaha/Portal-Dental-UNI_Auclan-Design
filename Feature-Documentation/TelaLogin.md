# Tela de Login - Arquitetura Completa

## Status: FUNCIONAL E PRONTO PARA INTEGRAÇÃO COM API

Data de documentação: 07 de janeiro de 2026

---

## Sumário Executivo

Este documento descreve a arquitetura completa do ecossistema de telas de login para os portais da Dental UNI. O sistema foi projetado seguindo princípios de **Clean Architecture**, **separação de responsabilidades** e **reutilização de código**.

**Portais Suportados:**
- ✅ Beneficiário (CPF/Cartão)
- ✅ Dentista (UF + CRO)
- ✅ Comercial (Código)
- ✅ Empresa (Código)
- ✅ Representante (Código)

---

## Arquitetura de Pastas

```
src/
├── app/
│   └── tela-login/
│       └── [portal]/
│           └── page.tsx                    # Server Component - Renderiza layout
├── components/
│   └── shared-tela-login/
│       ├── SectionContentLeft.tsx          # Seção esquerda (hero)
│       ├── SectionContentRight.tsx         # Seção direita (formulário)
│       ├── LoginFormHeader.tsx             # Cabeçalho do formulário
│       ├── LoginFormFields.tsx             # Renderizador de campos
│       ├── LoginDentistaFields.tsx         # Componente customizado para dentista
│       ├── TermoPoliticaUso.tsx            # Footer com termos
│       └── PortalTypeLabel.tsx             # Label do tipo de portal
├── hooks/
│   └── tela-login/
│       ├── useLoginFormFields.hook.ts      # Lógica de validação e submissão
│       └── usePortalPageTelaLoginPortais.hook.tsx  # Mapeamento de renderers
├── types/
│   ├── app/
│   │   └── tela-login/
│   │       └── portal-page.types.ts        # Tipos de props da página
│   ├── data/
│   │   └── portal-config.types.ts          # Tipos de configuração de portal
│   └── tela-login/
│       ├── login-form-fields.types.ts      # Tipos de campos do formulário
│       └── section-content-right.types.ts  # Tipos de props do componente
├── data/
│   ├── portal-config.ts                    # Configuração de cada portal
│   └── mock-login/
│       └── mock-login-fake.json            # Credenciais de teste (será API)
└── utils/
    ├── tela-login-validation.helpers.ts    # Schemas Zod de validação
    ├── input-mask.helpers.ts               # Máscaras de entrada
    └── brazil-states-options.helpers.ts    # Opções de estados brasileiros
```

---

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. ROTA: /tela-login/[portal]                                   │
│    └─> page.tsx (Server Component)                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. CARREGAMENTO DE CONFIGURAÇÃO                                 │
│    └─> getPortalConfig(slug) → portal-config.ts                │
│        Retorna: fields[], portalType, labels, etc.             │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. RENDERIZAÇÃO: SectionContentRight                            │
│    └─> usePortalPageTelaLoginPortais(fields)                   │
│        Mapeia customRenderer → componentes React                │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. RENDERIZAÇÃO: LoginFormFields                                │
│    └─> Itera sobre fields mapeados                              │
│        Para cada field:                                         │
│        - Se tem render() → renderiza customRenderer             │
│        - Senão → renderiza FloatingLabelInput padrão            │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. INTERAÇÃO DO USUÁRIO                                         │
│    └─> onChange → handleChange (useLoginFormFields)             │
│        Atualiza: values = { login, password, ... }             │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. SUBMISSÃO: onSubmit → handleSubmit                           │
│    ├─> Validação com Zod (schema específico do portal)          │
│    ├─> Normalização de valores (ex: UF+CRO → login)            │
│    ├─> Comparação com credenciais (mock ou API)                │
│    └─> Redirecionamento ou erro                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Componentes Principais

### 1. **page.tsx** - Server Component
**Responsabilidade:** Renderizar layout e carregar configuração

```typescript
export default async function TelaLoginPortalPage({ params }: TelaLoginPortalPageProps) {
    const { portal } = await params
    const slug = portal?.toLowerCase()
    const config = getPortalConfig(slug)
    
    if (!config) notFound()
    
    return (
        <section>
            <SectionContentLeft portalLabel={config.heroLabel} />
            <SectionContentRight
                portalType={config.portalType}
                fields={config.fields}
                forgotHref={config.forgotHref}
                forgotLabel={config.forgotLabel}
                ctaLabel={config.ctaLabel}
            />
        </section>
    )
}
```

**Props de entrada:**
- `params.portal`: string (slug do portal)

**Saída:**
- Passa `config.fields` para `SectionContentRight`

---

### 2. **SectionContentRight.tsx** - Client Component
**Responsabilidade:** Orquestrar hooks e passar dados para formulário

```typescript
export default function SectionContentRight({
    portalType,
    fields,
    forgotHref,
    forgotLabel,
    ctaLabel,
}: SectionContentRightProps) {
    const mappedFields = usePortalPageTelaLoginPortais(fields)
    const { handleSubmit, handleChange, error, isSubmitting } = useLoginFormFields(portalType)
    
    return (
        <LoginFormFields
            fields={mappedFields}
            onSubmit={handleSubmit}
            onFieldChange={handleChange}
            errorMessage={error}
            isSubmitting={isSubmitting}
        />
    )
}
```

**Responsabilidades:**
1. Mapear campos com renderers customizados
2. Inicializar hook de validação
3. Passar callbacks para formulário

---

### 3. **LoginFormFields.tsx** - Client Component
**Responsabilidade:** Renderizar campos dinamicamente

```typescript
export default function LoginFormFields({
    fields,
    onSubmit,
    onFieldChange,
    errorMessage,
    isSubmitting,
}: LoginFormFieldsProps) {
    return (
        <form onSubmit={onSubmit}>
            {fields.map((field) => (
                <div key={field.id}>
                    {field.render ? (
                        field.customRenderer === 'dentistaDocuments' ? (
                            <LoginDentistaFields onFieldChange={onFieldChange} />
                        ) : (
                            field.render()
                        )
                    ) : (
                        <FloatingLabelInput
                            label={field.label}
                            name={field.name}
                            onChange={onFieldChange?.(field.name)}
                            {...field.inputProps}
                        />
                    )}
                </div>
            ))}
            {errorMessage && <p>{errorMessage}</p>}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando...' : 'Acessar'}
            </Button>
        </form>
    )
}
```

**Lógica:**
- Itera sobre `fields`
- Se `field.render` existe → renderiza componente customizado
- Senão → renderiza `FloatingLabelInput` padrão
- Passa `onFieldChange` para capturar valores

---

### 4. **LoginDentistaFields.tsx** - Componente Customizado
**Responsabilidade:** Renderizar campos específicos de dentista (UF + CRO)

```typescript
export function LoginDentistaFields({ onFieldChange }: LoginDentistaFieldsProps) {
    const [uf, setUF] = useState('')
    const [cro, setCRO] = useState('')

    const handleUFChange = (value: string) => {
        setUF(value)
        const croNumbers = cro.replace(/\D/g, '')
        const concatenated = croNumbers ? `${value}-${croNumbers}` : ''
        onFieldChange?.('login')?.(
            { target: { value: concatenated, name: 'login' } }
        )
    }

    const handleCROChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const croValue = event.target.value
        const croNumbers = croValue.replace(/\D/g, '')
        setCRO(croNumbers)
        const concatenated = uf && croNumbers ? `${uf}-${croNumbers}` : ''
        onFieldChange?.('login')?.(
            { target: { value: concatenated, name: 'login' } }
        )
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            <DropInput
                label="UF"
                name="uf"
                options={brazilStatesOptions}
                onChange={handleUFChange}
            />
            <FloatingLabelInput
                label="CRO"
                name="cro"
                placeholder="12345"
                mask="cro"
                onlyNumbers={true}
                onChange={handleCROChange}
            />
        </div>
    )
}
```

**Lógica especial:**
- Captura UF do dropdown
- Captura CRO (apenas números)
- Concatena como `UF-CRO` no campo `login`
- Envia para o hook de validação

---

## Regras de Negócio

### 1. **Nomes de Campos Padronizados**

Todos os portais usam **`login`** como nome do campo principal:

| Portal | Campo Visual | Campo Interno | Formato |
|--------|---|---|---|
| **Beneficiário** | CPF/Cartão | `login` | `XXX.XXX.XXX-XX` |
| **Dentista** | UF + CRO | `login` | `XX-00000` |
| **Comercial** | Código | `login` | Livre |
| **Empresa** | Código | `login` | Livre |
| **Representante** | Código | `login` | Livre |

**Razão:** O hook `useLoginFormFields` sempre espera um campo chamado `login` para validação e comparação com credenciais.

---

### 2. **Validação em Camadas**

```
Entrada do Usuário
    ↓
Máscara de Entrada (input-mask.helpers.ts)
    ↓
Validação Zod (tela-login-validation.helpers.ts)
    ↓
Normalização (normalizeLoginValue)
    ↓
Comparação com Credenciais
    ↓
Redirecionamento ou Erro
```

---

### 3. **Fluxo de Autenticação**

```typescript
// 1. Usuário preenche formulário
values = { login: "SP-12345", password: "dentista" }

// 2. Validação Zod
const validationResult = dentistaLoginSchema.safeParse(values)
// Valida: login matches /^[A-Z]{2}-\d{5}$/ ✅

// 3. Normalização
const loginValue = normalizeLoginValue('dentista', values)
// Retorna: "SP-12345"

// 4. Comparação com credenciais
const isValid = loginValue === credentials.login && 
                passwordValue === credentials.password
// "SP-12345" === "SP-12345" ✅
// "dentista" === "dentista" ✅

// 5. Redirecionamento
router.push(credentials.redirect)  // /portal-dentista
```

---

## Configuração de Portais

### Arquivo: `src/data/portal-config.ts`

```typescript
export const portalConfigRecord = {
    beneficiario: {
        portalType: 'beneficiario',
        heroLabel: 'Beneficiários',
        fields: [
            {
                id: 'beneficiario-id',
                label: 'Número do seu cartão ou CPF',
                name: 'login',  // ⚠️ SEMPRE 'login'
                placeholder: '',
                allowAllCharacters: true,
                inputProps: {
                    mask: 'cpf',
                },
            },
            {
                id: 'beneficiario-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: '',
            },
        ],
    },
    dentista: {
        portalType: 'dentista',
        heroLabel: 'Dentista',
        fields: [
            {
                id: 'dentista-docs',
                label: 'Documentos',
                name: 'login',  // ⚠️ SEMPRE 'login'
                customRenderer: 'dentistaDocuments',  // Renderiza LoginDentistaFields
            },
            {
                id: 'dentista-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: '',
            },
        ],
    },
    // ... outros portais
}
```

**Propriedades de Field:**
- `id`: Identificador único
- `label`: Rótulo exibido
- `name`: Nome do campo (deve ser `login` para campo principal)
- `placeholder`: Placeholder do input
- `type`: Tipo de input (text, password, etc.)
- `mask`: Máscara de entrada (cpf, cro, etc.)
- `customRenderer`: Renderizador customizado (ex: 'dentistaDocuments')
- `allowAllCharacters`: Permite todos os caracteres
- `onlyNumbers`: Apenas números
- `inputProps`: Props adicionais para FloatingLabelInput

---

## ✅ Validação com Zod

### Arquivo: `src/utils/tela-login-validation.helpers.ts`

```typescript
// Beneficiário
export const beneficiarioLoginSchema = z.object({
    login: z
        .string()
        .min(1, 'CPF ou número do cartão é obrigatório')
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato XXX.XXX.XXX-XX'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória'),
})

// Dentista
export const dentistaLoginSchema = z.object({
    login: z
        .string()
        .min(1, 'UF e CRO são obrigatórios')
        .refine(
            (val) => /^[A-Z]{2}-\d{5}$/.test(val),
            'CRO deve estar no formato 00000'
        ),
    password: z
        .string()
        .min(1, 'Senha é obrigatória'),
})

// Comercial, Empresa, Representante (simples)
export const comercialLoginSchema = z.object({
    login: z
        .string()
        .min(1, 'Código é obrigatório'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória'),
})
```

**Padrão:**
- Sempre validar `login` e `password`
- Usar `.refine()` para validações customizadas
- Mensagens de erro em português

---

## Máscaras de Entrada

### Arquivo: `src/utils/input-mask.helpers.ts`

```typescript
export function applyMask(value: string, mask?: string): string {
    if (!mask) return value
    
    switch (mask) {
        case "cpf":
            // XXX.XXX.XXX-XX
            return digits
                .replace(/^(\d{3})(\d)/, "$1.$2")
                .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1-$2")
                .substring(0, 14)
        
        case "cro":
            // Apenas números (5 dígitos)
            const croDigits = value.replace(/\D/g, '')
            return croDigits.substring(0, 5)
        
        // ... outras máscaras
    }
}
```

**Máscaras disponíveis:**
- `cpf`: `XXX.XXX.XXX-XX`
- `cro`: `00000` (apenas números)
- `phone`: `(XX) XXXXX-XXXX`
- `cep`: `XXXXX-XXX`
- `cnpj`: `XX.XXX.XXX/XXXX-XX`

---

## Credenciais (Mock vs API)

### Arquivo: `src/data/mock-login/mock-login-fake.json`

**Estrutura:**
```json
{
    "beneficiario": {
        "login": "111.222.333-44",
        "password": "beneficiario",
        "redirect": "/portal-beneficiario"
    },
    "dentista": {
        "login": "SP-12345",
        "password": "dentista",
        "redirect": "/portal-dentista"
    },
    // ... outros portais
}
```

**Propriedades:**
- `login`: Credencial de login (deve corresponder ao formato validado)
- `password`: Credencial de senha
- `redirect`: URL para redirecionamento após sucesso

---

## Integração com API

### Implementação Atual (Mock com Cookies)

```typescript
// src/hooks/tela-login/useLoginFormFields.hook.ts
if (isValid) {
    // Gera token (em produção virá da API)
    const token = btoa(JSON.stringify({ portal, login: loginValue, timestamp: Date.now() }))
    document.cookie = `authToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`
    document.cookie = `portalType=${portal}; path=/; max-age=${7 * 24 * 60 * 60}`
    router.push(credentials.redirect)
}
```

### Para Integração com API

Substitua a lógica acima por:

```typescript
const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        portal,
        login: normalizeLoginValue(portal, values),
        password: values.password,
    }),
})

if (!response.ok) {
    const errorData = await response.json()
    setError(errorData.message || 'Erro ao autenticar')
    return
}

const data = await response.json()
// ✅ Token é salvo automaticamente no cookie via Set-Cookie header
router.push(data.redirect || `/portal-${portal}`)
```

**Endpoints necessários:**
- `POST /api/auth/login` → Valida credenciais, retorna token em HTTP-Only cookie
- `POST /api/auth/logout` → Limpa cookie de autenticação
- `GET /api/auth/me` → Verifica se usuário está autenticado



**Detalhes completos em:** `Feature-Documentation/Autenticacao-ProtecaoRotas.md`

---

## Tipos TypeScript

### Arquivo: `src/types/tela-login/login-form-fields.types.ts`

```typescript
export type LoginFieldConfig = {
    id: string
    label: string
    name: string
    placeholder?: string
    type?: string
    className?: string
    allowAllCharacters?: boolean
    inputProps?: Omit<React.ComponentProps<typeof FloatingLabelInput>, 'label' | 'name'>
    render?: () => ReactNode
    customRenderer?: string
}

export type LoginFormFieldsProps = {
    fields: LoginFieldConfig[]
    forgotLabel?: string
    forgotHref?: string
    ctaLabel?: string
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
    onFieldChange?: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
    errorMessage?: string | null
    isSubmitting?: boolean
}
```

### Arquivo: `src/types/data/portal-config.types.ts`

```typescript
export type PortalFieldCustomRenderer = 'dentistaDocuments'

export type PortalFieldConfig = {
    id: string
    label: string
    name: string
    placeholder?: string
    type?: string
    className?: string
    allowAllCharacters?: boolean
    customRenderer?: PortalFieldCustomRenderer
    inputProps?: LoginFieldConfig['inputProps']
}

export type PortalConfig = {
    portalType: PortalType
    heroLabel: string
    fields: PortalFieldConfig[]
    forgotHref?: string
    forgotLabel?: string
    ctaLabel?: string
}

export type PortalSlug = 'beneficiario' | 'dentista' | 'comercial' | 'empresa' | 'representante'
```

---

## Fluxo Completo de Exemplo: Login de Dentista

```
1. Usuário acessa: http://localhost:3000/tela-login/dentista
   └─> page.tsx carrega config para 'dentista'

2. SectionContentRight renderiza:
   ├─> usePortalPageTelaLoginPortais mapeia fields
   │   └─> customRenderer 'dentistaDocuments' → LoginDentistaFields
   └─> useLoginFormFields inicializa com portal='dentista'

3. LoginFormFields renderiza:
   ├─> LoginDentistaFields (customizado)
   │   ├─> DropInput para UF
   │   └─> FloatingLabelInput para CRO
   └─> FloatingLabelInput para Senha

4. Usuário interage:
   ├─> Seleciona UF: "SP"
   │   └─> handleUFChange → concatena "SP-" + cro
   ├─> Digita CRO: "12345"
   │   └─> handleCROChange → concatena "SP-" + "12345"
   └─> Digita Senha: "dentista"

5. Usuário clica "Acessar":
   └─> handleSubmit executa:
       ├─> Validação Zod: dentistaLoginSchema.safeParse(values)
       │   └─> Valida: login matches /^[A-Z]{2}-\d{5}$/
       ├─> Normalização: normalizeLoginValue('dentista', values)
       │   └─> Retorna: "SP-12345"
       ├─> Comparação com credenciais:
       │   ├─> "SP-12345" === "SP-12345" ✅
       │   └─> "dentista" === "dentista" ✅
       └─> router.push('/portal-dentista')

6. Usuário redirecionado para dashboard
```

---

## Resumo de Arquivos Críticos

| Arquivo | Responsabilidade |
|---------|---|
| `page.tsx` | Renderizar layout |
| `SectionContentRight.tsx` | Orquestrar hooks |
| `LoginFormFields.tsx` | Renderizar campos |
| `LoginDentistaFields.tsx` | Campos de dentista (UF + CRO) |
| `useLoginFormFields.hook.ts` | Validação e submissão |
| `portal-config.ts` | Configuração de portais |
| `tela-login-validation.helpers.ts` | Schemas Zod |
| `input-mask.helpers.ts` | Máscaras de entrada |
| `middleware.ts` | Proteção de rotas |

---

## Conclusão

A arquitetura está **funcional e pronta para integração com API**. 

**Mudanças necessárias para API:**
- Substituir lógica de mock por chamada HTTP em `useLoginFormFields.hook.ts`
- Criar 3 endpoints: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- Usar HTTP-Only cookies para segurança

Veja `Feature-Documentation/Autenticacao-ProtecaoRotas.md` para detalhes de implementação.

