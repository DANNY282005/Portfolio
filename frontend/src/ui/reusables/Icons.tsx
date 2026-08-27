interface IconProps {
  className?: string;
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const HomeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9" />
  </svg>
);

export const CodeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="m9 18-6-6 6-6" />
    <path d="m15 6 6 6-6 6" />
  </svg>
);

export const UserIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
  </svg>
);

export const GraduationCapIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" />
    <path d="M6 10.8v4.2c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.2" />
    <path d="M21 8.5v6" />
  </svg>
);

export const BriefcaseIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 16 5v2M3 12h18M10 12v2h4v-2" />
  </svg>
);

export const FlaskIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M9 3h6M10 3v6.5l-5.2 8.2A1.5 1.5 0 0 0 6.1 20h11.8a1.5 1.5 0 0 0 1.3-2.3L14 9.5V3" />
    <path d="M8 15h8" />
  </svg>
);

export const ExternalLinkIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </svg>
);

export const MailIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const SunIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a7 7 0 0 0 10.2 10.2Z" />
  </svg>
);

export const DownloadIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 19.5h14" />
  </svg>
);

export const GithubIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M9 19c-4 .9-4-2-5-2m10 4v-3.9c0-1 .1-1.4-.5-2 1.7-.2 3.5-.8 3.5-3.7 0-.8-.3-1.5-.8-2 .1-.2.3-1-.1-2.1 0 0-.6-.2-2.1.8a7.3 7.3 0 0 0-3.8 0c-1.5-1-2.1-.8-2.1-.8-.4 1.1-.2 1.9-.1 2.1-.5.5-.8 1.2-.8 2 0 2.9 1.8 3.5 3.5 3.7-.6.5-.6 1.1-.5 2V21" />
  </svg>
);

export const LinkedinIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
    <path d="M6.5 8.5V20M6.5 4.5v.1M11 20v-6.2a3.3 3.3 0 0 1 6.5 0V20M11 11v9M4 20h5M15 20h5" />
  </svg>
);
