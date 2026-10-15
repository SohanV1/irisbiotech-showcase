import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export type TextEffectProps = {
  children: string;
  className?: string;
  per?: 'word' | 'char' | 'line';
  as?: React.ElementType;
  delay?: number;
};

export function TextEffect({
  children,
  className = '',
  per = 'word',
  as: Component = 'p',
  delay = 0,
}: TextEffectProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const text = children || '';
  const words = per === 'word' ? text.split(' ') : per === 'char' ? text.split('') : [text];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: per === 'char' ? 0.03 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] },
    },
  };

  return (
    <Component ref={ref} className={`inline-block ${className}`}>
      <motion.span
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="inline-block"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block whitespace-pre"
          >
            {word}{per === 'word' && index < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
