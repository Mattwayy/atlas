'use client';

import { useSyncExternalStore } from 'react';

export interface MapFocusRequest {
  /** id объекта карты (entities/place). */
  id: string;
  /** Растёт при каждом запросе, чтобы повторный клик по тому же объекту тоже срабатывал. */
  nonce: number;
}

/**
 * Мини-стор «показать объект на карте». Нужен, чтобы виджет хронологии и виджет карты
 * общались, не импортируя друг друга (в FSD виджеты друг о друге не знают).
 * Последний запрос хранится: если карта ещё не смонтирована (ленивая загрузка),
 * она отработает его сразу после появления.
 */
let current: MapFocusRequest | null = null;
let counter = 0;
const listeners = new Set<() => void>();

export function requestMapFocus(id: string) {
  current = { id, nonce: ++counter };
  listeners.forEach((l) => l());
}

/** Сбрасывает запрос (при уходе со страницы), чтобы новая карта не повторила чужой фокус. */
export function clearMapFocus() {
  if (current === null) return;
  current = null;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useMapFocus(): MapFocusRequest | null {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
