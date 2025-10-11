import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import Analytics from '@/components/Analytics';

export const dynamicParams = true;
export function generateStaticParams() {
  return [{ locale: 'fr-BE' }, { locale: 'pt-BR' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header initialLocale={locale} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}


