import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button, Container, Section } from '@/shared/ui';
import { getPersonById, persons, type Person } from '@/entities/person';
import { SourceItem, getSource } from '@/entities/source';
import { PersonAchievements, PersonBio, PersonProfileHead } from '@/widgets/person-profile';
import s from './PersonPage.module.css';

const Timeline = dynamic(() => import('@/widgets/timeline').then((m) => m.Timeline));
const AtlasMap = dynamic(() => import('@/widgets/atlas-map').then((m) => m.AtlasMap));
const Archive = dynamic(() => import('@/widgets/archive').then((m) => m.Archive));

export function PersonPage({ person }: { person: Person }) {
  const other = getPersonById(persons.find((p) => p.id !== person.id)!.id);
  const personSources = person.sourceIds.map((id) => getSource(id)).filter((x) => x !== undefined);

  return (
    <>
      <PersonProfileHead person={person} />

      <Section id="bio" eyebrow="Краткая биография" title="Происхождение и регион" tone="paper">
        <PersonBio person={person} />
      </Section>

      <Section id="achievements" eyebrow="Ключевые достижения" title="Что сделал" tone="sand">
        <PersonAchievements person={person} />
      </Section>

      <Section id="timeline" eyebrow="Хронология" title="События в жизни" tone="paper">
        <Timeline personId={person.id} />
      </Section>

      <Section id="map" eyebrow="Карта" title="Регион деятельности и маршруты" tone="sand">
        <AtlasMap personId={person.id} />
      </Section>

      <Section id="archive" eyebrow="Архивные свидетельства" title="Документы" tone="paper">
        <Archive personId={person.id} />
      </Section>

      <Section id="person-sources" eyebrow="Источники" title={`Источники к профилю: ${person.name}`} tone="paper">
        <ul className={s.sources}>
          {personSources.map((src) => (
            <SourceItem key={src.id} source={src} />
          ))}
        </ul>
        <p>
          <Link href="/#sources">Полный список литературы →</Link>
        </p>
      </Section>

      <Container className={s.next}>
        <p>Читать дальше:</p>
        <Button href={`/persons/${other.slug}`} variant="ghost">
          {other.name}
        </Button>
      </Container>
    </>
  );
}
