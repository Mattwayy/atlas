import type { PersonId } from '@/entities/person';

export interface ArchiveDocument {
  id: string;
  personId: PersonId;
  title: string;
  date: string;
  kind: string;
  /** Содержание документа, как оно изложено в плане проекта. */
  excerpt: string;
  /** true — дословная цитата. Пока ни одна цитата не сверена с оригиналом, поэтому false. */
  excerptIsVerbatim: boolean;
  context: string;
  sourceIds: string[];
}
