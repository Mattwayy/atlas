import type { ReactNode } from 'react';
import s from './Note.module.css';

/** Плашка-оговорка: спорные данные, реконструкции, ориентировочные координаты. */
export function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className={s.note}>
      {title && <strong className={s.title}>{title}</strong>}
      <div>{children}</div>
    </aside>
  );
}
