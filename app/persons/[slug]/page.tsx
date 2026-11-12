import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPerson, persons } from '@/entities/person';
import { PersonPage } from '@/pages/person';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return persons.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return {};
  return { title: person.name, description: person.summary };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();
  return <PersonPage person={person} />;
}
