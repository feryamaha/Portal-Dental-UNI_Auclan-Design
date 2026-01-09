# Tela de Login – Regra de Negócio e Arquitetura

Este documento mapeia todo o ecossistema da rota **`/tela-login/[portal]`** (Next.js App Router) e descreve as regras que mantêm o layout, o fluxo e a experiência nessa tela de login para o Portal.

---

## 1. Rotas e Estrutura de App Router

### Estrutura de Pastas do Ecossistema
```
src/
└── app/
    └── tela-login/
        ├── layout.tsx
        └── [portal]/page.tsx
└── components/
    └── tela-login/
        ├── SectionContentLeft.tsx
        ├── SectionContentRight.tsx
        ├── LoginFormHeader.tsx
        ├── LoginFormFields.tsx
        ├── LoginDentistaFields.tsx
        ├── PortalTypeLabel.tsx
        └── TermoPoliticaUso.tsx
└── context/
    └── tela-login/
        └── portalConfig.ts
└── hooks/
    └── hooks-UI-UX/
        └── tela-login/
            └── LoginFormFields/
                └── loginFormFields.hook.ts
└── data/
    └── mock-login/
        └── mock-login-fake.json
```

| Arquivo | Responsabilidade |
| --- | --- |
| `src/app/tela-login/[portal]/page.tsx` | Server Component que orquestra os dois blocos principais, obtém a configuração do portal e envia os campos renderizados para o painel direito. |
| `src/app/tela-login/layout.tsx` | Layout dedicado ao domínio `/tela-login/*`. Define fontes oficiais (Inter, Lato, Open Sans), aplica `nonce` vindo do middleware e garante a estrutura completa `<html><head><body>`. |
| `src/app/tela-login` | Diretório que concentra o layout e a rota dinâmica `[portal]`. Não existe `page.tsx` genérico; todo acesso deve informar um portal válido. |

### Regras do Server Component
1. Recebe `params.portal`, converte para slug e busca a configuração através de `getPortalConfig`.
2. Caso o portal não exista, dispara `notFound()` (Next.js) → responde 404.
3. Mapeia `PortalFieldConfig` em `LoginFieldConfig`. Campos que possuem `customRenderer` (ex.: `dentistaDocuments`) são substituídos por funções React customizadas (ex.: `LoginDentistaFields`).
4. Renderiza `<SectionContentLeft />` e `<SectionContentRight />` dentro de `<section className="min-h-screen ...">`. A classe `@laptop:flex` garante coluna no mobile e duas colunas no desktop.

---

## 2. Configurações Dinâmicas

Arquivo central: `src/context/tela-login/portalConfig.ts`

| Campo | Descrição |
| --- | --- |
| `portalType` | Tipo semântico usado em `PortalTypeLabel` e para escolher cópias. |
| `heroLabel` | Texto exibido no hero (SectionContentLeft). |
| `fields` | Array de campos com `id`, `label`, `name`, `inputProps`, `customRenderer`. |
| `forgotHref/forgotLabel/ctaLabel` | Personalização por portal para links auxiliares. |

Portais mapeados atualmente: `beneficiario`, `dentista`, `corretor`, `empresa`, `representante`. 
Novos portais exigem apenas incluir um item em `portalConfigRecord`.

---

## 3. Fluxo de Credenciais (Mock atual vs API definitiva)

- **Origem atual:** `mock-login-fake.json` armazena um par `login/password/redirect` por portal. É usado apenas para prototipação interna.
- **Comportamento esperado em produção:** antes de subir, o mock precisa ser removido e o `handleSubmit` deve consultar a API real de autenticação (mesmo contrato `login`, `password`). Toda credencial deve ser validada contra a base oficial.
- **Consequência:** nada permanece estático; todos os dados exibidos/validados no formulário deverão ser consumidos via API quando o backend estiver pronto.

### Hook `useLoginFormFields`

Arquivo: `src/hooks/hooks-UI-UX/tela-login/LoginFormFields/loginFormFields.hook.ts`

1. **`useLoginFormFields(portalSlug)`**
   - Mantém `values`, `error`, `isSubmitting`.
   - `handleChange` atualiza os campos dinamicamente.
   - `handleSubmit` **(mock atual)** compara as credenciais digitadas com o arquivo estático.  
     - Se bater, redireciona (`router.push(credentials.redirect)`).
     - Caso contrário, mostra mensagem “Dados inválidos”.
   - `handleSubmit` **(versão definitiva)** deve chamar a API oficial, verificar resposta, gerir tokens/sessão e só então redirecionar.
   - `PortalSlug` é importado do contexto de configuração para garantir tipagem rígida.

