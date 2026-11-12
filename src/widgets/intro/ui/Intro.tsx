import { Button, Section } from '@/shared/ui';
import s from './Intro.module.css';

const facts = [
  { value: '2', label: 'личности' },
  { value: 'XVIII–XIX', label: 'века' },
  { value: '1', label: 'интерактивный атлас' },
];

export function Intro() {
  return (
    <Section id="intro" eyebrow="О чём проект" title="Почему «забытые имена»" tone="paper">
      <div className={s.grid}>
        <div className={s.text} data-aos="fade-up">
          <p>
            История Казахстана включает не только известных ханов и крупных политических деятелей, но и людей, чья
            роль в управлении, дипломатии, военных событиях и региональной жизни сохранилась в архивных документах и
            краеведческих источниках.
          </p>
          <p>
            Имена Султанмамет султана и Алмата Тобабергенова либо не встречаются в школьных учебниках, либо
            упоминаются кратко. Исследовательская проблема: нет доступного, систематизированного и визуально
            ориентированного ресурса, где школьник мог бы познакомиться с их биографиями и вкладом.
          </p>
          <Button href="/#about" variant="ghost">
            Читать подробности о проекте
          </Button>
        </div>

        <ul className={s.facts}>
          {facts.map((f, i) => (
            <li key={f.label} data-aos="fade-left" data-aos-delay={i * 100}>
              <span className={s.value}>{f.value}</span>
              <span className={s.label}>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
