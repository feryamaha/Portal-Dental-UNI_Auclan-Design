// next.config.js
const path = require('path');

// Headers ESTÁTICOS apenas (CSP dinâmico vem do middleware)
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" }, // OWASP/Next: Bloqueia clickjacking
  { key: "X-Content-Type-Options", value: "nosniff" }, // OWASP/Vercel: Anti-MIME sniffing
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // OWASP/Next: Controle de leaks
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" }, // OWASP: Desabilita features desnecessárias
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }, // Todas as docs: HTTPS forçado
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By (todas docs)
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dentaluni.com.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        pathname: '/**',
      },
    ],
  },
  
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'), // Define o alias @ para src/
    };
    return config;
  },
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
