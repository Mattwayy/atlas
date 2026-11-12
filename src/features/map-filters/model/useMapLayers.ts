'use client';

import { useCallback, useState } from 'react';

export type MapLayerKey = 'sultanmamet' | 'almat' | 'routes' | 'areas';
export type MapLayers = Record<MapLayerKey, boolean>;

export function useMapLayers(initial?: Partial<MapLayers>) {
  const [layers, setLayers] = useState<MapLayers>({
    sultanmamet: true,
    almat: true,
    routes: true,
    areas: true,
    ...initial,
  });

  const toggle = useCallback((key: MapLayerKey) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /** Включить слои (например, когда пользователь просит показать скрытый маршрут). */
  const show = useCallback((keys: MapLayerKey[]) => {
    setLayers((prev) => {
      if (keys.every((k) => prev[k])) return prev;
      const next = { ...prev };
      keys.forEach((k) => {
        next[k] = true;
      });
      return next;
    });
  }, []);

  return { layers, toggle, show };
}
