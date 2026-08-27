import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { resumeDownloadUrl } from '@/services/portfolioService';
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from '@/ui/reusables/Icons';
import { AgentGraphMark } from '@/ui/reusables/AgentGraphMark';
import type { Profile } from '@/types/portfolio.types';

interface HeroSectionProps {
  profile: Profile;
}

export const HeroSection = ({ profile }: HeroSectionProps) => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="hero" className="relative flex min-h-screen items-center px-6 pb-24 pt-32 sm:px-12 lg:px-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
            {profile.location}
          </span>
          <h1 className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="text-gradient font-display mt-2 text-xl font-medium sm:text-2xl">{profile.title}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={resumeDownloadUrl()}
              className="flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-transform hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(100deg, var(--accent-from), var(--accent-to))' }}
            >
              <DownloadIcon className="h-4 w-4" />
              Download resume
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3" aria-label="Social links">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors hover:bg-[var(--surface-2)]"
              style={{ border: '1px solid var(--border)', color: 'var(--color-muted)' }}
            >
              <MailIcon className="h-4 w-4" />
              Email
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors hover:bg-[var(--surface-2)]"
              style={{ border: '1px solid var(--border)', color: 'var(--color-muted)' }}
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors hover:bg-[var(--surface-2)]"
              style={{ border: '1px solid var(--border)', color: 'var(--color-muted)' }}
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end" aria-hidden="true">
          <AgentGraphMark className="w-full max-w-sm" reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
};
