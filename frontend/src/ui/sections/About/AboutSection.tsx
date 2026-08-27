import { Badge } from '@/ui/reusables/Badge';
import { Card } from '@/ui/reusables/Card';
import { SectionHeading } from '@/ui/reusables/SectionHeading';
import type { Profile, SkillGroup } from '@/types/portfolio.types';

interface AboutSectionProps {
  profile: Profile;
  skills: SkillGroup[];
  softSkills: string[];
  languages: string[];
}

export const AboutSection = ({ profile, skills, softSkills, languages }: AboutSectionProps) => (
  <section id="about" className="px-6 py-24 sm:px-12 lg:px-24">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="About"
        title="Background &amp; skills"
        description="What I've been building, and the stack behind it."
      />

      <Card className="mb-10">
        <p className="leading-relaxed text-[var(--color-text)]">{profile.objective}</p>
        <div className="mt-6">
          <span className="font-medium text-[var(--color-text)]">Open to roles — </span>
          <span className="text-[var(--color-muted)]">{profile.openRoles.join(' · ')}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-muted)]">
          <span>
            <span className="font-medium text-[var(--color-text)]">Soft skills — </span>
            {softSkills.join(' · ')}
          </span>
          <span>
            <span className="font-medium text-[var(--color-text)]">Languages — </span>
            {languages.join(' · ')}
          </span>
        </div>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group) => (
          <Card key={group.category}>
            <h3 className="font-display text-lg font-semibold">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} label={item} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
