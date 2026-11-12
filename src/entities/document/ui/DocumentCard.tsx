import type { ReactNode } from 'react';
import { Badge } from '@/shared/ui';
import type { ArchiveDocument } from '../model/types';
import s from './DocumentCard.module.css';

interface DocumentCardProps {
  document: ArchiveDocument;
  personName: string;
  /** Слот для кнопки «Открыть» (передаётся из feature/widget, чтобы entity оставалась без логики). */
  action?: ReactNode;
}

export function DocumentCard({ document, personName, action }: DocumentCardProps) {
  return (
    <article className={s.card} data-person={document.personId}>
      <div className={s.paper} aria-hidden="true">
        <span className={s.stamp}>{document.kind}</span>
        <span className={s.lines} />
      </div>
      <div className={s.body}>
        <div className={s.meta}>
          <Badge tone="accent">{personName}</Badge>
          <span className={s.date}>{document.date}</span>
        </div>
        <h4 className={s.title}>{document.title}</h4>
        <p className={s.excerpt}>{document.excerpt}</p>
        {action}
      </div>
    </article>
  );
}
