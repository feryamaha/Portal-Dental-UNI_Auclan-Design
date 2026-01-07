# Autenticação e Proteção de Rotas

## Status: ✅ IMPLEMENTADO

Data: 07 de janeiro de 2026

---

## Implementação Atual

### Middleware (`src/middleware.ts`)

```typescript
const isProtectedRoute = pathname.startsWith('/portal-');
const authToken = request.cookies.get('authToken')?.value;

if (isProtectedRoute && !authToken) {
    const portalMatch = pathname.match(/\/portal-([a-z-]+)/);
    const portal = portalMatch ? portalMatch[1] : 'beneficiario';
    return NextResponse.redirect(new URL(`/tela-login/${portal}`, request.url));
}
```

**Funciona assim:**
- Rotas `/portal-*` são protegidas
- Se não tem `authToken` → redireciona para o login do portal específico
- Cada portal redireciona para seu próprio login (não para beneficiário)

---

### Salvando Token (`src/hooks/tela-login/useLoginFormFields.hook.ts`)

```typescript
if (isValid) {
    const token = btoa(JSON.stringify({ portal, login: loginValue, timestamp: Date.now() }))
    document.cookie = `authToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`
    document.cookie = `portalType=${portal}; path=/; max-age=${7 * 24 * 60 * 60}`
    router.push(credentials.redirect)
}
```

**Fluxo:**
1. Login bem-sucedido → gera token
2. Salva `authToken` no cookie (7 dias)
3. Redireciona para `/portal-[tipo]`
4. Middleware verifica token → permite acesso

---

## Para Integração com API

Quando integrar com API, substitua a lógica acima por:

```typescript
const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ portal, login, password }),
})

const data = await response.json()
// API retorna token via Set-Cookie header (HTTP-Only)
router.push(data.redirect)
```

**Endpoints necessários:**
- `POST /api/auth/login` → Valida credenciais, retorna token
- `POST /api/auth/logout` → Limpa cookie
- `GET /api/auth/me` → Verifica autenticação

---

## Segurança

**Cookies HTTP-Only (recomendado para API):**
```typescript
response.cookies.set('authToken', token, {
    httpOnly: true,      // Não acessível via JS
    secure: true,        // Apenas HTTPS
    sameSite: 'strict',  // Protege CSRF
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
})
```

---

## Rotas

**Protegidas:** `/portal-*` (requerem autenticação)
**Públicas:** `/tela-login/*`, `/api/auth/*`, `/`

---

## ✅ Checklist

- [x] Middleware implementado
- [x] Token salvo em cookie
- [x] Redirecionamento para portal correto
- [ ] Endpoints de API criados
- [ ] HTTP-Only cookies configurados
- [ ] JWT implementado
- [ ] Refresh token (opcional)

