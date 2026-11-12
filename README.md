# Забытые имена Казахстана

Интерактивный историко-биографический атлас (Next.js 15, App Router, React 19, TypeScript).
Чистый клиент без бэкенда: все данные лежат в `src/entities/*/model/data.ts`, ни API-роутов, ни БД.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Нужен интернет: шрифты (`next/font/google`) при сборке и тайлы карты в браузере.

## Карта

Leaflet + react-leaflet, 2D. Подложки бесплатные, без API-ключа (CARTO стал платным): Esri (улицы) → Esri (топо) →
OpenTopoMap → OpenStreetMap. Если у текущей плитки не грузятся, карта сама переключается на следующую.
Список и порядок: `src/shared/config/map.ts`.

- Объекты карты (точки, схемы маршрутов, области): `src/entities/place/model/data.ts`.
- Слои: персоны, маршруты, области деятельности (`features/map-filters`).
- У события в хронологии с полем `focus` есть кнопка «Показать на карте»: карта прокручивается, летит к объекту
  и открывает его окно (`features/map-focus`). На страницах персон работает так же.
- Ссылки старой статичной версии `/#sultanmamet` и `/#almat` перенаправляются на страницы персон (для QR).

## Анимация при скролле (AOS)

Библиотека `aos` инициализируется в `src/app/ui/AosProvider.tsx` (длительность 700 мс, один раз на элемент).
Анимация задаётся атрибутами `data-aos` / `data-aos-delay` или обёрткой `<Reveal>` из `shared/ui`.
При `prefers-reduced-motion` анимация выключена, без JS контент показывается сразу (`<noscript>` в `AppShell`).
Лениво подгружаемые секции AOS подхватывает сам (MutationObserver).

## SSR и lazy load

| Что | Как |
|---|---|
| Все страницы | Рендерятся на сервере (SSR/SSG); `/persons/[slug]` — через `generateStaticParams` |
| Первый экран (Hero, Intro, BioCards) | Статический импорт, в основном бандле |
| Остальные секции главной и страницы персоны | `next/dynamic`: HTML рендерится на сервере, JS — отдельный чанк |
| Карта (Leaflet) | `dynamic({ ssr: false })` + `LazyOnView`: чанк грузится только в браузере и только когда блок подходит к viewport |

## Структура (Feature-Sliced Design)

```
app/                    Роуты Next.js (тонкие файлы, только сборка из src/)
pages/                  Пустая папка-заглушка: Next не должен принять src/pages за Pages Router
src/
  app/                  Слой app: оболочка, шрифты, глобальные стили
  pages/                home, person — композиция виджетов
  widgets/              header, footer, hero, intro, atlas-map, bio-cards, timeline, compare,
                        archive, about, methodology, results, sources, person-profile
  features/             map-filters, map-focus, timeline-filter, open-document, mobile-menu
  entities/             person, event, place, document, source, survey (типы + данные + UI)
  shared/               ui (Section, Button, Modal, LazyOnView…), lib, config
```

Правило импортов: слой импортирует только слои ниже себя и только через публичный `index.ts` слайса.
Алиас `@/*` → `src/*`.

## Как править контент

- Люди, достижения, спорные даты: `src/entities/person/model/data.ts`
- События хронологии: `src/entities/event/model/data.ts`
- Точки, области, схемы маршрутов карты: `src/entities/place/model/data.ts`
- Архивные документы: `src/entities/document/model/data.ts`
- Библиография (сквозная нумерация [1]…[7]): `src/entities/source/model/data.ts`
- Результаты апробации: `src/entities/survey/model/data.ts`
- Автор / руководитель в подвале: `src/shared/config/site.ts`

## Что нужно проверить перед публикацией

Проект следует требованиям из «Документа 2»: спорные даты показаны вариантами, портреты заменены подписанными
силуэтами, неподтверждённая геометрия не нанесена. Но:

1. **Привязка источников к фактам** — в плане такой привязки нет, она проставлена по смыслу
   (`sourceIds` в данных событий и достижений). Проверьте.
2. **Карта** — координаты с `approximate: true` приблизительные, области — условные круги, а маршруты «Пыльного
   похода» и каравана Демезона — схемы (в плане нет их географии). Они помечены на карте и в окнах объектов.
3. **Архивные «цитаты»** — это пересказ из плана (`excerptIsVerbatim: false`). Замените дословным текстом
   после сверки с оригиналами, добавьте сканы.
4. **Для записей Виткевича** библиографической записи в плане нет.
5. **Результаты апробации** приведены как заявленные в плане; нужны анкеты для защиты.
