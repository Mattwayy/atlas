import Link from 'next/link';
import { Container, Badge, Note } from '@/shared/ui';
import { type Person } from '@/entities/person';
import { SourceRefs } from '@/entities/source';
import s from './PersonProfile.module.css';

/** Шапка профиля: имя, годы (с разночтениями), краткая биография. */
export function PersonProfileHead({ person }: { person: Person }) {
  return (
    <section className={s.head} data-person={person.id} aria-labelledby="person-title">
      <Container className={s.headInner}>
        <div>
          <nav aria-label="Хлебные крошки" className={s.crumbs}>
            <Link href="/">Главная</Link> / <Link href="/#people">Биографии</Link> / {person.name}
          </nav>
          <p className={s.subtitle}>{person.subtitle}</p>
          <h1 id="person-title">{person.name}</h1>
          <p className={s.fullName}>{person.fullName}</p>
          <p className={s.life}>
            {person.life.label} <Badge tone="neutral">{person.period}</Badge>
          </p>
          <p className={s.region}>{person.region}</p>
          <ul className={s.roles}>
            {person.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className={s.portrait} data-aos="zoom-in">
          <img src={person.image} alt={person.name} />
        </div>
      </Container>
    </section>
  );
}

export function PersonBio({ person }: { person: Person }) {
  return (
    <div className={s.bio} data-person={person.id} data-aos="fade-up">
      {person.bio.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {person.life.variants && <Note title="Разночтения в датах">{person.life.variants}</Note>}
    </div>
  );
}

export function PersonAchievements({ person }: { person: Person }) {
  return (
    <ol className={s.achievements} data-person={person.id}>
      {person.achievements.map((a, i) => (
        <li key={a.title} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
          <h3>{a.title}</h3>
          <p>{a.text}</p>
          <p className={s.significance}>
            <strong>Значение:</strong> {a.significance}
          </p>
          <SourceRefs ids={a.sourceIds} />
        </li>
      ))}
    </ol>
  );
}
