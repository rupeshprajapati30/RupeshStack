import { getPortfolio } from "@/lib/portfolio";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const { site, profile, skills, projects, experience } = getPortfolio();
  const { sections, labels } = site;

  return (
    <>
      <Navbar
        shortName={profile.shortName}
        name={profile.name}
        items={site.navigation}
        resumeUrl={profile.resumeUrl}
        resumeLabel={site.heroCtas.resume}
        openMenuLabel={labels.openMenu}
        closeMenuLabel={labels.closeMenu}
      />

      <main id="main">
        <Hero profile={profile} ctas={site.heroCtas} terminalTitle={labels.terminalTitle} />
        <About profile={profile} copy={sections.about} labels={labels} />
        <Skills skills={skills} copy={sections.skills} />
        <Projects projects={projects} copy={sections.projects} labels={labels} />
        <Experience experience={experience} copy={sections.experience} currentLabel={labels.current} />
        <Contact profile={profile} copy={sections.contact} labels={labels} />
      </main>

      <Footer
        profile={profile}
        navigation={site.navigation}
        footer={site.footer}
        backToTopLabel={labels.backToTop}
      />
    </>
  );
}
