import { usePortfolioData } from '@/hooks/usePortfolioData';
import { ErrorState } from '@/ui/reusables/ErrorState';
import { LoadingState } from '@/ui/reusables/LoadingState';
import { Footer } from '@/ui/layout/Footer';
import { MobileNav } from '@/ui/layout/SidebarNav/MobileNav';
import { SidebarNav } from '@/ui/layout/SidebarNav/SidebarNav';
import { AboutSection } from '@/ui/sections/About/AboutSection';
import { EducationSection } from '@/ui/sections/Education/EducationSection';
import { ExperienceSection } from '@/ui/sections/Experience/ExperienceSection';
import { HeroSection } from '@/ui/sections/Hero/HeroSection';
import { ProjectsSection } from '@/ui/sections/Projects/ProjectsSection';
import { ResearchSection } from '@/ui/sections/Research/ResearchSection';

export const App = () => {
  const { data, isLoading, error } = usePortfolioData();

  if (isLoading) return <LoadingState />;
  if (error || !data) return <ErrorState message={error ?? 'Unknown error'} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen">
      <SidebarNav />
      <MobileNav />
      <main>
        <HeroSection profile={data.profile} />
        <ProjectsSection projects={data.projects} />
        <AboutSection
          profile={data.profile}
          skills={data.skills}
          softSkills={data.softSkills}
          languages={data.languages}
        />
        <ExperienceSection experience={data.experience} />
        <ResearchSection research={data.research} />
        <EducationSection education={data.education} certifications={data.certifications} />
      </main>
      <Footer name={data.profile.name} />
    </div>
  );
};
