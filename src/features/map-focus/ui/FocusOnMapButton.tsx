'use client';

import { requestMapFocus } from '../model/store';
import s from './FocusOnMapButton.module.css';

export function FocusOnMapButton({ featureId, label = 'Показать на карте →' }: { featureId: string; label?: string }) {
  return (
    <button
      type="button"
      className={s.btn}
      onClick={() => {
        requestMapFocus(featureId);
        document.querySelector('[data-atlas-map]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {label}
    </button>
  );
}
