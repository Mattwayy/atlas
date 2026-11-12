import { Button, Reveal, Section } from '@/shared/ui';
import { PersonCard, persons } from '@/entities/person';
import s from './BioCards.module.css';

export function BioCards() {
  return (
    <Section
      id="people"
      eyebrow="Биографии"
      title="Два деятеля — два региона — две эпохи"
      lead="Карточки одного формата: роль, период, регион и ключевой вклад. Полный профиль — по кнопке."
      tone="sand"
    >
      <div className={s.grid}>
        {persons.map((p, i) => (
          <Reveal key={p.id} fill delay={i * 150}>
            <PersonCard
              person={p}
              footer={
                <Button href={`/persons/${p.slug}`} variant="ghost">
                  Подробнее
                </Button>
              }
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
