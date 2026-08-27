import { Card } from '@/ui/reusables/Card';
import { ExternalLinkIcon } from '@/ui/reusables/Icons';
import { SectionHeading } from '@/ui/reusables/SectionHeading';
import type { ResearchPaper } from '@/types/portfolio.types';

interface ResearchSectionProps {
  research: ResearchPaper[];
}

export const ResearchSection = ({ research }: ResearchSectionProps) => {
  if (research.length === 0) return null;

  return (
    <section id="research" className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Research" title="Published papers" description="Peer-reviewed IEEE publications." />
        <div className="space-y-5">
          {research.map((paper) => (
            <Card key={paper.id}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-lg font-semibold">{paper.title}</h3>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-xs text-[var(--color-accent)]">{paper.date}</span>
                  {paper.url && (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Read ${paper.title} on IEEE Xplore`}
                      title="Read on IEEE Xplore"
                      className="rounded-full p-2 text-[var(--color-muted)] transition-all hover:-translate-y-0.5 hover:bg-[var(--surface-2)] hover:text-[var(--color-accent)]"
                    >
                      <ExternalLinkIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{paper.publisher}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]">{paper.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
