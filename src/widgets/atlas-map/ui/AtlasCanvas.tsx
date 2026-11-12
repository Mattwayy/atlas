'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import Link from 'next/link';
import type { Circle as LCircle, Layer, Polyline as LPolyline } from 'leaflet';
import { Circle, CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { tileProviders } from '@/shared/config';
import { personColors } from '@/entities/person';
import { getMapFeature, mapFeatures, type MapFeature } from '@/entities/place';
import type { MapLayers } from '@/features/map-filters';
import type { MapFocusRequest } from '@/features/map-focus';
import s from './AtlasCanvas.module.css';

interface AtlasCanvasProps {
  layers: MapLayers;
  center: [number, number];
  zoom: number;
  height: number;
  focus: MapFocusRequest | null;
}

type LayerRefs = MutableRefObject<Record<string, Layer>>;

/**
 * Подложка с автопереключением: если у провайдера много ошибок и ни одной загруженной плитки,
 * берём следующего из tileProviders.
 */
function BaseTiles() {
  const [index, setIndex] = useState(0);
  const stats = useRef({ ok: 0, bad: 0 });
  const provider = tileProviders[index]!;

  return (
    <TileLayer
      key={provider.name}
      url={provider.url}
      attribution={provider.attribution}
      subdomains={provider.subdomains ?? 'abc'}
      maxZoom={provider.maxZoom ?? 12}
      eventHandlers={{
        tileload: () => {
          stats.current.ok += 1;
        },
        tileerror: () => {
          stats.current.bad += 1;
          if (stats.current.ok === 0 && stats.current.bad >= 4 && index + 1 < tileProviders.length) {
            console.warn(`Подложка «${provider.name}» недоступна, переключаюсь на «${tileProviders[index + 1]!.name}»`);
            stats.current = { ok: 0, bad: 0 };
            setIndex(index + 1);
          }
        },
      }}
    />
  );
}

/** Летит к объекту, который запросили кнопкой «Показать на карте», и открывает его всплывающее окно. */
function FocusController({ focus, layers, layerRefs }: { focus: MapFocusRequest | null; layers: MapLayers; layerRefs: LayerRefs }) {
  const map = useMap();
  const handled = useRef(0);

  useEffect(() => {
    if (!focus || handled.current === focus.nonce) return;
    const feature = getMapFeature(focus.id);
    if (!feature) {
      handled.current = focus.nonce;
      return;
    }
    const layer = layerRefs.current[feature.id];
    if (!layer) return; // слой ещё скрыт: эффект повторится, когда слои обновятся
    handled.current = focus.nonce;

    if (feature.kind === 'point') {
      map.flyTo([feature.lat, feature.lng], 8, { duration: 0.8 });
      layer.openPopup();
    } else {
      const bounds = (layer as LPolyline | LCircle).getBounds();
      map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 7, duration: 0.8 });
      layer.openPopup(bounds.getCenter());
    }
  }, [focus, layers, map, layerRefs]);

  return null;
}

function FeaturePopup({ feature, linkTo }: { feature: MapFeature; linkTo: string }) {
  return (
    <Popup maxWidth={280}>
      <strong>{feature.name}</strong>
      <p>{feature.text}</p>
      {feature.approximate && <p className={s.note}>Положение приблизительное.</p>}
      <Link href={linkTo}>Открыть биографию →</Link>
    </Popup>
  );
}

/**
 * Тяжёлая часть виджета (Leaflet). Подключается ТОЛЬКО через
 * next/dynamic({ ssr: false }) из AtlasMap — на сервере Leaflet не исполняется (ему нужен window).
 */
export default function AtlasCanvas({ layers, center, zoom, height, focus }: AtlasCanvasProps) {
  const layerRefs = useRef<Record<string, Layer>>({});

  const setRef = (id: string) => (layer: Layer | null) => {
    if (layer) layerRefs.current[id] = layer;
    else delete layerRefs.current[id];
  };

  const visible = (f: MapFeature) => {
    if (!layers[f.personId]) return false;
    if (f.kind === 'route' && !layers.routes) return false;
    if (f.kind === 'area' && !layers.areas) return false;
    return true;
  };

  return (
    <div className={s.wrap} style={{ height }}>
      <MapContainer
        key={`${center[0]}-${center[1]}-${zoom}`}
        center={center}
        zoom={zoom}
        minZoom={4}
        maxZoom={12}
        scrollWheelZoom={false}
        className={s.map}
      >
        <BaseTiles />
        <FocusController focus={focus} layers={layers} layerRefs={layerRefs} />

        {/* порядок слоёв: области снизу, маршруты, затем точки */}
        {mapFeatures.filter((f) => f.kind === 'area' && visible(f)).map((f) =>
          f.kind === 'area' ? (
            <Circle
              key={f.id}
              ref={setRef(f.id)}
              center={[f.lat, f.lng]}
              radius={f.radiusKm * 1000}
              pathOptions={{
                color: personColors[f.personId],
                weight: 1.5,
                opacity: 0.8,
                fillColor: personColors[f.personId],
                fillOpacity: 0.12,
                dashArray: '2 6',
              }}
            >
              <Tooltip sticky>{f.name}</Tooltip>
              <FeaturePopup feature={f} linkTo={`/persons/${f.personId}`} />
            </Circle>
          ) : null,
        )}

        {mapFeatures.filter((f) => f.kind === 'route' && visible(f)).map((f) =>
          f.kind === 'route' ? (
            <Polyline
              key={f.id}
              ref={setRef(f.id)}
              positions={f.points}
              pathOptions={{ color: personColors[f.personId], weight: 4, opacity: 0.9, dashArray: '9 8' }}
            >
              <Tooltip sticky>{f.name}</Tooltip>
              <FeaturePopup feature={f} linkTo={`/persons/${f.personId}`} />
            </Polyline>
          ) : null,
        )}

        {mapFeatures.filter((f) => f.kind === 'point' && visible(f)).map((f) =>
          f.kind === 'point' ? (
            <CircleMarker
              key={f.id}
              ref={setRef(f.id)}
              center={[f.lat, f.lng]}
              radius={9}
              pathOptions={{ color: '#fff', weight: 2, fillColor: personColors[f.personId], fillOpacity: 1 }}
            >
              <Tooltip>{f.name}</Tooltip>
              <FeaturePopup feature={f} linkTo={`/persons/${f.personId}`} />
            </CircleMarker>
          ) : null,
        )}
      </MapContainer>
    </div>
  );
}
