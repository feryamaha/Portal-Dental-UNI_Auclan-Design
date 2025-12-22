import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { Inter, Lato, Open_Sans } from 'next/font/google';
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

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get('X-Nonce') || undefined;

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${lato.variable} ${inter.variable} ${openSans.variable}`}
    >
      <head nonce={nonce} suppressHydrationWarning></head>
      <body nonce={nonce} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
