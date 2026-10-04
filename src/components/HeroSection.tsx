import React, { useRef, useState, useEffect } from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import heroCharacterCutout from '../assets/images/hero_character_cutout.png';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const [characterTop, setCharacterTop] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const updatePosition = () => {
      if (headingRef.current) {
        const rect = headingRef.current.getBoundingClientRect();
        setCharacterTop(Math.round(rect.bottom + 12));
      }
    };

    updatePosition();

    if (document.fonts) {
      document.fonts.ready.then(updatePosition);
    }

    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex flex-col justify-between overflow-x-clip bg-[var(--bg-primary)] select-none transition-colors duration-300">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full relative z-20 px-6 md:px-10 pt-6 md:pt-8">
        <div className="w-full flex justify-between items-center text-[var(--text-primary)] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.25rem]">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
            <button
              onClick={() => scrollTo('about')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={onContactClick}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Theme switcher toggle button */}
          <div className="flex items-center">
            <ThemeToggle variant="nav" />
          </div>
        </div>
      </FadeIn>

      {/* Hero Heading */}
      <div
        ref={headingRef}
        className="w-full overflow-hidden mt-6 sm:mt-4 md:-mt-5 relative z-10 flex justify-center"
      >
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[11vw] sm:text-[12.5vw] md:text-[13.5vw] lg:text-[14.8vw]">
            HI, I&apos;M GILBERT
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait with Magnet effect */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[200px] sm:w-[260px] md:w-[310px] lg:w-[350px] pointer-events-auto flex justify-center items-start"
        style={{
          top: characterTop !== null ? `${characterTop}px` : 'calc(2.5rem + 15vw)',
        }}
      >
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center items-start">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center items-start"
          >
            <img
              src={heroCharacterCutout}
              alt="Gilbert - Futuristic 3D Creator Character"
              referrerPolicy="no-referrer"
              className={`w-full h-auto max-h-[46vh] sm:max-h-[50vh] md:max-h-[54vh] object-contain pointer-events-none select-none filter contrast-[1.05] transition-all duration-300 ${
                theme === 'light'
                  ? 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)]'
                  : 'drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]'
              }`}
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[var(--text-primary)] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[170px] sm:max-w-[230px] md:max-w-[280px]">
            A web developer building the internet one website at a time!
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};
