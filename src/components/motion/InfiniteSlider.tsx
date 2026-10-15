import React from 'react';
import { motion } from 'motion/react';

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 24,
  duration = 25,
  reverse = false,
  className = '',
}: InfiniteSliderProps) {
  return (
    <div className={`overflow-hidden flex w-full relative ${className}`}>
      <motion.div
        className="flex shrink-0 items-center"
        style={{ gap: `${gap}px` }}
        animate={{
          x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
