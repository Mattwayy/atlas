import Link from 'next/link';
import { Button, Container } from '@/shared/ui';
import { persons  } from '@/entities/person';
import s from './Hero.module.css';

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <svg className={s.pattern} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={`h${i}`} d={`M0 ${60 + i * 62} Q 200 ${30 + i * 62} 400 ${60 + i * 62} T 800 ${60 + i * 62}`} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <path key={`v${i}`} d={`M${60 + i * 120} 0 Q ${90 + i * 120} 300 ${60 + i * 120} 600`} opacity="0.5" />
          ))}
        </g>
      </svg>

      <Container className={s.inner}>
        <div className={s.text} data-aos="fade-right">
          <p className={s.eyebrow}>{`«Забытые имена Казахстана»`}</p>
          <h1 id="hero-title" className={s.title}>
            История — это больше, чем известные имена
          </h1>
          <p className={s.lead}>
            Интерактивный историко-биографический атлас о двух деятелях разных эпох и регионов: Султанмамет султане
            и Алмате Тобабергенове. Биографии, карта, архивные свидетельства и источники — в одном месте.
          </p>
          <div className={s.actions}>
            <Button href="/#atlas">Исследовать атлас</Button>
            <Button href="/#about" variant="light">
              О проекте
            </Button>
          </div>
        </div>

        <ul className={s.people}>
          {persons.map((p, i) => (
            <li key={p.id} data-person={p.id} data-aos="fade-left" data-aos-delay={i * 150}>
              <Link href={`/persons/${p.slug}`} className={s.person}>
                <img src={p.image} alt={p.name} />
                <span className={s.personName}>{p.name}</span>
                <span className={s.personRole}>{p.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
