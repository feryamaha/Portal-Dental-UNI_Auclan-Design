# Titulo da PR
Pixel perfect + responsividade da tela de login

## Objetivo

Aplicar, de forma estritamente visual, o alinhamento pixel perfect do Figma e tornar a tela de login totalmente responsiva. 

## Arquivos Afetados

- `src/app/tela-login/[portal]/page.tsx`
- `src/app/tela-login/layout.tsx`
- `src/components/tela-login/SectionContentLeft.tsx`
- `src/components/tela-login/SectionContentRight.tsx`
- `src/components/tela-login/LoginFormFields.tsx`
- `src/components/tela-login/TermoPoliticaUso.tsx`
- `src/components/tela-login/LoginDentistaFields.tsx`
- `tailwind.config.ts`

## Melhorias Implementadas

1. **Renomeação dos containers principais**
   - `LoginHero` e `LoginFormPanel` passaram a se chamar `SectionContentLeft` e `SectionContentRight`, deixando claro que são os blocos estruturais da tela.
   - `DentistaDocumentsFields` foi renomeado para `LoginDentistaFields`, mantendo a mesma linguagem dos demais componentes.

2. **SectionContentLeft**
   - Mobile-first: ocupa 100% da largura como background.
   - Em `@laptop`, volta para `w-1/2` com `flex-shrink-0`, preservando o hero exatamente como no layout desktop.

3. **SectionContentRight**
   - Modal com overlay e blur em telas menores, centralizado e com padding/painel iguais ao Figma.
   - A partir de `@laptop`, abandona o overlay, assume `w-1/2` fixo e readota o layout de coluna tradicional.

4. **Estrutura da página e componentes de apoio**
   - `[portal]/page.tsx` alterna entre coluna (mobile) e linha (desktop) usando `@laptop:flex`.
   - `TermoPoliticaUso` e `LoginFormFields` receberam ajustes de alinhamento/tipografia para casar com o handoff visual.
   - `layout.tsx` continua compatível com CSP ao aplicar `nonce`, sem impactar o visual.

5. **Tailwind**
   - `@mobile`, `@tablet`, `@laptop` etc. agora são `min-width`, evitando necessidade de prefixos `max-` e deixando as classes alinhadas ao padrão do projeto.

## Benefícios

- **Manutenção facilitada**: nomes e responsabilidades claras dos componentes de login tornam futuras alterações mais simples.
- **Responsividade completa**: a tela funciona em qualquer tamanho, mantendo a seção de login em formato modal no mobile e layout em colunas no desktop conforme o Figma.
