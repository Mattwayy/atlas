import type { Source } from './types';

/** Библиография из исходного плана проекта (Документ 1). Порядок задаёт сквозную нумерацию [1]…[7]. */
export const sources: Source[] = [
  {
    id: 'kabuldinov-2018',
    category: 'book',
    citation:
      'Кабульдинов З.Е. Султанмамет султан: государственный деятель, дипломат и батыр. Алматы: Литера-М, 2018. 303 с.',
  },
  {
    id: 'sirik-2018',
    category: 'document',
    citation:
      'Султаны и батыры Среднего жуза (вторая половина XVIII в.): сборник документов / сост. В.А. Сирик. Алматы: Литера-М, 2018. 559 с.',
  },
  {
    id: 'kabuldinov-2024',
    category: 'publication',
    citation:
      'Кабульдинов З.Е. Некоторые аспекты из жизни и деятельности султана Султанмамета (30–50 годы XVIII века) // edu.e-history.kz. 2024. Т. 11, № 1. С. 94–110.',
  },
  {
    id: 'aktobe-vestnik-2024',
    category: 'publication',
    citation: '«Алмат Тобабергенов – человек своей эпохи» // Актюбинский вестник. 2024. 8 августа.',
  },
  {
    id: 'mavzoley-almat',
    category: 'monument',
    citation: '«Мавзолей Алмат сардара Тобабергенулы» // Актобе: наследие.',
  },
  {
    id: 'traunberg-1754',
    category: 'document',
    citation:
      'Рапорт капитана фон Траунберха о приезде казахов ведомства Султанмамет-султана (28 ноября 1754 г.) // e-history.kz.',
  },
  {
    id: 'bardanes-1771',
    category: 'document',
    citation: 'Барданес Х. Записки о поездке к Султанмамет султану (1771) // Туркестанский государственный университет.',
  },
];

export const getSource = (id: string) => sources.find((s) => s.id === id);

/** Сквозной номер источника для ссылок вида [3]. */
export const getSourceNumber = (id: string) => sources.findIndex((s) => s.id === id) + 1;
