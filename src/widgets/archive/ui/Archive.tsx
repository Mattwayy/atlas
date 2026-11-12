'use client';

import { useState } from 'react';
import { Button, Reveal, Section } from '@/shared/ui';
import { DocumentCard, documents, type ArchiveDocument } from '@/entities/document';
import { getPersonById, type PersonId } from '@/entities/person';
import { DocumentDialog } from '@/features/open-document';
import s from './Archive.module.css';

export function Archive({ personId }: { personId?: PersonId }) {
  const [selected, setSelected] = useState<ArchiveDocument | null>(null);
  const list = personId ? documents.filter((d) => d.personId === personId) : documents;

  const body = (
    <>
      <div className={s.grid}>
        {list.map((doc, i) => (
          <Reveal key={doc.id} fill delay={(i % 3) * 100}>
            <DocumentCard
              document={doc}
              personName={getPersonById(doc.personId).name}
              action={
                <Button variant="ghost" onClick={() => setSelected(doc)} aria-haspopup="dialog">
                  Открыть документ
                </Button>
              }
            />
          </Reveal>
        ))}
      </div>
      <DocumentDialog doc={selected} onClose={() => setSelected(null)} />
    </>
  );

  if (personId) return body;

  return (
    <Section
      id="archive"
      eyebrow="Архивные свидетельства"
      title="Документы и записи современников"
      lead="Содержание, контекст и ссылка на источник."
      tone="sand"
    >
      {body}
    </Section>
  );
}
