import type { PersonId } from '@/entities/person';

export interface HistoricalEvent {
  id: string;
  personId: PersonId;
  /** Подпись даты как в источнике: «1742», «1833–1834», «1892 / 1897». */
  yearLabel: string;
  /** Год для сортировки на шкале. */
  sortYear: number;
  title: string;
  text: string;
  /** id объекта карты (entities/place): по кнопке «Показать на карте» карта летит к нему. */
  focus?: string;
  sourceIds: string[];
}
