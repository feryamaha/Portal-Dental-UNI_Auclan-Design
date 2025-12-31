# Portal Dental UNI – Dashboard

Uma dashboard multi-portal moderna desenvolvida em Next.js, projetada para atender diferentes perfis de usuários da Dental UNI: Beneficiário, Dentista, Comercial (Corretor), Empresa e Representante.

Cada portal oferece funcionalidades personalizadas, como acesso a protocolos, guias, boletos, agendamentos, pacientes e muito mais – tudo com uma arquitetura escalável e foco em reutilização de componentes e lógica.

## Instalação

```bash
yarn install
```

## Pré-requisitos

- Node.js versão 22.16.0 (recomendado usar nvm com o arquivo .nvmrc)
- Yarn (gerenciador de pacotes)

# Clone o repositório (se aplicável)

```bash
git clone <url-do-repositorio>
```

# Instale as dependências

```bash
yarn install
```

## Como Rodar

```bash
yarn dev  
```
Acesse em: http://localhost:3000
A raiz (/) redireciona automaticamente para a tela de login.

## Build

```bash
yarn build && yarn start
```

## Credenciais de Teste (Ambiente de Desenvolvimento/Mock)

Acesse via /tela-login/[portal] (ex: /tela-login/beneficiario)
- Nota: Atualmente usa mock local. Em produção, será integrado com API real de autenticação.

```json
{
  "beneficiario": { "login": "111.222.333-44", "password": "10203040" },
  "dentista": { "login": "555.666.777-88", "password": "99887766" },
  "corretor": { "login": "222.333.444-55", "password": "55667788" },
  "empresa": { "login": "333.444.555-66", "password": "66778899" },
  "representante": { "login": "444.555.666-77", "password": "77889900" }
}
```

## Scripts Úteis
yarn build
yarn start  
yarn lint
yarn generate:icons ou node .\src\script\generateIcons.js
node .\src\script\convert-images-to-webp.mjs 

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5.7
- Tailwind CSS 3.4
- React Hook Form + Zod

## Arquitetura e Documentação

O projeto segue princípios rígidos de separação de responsabilidades (UI pura em components/, lógica em hooks/, tipagens centralizadas em types/, etc.).
Para detalhes completos:

- Estrutura de pastas e fluxos: Veja `Feature-Documentation/Arquitetura-pastas-arquivos.md`
- Regras de criação de componentes: `Feature-Documentation/Regra-Criacao-Componentes.md`
- Tela de Login: `Feature-Documentation/tela-login.md`

Veja `Feature-Documentation/` para documentação completa.

## Licença

Projeto interno e confidencial da Dental UNI.
Desenvolvido e mantido pela equipe Auclan Design.
Uso restrito – não distribuir ou publicar externamente.
