'use client';

import { useEffect } from 'react';
import AOS from 'aos';
// import 'aos/dist/aos.css';

/**
 * Инициализация AOS (анимация при скролле). Элементы помечаются атрибутами data-aos
 * (см. shared/ui/Reveal). Новые элементы, которые подгружаются лениво (next/dynamic) или при
 * переходах между страницами, AOS подхватывает сам через MutationObserver.
 * При `prefers-reduced-motion: reduce` анимация отключается, контент показывается сразу.
 */
export function AosProvider() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  return null;
}
