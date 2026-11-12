import type { PersonId } from '@/entities/person';

export type LatLng = [number, number];

interface FeatureBase {
  id: string;
  personId: PersonId;
  name: string;
  text: string;
  /** Координаты или контур приблизительные: показывается пометка «Положение приблизительное». */
  approximate?: boolean;
}

export interface PointFeature extends FeatureBase {
  kind: 'point';
  lat: number;
  lng: number;
}

/** Схематичная линия маршрута: реальный путь по источникам не восстановлен. */
export interface RouteFeature extends FeatureBase {
  kind: 'route';
  points: LatLng[];
}

/** Условная область деятельности (не государственная граница). */
export interface AreaFeature extends FeatureBase {
  kind: 'area';
  lat: number;
  lng: number;
  radiusKm: number;
}

export type MapFeature = PointFeature | RouteFeature | AreaFeature;
