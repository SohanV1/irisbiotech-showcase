import React, { useRef, useState } from 'react';
import { motion, useInView, Variant, Transition, UseInViewOptions } from 'motion/react';

export type InViewProps = {
  children: React.ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: React.ElementType;
  once?: boolean;
  className?: string;
};

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition = { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  viewOptions = { margin: '-50px' },
  as = 'div',
  once = true,
  className = '',
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  const [isViewed, setIsViewed] = useState(false);

  const MotionComponent = (motion as Record<string, any>)[as as string] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      onAnimationComplete={() => {
        if (once) setIsViewed(true);
      }}
      animate={isInView || isViewed ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
