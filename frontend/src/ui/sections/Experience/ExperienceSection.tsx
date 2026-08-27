import { ExperienceCard } from '@/ui/sections/Experience/ExperienceCard';
import { SectionHeading } from '@/ui/reusables/SectionHeading';
import type { Experience } from '@/types/portfolio.types';

interface ExperienceSectionProps {
  experience: Experience[];
}

export const ExperienceSection = ({ experience }: ExperienceSectionProps) => (
  <section id="experience" className="px-6 py-24 sm:px-12 lg:px-24">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="Roles in reverse-chronological order, most recent first."
      />
      <div className="space-y-5">
        {experience.map((role) => (
          <ExperienceCard key={role.id} experience={role} />
        ))}
      </div>
    </div>
  </section>
);
