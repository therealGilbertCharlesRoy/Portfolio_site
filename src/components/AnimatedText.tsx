import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none text-[var(--text-primary)]">
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalLength = text.length;
  let charCounter = 0;

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={`text-[var(--text-primary)] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const renderedWord = (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIndex) => {
              const globalIndex = charCounter++;
              const start = globalIndex / totalLength;
              const end = Math.min(1, (globalIndex + 1) / totalLength);
              return (
                <Char
                  key={`char-${globalIndex}-${charIndex}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        return (
          <React.Fragment key={`space-${wordIndex}`}>
            {renderedWord}
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
};
