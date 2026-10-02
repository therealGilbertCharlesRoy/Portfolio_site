import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { FAQSection } from './components/FAQSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { ProjectDetailModal, ProjectData } from './components/ProjectDetailModal';
import { FadeIn } from './components/FadeIn';
import { ArrowUp, Github, Instagram, Twitter, Box } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-screen relative"
      style={{ overflowX: 'clip' }}
    >
      {/* Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={() => setIsContactOpen(true)} />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onContactClick={() => setIsContactOpen(true)} />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. FAQ SECTION */}
      <FAQSection onContactClick={() => setIsContactOpen(true)} />

      {/* 6. PROJECTS SECTION */}
      <ProjectsSection onOpenProject={(proj) => setSelectedProject(proj)} />

      {/* Footer */}
      <footer className="bg-[#0C0C0C] border-t border-white/10 px-6 sm:px-10 py-12 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <FadeIn delay={0.1} y={15} duration={0.6}>
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <span className="font-bold tracking-wider uppercase text-white">Gilbert</span>
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <span className="text-[#D7E2EA]/60 font-light">
                &copy; {new Date().getFullYear()} Web Developer. All rights reserved.
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={15} duration={0.6}>
            <div className="flex items-center gap-6 text-[#D7E2EA]/80 uppercase tracking-widest text-xs">
              <button
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('faq');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => setIsContactOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={15} duration={0.6}>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs uppercase tracking-wider transition-all cursor-pointer group"
            >
              <span>Back to top</span>
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </FadeIn>
        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Interactive 3D Project Detail Inspector */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactClick={() => {
            setSelectedProject(null);
            setIsContactOpen(true);
          }}
        />
      )}
    </div>
  );
}
