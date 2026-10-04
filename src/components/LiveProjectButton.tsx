import React from 'react';
import { motion } from 'framer-motion';

interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
  children = 'Live Project',
  ariaLabel = 'View Live Project',
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className={`relative inline-flex items-center justify-center rounded-full border-2 border-[var(--border-primary)] text-[var(--text-primary)] font-medium uppercase tracking-widest cursor-pointer select-none px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[var(--text-primary)]/10 transition-colors duration-200 ${className}`}
    >
      {children}
    </motion.button>
  );
};
