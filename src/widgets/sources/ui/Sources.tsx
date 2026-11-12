import { Section } from '@/shared/ui';
import { SourceItem, sourceCategoryLabels, sources, type SourceCategory } from '@/entities/source';
import s from './Sources.module.css';

const order: SourceCategory[] = ['book', 'document', 'publication', 'monument'];

export function Sources() {
  return (
    <Section
      id="sources"
      eyebrow="Источники"
      title="Литература и архивные материалы"
      lead="Нумерация сквозная: те же номера [1]–[7] стоят в карточках событий и документов."
      tone="paper"
    >
      <div className={s.groups}>
        {order.map((cat, i) => {
          const items = sources.filter((x) => x.category === cat);
          if (items.length === 0) return null;
          return (
            <section
              key={cat}
              className={s.group}
              aria-labelledby={`src-group-${cat}`}
              data-aos="fade-up"
              data-aos-delay={(i % 2) * 100}
            >
              <h3 id={`src-group-${cat}`}>{sourceCategoryLabels[cat]}</h3>
              <ul>
                {items.map((src) => (
                  <SourceItem key={src.id} source={src} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
