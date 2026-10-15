import React, { useEffect } from 'react';
import { Check, ArrowRight, Home, Flower2, Snowflake, MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

type ThankYouPageProps = {
  onNavigate: (path: string) => void;
};

export function ThankYouPage({ onNavigate }: ThankYouPageProps) {
  useEffect(() => {
    trackEvent('page_view', { path: '/thank-you/' });
  }, []);

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-[75vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-xl w-full p-10 sm:p-14 bg-[#FFFFFF] border border-[#E4DFD5] text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-[#F3EFE6] border border-[#E4DFD5] flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-[#1E3926]" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block">
          Inquiry Successfully Transmitted
        </span>

        <h1 className="text-4xl sm:text-5xl font-serif text-[#141715]">
          Thank you.
        </h1>

        <p className="text-[#58615A] text-sm sm:text-base font-light leading-relaxed">
          Your commercial inquiry has been logged directly with our estate desk. An Iris Biotech representative will review your specifications and contact you within 24 business hours.
        </p>

        {/* Priority WhatsApp Direct Channel */}
        <div className="p-4 bg-[#F3EFE6] border border-[#25D366]/40 rounded max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#1E3926] uppercase tracking-wider">
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
            Priority Dispatch Response
          </div>
          <p className="text-[11px] text-[#58615A]">
            Need immediate stem allocations or air-cargo confirmations? Connect directly on WhatsApp:
          </p>
          <a
            href="https://wa.me/919845300304?text=Hello%20Iris%20Biotech%2C%20I%20just%20submitted%20a%20commercial%20quotation%20request%20on%20your%20website%20and%20would%20like%20to%20follow%20up."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'thank_you_page' })}
            className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer rounded"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp (+91 98453 00304)</span>
          </a>
        </div>

        <div className="pt-6 border-t border-[#E4DFD5] flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleNav('/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1E3926] hover:bg-[#141715] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer"
          >
            Return to Home
          </button>

          <button
            onClick={() => handleNav('/flowers/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#F3EFE6] hover:bg-[#EAE5D9] text-[#141715] border border-[#E4DFD5] text-xs font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer"
          >
            Explore Flowers
          </button>
        </div>
      </div>
    </div>
  );
}
