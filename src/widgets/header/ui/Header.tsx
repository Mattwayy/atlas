import Link from 'next/link';
import { navItems, siteConfig } from '@/shared/config';
import { Container, Button } from '@/shared/ui';
import { MobileMenu } from '@/features/mobile-menu';
import s from './Header.module.css';

export function Header() {
  return (
    <header className={s.header}>
      <Container className={s.inner}>
        <Link href="/" className={s.brand}>
          <span className={s.mark} aria-hidden="true">
            ◈
          </span>
          {siteConfig.name}
        </Link>

        <nav className={s.nav} aria-label="Основная навигация">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button href="/#atlas" className={s.cta}>
          Открыть атлас
        </Button>
        <MobileMenu items={navItems} />
      </Container>
    </header>
  );
}
