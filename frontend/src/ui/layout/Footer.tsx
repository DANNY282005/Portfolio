interface FooterProps {
  name: string;
}

export const Footer = ({ name }: FooterProps) => (
  <footer
    className="border-t px-6 py-8 text-center text-sm text-[var(--color-muted)]"
    style={{ borderColor: 'var(--border)' }}
  >
    <p>
      © {new Date().getFullYear()} {name}. Built with React &amp; FastAPI.
    </p>
  </footer>
);
