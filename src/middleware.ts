import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Proteger rotas de dashboard
  const isProtectedRoute = pathname.startsWith('/portal-');
  const authToken = request.cookies.get('authToken')?.value;
  const portalType = request.cookies.get('portalType')?.value;

  if (isProtectedRoute && !authToken) {
    // Extrair tipo de portal da URL (ex: /portal-dentista → dentista)
    const portalMatch = pathname.match(/\/portal-([a-z-]+)/);
    const portal = portalMatch ? portalMatch[1] : 'beneficiario';

    // Redirecionar para o login do portal específico
    return NextResponse.redirect(new URL(`/tela-login/${portal}`, request.url));
  }

  // Gera nonce usando Web Crypto API (compatível com Edge Runtime)
  const nonceArray = new Uint8Array(16);
  crypto.getRandomValues(nonceArray);
  const nonce = Buffer.from(nonceArray).toString('base64');

  const response = NextResponse.next();

  // Remove Server header (OWASP: não vaze stack)
  response.headers.delete('Server');

  // Passa nonce para layout via header
  response.headers.set('X-Nonce', nonce);

  // CSP Level 3 com strict-dynamic + fallback para Vercel
  // NOTA: Em desenvolvimento, upgrade-insecure-requests está desativado para permitir
  // acesso via IP local (ex: http://192.168.1.9:3000). Reativar antes de fazer commit/push
  // para produção para manter segurança HTTPS.
  const isDev = process.env.NODE_ENV === 'development';

  // Detecta se está na Vercel
  const host = request.headers.get('host') || '';
  const isVercel = host.includes('vercel.app');

  const csp = [
    "default-src 'self'",
    // strict-dynamic com fallback 'self' para compatibilidade Vercel
    `script-src 'nonce-${nonce}' 'strict-dynamic' 'self'${isDev ? " 'unsafe-eval'" : ''}${isVercel ? ' https://*.vercel.app' : ''}`,
    "style-src 'self' 'unsafe-inline' https://cdn.userway.org https://fonts.googleapis.com",
    "img-src 'self' blob: data: https:",
    "font-src 'self' https://fonts.gstatic.com https://cdn.userway.org data:",
    "connect-src 'self' https://api.userway.org https://cdn.userway.org https://www.clarity.ms https: wss:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `${!isDev ? "upgrade-insecure-requests" : ""}`,
  ].join('; ').replace(/;$/, '');

  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  // Aplicar middleware em todas as rotas
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