> **Importante:** hoje não existe integração real com API; o hook serve para prototipação / UX. Antes de produção, TODO o fluxo de credenciais precisa consumir a base oficial.

---

## 4. Componentes de Layout

### 4.1 `SectionContentLeft.tsx`
- Branding, slogan e label do portal.
- Mobile: `w-full` cobrindo toda a viewport como background.
- Desktop (`@laptop`): volta para `w-1/2`, com padding lateral específico e `flex-shrink-0` para garantir divisão exata.

### 4.2 `SectionContentRight.tsx`
- Modal/controller do formulário.
- Mobile:
  - Overlay `fixed inset-0` com `rgba(58,58,58,0.58)` e `backdrop-blur`.
  - Card centralizado (`w-[90%]` → `@mobile:w-[70%]`) com padding consistente.
- Desktop:
  - Remove overlay, volta a ser `relative`, `w-1/2`, `h-screen`.
  - Padding `p-[48px_32px_32px_48px]`, conteúdo limitado a `@laptop:w-[420px]`.
- Subáreas:
  1. **Topo:** botão “Voltar para o site”.
  2. **Conteúdo principal:** `LoginFormHeader`, `LoginFormFields`, CTA e links.
  3. **Rodapé:** `TermoPoliticaUso`.

### 4.3 Componentes internos
- `LoginFormHeader`: título “Entrar” + `PortalTypeLabel`.
- `LoginFormFields`: lê o array de configs e renderiza `FloatingLabelInput` ou `render()` custom.
- `LoginDentistaFields`: controla UF + CRO (2 colunas).
- `TermoPoliticaUso`: texto responsivo; centralizado no mobile e alinhado à esquerda no desktop.

---

## 5. Fluxo de Campos e Validações

| Portal | Campos | Observações |
| --- | --- | --- |
| Beneficiário | `login (CPF ou cartão)`, `password` | `mask: cpf`, aceita números do cartão. |
| Dentista | `UF + CRO` (custom renderer), `password` | Render custom `LoginDentistaFields`. |
| Empresa | `code`, `password` | Sem máscara. |
| Corretor / Representante | `code`, `password` | Ambos seguem configuração simples. |

As validações atuais são básicas (presença dos campos). Formatos específicos (CPF, CNPJ, CRO) dependem das máscaras definidas em `inputProps`.

---

## 6. Navegação e ações auxiliares

- **Origem:** o acesso a `/tela-login/[portal]` parte do site institucional (header da Dental UNI). Ao clicar em “Entrar”, o usuário escolhe o portal (Beneficiário, Dentista, Corretor, Empresa ou Representante). O link abre diretamente o slug correspondente (ex.: `/tela-login/dentista`), carregando o formulário correto já na chegada. Caso selecione o portal errado, basta usar o botão “Voltar para o site” e escolher novamente.
- **Voltar para o site:** link fixo (`https://dental-uni-auclan-institucional-v0.vercel.app/`).
- **Esqueci a senha / Desbloqueie o cartão:** os `href`/labels vêm do `PortalConfig`.
- **Termos e políticas:** botões estilizados apontando para placeholders. Devem ser trocados por URLs reais quando o conteúdo existir.

---

## 7. Responsividade e Breakpoints

Arquivo: `tailwind.config.ts`

- Breakpoints customizados `@mobile`, `@tablet`, `@laptop`, `@Desktop` etc. agora usam **`min-width`**.
- Regras principais:
  - Mobile (<1025px): SectionContentLeft vira background; SectionContentRight aparece como modal.
  - Desktop (≥1025px): ambos voltam a dividir 50/50; o container `<section>` ativa `flex`.

---

## 8. Segurança e Layout

- **Layout específico (`layout.tsx`):** replica o comportamento do `RootLayout`, aplicando `nonce` em `<head>` e `<body>` para manter CSP estável.
- **Middleware:** gera `X-Nonce` e define CSP (documentado em `docs/docs-refactor/05_PR-FIX-Bypass-CSP-Desenvolvimento.md`). Nenhum ajuste extra é necessário dentro da feature.

---

## 9. Resumo

1. **Layout**: controlado por `SectionContentLeft/Right` + classes Tailwind customizadas.
2. **Configuração de campos**: centralizada em `portalConfig`.
3. **Estado / submissão**: hook `useLoginFormFields` com mock local (sem backend real).
4. **Responsividade**: modal no mobile, split-screen no desktop, obedecendo pixel perfect do Figma.

Esse documento deve ser mantido sempre que um novo portal, quebra de layout ou regra de navegação for introduzida.
