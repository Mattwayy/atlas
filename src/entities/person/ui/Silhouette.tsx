import type { PersonId } from '../model/types';
import s from './Silhouette.module.css';

/**
 * Абстрактный силуэт вместо портрета: подлинные портреты не подтверждены,
 * поэтому подпись «иллюстрация» обязательна (требование концепции сайта).
 */
export function Silhouette({ personId, caption = true }: { personId: PersonId; caption?: boolean }) {
  return (
    <figure className={s.figure} data-person={personId}>
      <svg viewBox="0 0 200 220" role="img" aria-label="Силуэт-иллюстрация" className={s.svg}>
        <defs>
          <linearGradient id={`bg-${personId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="200" height="220" fill={`url(#bg-${personId})`} />
        <g fill="var(--accent)" opacity="0.9">
          <circle cx="100" cy="84" r="34" />
          <path d="M30 220c0-48 31-76 70-76s70 28 70 76z" />
          {personId === 'sultanmamet' ? (
            <path d="M62 66c4-30 24-44 38-44s34 14 38 44c-12-10-26-14-38-14s-26 4-38 14z" />
          ) : (
            <path d="M66 62c6-24 20-34 34-34s28 10 34 34c-10-6-22-8-34-8s-24 2-34 8z" />
          )}
        </g>
        <g fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1">
          <circle cx="100" cy="110" r="96" />
          <circle cx="100" cy="110" r="78" strokeDasharray="3 5" />
        </g>
      </svg>
      {caption && <figcaption className={s.caption}>Иллюстрация-силуэт, не портрет</figcaption>}
    </figure>
  );
}
