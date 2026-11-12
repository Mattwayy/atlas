import type { MapFeature } from './types';

/**
 * Все объекты карты. Чтобы добавить точку, маршрут или область — допишите объект в массив.
 * `approximate: true` — координаты приблизительные, их нужно уточнить по источникам.
 * Линии маршрутов — схемы, а не реконструкция реальных путей.
 */
export const mapFeatures: MapFeature[] = [
  // ── Султанмамет ───────────────────────────────────────────
  {
    id: 'turkestan',
    kind: 'point',
    personId: 'sultanmamet',
    name: 'Туркестан',
    lat: 43.2973,
    lng: 68.2518,
    text: 'Место рождения Султанмамета (1710).',
  },
  {
    id: 'koryakov',
    kind: 'point',
    personId: 'sultanmamet',
    name: 'Коряковский форпост',
    approximate: true,
    lat: 52.35,
    lng: 77.05,
    text: 'К форпосту прибыли вооружённые казахи «ведомства Султанмамет-султана» (рапорт 1754 г.).',
  },
  {
    id: 'irtysh',
    kind: 'point',
    personId: 'sultanmamet',
    name: 'Берег Иртыша',
    approximate: true,
    lat: 52.0,
    lng: 77.6,
    text: 'Место смерти Султанмамета (1794).',
  },
  {
    id: 'ulus',
    kind: 'area',
    personId: 'sultanmamet',
    name: 'Кыпчакский улус (условно)',
    approximate: true,
    lat: 53.2,
    lng: 75.3,
    radiusKm: 280,
    text: 'Условное обозначение: Павлодарская, Омская и часть Восточно-Казахстанской области.',
  },
  {
    id: 'pylny',
    kind: 'route',
    personId: 'sultanmamet',
    name: '«Пыльный поход» 1771 г. (схема)',
    approximate: true,
    points: [
      [52.3, 77.0],
      [51.8, 70.0],
      [51.0, 63.0],
      [49.5, 56.0],
      [48.5, 49.0],
    ],
    text: 'Условная линия: реальный маршрут по источникам не восстановлен.',
  },

  // ── Алмат Тобабергенов ────────────────────────────────────
  {
    id: 'orenburg',
    kind: 'point',
    personId: 'almat',
    name: 'Оренбург',
    lat: 51.7727,
    lng: 55.0988,
    text: 'Начало маршрута каравана Демезона; центр Оренбургской администрации.',
  },
  {
    id: 'bukhara',
    kind: 'point',
    personId: 'almat',
    name: 'Бухара',
    lat: 39.7747,
    lng: 64.4286,
    text: 'Цель миссий Демезона (1833–1834) и Виткевича (1836).',
  },
  {
    id: 'mausoleum',
    kind: 'point',
    personId: 'almat',
    name: 'Мавзолей Алмат сардара',
    approximate: true,
    lat: 48.68,
    lng: 61.03,
    text: 'Построен в 1886–1888 гг., примерно в 22 км от Иргиза. Координаты приблизительные.',
  },
  {
    id: 'irgiz-area',
    kind: 'area',
    personId: 'almat',
    name: 'Иргизский край (условно)',
    approximate: true,
    lat: 48.62,
    lng: 61.25,
    radiusKm: 120,
    text: 'Условное обозначение: зимовки шомекейцев и 54-я дистанция.',
  },
  {
    id: 'demezon',
    kind: 'route',
    personId: 'almat',
    name: 'Караван Демезона: Оренбург — Бухара (схема)',
    approximate: true,
    points: [
      [51.7727, 55.0988],
      [50.3, 57.5],
      [48.62, 61.25],
      [45.8, 62.1],
      [42.8, 63.2],
      [39.7747, 64.4286],
    ],
    text: 'Схематичный маршрут через Иргиз.',
  },
];

export const getMapFeature = (id: string) => mapFeatures.find((f) => f.id === id);
