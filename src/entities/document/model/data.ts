import type { ArchiveDocument } from './types';

export const documents: ArchiveDocument[] = [
  {
    id: 'report-1754',
    personId: 'sultanmamet',
    title: 'Рапорт капитана фон Траунберха',
    date: '28 ноября 1754 г.',
    kind: 'Рапорт',
    excerpt:
      'В рапорте сообщается о прибытии вооружённых казахов «ведомства Султанмамет-султана» к Коряковскому форпосту с требованием освободить захваченного сородича.',
    excerptIsVerbatim: false,
    context:
      'Эпизод показывает, что Султанмамет выступал представителем интересов подвластного населения. Фраза в кавычках — название ведомства.',
    sourceIds: ['traunberg-1754'],
  },
  {
    id: 'notes-1771',
    personId: 'sultanmamet',
    title: 'Записки Х. Барданеса о поездке к Султанмамет султану',
    date: '1771 г.',
    kind: 'Записки путешественника',
    excerpt:
      'Записки современника о поездке к Султанмамет султану в год «Пыльного похода».',
    excerptIsVerbatim: false,
    context:
      'Источник сведений о «Пыльном походе» 1771 года.',
    sourceIds: ['bardanes-1771'],
  },
  {
    id: 'witkiewicz-notes',
    personId: 'almat',
    title: 'Записи И.В. Виткевича о поездке в Бухару',
    date: '1836 г.',
    kind: 'Записи путешественника',
    excerpt:
      'В записях Виткевича приведён эпизод, в котором Алмат прибыл, чтобы предупредить его об опасности.',
    excerptIsVerbatim: false,
    context: 'Свидетельство доверия к Алмату как к проводнику и посреднику.',
    sourceIds: [],
  },
];

export const getDocumentsByPerson = (personId: string) => documents.filter((d) => d.personId === personId);
