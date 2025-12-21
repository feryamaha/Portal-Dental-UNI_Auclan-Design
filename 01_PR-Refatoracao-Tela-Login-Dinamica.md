# Titulo da PR
Refatoração da tela de login dinâmica para separar UI de lógica e centralizar configs

## Objetivo

Isolar toda a lógica e constantes dos componentes de UI da tela de login, garantindo que apenas markup e props fiquem nos componentes visuais e que as configurações de portais fiquem organizadas em contextos reutilizáveis. 
Além disso, registrar o layout específico do portal Dentista como componente dedicado.

## Arquivos Afetados

- `src/app/tela-login/[portal]/page.tsx`
- `src/components/tela-login/DentistaDocumentsFields.tsx`
- `src/components/tela-login/PortalTypeLabel.tsx`
- `src/context/tela-login/portalConfig.ts`
- `src/context/tela-login/portalCopy.ts`
- `src/context/tela-login/brazilStates.ts`

## Divergências em relação ao design/arquitetura antes

- A configuração dos portais (labels, campos, hero) estava misturada com o layout dentro de `[portal]/page.tsx`.
- O componente `PortalTypeLabel` mantinha um dicionário estático interno, dificultando o reuso em outros lugares.
- A lista de estados e o layout especial do portal Dentista viviam dentro da página, deixando o componente em desacordo com a diretriz “UI apenas renderiza HTML”.
- Não havia ponto único para registrar renderizadores customizados dos campos, tornando difícil evoluir novos layouts específicos por portal.

## Melhorias Implementadas

- Criação do contexto `portalConfig` com tipos fortes (`PortalFieldConfig`, `PortalConfig`, `PortalFieldCustomRenderer`) e helper `getPortalConfig` para ser consumido pelos server components.
- Extração dos rótulos de portais para `portalCopy`, compartilhando `PortalType` e `getPortalLabel` com qualquer componente que precise do label oficial.
- Lista de estados brasileiros movida para `context/tela-login/brazilStates.ts`, permitindo reuso e evitando repetição.
- Novo componente `DentistaDocumentsFields` reutilizando `DropInput` e `FloatingLabelInput`, focado apenas em markup.
- Página `[portal]` agora importa as configs do contexto, mapeia renderizadores customizados e mantém apenas a composição do layout server-side.
- `PortalTypeLabel` passou a consumir as constantes via contexto, mantendo o componente completamente visual e consistente com outros usos futuros.

## Benefícios

- Separação clara de responsabilidades: componentes ficam focados em UI enquanto lógica/configurações vivem em contextos reutilizáveis.
- Facilita manutenção e adição de novos portais, bastando alterar o arquivo de configuração sem tocar em componentes visuais.
- Permite reaproveitar constantes (labels, estados) em outras telas ou projetos sem duplicação.
- Prepara a tela para futuras variações de layout (ex.: novos renderizadores customizados) com o mapa centralizado.
