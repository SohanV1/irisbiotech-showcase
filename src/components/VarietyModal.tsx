import React, { useEffect } from 'react';
import { X, ArrowRight, Check, ShieldCheck, Box, Sparkles, Clock, Ruler } from 'lucide-react';
import { FlowerVariety } from '../data/flowers';

type VarietyModalProps = {
  variety: FlowerVariety | null;
  isOpen?: boolean;
  onClose: () => void;
  onSelectForEnquiry?: (varietyName: string) => void;
  onEnquiry?: (varietyName: string) => void;
};

export function VarietyModal({
  variety,
  onClose,
  onSelectForEnquiry,
  onEnquiry,
}: VarietyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (variety) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [variety, onClose]);

  const handleEnquireClick = () => {
    if (!variety) return;
    const callback = onSelectForEnquiry || onEnquiry;
    if (callback) {
      callback(variety.name);
    }
    onClose();
  };

  if (!variety) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-variety-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] border border-[#E4DFD5] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 sm:p-7 border-b border-[#E4DFD5] pr-14 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-black/20"
              style={{ backgroundColor: variety.hex }}
            />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
              {variety.flower === 'rose' ? 'Dutch Rose Cultivar' : 'Chrysanthemum Cultivar'} · {variety.colour}
            </span>
          </div>

          <h3 id="modal-variety-title" className="text-2xl sm:text-3xl font-serif text-[#141715] leading-tight">
            {variety.name}
          </h3>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close specimen viewer"
          className="absolute top-5 right-5 z-10 p-2.5 bg-[#FAF8F5] hover:bg-[#FFFFFF] border border-[#D1CAB9] text-[#141715] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Center Specimen Showcase (Full Bouquet in Middle) */}
        <div className="w-full bg-[#F7F5F0] border-b border-[#E4DFD5] py-6 px-4 flex items-center justify-center">
          <img
            src={variety.image}
            alt={variety.name}
            className="max-h-[360px] sm:max-h-[440px] w-auto h-auto object-contain mx-auto shadow-sm"
          />
        </div>

        {/* Specifications & Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-[#58615A] font-light leading-relaxed">
            {variety.description}
          </p>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-[#FFFFFF] border border-[#E4DFD5]">
              <div className="flex items-center gap-1.5 text-[#88928A] text-[10px] uppercase tracking-wider mb-1">
                <Ruler className="w-3 h-3 text-[#1E3926]" /> Stem Length
              </div>
              <div className="font-serif text-base font-semibold text-[#141715]">
                {variety.stemLength}
              </div>
            </div>

            <div className="p-3.5 bg-[#FFFFFF] border border-[#E4DFD5]">
              <div className="flex items-center gap-1.5 text-[#88928A] text-[10px] uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-[#1E3926]" /> Head Size
              </div>
              <div className="font-serif text-base font-semibold text-[#141715]">
                {variety.headSize}
              </div>
            </div>

            <div className="p-3.5 bg-[#FFFFFF] border border-[#E4DFD5]">
              <div className="flex items-center gap-1.5 text-[#88928A] text-[10px] uppercase tracking-wider mb-1">
                <Clock className="w-3 h-3 text-[#1E3926]" /> Vase Life
              </div>
              <div className="font-serif text-base font-semibold text-[#1E3926]">
                {variety.vaseLife}
              </div>
            </div>

            <div className="p-3.5 bg-[#FFFFFF] border border-[#E4DFD5]">
              <div className="flex items-center gap-1.5 text-[#88928A] text-[10px] uppercase tracking-wider mb-1">
                <Box className="w-3 h-3 text-[#1E3926]" /> Market
              </div>
              <div className="font-serif text-base font-semibold text-[#141715]">
                {variety.market}
              </div>
            </div>
          </div>

          {/* Quality & Packing Bullet points */}
          <div className="p-4 bg-[#F3EFE6] border border-[#E4DFD5] space-y-1.5 text-xs text-[#58615A]">
            <div className="font-semibold text-[#141715] text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E3926]" />
              Commercial Export Packaging
            </div>
            <div>• Export standard corrugated telescopic packing boxes</div>
            <div>• Conditioned hydrating stems with flower net protection</div>
            <div>• Pre-cooled to 2°C–4°C before cold-chain air cargo dispatch</div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E4DFD5] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border border-[#D1CAB9] text-xs font-semibold uppercase tracking-wider text-[#58615A] hover:text-[#141715] hover:bg-[#F3EFE6] transition-colors cursor-pointer text-center"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleEnquireClick}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1E3926] active:scale-[0.99] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#141715] transition-all shadow-sm cursor-pointer"
            >
              <span>Enquire For Supply</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
