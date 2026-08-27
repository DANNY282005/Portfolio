interface BadgeProps {
  label: string;
}

export const Badge = ({ label }: BadgeProps) => (
  <span
    className="font-mono rounded-full px-3 py-1 text-xs"
    style={{
      backgroundColor: 'var(--tag-bg)',
      border: '1px solid var(--tag-border)',
      color: 'var(--color-text)',
    }}
  >
    {label}
  </span>
);
