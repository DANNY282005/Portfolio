import { ProjectCard } from '@/ui/sections/Projects/ProjectCard';
import { SectionHeading } from '@/ui/reusables/SectionHeading';
import type { Project } from '@/types/portfolio.types';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => (
  <section id="projects" className="px-6 py-24 sm:px-12 lg:px-24">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="Personal and academic projects spanning agentic AI, DevOps, and Backend development."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);
