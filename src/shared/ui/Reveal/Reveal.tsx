import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import s from './Reveal.module.css';

export type RevealAnimation =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-in-up'
  | 'flip-up'
  | 'slide-up';

interface RevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  /** Задержка в мс, шаг 50 (требование AOS). Удобно для каскада: index * 100. */
  delay?: number;
  /** Растянуть дочерний элемент на всю высоту (ячейки сетки одной высоты). */
  fill?: boolean;
  className?: string;
}

/** Обёртка анимации появления при скролле (библиотека AOS). Инициализация — в src/app/ui/AosProvider. */
export function Reveal({ children, animation = 'fade-up', delay = 0, fill = false, className }: RevealProps) {
  return (
    <div data-aos={animation} data-aos-delay={delay || undefined} className={cn(fill && s.fill, className)}>
      {children}
    </div>
  );
}
