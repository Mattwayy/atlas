'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib';
import { Section } from '@/shared/ui';
import { EventCard, events } from '@/entities/event';
import { getPersonById, type PersonId } from '@/entities/person';
import { FocusOnMapButton } from '@/features/map-focus';
import { TimelineFilter, useTimelineFilter } from '@/features/timeline-filter';
import s from './Timeline.module.css';

const centuryOf = (year: number) => Math.ceil(year / 100);
const romanCentury: Record<number, string> = { 18: 'XVIII', 19: 'XIX' };

interface TimelineProps {
  /** Если задан — одна колонка с событиями только этой персоны (страница профиля). */
  personId?: PersonId;
}

export function Timeline({ personId }: TimelineProps) {
  const { value, setValue } = useTimelineFilter();
  const filter = personId ?? value;
  const single = filter !== 'all';

  const list = events.filter((e) => filter === 'all' || e.personId === filter).sort((a, b) => a.sortYear - b.sortYear);

  const body = (
    <>
      {!personId && (
        <div className={s.filter}>
          <TimelineFilter value={value} onChange={setValue} />
        </div>
      )}

      <ol className={cn(s.list, single && s.single)}>
        {list.map((e, i) => {
          const century = centuryOf(e.sortYear);
          const showCentury = i === 0 || century !== centuryOf(list[i - 1]!.sortYear);
          const person = getPersonById(e.personId);
          return (
            <Fragment key={e.id}>
              {showCentury && (
                <li className={s.century} aria-hidden="true" data-aos="zoom-in">
                  <span>{romanCentury[century] ?? century} век</span>
                </li>
              )}
              <li
                className={s.item}
                data-person={e.personId}
                data-side={e.personId === 'almat' ? 'right' : 'left'}
                data-aos="fade-up"
                data-aos-offset="40"
              >
                <EventCard
                  event={e}
                  personName={personId ? undefined : person.name}
                  footer={e.focus ? <FocusOnMapButton featureId={e.focus} /> : undefined}
                />
                {!personId && (
                  <Link href={`/persons/${e.personId}#event-${e.id}`} className={s.more}>
                    К профилю →
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </>
  );

  if (personId) return <div>{body}</div>;

  return (
    <Section
      id="timeline"
      eyebrow="Хронология"
      title="События XVIII–XIX веков"
      lead="Две дорожки — по одной на каждого деятеля."
      tone="sand"
    >
      {body}
    </Section>
  );
}
