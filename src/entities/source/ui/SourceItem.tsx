import type { Source } from '../model/types';
import { getSourceNumber } from '../model/data';
import s from './SourceItem.module.css';

export function SourceItem({ source }: { source: Source }) {
  return (
    <li id={`src-${source.id}`} className={s.item}>
      <span className={s.num}>[{getSourceNumber(source.id)}]</span>
      <span>
        {source.citation}
        {source.url && (
          <>
            {' '}
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              Открыть
            </a>
          </>
        )}
      </span>
    </li>
  );
}
