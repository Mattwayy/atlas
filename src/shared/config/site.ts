export const siteConfig = {
  name: 'Aтлас Казахстана',
  shortName: 'Aтлас',
  tagline: 'Интерактивный историко-биографический атлас',
  description:
    'Интерактивный атлас о Султанмамет султане и Алмате Тобабергенове: биографии, карта, хронология, архивные свидетельства и источники.',
  year: 2026,
  /** Автор и руководитель показываются в подвале только если заполнены. */
  author: 'Султан',
  supervisor: '',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Атлас', href: '/#atlas' },
  { label: 'Султанмамет', href: '/persons/sultanmamet' },
  { label: 'Алмат', href: '/persons/almat' },
  { label: 'Источники', href: '/#sources' },
  { label: 'О проекте', href: '/#about' },
];
