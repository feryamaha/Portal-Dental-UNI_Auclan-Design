# Convenção Oficial de Tipagens (TypeScript)

## 1. Visão Geral
Este repositório utiliza **Next.js + React + TypeScript**.

Neste projeto, **tipagens é um detalhe muito importante**: elas são tratadas como parte do **contrato de uso entre módulos**, sustentando a regra de negócio no sentido arquitetural (o que cada módulo aceita/retorna, o que pode ser combinado com o quê, e quais invariantes o código pressupõe).

A tipagem:
- Define e protege contratos de entrada/saída entre UI, contextos, hooks e camadas de dados.
- Reduz ambiguidade em componentes e integrações.
- Previne erros silenciosos (mudanças estruturais que compilam em JavaScript mas quebram em runtime).
- Acelera manutenção e onboarding ao tornar a intenção explícita.

## 2. Princípio Arquitetural de Tipagem
A filosofia adotada é baseada nos seguintes princípios:

- **UI deve ser o mais limpa possível**
  - Arquivos de UI devem priorizar JSX, layout visual e comportamento.
  - Tipagens reutilizáveis não devem “poluir” componentes com blocos de `type`/`interface` repetidos.

- **Tipagens representam contratos entre módulos**
  - Se um tipo é consumido por mais de um arquivo, ele define um contrato e deve ser centralizado.

- **Separação clara entre runtime (JS) e design-time (TS)**
  - A pasta `src/types` concentra o que é design-time (tipos/interfaces) para manter os módulos de runtime focados em comportamento.

- **Tipagens reutilizáveis vivem fora dos arquivos de UI**
  - Componentes reutilizáveis (`src/components/ui/**`, `src/components/shared/**`) devem **importar** tipagens.

## 3. Estrutura de Pastas de Tipagem
As tipagens reutilizáveis vivem em:

- `src/types/`

Estrutura típica (exemplos):
- `src/types/ui/`
  - Tipos/props de componentes de UI reutilizáveis.
- `src/types/shared/`
  - Tipos/props de componentes compartilhados (compostos por UI).
- `src/types/dashboard/`
  - Tipos/props de componentes estruturais/reutilizáveis do dashboard (quando aplicável).
- `src/types/context/`
  - Tipagens que representam contratos de contexto/configuração (design-time) e que podem ser re-exportadas por módulos runtime.
- `src/types/app/`
  - Tipos associados a páginas/rotas quando existirem contratos reutilizáveis (ex.: tipos exportados e consumidos por módulos externos à própria page).

### Convenção de nomes de arquivos
- Todo arquivo de tipagem deve terminar com **`.types.ts`**.
- O nome deve ser **kebab-case** e espelhar o domínio/pasta de origem.

Exemplos:
- `src/types/ui/breadcrumbs.types.ts`
- `src/types/ui/floating-label-input.types.ts`
- `src/types/shared/news-highlight-section.types.ts`
- `src/types/context/dashboard/sidebar.types.ts`

## 4. Regra Geral (Obrigatória)
Regra oficial do projeto:

- **Qualquer `type` ou `interface` reutilizável entre arquivos DEVE viver em `src/types`**.
- Arquivos de UI (`.tsx`) devem **apenas consumir** tipos via:
  - `import type { ... } from '...'`

Isso garante:
- Centralização de contratos.
- Facilidade de descoberta.
- Redução de duplicação e divergência.
- Melhora de legibilidade nos componentes.

## 5. Exceções Permitidas (Tipagem Inline)
### Exceção aprovada: layouts e entrypoints do Next.js
Arquivos como:
- `layout.tsx`
- `page.tsx`

São considerados **entrypoints estruturais**, acoplados ao filesystem, e **não componentes reutilizáveis**.

Neles, o `props` normalmente não é um contrato entre módulos, e sim um **detalhe local**.

Motivo técnico:
- Tipagem inline nesses casos:
  - comunica que o shape é local
  - evita criar símbolos globais “mortos” (tipos nomeados que ninguém reutiliza)
  - reduz acoplamento artificial

### Exemplo correto (inline permitido em layout)
```tsx
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
// Correto: o shape é local, não é contrato reutilizável.
```

### Exemplo incorreto (reutilizável inline dentro de UI)
```tsx
// ERRADO em componentes reutilizáveis de UI/shared
export function Button({ variant }: { variant: 'primary' | 'secondary' }) {
  return <button>{variant}</button>
}
// Incorreto: esse shape vira contrato reutilizável e deve ser nomeado e centralizado.
```

### Exemplo correto (reutilizável em src/types)
```ts
// src/types/ui/button.types.ts
export interface ButtonProps {
  variant: 'primary' | 'secondary'
}
```

```tsx
// src/components/ui/Button.tsx
import type { ButtonProps } from '@/types/ui/button.types'

export function Button({ variant }: ButtonProps) {
  return <button>{variant}</button>
}
```

