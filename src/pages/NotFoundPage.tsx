import React from 'react';
import { Flower2, Home, ArrowRight } from 'lucide-react';

type NotFoundPageProps = {
  onNavigate: (path: string) => void;
};

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-[75vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-xl w-full p-10 sm:p-14 bg-[#FFFFFF] border border-[#E4DFD5] text-center space-y-6 shadow-sm">
        <span className="text-7xl sm:text-8xl font-serif font-bold text-[#C4AA7D] block">
          404
        </span>

        <h1 className="text-2xl sm:text-4xl font-serif text-[#141715]">
          Page Not Located.
        </h1>

        <p className="text-[#58615A] text-sm sm:text-base font-light leading-relaxed">
          The requested address could not be located in our catalog structure. It may have been moved or reorganized.
        </p>

        <div className="pt-6 border-t border-[#E4DFD5] flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleNav('/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1E3926] hover:bg-[#141715] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Return to Home
          </button>

          <button
            onClick={() => handleNav('/flowers/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#F3EFE6] hover:bg-[#EAE5D9] text-[#141715] border border-[#E4DFD5] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Explore Flowers
          </button>
        </div>
      </div>
    </div>
  );
}
