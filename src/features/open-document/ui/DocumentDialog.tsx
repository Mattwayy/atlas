'use client';

import { Modal, Note } from '@/shared/ui';
import { SourceRefs } from '@/entities/source';
import type { ArchiveDocument } from '@/entities/document';
import s from './DocumentDialog.module.css';

interface DocumentDialogProps {
  doc: ArchiveDocument | null;
  onClose: () => void;
}

/** Модальная карточка документа: содержание, контекст, источники. */
export function DocumentDialog({ doc, onClose }: DocumentDialogProps) {
  return (
    <Modal open={doc !== null} onClose={onClose} title={doc?.title ?? ''}>
      {doc && (
        <div data-person={doc.personId}>
          <p className={s.meta}>
            {doc.kind} · {doc.date}
          </p>

          <h4 className={s.h}>Содержание</h4>
          <blockquote className={s.quote}>{doc.excerpt}</blockquote>
          {!doc.excerptIsVerbatim && (
            <Note title="Это не дословная цитата">Содержание документа изложено своими словами.</Note>
          )}

          <h4 className={s.h}>Контекст</h4>
          <p>{doc.context}</p>

          <SourceRefs ids={doc.sourceIds} />
        </div>
      )}
    </Modal>
  );
}
