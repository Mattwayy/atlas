'use client';

import { cn } from '@/shared/lib';
import type { MapLayerKey, MapLayers } from '../model/useMapLayers';
import s from './MapFilters.module.css';

const items: Array<{ key: MapLayerKey; label: string }> = [
  { key: 'sultanmamet', label: 'Султанмамет' },
  { key: 'almat', label: 'Алмат' },
  { key: 'routes', label: 'Маршруты' },
  { key: 'areas', label: 'Области деятельности' },
];

interface MapFiltersProps {
  layers: MapLayers;
  onToggle: (key: MapLayerKey) => void;
  /** Какие переключатели показывать (на странице персоны — только маршруты). */
  only?: MapLayerKey[];
}

export function MapFilters({ layers, onToggle, only }: MapFiltersProps) {
  const visible = only ? items.filter((i) => only.includes(i.key)) : items;
  return (
    <div className={s.filters} role="group" aria-label="Слои карты">
      {visible.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={cn(s.chip, layers[key] && s.on)}
          data-layer={key}
          aria-pressed={layers[key]}
          onClick={() => onToggle(key)}
        >
          <span className={s.dot} aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}
