import Link from 'next/link';
import { navItems, siteConfig } from '@/shared/config';
import { Container } from '@/shared/ui';
import s from './Footer.module.css';

export function Footer() {
  const { author, supervisor } = siteConfig;

  return (
    <footer className={s.footer}>
      <Container className={s.grid}>
        <div>
          <p className={s.brand}>{siteConfig.name}</p>
          <p className={s.muted}>{siteConfig.tagline}</p>
          {author && <p className={s.muted}>Автор: {author}</p>}
          {supervisor && <p className={s.muted}>Научный руководитель: {supervisor}</p>}
          <p className={s.muted}>© {siteConfig.year}</p>
        </div>

        <nav aria-label="Навигация в подвале">
          <ul className={s.links}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <a href="#top-of-page">↑ Вернуться наверх</a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
