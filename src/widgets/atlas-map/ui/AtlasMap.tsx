'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LazyOnView, Note, Section, Skeleton } from '@/shared/ui';
import { getMapFeature } from '@/entities/place';
import type { PersonId } from '@/entities/person';
import { MapFilters, useMapLayers, type MapLayerKey } from '@/features/map-filters';
import { clearMapFocus, useMapFocus } from '@/features/map-focus';
import s from './AtlasMap.module.css';

// Leaflet тянется отдельным чанком и только в браузере.
const AtlasCanvas = dynamic(() => import('./AtlasCanvas'), {
  ssr: false,
  loading: () => <Skeleton height={520} label="Загрузка карты…" />,
});

const defaultView = { center: [47.5, 66] as [number, number], zoom: 5 };
const personView: Record<PersonId, { center: [number, number]; zoom: number }> = {
  sultanmamet: { center: [50, 72], zoom: 5 },
  almat: { center: [45.5, 60], zoom: 5 },
};

interface AtlasMapProps {
  /** Если задан — карта показывает только эту персону (страница профиля). */
  personId?: PersonId;
}

export function AtlasMap({ personId }: AtlasMapProps) {
  const { layers, toggle, show } = useMapLayers(
    personId ? { sultanmamet: personId === 'sultanmamet', almat: personId === 'almat' } : undefined,
  );
  const focus = useMapFocus();

  useEffect(() => clearMapFocus, []);

  // Запрошенный объект скрыт переключателями — включаем нужные слои.
  useEffect(() => {
    if (!focus) return;
    const f = getMapFeature(focus.id);
    if (!f) return;
    const keys: MapLayerKey[] = [f.personId];
    if (f.kind === 'route') keys.push('routes');
    if (f.kind === 'area') keys.push('areas');
    show(keys);
  }, [focus, show]);

  const view = personId ? personView[personId] : defaultView;
  const height = personId ? 420 : 560;

  const content = (
    <div data-atlas-map>
      <div className={s.toolbar}>
        <MapFilters layers={layers} onToggle={toggle} only={personId ? ['routes', 'areas'] : undefined} />
      </div>

      <LazyOnView minHeight={height}>
        <AtlasCanvas layers={layers} center={view.center} zoom={view.zoom} height={height} focus={focus} />
      </LazyOnView>

      <div className={s.legend}>
        <ul className={s.legendList} aria-label="Легенда">
          <li>
            <span className={s.pin} style={{ background: 'var(--c-sultan)' }} /> Султанмамет
          </li>
          <li>
            <span className={s.pin} style={{ background: 'var(--c-almat)' }} /> Алмат
          </li>
          <li>
            <span className={s.line} /> Маршрут (схема)
          </li>
          <li>
            <span className={s.region} /> Область деятельности (условный контур)
          </li>
        </ul>

        <Note title="Как читать карту">
          Положение точек и контуров приблизительное, линии маршрутов — схемы, а не восстановленные пути.
        </Note>
      </div>
    </div>
  );

  if (personId) {
    return <div className={s.compact}>{content}</div>;
  }

  return (
    <Section
      id="atlas"
      eyebrow="Карта атласа"
      title="Где они жили и действовали"
      lead="Выберите деятеля или слой. Клик по объекту открывает краткое окно и ссылку на биографию; в хронологии у событий есть кнопка «Показать на карте»."
      tone="paper"
    >
      {content}
    </Section>
  );
}
