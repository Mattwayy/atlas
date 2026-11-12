import { Button, Section } from '@/shared/ui';

export default function NotFound() {
  return (
    <Section eyebrow="404" title="Страница не найдена" lead="Возможно, ссылка устарела. Вернитесь к атласу.">
      <Button href="/">На главную</Button>
    </Section>
  );
}
