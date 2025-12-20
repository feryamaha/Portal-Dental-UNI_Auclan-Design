import { headers } from 'next/headers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dental Uni',
  description: 'Portal Dental UNI',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon', rel: 'icon' }],
    shortcut: ['/favicon.ico'],
    apple: ['/favicon.ico'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{

  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get('X-Nonce') || undefined;

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head nonce={nonce} suppressHydrationWarning></head>
      <body nonce={nonce} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
