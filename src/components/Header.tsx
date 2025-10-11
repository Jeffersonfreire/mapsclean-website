"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';

const locales = ['fr-BE', 'pt-BR', 'en'] as const;

export default function Header({ initialLocale = 'fr-BE' }: { initialLocale?: string }) {
  const [locale, setLocale] = useState(initialLocale);
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return (href: string) => pathname === href || pathname?.startsWith(href + '/');
  }, [pathname]);

  return (
    <header className="bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="MapsClean - Accueil">
          <div className="relative h-12 w-12 md:h-16 md:w-16">
            <Image
              src="/assets/icon.png"
              alt="MapsClean"
              fill
              priority
              sizes="(min-width: 768px) 64px, 48px"
              className="object-contain drop-shadow-sm"
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base font-medium" aria-label="Navigation principale">
          <Link href={`/${locale}`} aria-current={isActive(`/${locale}`) ? 'page' : undefined} className={isActive(`/${locale}`) ? 'text-blue-800 font-semibold' : 'text-slate-700 hover:text-blue-700 transition-colors'}>Accueil</Link>
          <Link href={`/${locale}/services`} aria-current={isActive(`/${locale}/services`) ? 'page' : undefined} className={isActive(`/${locale}/services`) ? 'text-blue-800 font-semibold' : 'text-slate-700 hover:text-blue-700 transition-colors'}>Services</Link>
          <Link href={`/${locale}/pricing`} aria-current={isActive(`/${locale}/pricing`) ? 'page' : undefined} className={isActive(`/${locale}/pricing`) ? 'text-blue-800 font-semibold' : 'text-slate-700 hover:text-blue-700 transition-colors'}>Tarifs</Link>
          <Link href={`/${locale}/login`} className="text-blue-700 hover:text-blue-800 font-semibold transition-colors">Connexion</Link>
          <Link href={`/${locale}/account`} className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition-all">Mon compte</Link>
        </nav>
        <div className="flex items-center gap-3">
          <select
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium bg-white text-slate-700 cursor-pointer"
            value={locale}
            onChange={(e) => {
              const next = e.target.value;
              setLocale(next);
              const segments = pathname.split('/').filter(Boolean);
              segments[0] = next;
              window.location.pathname = '/' + segments.join('/');
            }}
          >
            {locales.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}


