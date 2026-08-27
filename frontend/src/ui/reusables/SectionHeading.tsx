interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mb-10 max-w-2xl">
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">{eyebrow}</span>
    <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
    {description ? <p className="mt-3 text-[var(--color-muted)]">{description}</p> : null}
  </div>
);
