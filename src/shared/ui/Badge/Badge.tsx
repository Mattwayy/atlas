import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import s from './Badge.module.css';

export function Badge({
  children,
  tone = 'neutral',
  title,
}: {
  children: ReactNode;
  tone?: 'neutral' | 'warn' | 'accent';
  title?: string;
}) {
  return (
    <span className={cn(s.badge, s[tone])} title={title}>
      {children}
    </span>
  );
}