## 6. Regras para Criação de Tipos
### Quando usar `type` vs `interface`
- **`interface`**
  - Preferível para **props** e objetos que podem ser estendidos/mesclados (ex.: `extends`, declaration merging).
- **`type`**
  - Preferível para:
    - Uniões (`'a' | 'b'`)
    - Composições com `&` / `|`
    - Tipos derivados (`Omit`, `Pick`, `ReturnType`, etc.)

Regra prática:
- Se o shape é um objeto simples de props: `interface XxxProps`.
- Se é uma composição/união: `type Xxx = ...`.

### Convenção de nomes
- Props de componentes: `XxxProps`
- Itens/linhas: `XxxItem`, `XxxEntry`, `XxxEvent`
- Configurações: `XxxConfig`
- Slugs/IDs/keys: `XxxSlug`, `XxxId`, `XxxKey`

### Proibição de duplicação de shapes
- Não duplicar shapes iguais/similares em vários arquivos.
- Se o shape já existe em `src/types`, ele deve ser **reutilizado**.

### Preferência por reutilização e composição
- Prefira compor tipos:
  - `type A = B & { ... }`
  - `type A = Omit<B, 'x'> & { ... }`
- Em vez de redefinir o mesmo shape em múltiplos lugares.

## 7. Proibição de uso de `any`
É **PROIBIDO** usar tipagem `any` neste projeto.

### Por que NÃO usar `any`
Segundo a documentação do TypeScript, o uso de `any` desativa completamente o sistema de tipos, eliminando verificação estática, autocomplete e detecção antecipada de erros. Em React e Next.js isso quebra contratos entre componentes, facilita bugs silenciosos em runtime e reduz drasticamente a segurança e a previsibilidade do código, indo contra o objetivo central do TypeScript: capturar erros antes de rodar a aplicação.

### Quando usar `any` (casos excepcionais)
`any` só é aceitável como último recurso temporário, geralmente em integração com bibliotecas sem tipagem, código legado ainda não tipado ou durante um spike/prova de conceito. A própria documentação recomenda tratá-lo como “escape hatch”, devendo ser isolado, documentado e substituído o quanto antes por tipos explícitos (`unknown`, generics ou tipos específicos).

## 8. Re-exportação de Tipos
Para manter compatibilidade e facilitar consumo, é permitido que arquivos de runtime **re-exportem** tipos vindos de `src/types`.

Exemplo:
```ts
// src/context/dashboard/Topbar/topbar.ts
export type { TopbarConfig } from '@/types/context/dashboard/topbar.types'
```

Isso permite:
- manter o mesmo ponto de import público (quando já existia)
- evitar acoplamento de consumidores a caminhos internos
- separar runtime de design-time sem quebrar contratos existentes

## 9. Comandos CLI Executados na Refatoração
Durante a refatoração estrutural de tipagens, foram utilizados comandos de validação e varredura.

### Typecheck
- `yarn tsc --noEmit`
  - Objetivo: validar que a migração não quebrou imports/exports e que os tipos continuam consistentes.
  - `--noEmit`: garante que nenhuma saída de build seja gerada (validação apenas).

### Varreduras e buscas
Foram feitas varreduras/buscas para localizar declarações `type`/`interface` e imports:
- buscas via IDE
- buscas via ferramentas de grep/rg

Objetivo:
- localizar tipagens dentro de `.tsx`
- confirmar que foram removidas dos componentes e centralizadas em `src/types`

## 10. Validação e Garantias
Durante a migração, foram adotadas garantias explícitas:

- **Sem mudança de runtime**
  - Nenhuma regra de negócio (JSX, handlers, efeitos, lógica) foi alterada.

- **Refatoração apenas de design-time (TypeScript)**
  - A mudança foi restrita a:
    - mover `type`/`interface` para `src/types`
    - ajustar `import type` / `export type`

- **Typecheck**
  - Rodado `yarn tsc --noEmit` para garantir que a base continuou compilando.

## 11. Benefícios para Escalabilidade
A centralização de tipagens em `src/types` traz benefícios diretos:

- **Onboarding**
  - Novos devs sabem onde encontrar contratos e props.

- **Leitura de código**
  - Componentes ficam mais focados em UI/comportamento.

- **Manutenção**
  - Mudanças de contrato são feitas em um único lugar.

- **Crescimento da dashboard**
  - Menos duplicação e divergência conforme o número de módulos aumenta.

- **Redução de bugs silenciosos**
  - Alterações estruturais passam a quebrar em compile-time, não em runtime.

## 12. Conclusão
Este documento define a **CONVENÇÃO OFICIAL** de tipagens TypeScript deste repositório.

Regras a cumprir em novas features:
- Tipos reutilizáveis devem ser definidos em `src/types/**`.
- UI/shared devem consumir tipos via `import type`.
- Entry points do Next (`layout.tsx`/`page.tsx`) podem usar tipagem inline como exceção aprovada.

Qualquer mudança nesta convenção deve ser discutida e documentada, pois impacta arquitetura, manutenção e onboarding.
