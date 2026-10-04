import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectData } from './ProjectDetailModal';

// Free Figma Community website designs adapted for modern web engineering:
// 01 Web Design (Untitled Studio - SaaS landing page & design system)
// 02 Web App (LinearFlow OS - Keyboard-first productivity command center)
// 03 SEO Optimization (Preline Search Engine - High-velocity search analytics)
// 04 AI Chatbots (Copilot AI Studio - Conversational AI interface & knowledge engine)
import figmaUntitledMain from '../assets/images/figma_untitled_hero_1791108648692.jpg';
import figmaUntitledSub from '../assets/images/figma_untitled_sub_1791108664930.jpg';
import figmaLinearflowMain from '../assets/images/figma_linearflow_hero_1791108677980.jpg';
import figmaLinearflowSub from '../assets/images/figma_linearflow_sub_1791108692540.jpg';
import figmaPrelineMain from '../assets/images/figma_preline_hero_1791108705176.jpg';
import figmaPrelineSub from '../assets/images/figma_preline_sub_1791108717221.jpg';
import figmaCopilotMain from '../assets/images/figma_copilot_hero_1791108732194.jpg';
import figmaCopilotSub from '../assets/images/figma_copilot_sub_1791108747199.jpg';

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectData) => void;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'untitled-studio',
    number: '01',
    category: '(Web Design)',
    title: 'Untitled Studio',
    subtitle: 'Modern SaaS Landing Page & Design System',
    col1Image1: figmaUntitledSub,
    col1Image2: figmaUntitledMain,
    col2Image: figmaUntitledMain,
    description:
      'A sleek, high-converting SaaS landing page engineered from the acclaimed Untitled UI open design system on Figma Community. Features responsive bento-grid feature modules, subtle ambient glow aesthetics, and bespoke editorial typography.',
    tools: ['Figma Community Kit', 'Next.js 15', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    deliverables: [
      'Bento-Grid Component Architecture',
      'Fluid Responsive Layouts',
      'Interactive Design Tokens',
      'Conversion-Optimized CTA Funnel',
    ],
    client: 'Design System & Landing Page',
    year: '2026',
    figmaSource: 'Figma Community &bull; Free Design System',
  },
  {
    id: 'linearflow-task-os',
    number: '02',
    category: '(Web App Development)',
    title: 'LinearFlow OS',
    subtitle: 'Keyboard-First Productivity & Command Engine',
    col1Image1: figmaLinearflowSub,
    col1Image2: figmaLinearflowMain,
    col2Image: figmaLinearflowMain,
    description:
      'A high-performance productivity web app built from open Linear and Raycast inspired Figma design files. Engineered with sub-50ms command palette execution, real-time Kanban board syncing, and dark obsidian glassmorphism.',
    tools: ['Figma UI Kit', 'React 19', 'PostgreSQL', 'Node.js', 'Tailwind CSS', 'WebSockets'],
    deliverables: [
      'Full-Stack Command Palette Web App',
      'Real-Time Kanban Pipeline Sync',
      'Keyboard Shortcut Navigation Engine',
      'Role-Based Workspace Access Control',
    ],
    client: 'Productivity & Workflow Web App',
    year: '2026',
    figmaSource: 'Figma Community &bull; Free App UI Kit',
  },
  {
    id: 'preline-search-engine',
    number: '03',
    category: '(SEO Optimization)',
    title: 'Preline Search Engine',
    subtitle: 'High-Velocity SEO & Technical Growth Portal',
    col1Image1: figmaPrelineSub,
    col1Image2: figmaPrelineMain,
    col2Image: figmaPrelineMain,
    description:
      'A technical SEO analytics platform and high-converting marketing site adapted from Preline UI on Figma Community. Engineered for 100/100 Core Web Vitals, automated JSON-LD entity schema generation, and real-time organic rank tracking.',
    tools: ['Preline Figma UI', 'Next.js SSR', 'Schema.org JSON-LD', 'Cloudflare Workers', 'Lighthouse CI'],
    deliverables: [
      '100/100 Core Web Vitals Optimization',
      'Automated Entity Schema Pipelines',
      'Dynamic Keyword Ranking Analytics',
      'Edge-Cached Sub-Second Page Delivery',
    ],
    client: 'SEO & Performance Platform',
    year: '2026',
    figmaSource: 'Figma Community &bull; Free Tailwind UI',
  },
  {
    id: 'copilot-ai-assistant',
    number: '04',
    category: '(AI Chatbots & Assistants)',
    title: 'Copilot AI Studio',
    subtitle: 'Conversational AI Interface & Knowledge Assistant',
    col1Image1: figmaCopilotSub,
    col1Image2: figmaCopilotMain,
    col2Image: figmaCopilotMain,
    description:
      'A state-of-the-art conversational AI interface built from top-rated Figma Community AI UI kits. Features a floating multimodal prompt box, streaming token responses, quick suggestion chips, and bi-directional CRM lead ingestion.',
    tools: ['Figma AI Kit', 'Google Gemini API', 'TypeScript', 'Vector Embeddings', 'Node.js'],
    deliverables: [
      '24/7 Conversational AI Interface',
      'Private Knowledge Base RAG Integration',
      'Automated Inbound Lead Qualification',
      'Real-Time Dialogue Streaming Engine',
    ],
    client: 'Conversational AI Web Assistant',
    year: '2026',
    figmaSource: 'Figma Community &bull; Free AI Kit',
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

  const targetScale = 1 - (totalCards - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-20 md:top-28"
      style={{
        top: `calc(4.5rem + ${index * 24}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          top: `${index * 24}px`,
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
            <div
              className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[60px] border border-white/10 group cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.col1Image1}
                alt={`${project.title} Detail 1`}
                loading="lazy"
                className="w-full h-[clamp(130px,16vw,230px)] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[60px] border border-white/10 group cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
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
            <div
              className="relative w-full h-full min-h-[220px] md:min-h-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[60px] border border-white/10 group cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
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
            Projects
          </h2>
        </FadeIn>
      </div>

      {/* 4 Sticky-Stacking Project Cards */}
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
