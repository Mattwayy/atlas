import { Section } from '@/shared/ui';
import s from './Compare.module.css';

const rows: Array<{ criterion: string; sultanmamet: string; almat: string }> = [
  {
    criterion: 'Регион / принадлежность',
    sultanmamet: 'Кыпчакский улус, Среднее Прииртышье; Средний жуз',
    almat: 'Род шомекей; Младший жуз, Иргизский край',
  },
  {
    criterion: 'Время деятельности',
    sultanmamet: 'XVIII век, особенно 1730-е–1790-е годы',
    almat: 'XIX век, особенно 1830-е–1880-е годы',
  },
  {
    criterion: 'Основные роли',
    sultanmamet: 'Правитель, военачальник, дипломат, батыр',
    almat: 'Караван-вожатый, администратор, дипломат, сардар',
  },
  {
    criterion: 'Характер влияния',
    sultanmamet: 'Управление улусом, военные и земельные вопросы, отношения с соседями',
    almat: 'Торговые и дипломатические миссии, посредничество, административное управление',
  },
  {
    criterion: 'Историческая память',
    sultanmamet: 'Часто представлен в тени Абылай хана и академических исследований',
    almat: 'Региональная известность, краеведческие публикации и мавзолей',
  },
];

export function Compare() {
  return (
    <Section
      id="compare"
      eyebrow="Сравнение"
      title="Общее и различия"
      lead="Оба деятеля участвовали в дипломатических контактах и представляли интересы казахского населения. Султанмамет связан преимущественно с политическим и военным управлением XVIII века, Алмат — с караванными маршрутами, посредничеством и административной системой XIX века."
      tone="paper"
    >
      <div className={s.scroll} data-aos="fade-up">
        <table className={s.table}>
          <caption className="visually-hidden">Сравнение Султанмамет султана и Алмата Тобабергенова</caption>
          <thead>
            <tr>
              <th scope="col">Критерий</th>
              <th scope="col" data-person="sultanmamet">
                Султанмамет султан
              </th>
              <th scope="col" data-person="almat">
                Алмат Тобабергенов
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.criterion}>
                <th scope="row">{r.criterion}</th>
                <td>{r.sultanmamet}</td>
                <td>{r.almat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* На мобильном таблица превращается в две колонки-карточки */}
      <div className={s.cards}>
        {rows.map((r, i) => (
          <article key={r.criterion} className={s.card} data-aos="fade-up" data-aos-delay={i * 50}>
            <h3>{r.criterion}</h3>
            <p data-person="sultanmamet">
              <strong>Султанмамет:</strong> {r.sultanmamet}
            </p>
            <p data-person="almat">
              <strong>Алмат:</strong> {r.almat}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
