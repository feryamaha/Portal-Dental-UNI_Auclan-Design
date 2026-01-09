# Convenção Oficial de UI (Separação de Responsabilidades)

## 1. Visão Geral

Este repositório utiliza **Next.js + React + TypeScript**.

Neste projeto, arquivos de UI (principalmente `.tsx`) seguem um princípio arquitetural rígido:

- **UI é apenas UI (renderização)**
- Lógica (estado, efeitos, regras e helpers) vive fora do componente, em camadas próprias.

O objetivo desta convenção é garantir:

- Componentes mais previsíveis e fáceis de ler.
- Reutilização de lógica (sem duplicação).
- Separação clara de responsabilidades entre UI, hooks, utils e context.

---

## 2. Princípio Arquitetural (Obrigatório)

- **UI (`.tsx`)**
  - Responsável por JSX, classes/estilos e renderização.
  - Pode conter condicionais puramente visuais.
  - Pode conter handlers simples que apenas delegam.

- **Hooks (`src/hooks/**`)**
  - Estado e side-effects (`useState`, `useEffect`, `useMemo` quando for regra de composição de dados).
  - Integração com context.
  - Orquestração de eventos e fluxos.

- **Utils / Libs (`src/utils/**` e `src/libs/**`)**
  - Helpers puros (normalização, cálculos, parsing, formatação).
  - Funções reutilizáveis sem dependência de UI.

- **Tipagens (`src/types/**`)**
  - Contratos de entrada/saída (design-time).
  - **Proibido mover tipagens para dentro da UI**.

---

## 3. Regra Geral (Obrigatória)

- Arquivos `.tsx` de UI devem **consumir**:
  - hooks (`src/hooks/**`)
  - utils/libs (`src/utils/**`, `src/libs/**`)
  - data (`src/data/**`)
  - context (`src/context/**`)
  - types (`src/types/**`)

E devem evitar implementar lógica de negócio dentro do próprio componente.

---

## 4. O que é considerado “NÃO UI” (deve sair do `.tsx`)

### 4.1 Estado e efeitos
- `useState` / `useEffect` que controlam fluxos.
- timers, listeners globais, click-outside, escape key.
- composição/normalização de dados de domínio.

### 4.2 Regras e helpers
- parsing de erros (ex.: estruturas do React Hook Form).
- máscaras, validações de entrada, normalização.
- regras condicionais de domínio.

---

## 5. O que pode permanecer no `.tsx`

- JSX.
- classes e composição visual (ex.: `clsx`, `twMerge`, Tailwind).
- imports de hooks/utils/data/context/types.
- handlers simples (delegando para hooks).

---

## 6. Processo obrigatório ao criar/alterar UI

Antes de criar qualquer arquivo novo:

1. Verificar se a responsabilidade já existe em:
   - `src/hooks/**`
   - `src/utils/**`
   - `src/libs/**`
   - `src/data/**`
   - `src/context/**`
2. Reutilizar o que existir.
3. Só criar arquivo novo se realmente não existir nada equivalente.
4. Exportar mantendo contratos públicos (sem renomear contratos existentes).

---

## 7. Proibições

- **PROIBIDO usar `any`.**
- **PROIBIDO duplicar lógica.**
- **PROIBIDO mover tipagens para fora de `src/types`.**
- **PROIBIDO alterar contratos públicos sem alinhamento (tipos, props, exports).**

---

## 8. Convenções de nomes (padrão do repositório)

- Hooks:
  - `use-<feature>.hook.ts`
- Helpers:
  - `*.helpers.ts`
- Logic:
  - `*.logic.ts`

O nome do arquivo deve refletir a responsabilidade.
