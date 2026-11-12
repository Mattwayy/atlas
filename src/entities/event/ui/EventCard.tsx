import type { ReactNode } from 'react';
import { Badge } from '@/shared/ui';
import { SourceRefs } from '@/entities/source';
import type { HistoricalEvent } from '../model/types';
import s from './EventCard.module.css';

interface EventCardProps {
  event: HistoricalEvent;
  personName?: string;
  /** Слот для действий (кнопка «Показать на карте» и т.п.) — передаётся из widget/feature. */
  footer?: ReactNode;
}

export function EventCard({ event, personName, footer }: EventCardProps) {
  return (
    <article id={`event-${event.id}`} className={s.card} data-person={event.personId}>
      <header className={s.head}>
        <span className={s.year}>{event.yearLabel}</span>
        {personName && <Badge tone="accent">{personName}</Badge>}
      </header>
      <h4 className={s.title}>{event.title}</h4>
      <p className={s.text}>{event.text}</p>
      <SourceRefs ids={event.sourceIds} />
      {footer && <div className={s.footer}>{footer}</div>}
    </article>
  );
}
