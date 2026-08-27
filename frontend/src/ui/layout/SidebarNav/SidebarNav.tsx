import { useTheme } from '@/hooks/useTheme';
import { useActiveSection } from '@/hooks/useActiveSection';
import {
  BriefcaseIcon,
  CodeIcon,
  FlaskIcon,
  GraduationCapIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from '@/ui/reusables/Icons';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', Icon: HomeIcon },
  { id: 'projects', label: 'Projects', Icon: CodeIcon },
  { id: 'about', label: 'About', Icon: UserIcon },
  { id: 'experience', label: 'Experience', Icon: BriefcaseIcon },
  { id: 'research', label: 'Research', Icon: FlaskIcon },
  { id: 'education', label: 'Education', Icon: GraduationCapIcon },
] as const;

export const SidebarNav = () => {
  const { theme, toggleTheme } = useTheme();
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-1/2 bottom-4 z-50 hidden w-max -translate-x-1/2 items-center gap-1 rounded-full p-2 sm:flex"
      style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => scrollToSection(id)}
            title={label}
            data-tooltip={label}
            className="nav-dock-item group relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200"
            style={{
              backgroundColor: isActive ? 'var(--color-text)' : 'transparent',
              color: isActive ? 'var(--bg)' : 'var(--color-muted)',
            }}
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}

      <div className="mx-1 h-6 w-px" style={{ backgroundColor: 'var(--border)' }} />

      <button
        type="button"
        aria-label="Toggle color theme"
        title="Toggle color theme"
        data-tooltip="Toggle theme"
        onClick={toggleTheme}
        className="nav-dock-item group relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
      >
        {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>
    </nav>
  );
};
