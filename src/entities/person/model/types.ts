export type PersonId = 'sultanmamet' | 'almat';

export interface Achievement {
  title: string;
  text: string;
  /** Историческое значение эпизода — формулировка осторожная, из плана проекта. */
  significance: string;
  sourceIds: string[];
}

export interface Person {
  id: PersonId;
  slug: PersonId;
  name: string;
  subtitle: string;
  fullName: string;
  roles: string[];
  period: string;
  region: string;
  /** Годы жизни; `variants` заполняется, если в источниках есть разночтения. */
  life: { label: string; variants?: string };
  summary: string;
  bio: string[];
  achievements: Achievement[];
  sourceIds: string[];
}

export const personColors: Record<PersonId, string> = {
  sultanmamet: '#1f5f7a',
  almat: '#b5532f',
};
