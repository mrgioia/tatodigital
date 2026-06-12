import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'TATO Digital | Governança, Dados, IA e Soluções Digitais',
  description: 'Consultoria premium para empresas que precisam estruturar processos, tomar decisões com dados e crescer com controle.',
  metadataBase: new URL('https://www.tato-digital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TATO Digital | Governança, Dados, IA e Soluções Digitais',
    description: 'Consultoria premium para empresas que precisam estruturar processos, tomar decisões com dados e crescer com controle.',
    url: 'https://www.tato-digital.com/',
    siteName: 'TATO Digital',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og/tato-digital-og-v2.png',
        width: 1200,
        height: 630,
        alt: 'TATO Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TATO Digital | Governança, Dados, IA e Soluções Digitais',
    description: 'Consultoria premium para empresas que precisam estruturar processos, tomar decisões com dados e crescer com controle.',
    images: ['/og/tato-digital-og-v2.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-[#001011] text-[#FFFFFC] overflow-x-hidden max-w-full antialiased selection:bg-[#6CCFF6] selection:text-[#001011]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
