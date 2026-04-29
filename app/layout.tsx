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
  metadataBase: new URL('https://tatodigital.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TATO Digital | Governança, Dados, IA e Soluções Digitais',
    description: 'Consultoria premium para empresas que precisam estruturar processos, tomar decisões com dados e crescer com controle.',
    url: 'https://tatodigital.com.br',
    siteName: 'TATO Digital',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TATO Digital | Governança, Dados, IA e Soluções Digitais',
    description: 'Consultoria premium para empresas que precisam estruturar processos, tomar decisões com dados e crescer com controle.',
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
      <body className="bg-[#001011] text-[#FFFFFC] overflow-x-hidden antialiased selection:bg-[#6CCFF6] selection:text-[#001011]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
