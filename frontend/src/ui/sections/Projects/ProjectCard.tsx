import { Badge } from '@/ui/reusables/Badge';
import { Card } from '@/ui/reusables/Card';
import { GithubIcon } from '@/ui/reusables/Icons';
import type { Project } from '@/types/portfolio.types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <Card className="flex h-full flex-col">
    <div className="flex items-start justify-between gap-4">
      <h3 className="font-display text-xl font-semibold">{project.title}</h3>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} on GitHub`}
          title="View on GitHub"
          className="shrink-0 rounded-full p-2 text-[var(--color-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--surface-2)] hover:text-[var(--color-accent)]"
        >
          <GithubIcon className="h-5 w-5" />
        </a>
      )}
    </div>
    <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">{project.subtitle}</p>
    <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>
    <div className="mt-5 flex flex-wrap gap-2">
      {project.tech.map((tech) => (
        <Badge key={tech} label={tech} />
      ))}
      {project.tags.map((tag) => (
        <Badge key={tag} label={tag} />
      ))}
    </div>
  </Card>
);
