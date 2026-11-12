import dynamic from 'next/dynamic';
import { Hero } from '@/widgets/hero';
import { Intro } from '@/widgets/intro';
import { BioCards } from '@/widgets/bio-cards';

/**
 * SSR + lazy load.
 * Первый экран (Hero, Intro, BioCards) импортируется статически и сразу в основном бандле.
 * Остальные секции — через next/dynamic: их HTML по-прежнему рендерится на сервере (SEO),
 * но JS каждой секции лежит в отдельном чанке и подгружается отдельно от основного бандла.
 * Карта Leaflet догружается ещё позже: только в браузере и когда блок подходит к viewport
 * (см. widgets/atlas-map и shared/ui/LazyOnView).
 */
const AtlasMap = dynamic(() => import('@/widgets/atlas-map').then((m) => m.AtlasMap));
const Timeline = dynamic(() => import('@/widgets/timeline').then((m) => m.Timeline));
const Compare = dynamic(() => import('@/widgets/compare').then((m) => m.Compare));
const Archive = dynamic(() => import('@/widgets/archive').then((m) => m.Archive));
const About = dynamic(() => import('@/widgets/about').then((m) => m.About));
const Methodology = dynamic(() => import('@/widgets/methodology').then((m) => m.Methodology));
const Results = dynamic(() => import('@/widgets/results').then((m) => m.Results));
const Sources = dynamic(() => import('@/widgets/sources').then((m) => m.Sources));

export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <AtlasMap />
      <BioCards />
      <Timeline />
      <Compare />
      <Archive />
      <About />
      <Methodology />
      <Results />
      <Sources />
    </>
  );
}
