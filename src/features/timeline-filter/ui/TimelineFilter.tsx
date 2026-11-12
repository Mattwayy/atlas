'use client';

import { cn } from '@/shared/lib';
import type { TimelineFilterValue } from '../model/useTimelineFilter';
import s from './TimelineFilter.module.css';

const options: Array<{ value: TimelineFilterValue; label: string }> = [
  { value: 'all', label: 'Обе биографии' },
  { value: 'sultanmamet', label: 'Султанмамет' },
  { value: 'almat', label: 'Алмат' },
];

export function TimelineFilter({
  value,
  onChange,
}: {
  value: TimelineFilterValue;
  onChange: (v: TimelineFilterValue) => void;
}) {
  return (
    <div className={s.group} role="radiogroup" aria-label="Показать события">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          data-person={o.value === 'all' ? undefined : o.value}
          className={cn(s.option, value === o.value && s.active)}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
