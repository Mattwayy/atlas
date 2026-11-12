'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { NavItem } from '@/shared/config';
import s from './MobileMenu.module.css';

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className={s.root}>
      <button
        type="button"
        className={s.toggle}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="visually-hidden">{open ? 'Закрыть меню' : 'Открыть меню'}</span>
        <span className={s.bars} data-open={open} aria-hidden="true" />
      </button>

      <nav id="mobile-nav" className={s.panel} hidden={!open} aria-label="Мобильное меню">
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
