import Link from 'next/link';
import { getSource, getSourceNumber } from '../model/data';
import s from './SourceRefs.module.css';

/** Компактные ссылки на источники [1] [2] — каждая ведёт к записи в разделе «Источники». */
export function SourceRefs({ ids, note }: { ids: string[]; note?: string }) {
  const valid = ids.map((id) => getSource(id)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  if (valid.length === 0) return null;

  return (
    <p className={s.refs}>
      <span className={s.label}>Источники:</span>
      {valid.map((src) => (
        <Link key={src.id} href={`/#src-${src.id}`} className={s.chip} title={src.citation}>
          [{getSourceNumber(src.id)}]
        </Link>
      ))}
      {note && <span className={s.note}>{note}</span>}
    </p>
  );
}
