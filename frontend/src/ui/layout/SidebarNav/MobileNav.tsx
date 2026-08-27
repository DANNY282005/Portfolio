import { useActiveSection } from '@/hooks/useActiveSection';
import { BriefcaseIcon, CodeIcon, FlaskIcon, GraduationCapIcon, HomeIcon, UserIcon } from '@/ui/reusables/Icons';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', Icon: HomeIcon },
  { id: 'projects', label: 'Projects', Icon: CodeIcon },
  { id: 'about', label: 'About', Icon: UserIcon },
  { id: 'experience', label: 'Experience', Icon: BriefcaseIcon },
  { id: 'research', label: 'Research', Icon: FlaskIcon },
  { id: 'education', label: 'Education', Icon: GraduationCapIcon },
] as const;

export const MobileNav = () => {
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-3 bottom-3 z-50 flex justify-between rounded-2xl p-1.5 sm:hidden"
      style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            aria-label={label}
            title={label}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => scrollToSection(id)}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors duration-200"
            style={{
              backgroundColor: isActive ? 'var(--color-text)' : 'transparent',
              color: isActive ? 'var(--bg)' : 'var(--color-muted)',
            }}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};
