import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectData } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectData) => void;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'nextlevel-studio',
    number: '01',
    category: '(Client)',
    title: 'Nextlevel Studio',
    subtitle: 'High Impact 3D Brand Ecosystem',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    description:
      'A multi-disciplinary brand world for next-generation digital creators, highlighting sleek sci-fi aesthetics and tactile procedural textures.',
    tools: ['Blender 4.2', 'Octane Render', 'Cinema 4D', 'Marvelous Designer'],
    deliverables: ['Key Art Renders', '3D UI Assets', 'Interactive Web Models', 'Animation Loops'],
    client: 'Nextlevel Media Corp',
    year: '2026',
  },
  {
    id: 'aura-brand-identity',
    number: '02',
    category: '(Personal)',
    title: 'Aura Brand Identity',
    subtitle: 'Experimental Organic Spatial Forms',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    description:
      'Exploration in glass refraction, volumetric lighting, and minimal geometry exploring tranquility and future digital luxury.',
    tools: ['Houdini', 'Redshift', 'ZBrush', 'Figma'],
    deliverables: ['Custom Typography 3D', 'Refraction Motion Loops', 'Identity Guidelines'],
    client: 'Self-Initiated Concept',
    year: '2026',
  },
  {
    id: 'solaris-digital',
    number: '03',
    category: '(Client)',
    title: 'Solaris Digital',
    subtitle: 'Cosmic Tech Hardware & Visual Engine',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    description:
      'Futuristic interface modules and planetary 3D graphics designed for a solar-powered computing system debut campaign.',
    tools: ['Unreal Engine 5.4', 'Cinema 4D', 'Octane Render', 'Substance 3D Painter'],
    deliverables: ['Hero Keyvisuals', 'Product Renders', 'Interactive 3D Configurator'],
    client: 'Solaris Innovations Inc',
    year: '2026',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl relative"
      >
        {/* Top Row: Number, category, project name, Live Project button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Huge Number */}
            <span className="font-black text-[#D7E2EA] leading-none text-[clamp(2.6rem,7vw,110px)] select-none tracking-tight">
              {project.number}
            </span>

            {/* Category & Project Name */}
            <div className="flex flex-col justify-center">
              <span className="text-[#D7E2EA]/70 uppercase tracking-widest font-light text-xs sm:text-sm">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-[clamp(1.1rem,2.4vw,2.2rem)] tracking-wide">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Live Project Button */}
          <div className="self-start sm:self-center">
            <LiveProjectButton onClick={() => onOpenProject(project)} />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full">
          {/* Left column (40% width): 2 stacked images */}
          <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4">
            <div className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[60px] border border-white/10 group cursor-pointer"
                 onClick={() => onOpenProject(project)}>
              <img
                src={project.col1Image1}
                alt={`${project.title} Detail 1`}
                loading="lazy"
                className="w-full h-[clamp(130px,16vw,230px)] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[60px] border border-white/10 group cursor-pointer"
                 onClick={() => onOpenProject(project)}>
              <img
                src={project.col1Image2}
                alt={`${project.title} Detail 2`}
                loading="lazy"
                className="w-full h-[clamp(160px,22vw,340px)] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right column (60% width): 1 tall image */}
          <div className="w-full md:w-[60%] flex">
            <div className="relative w-full h-full min-h-[220px] md:min-h-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[60px] border border-white/10 group cursor-pointer"
                 onClick={() => onOpenProject(project)}>
              <img
                src={project.col2Image}
                alt={`${project.title} Hero Key visual`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 md:pt-28 pb-32"
    >
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20 text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">
            Project
          </h2>
        </FadeIn>
      </div>

      {/* 3 Sticky-Stacking Project Cards */}
      <div className="relative max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 pb-20">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>
    </section>
  );
};
