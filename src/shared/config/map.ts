export interface TileProvider {
  name: string;
  url: string;
  attribution: string;
  subdomains?: string;
  maxZoom?: number;
}

/**
 * Подложки карты — бесплатные, без API-ключа. Используется первая; если её плитки не загружаются
 * (блокировка, сбой), карта сама переключается на следующую (см. AtlasCanvas).
 * CARTO больше не работает без ключа. Плитки openstreetmap.org блокируют запросы без Referer (403),
 * поэтому стоят последними. Порядок и состав можно менять.
 */
export const tileProviders: TileProvider[] = [
  {
    name: 'Esri: улицы',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 12,
    attribution:
      'Tiles &copy; <a href="https://www.esri.com/">Esri</a> — Esri, DeLorme, NAVTEQ, HERE, OpenStreetMap contributors',
  },
  {
    name: 'Esri: топографическая',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 12,
    attribution:
      'Tiles &copy; <a href="https://www.esri.com/">Esri</a> — Esri, HERE, Garmin, OpenStreetMap contributors',
  },
  {
    name: 'OpenTopoMap',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    subdomains: 'abc',
    maxZoom: 12,
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, SRTM | Style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
  },
  {
    name: 'OpenStreetMap',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 12,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
];
