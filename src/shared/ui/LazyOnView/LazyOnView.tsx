'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';

interface LazyOnViewProps {
  children: ReactNode;
  /** Высота резервируемого места, чтобы страница не «прыгала» при подгрузке. */
  minHeight?: number;
  /** Начинаем загрузку заранее, до попадания блока во viewport. */
  rootMargin?: string;
  fallback?: ReactNode;
}

/**
 * Монтирует детей только когда блок приблизился к viewport.
 * В связке с next/dynamic({ ssr: false }) JS-чанк тяжёлого виджета (карта)
 * не скачивается, пока пользователь до него не доскроллил.
 */
export function LazyOnView({ children, minHeight = 400, rootMargin = '300px', fallback }: LazyOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : (fallback ?? <Skeleton height={minHeight} />)}
    </div>
  );
}
