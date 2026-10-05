import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { ArrowUp } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function MainApp() {
  useEffect(() => {
    document.title = "Gilbert — Web Developer";
  }, []);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-['Kanit',sans-serif] min-h-screen relative transition-colors duration-300"
      style={{ overflowX: 'clip' }}
    >
      {/* Subtle Portfolio Entry Shutter Curtain */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.75,
          ease: [0.76, 0, 0.24, 1], // architectural shutter easing
        }}
        style={{ originY: 0 }}
        className="fixed inset-0 z-[100] bg-[var(--bg-primary)] pointer-events-none"
      />

      {/* Main Page Content Entry Animation (Subtle Fade & Float-up) */}
      <motion.div
        initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: 0.9,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1], // custom easeOutExpo
        }}
        onAnimationComplete={() => setHasEntered(true)}
        style={hasEntered ? { transform: 'none', filter: 'none' } : undefined}
        className="w-full relative"
      >
        {/* Scroll Depth Progress Bar */}
        <ScrollProgressBar />

        {/* Floating Theme Switcher Button (accessible anywhere on page) */}
        <ThemeToggle variant="floating" />

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
        <footer className="bg-[var(--footer-bg)] border-t border-[var(--border-subtle)] px-6 sm:px-10 py-12 relative z-20 transition-colors duration-300">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
            <FadeIn delay={0.1} y={15} duration={0.6}>
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <span className="font-bold tracking-wider uppercase text-[var(--text-primary)]">Gilbert</span>
                <span className="hidden sm:inline text-[var(--text-muted)]">&bull;</span>
                <span className="text-[var(--text-muted)] font-light">
                  &copy; {new Date().getFullYear()} Web Developer. All rights reserved.
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} y={15} duration={0.6}>
              <div className="flex items-center gap-6 text-[var(--text-primary)]/80 uppercase tracking-widest text-xs">
                <button
                  onClick={() => {
                    const el = document.getElementById('about');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  About
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  Services
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('faq');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  FAQ
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  Projects
                </button>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} y={15} duration={0.6}>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] text-xs uppercase tracking-wider text-[var(--text-primary)] transition-all cursor-pointer group"
              >
                <span>Back to top</span>
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </FadeIn>
          </div>
        </footer>
      </motion.div>

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Project Detail Modal */}
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

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
