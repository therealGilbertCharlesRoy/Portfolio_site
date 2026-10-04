import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { ContactButton } from './ContactButton';

export interface ProjectData {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  description: string;
  tools: string[];
  deliverables: string[];
  client: string;
  year: string;
  figmaSource?: string;
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!project) return null;

  const currentHeroImage = activeImage || project.col2Image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-4xl bg-[#121212] border-2 border-[#D7E2EA]/30 rounded-[32px] sm:rounded-[48px] p-5 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] z-10 my-8 max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="sticky top-0 float-right p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D7E2EA] transition-colors cursor-pointer z-20 -mr-2 -mt-2 sm:mr-0 sm:mt-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6 clear-left">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-white/10 text-[#BBCCD7] font-semibold tracking-wider">
                Project {project.number} &bull; {project.category}
              </span>
              {project.figmaSource && (
                <span className="text-xs text-white/60 font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {project.figmaSource}
                </span>
              )}
              <span className="text-xs text-white/50">{project.year}</span>
            </div>

            <h2 className="hero-heading font-black uppercase text-2xl sm:text-4xl md:text-5xl leading-tight">
              {project.title}
            </h2>
            <p className="text-sm font-medium text-[#BBCCD7] mt-1">{project.subtitle}</p>
            <p className="text-[#D7E2EA]/80 text-sm sm:text-base mt-2 max-w-2xl font-light">
              {project.description}
            </p>
          </div>

          {/* Featured Image Display */}
          <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-black/60 aspect-[16/10] sm:aspect-[16/9] mb-4">
            <img
              src={currentHeroImage}
              alt={`${project.title} Preview`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[project.col2Image, project.col1Image1, project.col1Image2].map((imgUrl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(imgUrl)}
                className={`relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                  currentHeroImage === imgUrl
                    ? 'border-[#BBCCD7] ring-2 ring-[#D7E2EA]/50 scale-[1.02]'
                    : 'border-white/15 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 mb-8">
            <div>
              <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">
                Category & Concept
              </span>
              <span className="text-sm font-medium text-white">{project.client}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">
                Design & Tech Stack
              </span>
              <span className="text-sm font-medium text-white">
                {project.tools.join(', ')}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">
                Key Deliverables
              </span>
              <span className="text-sm font-medium text-white">
                {project.deliverables.join(', ')}
              </span>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-white/60 text-center sm:text-left">
              Figma community free design system adapted into production-grade web architecture.
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <ContactButton
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
              >
                Inquire Project
              </ContactButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
