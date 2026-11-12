export type SourceCategory = 'book' | 'document' | 'publication' | 'monument';

export interface Source {
  id: string;
  category: SourceCategory;
  citation: string;
  /** Только проверенные URL. Пока ни один не подтверждён — поле пустое. */
  url?: string;
}

export const sourceCategoryLabels: Record<SourceCategory, string> = {
  book: 'Книги',
  document: 'Документы и записи современников',
  publication: 'Публикации',
  monument: 'Памятники',
};
