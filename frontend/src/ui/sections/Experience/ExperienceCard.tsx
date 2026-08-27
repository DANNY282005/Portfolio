import { Card } from '@/ui/reusables/Card';
import type { Experience } from '@/types/portfolio.types';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => (
  <Card className="relative">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="font-display text-lg font-semibold">{experience.role}</h3>
      <span className="font-mono text-xs text-[var(--color-accent)]">{experience.period}</span>
    </div>
    <p className="mt-1 text-sm text-[var(--color-muted)]">
      {experience.company} · {experience.location}
    </p>
    {experience.project ? (
      <p className="mt-1 text-sm italic text-[var(--color-muted)]">Project: {experience.project}</p>
    ) : null}
    <ul className="mt-4 space-y-2">
      {experience.highlights.map((highlight, index) => (
        <li key={index} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text)]">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--ring)' }} />
          {highlight}
        </li>
      ))}
    </ul>
  </Card>
);
