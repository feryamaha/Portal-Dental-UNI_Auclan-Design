# Portal Dental UNI – Dashboard

Mapa rápido do projeto Portal dashboard (Next.js/React) com as peças principais, stack e instruções de execução.

## Visão Geral
- Dashboard responsiva do Portal Dental UNI, com sidebar, topbar e área principal compondo a experiência de beneficiários.
- Componentes de destaque: HomeContent (conteúdo principal), SliderBanner, ShortcutsSection, NewsHighlightSection, CardMeusProtocolos, CardMinhasGuias.
- Dados atuais mockados para validação visual; integrações reais podem ser ligadas futuramente via serviços/API.

## Stack
- **Core:** Next.js 15.5.9 (App Router), React 19.2.3, TypeScript 5.7.3.
- **Formulários/validação:** react-hook-form 7.54.2, zod 3.24.2, @hookform/resolvers 4.1.2.
- **Estilo/UI:** Tailwind CSS 3.4.1, tailwind-merge 3.4.0, tailwind-scrollbar 3.1.0, clsx 2.1.1.
- **Integrações previstas:** axios (HTTP), @react-google-maps/api, @microsoft/clarity, js-cookie, swiper/quill/tiptap para UI avançada.
- **Qualidade:** ESLint (padrão Next), scripts de pre-commit para deps/build/security/architecture.

## Estrutura (resumo)
```
src/
├─ app/                # Rotas (App Router + API (router handlers BFF))
├─ components/
│  ├─ main-content/    # UI conteudo principal de cada portal
│  ├─ shared/          # UI composta de sub componentes reutilizáveis
│  └─ ui/              # UI reutilizável
├─ context/            # Conteúdos/menus (ex.: sidebar)
├─ data/               # Mocks e dados auxiliares
├─ scripts/            # Automação para generateIcons e converter imangens em webp
└─ public/assets/      # Ícones e imagens
docs/
└─ docs-refactor/      # Registros de PR/refatorações
```

## Como rodar
1) Pré-requisitos: Node 22.16.0 (.nvmrc) + Yarn.  
2) Instale deps: `yarn install`  
3) Env: `cp .env.example .env` e ajuste se necessário.  
4) Dev server: `yarn dev` → http://localhost:3000

## Notas rápidas
- Credenciais e chaves de API devem ficar no server (Route Handlers/API internas).  
- Use axios/fetch no server para esconder segredos; cookies apenas quando indispensável.  
- Segurança (CSP/headers) pode ser configurada via middleware/layout/Next.config.
- Componentes React não podem misturar codigo UI/html/jsx com codigo logico (hooks, schemas...) 

## Licença
Projeto interno da Dental UNI / Auclan Design. Uso restrito conforme diretrizes da organização.
