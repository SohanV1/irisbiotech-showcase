import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

export function AnimatedNumber({
  value,
  className = '',
  duration = 2,
  prefix = '',
  suffix = '',
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => Math.round(current));
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    return display.on('change', (latest) => {
      setCurrentVal(latest);
    });
  }, [display]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {currentVal}
      {suffix}
    </span>
  );
}
