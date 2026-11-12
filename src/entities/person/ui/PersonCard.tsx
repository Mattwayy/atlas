import type { ReactNode } from 'react';
import type { Person } from '../model/types';
import { Silhouette } from './Silhouette';
import s from './PersonCard.module.css';

/** Карточка персоны одинакового формата. Кнопки действий передаются снаружи (slot `footer`). */
export function PersonCard({ person, footer }: { person: Person; footer?: ReactNode }) {
  return (
    <article className={s.card} data-person={person.id}>
      <div className={s.media}>
        <Silhouette personId={person.id} />
      </div>
      <div className={s.body}>
        <p className={s.subtitle}>{person.subtitle}</p>
        <h3 className={s.name}>{person.name}</h3>
        <dl className={s.meta}>
          <div>
            <dt>Годы жизни</dt>
            <dd>{person.life.label}</dd>
          </div>
          <div>
            <dt>Регион</dt>
            <dd>{person.region}</dd>
          </div>
          <div>
            <dt>Роль</dt>
            <dd>{person.roles.join(' · ')}</dd>
          </div>
        </dl>
        <p className={s.summary}>{person.summary}</p>
        {person.life.variants && <p className={s.variants}>{person.life.variants}</p>}
        {footer && <div className={s.footer}>{footer}</div>}
      </div>
    </article>
  );
}
