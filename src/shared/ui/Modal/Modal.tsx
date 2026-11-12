'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import s from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/** Модальное окно на нативном <dialog>: фокус-ловушка и Esc работают из коробки. */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className={s.inner}>
        <header className={s.header}>
          <h3 id={titleId} className={s.title}>
            {title}
          </h3>
          <button type="button" className={s.close} onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </header>
        <div className={s.body}>{children}</div>
      </div>
    </dialog>
  );
}
