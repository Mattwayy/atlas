import { Inter, Playfair_Display } from 'next/font/google';

// Два семейства (как требует концепция): выразительный serif для заголовков + простой sans для текста.
export const headFont = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-head',
  display: 'swap',
});

export const bodyFont = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});
