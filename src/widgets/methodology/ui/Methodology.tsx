import Link from 'next/link';
import { Badge, Section } from '@/shared/ui';
import { SourceRefs } from '@/entities/source';
import s from './Methodology.module.css';

const principles = [
  {
    title: 'Два независимых источника',
    text: 'По возможности каждый значимый факт сопоставляется минимум с двумя независимыми источниками.',
  },
  {
    title: 'Расхождения показываем',
    text: 'Если источники расходятся, сайт показывает оба варианта и поясняет, откуда они взяты. Это не ошибка оформления, а прозрачное отражение исторической неопределённости.',
  },
  {
    title: 'Источник у каждого факта',
    text: 'Ссылки прикреплены к событию и документу, а не только к общему списку литературы.',
  },
];

export function Methodology() {
  return (
    <Section
      id="methodology"
      eyebrow="Методика"
      title="Как мы проверяем сведения"
      lead="Атлас не выдаёт спорное за установленное, поэтому неопределённость показана прямо в карточках."
      tone="dark"
    >
      <div className={s.grid}>
        <ol className={s.principles}>
          {principles.map((p, i) => (
            <li key={p.title} data-aos="fade-right" data-aos-delay={i * 100}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>

        <article
          className={s.example}
          data-person="almat"
          aria-label="Пример карточки с расхождением"
          data-aos="fade-left"
        >
          <header>
            <Badge tone="warn">пример: спорные даты</Badge>
            <h3>Годы жизни Алмата Тобабергенова</h3>
          </header>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">Событие</th>
                <th scope="col">Вариант 1</th>
                <th scope="col">Вариант 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Рождение</th>
                <td>1804</td>
                <td>1805</td>
              </tr>
              <tr>
                <th scope="row">Смерть</th>
                <td>1892</td>
                <td>1897</td>
              </tr>
            </tbody>
          </table>
          <p className={s.warn}>
            Источники расходятся в датах, поэтому оба варианта приводятся равноправно.
          </p>
          <SourceRefs ids={['aktobe-vestnik-2024']} />
          <p className={s.link}>
            <Link href="/#sources">Открыть список источников →</Link>
          </p>
        </article>
      </div>
    </Section>
  );
}
