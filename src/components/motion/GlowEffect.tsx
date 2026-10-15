import React from 'react';

export type GlowEffectProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
};

export function GlowEffect({
  children,
  className = '',
  glowColor = 'rgba(74, 222, 128, 0.15)',
}: GlowEffectProps) {
  return (
    <div className={`relative group ${className}`}>
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)` }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
