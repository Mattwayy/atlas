import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import s from './Container.module.css';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(s.container, className)}>{children}</div>;
}
