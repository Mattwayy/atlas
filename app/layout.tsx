import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { siteConfig } from '@/shared/config';
import { AppShell } from '@/app/ui/AppShell';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: 'ru_RU',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#1c2a40',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
