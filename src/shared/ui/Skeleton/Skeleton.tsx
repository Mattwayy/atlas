import s from './Skeleton.module.css';

export function Skeleton({ height = 360, label = 'Загрузка…' }: { height?: number; label?: string }) {
  return (
    <div className={s.skeleton} style={{ height }} role="status" aria-live="polite">
      <span className={s.label}>{label}</span>
    </div>
  );
}
