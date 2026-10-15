import React, { useEffect, useRef, useState } from 'react';
import { Sprout, Sparkles, ArrowRight, Droplets, Thermometer, ShieldCheck } from 'lucide-react';

type IrisPortalRevealProps = {
  onNavigate?: (path: string) => void;
};

export function IrisPortalReveal({ onNavigate }: IrisPortalRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      
      setScrollProgress(clampedProgress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute maximum viewport radius to ensure 100% full coverage when expanded
  const maxRadius = typeof window !== 'undefined'
    ? Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) * 0.95
    : 1400;
  
  // Aperture radius expands across the first 70% of scroll
  const apertureProgress = Math.min(scrollProgress / 0.7, 1);
  const currentRadius = Math.max(0, apertureProgress * maxRadius);

  // Text moves ENTIRELY from off-screen right (+100%) across to off-screen left (-160%) over the first 75% of scroll
  const textProgress = Math.min(scrollProgress / 0.75, 1);
  const textTranslateX = 100 - textProgress * 260;

  // Center popup card ONLY appears after the full text motion & circle expansion have completely finished (> 0.75)
  const isPopupVisible = scrollProgress >= 0.75;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#FAF8F5] select-none"
      id="iris-aperture-portal"
    >
      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#FAF8F5]">
        {/* Static Center Label (Visible on Light Background before scroll) */}
        <div
          className={`absolute text-center z-0 px-6 pointer-events-none transition-opacity duration-500 ${
            scrollProgress > 0.3 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[#1E3926] block mb-2">
            ✦ Scroll Down ✦
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#141715]/20 font-bold tracking-tight">
            The Living Foundation
          </h3>
          <p className="text-xs sm:text-sm text-[#767E79]/60 font-light mt-3 max-w-sm mx-auto">
            Scroll to expand the botanical aperture and enter the subterranean soil world
          </p>
        </div>

        {/* 1. Outlined Stroke Text (Moves entirely across the Light Canvas) */}
        <div
          className="absolute top-1/2 left-0 w-full whitespace-nowrap z-10 pointer-events-none will-change-transform"
          style={{
            transform: `translate3d(${textTranslateX}%, -50%, 0)`,
          }}
        >
          <h2
            className="font-serif text-6xl sm:text-8xl lg:text-[11vw] font-black tracking-tight text-transparent uppercase leading-none"
            style={{
              WebkitTextStroke: '2.5px #1E3926',
            }}
          >
            BENEATH THE BLOOM · LIVING SOIL ECOSYSTEM · RESPECT FOR NATURE ·
          </h2>
        </div>

        {/* 2. Expanding Circular Iris Aperture Section (The Dark Subterranean World) */}
        <section
          className="absolute inset-0 flex items-center justify-center bg-[#0A0E0B] text-[#FAF8F5] overflow-hidden z-20 will-change-[clip-path]"
          style={{
            clipPath: `circle(${currentRadius}px at center center)`,
            WebkitClipPath: `circle(${currentRadius}px at center center)`,
          }}
        >
          {/* Subterranean Background Imagery & Ambient Glow */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/dutch-rose-cultivation.jpg"
              alt="Inside Iris Biotech greenhouse living soil"
              className="w-full h-full object-cover object-center opacity-35 scale-110 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E0B] via-[#0A0E0B]/75 to-[#0A0E0B]/90" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1E3926]/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#C4AA7D]/15 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* 3. Solid White/Gold Inner Text (Moves in exact sync inside the Dark World) */}
          <div
            className="absolute top-1/2 left-0 w-full whitespace-nowrap z-10 pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(${textTranslateX}%, -50%, 0)`,
            }}
          >
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-[11vw] font-black tracking-tight text-[#FAF8F5] uppercase leading-none">
              BENEATH THE BLOOM · <span className="text-[#C4AA7D]">LIVING SOIL ECOSYSTEM</span> · RESPECT FOR NATURE ·
            </h2>
          </div>

          {/* 4. Center Content: ONLY POPS UP AFTER TEXT HAS FULLY COMPLETED MOVING (> 0.75) */}
          <div
            className={`relative z-30 max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6 transition-all duration-700 ease-out ${
              isPopupVisible
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 translate-y-16 scale-90 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1E3926]/90 border border-[#C4AA7D]/40 backdrop-blur-md shadow-xl">
              <Sprout className="w-4 h-4 text-[#C4AA7D]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C4AA7D]">
                Inside The Living Rhizosphere
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#FAF8F5] leading-tight font-normal">
              Grown With Utmost Care. <br className="hidden sm:inline" />
              <span className="text-[#C4AA7D] italic">Respect For Nature.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#FAF8F5]/85 font-light max-w-2xl mx-auto leading-relaxed">
              Export quality Dutch roses and chrysanthemums cultivated with balanced soil biology, organic bio-nutrients, and unwavering environmental stewardship.
            </p>

            {/* Subterranean Agronomic Telemetry Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2 text-left">
              <div className="p-4 bg-[#142017]/90 border border-[#C4AA7D]/20 backdrop-blur-sm shadow-md">
                <div className="text-[10px] uppercase tracking-wider text-[#C4AA7D] font-mono">Rhizosphere pH</div>
                <div className="font-serif text-xl text-white font-semibold mt-0.5">6.2 – 6.8</div>
                <div className="text-[10px] text-[#88928A] mt-0.5">Optimal nutrient uptake</div>
              </div>

              <div className="p-4 bg-[#142017]/90 border border-[#C4AA7D]/20 backdrop-blur-sm shadow-md">
                <div className="text-[10px] uppercase tracking-wider text-[#C4AA7D] font-mono">Export Roses</div>
                <div className="font-serif text-xl text-white font-semibold mt-0.5">15 Acres</div>
                <div className="text-[10px] text-[#88928A] mt-0.5">Climate polyhouse control</div>
              </div>

              <div className="p-4 bg-[#142017]/90 border border-[#C4AA7D]/20 backdrop-blur-sm shadow-md">
                <div className="text-[10px] uppercase tracking-wider text-[#C4AA7D] font-mono">Bio-Nutrients</div>
                <div className="font-serif text-xl text-white font-semibold mt-0.5">100% Active</div>
                <div className="text-[10px] text-[#88928A] mt-0.5">Strengthens vascular walls</div>
              </div>
            </div>

            {onNavigate && (
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/approach/')}
                  className="inline-flex items-center gap-3 px-9 py-4 bg-[#C4AA7D] text-[#0A0E0B] hover:bg-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl cursor-pointer"
                >
                  <span>Explore Our Agronomic Approach</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
