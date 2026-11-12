'use client';

import { useState } from 'react';
import type { PersonId } from '@/entities/person';

export type TimelineFilterValue = 'all' | PersonId;

export function useTimelineFilter(initial: TimelineFilterValue = 'all') {
  const [value, setValue] = useState<TimelineFilterValue>(initial);
  return { value, setValue };
}
