import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import { Container } from '../Container/Container';
import s from './Section.module.css';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: ReactNode;
  tone?: 'paper' | 'sand' | 'dark';
  children?: ReactNode;
}

export function Section({ id, eyebrow, title, lead, tone = 'paper', children }: SectionProps) {
  const titleId = id ? `${id}-title` : undefined;
  return (
    <section id={id} className={cn(s.section, s[tone])} aria-labelledby={title ? titleId : undefined}>
      <Container>
        {(eyebrow || title || lead) && (
          <header className={s.head} data-aos="fade-up">
            {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
            {title && (
              <h2 id={titleId} className={s.title}>
                {title}
              </h2>
            )}
            {lead && <div className={s.lead}>{lead}</div>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
