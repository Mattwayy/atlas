import { Note, Section } from '@/shared/ui';
import { survey } from '@/entities/survey';
import s from './Results.module.css';

const pct = (count: number) => Math.round((count / survey.sampleSize) * 100);

function Chart({
  title,
  items,
  delay = 0,
}: {
  title: string;
  items: ReadonlyArray<{ personId: string; label: string; count: number }>;
  delay?: number;
}) {
  return (
    <figure className={s.chart} data-aos="fade-up" data-aos-delay={delay}>
      <figcaption>{title}</figcaption>
      <ul>
        {items.map((it) => (
          <li key={it.personId} data-person={it.personId}>
            <div className={s.row}>
              <span>{it.label}</span>
              <strong>
                {pct(it.count)}% <small>({it.count} из {survey.sampleSize})</small>
              </strong>
            </div>
            <div
              className={s.track}
              role="img"
              aria-label={`${it.label}: ${pct(it.count)}%, ${it.count} из ${survey.sampleSize} учащихся`}
            >
              <div className={s.bar} style={{ width: `${pct(it.count)}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function Results() {
  return (
    <Section
      id="results"
      eyebrow="Апробация"
      title="Что узнали школьники"
      lead={`Выборка: ${survey.sampleSize} ${survey.audience}. Время работы с атласом: ${survey.workTime}.`}
      tone="sand"
    >
      <div className={s.grid}>
        <Chart title={survey.before.label} items={survey.before.items} />
        <Chart title={survey.after.label} items={survey.after.items} delay={150} />
      </div>
      <Note title="Как читать цифры">
        Показатели «до» и «после» измеряют разное (назвать имя и верно указать достижения), поэтому прямое сравнение
        условно.
      </Note>
    </Section>
  );
}
