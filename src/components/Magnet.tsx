import React, { useRef, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magnetRef.current;
    if (!element) return;

    let isMagnetized = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const isWithinBounds =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (isWithinBounds) {
        isMagnetized = true;
        const dx = (e.clientX - centerX) / strength;
        const dy = (e.clientY - centerY) / strength;

        element.style.transition = activeTransition;
        element.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      } else if (isMagnetized) {
        isMagnetized = false;
        element.style.transition = inactiveTransition;
        element.style.transform = 'translate3d(0px, 0px, 0)';
      }
    };

    const handleMouseLeave = () => {
      if (isMagnetized) {
        isMagnetized = false;
        element.style.transition = inactiveTransition;
        element.style.transform = 'translate3d(0px, 0px, 0)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={magnetRef}
      className={`inline-block ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};
