import { Card } from '@/ui/reusables/Card';
import { SectionHeading } from '@/ui/reusables/SectionHeading';
import type { Certification, EducationEntry } from '@/types/portfolio.types';

interface EducationSectionProps {
  education: EducationEntry[];
  certifications: Certification[];
}

export const EducationSection = ({ education, certifications }: EducationSectionProps) => (
  <section id="education" className="px-6 py-24 sm:px-12 lg:px-24">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Education"
        title="Academic background &amp; certifications"
        description="Degrees, coursework, and professional certifications."
      />

      <h3 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        Certifications
      </h3>
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <Card key={cert.id}>
            <p className="font-medium text-[var(--color-text)]">{cert.name}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{cert.issuer}</p>
          </Card>
        ))}
      </div>

      <h3 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        Academic education
      </h3>
      <div className="space-y-4">
        {education.map((entry) => (
          <Card key={entry.id} className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--ring)' }} />
              <div>
                <p className="font-display font-semibold">{entry.degree}</p>
                <p className="text-sm text-[var(--color-muted)]">
                  {entry.institution} · {entry.detail}
                </p>
              </div>
            </div>
            <span className="font-mono text-sm text-[var(--color-accent)]">{entry.period}</span>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
