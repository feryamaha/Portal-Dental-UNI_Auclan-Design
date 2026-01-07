# Ajustes finos de regras de negócio e autenticação entre login e dashboard

## Objetivo
Implementar ajustes finos de regras de negócio, contratos e lógica de autenticação entre portal login e portal dashboard.

## Arquivos Afetados
- `src/components/shared-tela-login/LoginDentistaFields.tsx`
- `src/components/shared-tela-login/LoginFormFields.tsx`
- `src/components/shared-tela-login/SectionContentRight.tsx`
- `src/app/tela-login/[portal]/page.tsx`
- `src/data/portal-config.ts`
- `src/data/mock-login/mock-login-fake.json`
- `src/utils/input-mask.helpers.ts`
- `src/utils/tela-login-validation.helpers.ts`
- `src/hooks/tela-login/useLoginFormFields.hook.ts`
- `src/hooks/tela-login/usePortalPageTelaLoginPortais.hook.tsx`
- `src/types/tela-login/login-form-fields.types.ts`
- `src/types/tela-login/section-content-right.types.ts`
- `src/middleware.ts`
- `src/app/page.tsx`
- `Feature-Documentation/TelaLogin.md`
- `Feature-Documentation/Conformidade.md`

## Ajustes Implementados

### 1. Padronização de contratos de campos
- Correção de nomes de campos para `name: 'login'` em todos os portais
- Ajuste de portais comercial, empresa, representante (de `code` para `login`)
- Manutenção de customRenderer para dentista com campo `login`

### 2. Implementação de autenticação com cookies
- Salvamento de `authToken` e `portalType` em cookies após login bem-sucedido
- Middleware de proteção de rotas `/portal-*` com redirecionamento específico
- Redirecionamento inteligente para login do portal correto

### 3. Validação e máscaras de entrada
- Implementação de máscara CRO `XX-00000` para dentista
- Criação de schemas Zod específicos por tipo de portal
- Função `normalizeLoginValue` para padronização de valores

### 4. Componente customizado para dentista
- Componente `LoginDentistaFields` com UF dropdown + CRO input
- Concatenação automática UF + CRO no campo `login`
- Máscara de entrada numérica para CRO (5 dígitos)

## Benefícios
- **Consistência de contratos**: Todos os portais seguem mesmo padrão de campos
- **Autenticação funcional**: Login redireciona corretamente para dashboard específico
- **Proteção de rotas**: Middleware protege dashboards com redirecionamento inteligente
- **Validação robusta**: Zod + máscaras garantem dados corretos
- **Pronto para API**: Estrutura preparada para integração com backend
 