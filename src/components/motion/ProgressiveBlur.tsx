import React from 'react';

export type ProgressiveBlurProps = {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  intensity?: string;
};

export function ProgressiveBlur({
  direction = 'bottom',
  className = '',
}: ProgressiveBlurProps) {
  const gradientDirection = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right',
  }[direction];

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      style={{
        background: `linear-gradient(${gradientDirection}, rgba(8,13,9,0.95) 0%, rgba(8,13,9,0.4) 60%, rgba(8,13,9,0) 100%)`,
      }}
    />
  );
}
