import type { ReactNode } from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { bodyFont, headFont } from '../fonts';
import { AosProvider } from './AosProvider';
import { LegacyHashRedirect } from './LegacyHashRedirect';

/** Корневая оболочка приложения: шрифты, шапка, контент, подвал. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${headFont.variable} ${bodyFont.variable}`}>
      <body>
        {/* Без JS AOS не запустится: показываем контент сразу */}
        <noscript>
          <style>{'[data-aos]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <AosProvider />
        <LegacyHashRedirect />
        <div id="top-of-page" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
