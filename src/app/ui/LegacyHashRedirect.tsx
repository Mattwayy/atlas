'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const targets: Record<string, string> = {
  sultanmamet: '/persons/sultanmamet',
  almat: '/persons/almat',
};

/**
 * Совместимость со ссылками и QR-кодами статичной версии атласа:
 * `/#sultanmamet` и `/#almat` открывают страницу нужной персоны.
 */
export function LegacyHashRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;
    const go = () => {
      const target = targets[window.location.hash.slice(1)];
      if (target) router.replace(target);
    };
    go();
    window.addEventListener('hashchange', go);
    return () => window.removeEventListener('hashchange', go);
  }, [pathname, router]);

  return null;
}
