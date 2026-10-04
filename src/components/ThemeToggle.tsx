import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'nav' | 'floating';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'nav',
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  if (variant === 'floating') {
    return (
      <motion.button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isLight ? 'dark' : 'high-contrast light'} theme`}
        title={`Switch to ${isLight ? 'Dark' : 'High-Contrast Light'} Mode`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl backdrop-blur-md transition-colors duration-300 cursor-pointer flex items-center gap-2 border-2 ${
          isLight
            ? 'bg-white text-black border-black shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:bg-neutral-100'
            : 'bg-[#181818]/90 text-[#D7E2EA] border-[#D7E2EA] shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:bg-[#252525]'
        } ${className}`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          {isLight ? (
            <Sun className="w-5 h-5 text-amber-500 fill-amber-500 stroke-[2.5]" />
          ) : (
            <Moon className="w-5 h-5 text-[#BBCCD7] fill-[#BBCCD7] stroke-[2]" />
          )}
        </motion.div>
        <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider font-semibold">
          {isLight ? 'Light' : 'Dark'}
        </span>
      </motion.button>
    );
  }

  // Navbar variant
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'high-contrast light'} theme`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer select-none text-xs uppercase tracking-wider font-semibold ${
        isLight
          ? 'border-black bg-black text-white hover:bg-neutral-800'
          : 'border-[#D7E2EA]/40 bg-white/10 text-[#D7E2EA] hover:border-[#D7E2EA] hover:bg-white/15'
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isLight ? (
          <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#BBCCD7] fill-[#BBCCD7]" />
        )}
      </motion.div>
      <span className="text-[11px] sm:text-xs">
        {isLight ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};
