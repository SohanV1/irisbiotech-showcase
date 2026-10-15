import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_DETAILS } from '../data/company';
import { trackEvent } from '../lib/analytics';

type FooterProps = {
  onNavigate: (path: string) => void;
  onOpenCookieModal: () => void;
};

export function Footer({ onNavigate, onOpenCookieModal }: FooterProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1812] text-[#FAF8F5] pt-24 pb-14 border-t border-[#1C2D20]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Editorial Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/iris-flower-mark-white.png"
                alt="Iris Biotech Botanical Emblem"
                className="w-10 h-10 object-contain opacity-90"
              />
              <div>
                <span className="font-serif text-2xl tracking-tight text-[#FAF8F5] font-bold block leading-none">
                  Iris Biotech
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C4AA7D] block mt-1">
                  Export Quality Roses & Chrysanthemums
                </span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.08] text-[#FAF8F5]">
              Grown with utmost care. <br className="hidden sm:inline" /> Respect for nature.
            </h2>
            <p className="text-[#9EACA1] text-base sm:text-lg font-light leading-relaxed max-w-md">
              Cultivating 20 acres of high-precision greenhouse Dutch roses and chrysanthemums with on-site 2°C – 4°C cold-chain infrastructure.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  trackEvent('contact_cta_click', { location: 'footer' });
                  handleNav('/contact/');
                }}
                className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF8F5] border-b border-[#FAF8F5] pb-1.5 hover:text-[#C4AA7D] hover:border-[#C4AA7D] transition-colors cursor-pointer"
              >
                <span>Start A Commercial Conversation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C4AA7D] mb-5">
                Floriculture
              </h3>
              <ul className="space-y-3 text-xs tracking-wider uppercase font-medium text-[#D1DDD4]">
                <li>
                  <button onClick={() => handleNav('/flowers/')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                    Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/flowers/dutch-roses/')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                    Dutch Roses (15 Ac)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/flowers/chrysanthemums/')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                    Chrysanthemums (5 Ac)
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C4AA7D] mb-5">
                Facilities & Care
              </h3>
              <ul className="space-y-3 text-xs tracking-wider uppercase font-medium text-[#D1DDD4]">
                <li>
                  <button onClick={() => handleNav('/facilities/')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                    Packhouse & Facilities
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/cold-storage/')} className="hover:text-[#FAF8F5] transition-colors text-[#C4AA7D] cursor-pointer">
                    Cold Storage (2°C–4°C)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/approach/')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                    Our Approach
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/about/')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C4AA7D] mb-5">
                Estate & Office
              </h3>
              <ul className="space-y-3 text-xs font-light text-[#A8B7AB]">
                <li>
                  <a href={`tel:${CONTACT_DETAILS.phoneTel}`} className="hover:text-[#FAF8F5] transition-colors block font-medium text-white">
                    {CONTACT_DETAILS.phone}
                  </a>
                  <span className="text-[10px] text-[#7F8F82] block mt-0.5">{CONTACT_DETAILS.name} · Likhitha Kopuru</span>
                </li>
                <li>
                  <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-[#FAF8F5] transition-colors block">
                    {CONTACT_DETAILS.email}
                  </a>
                </li>
                <li className="pt-1 text-[#8A9A8D] text-[11px] leading-relaxed">
                  Iris Biotech Private Limited<br />
                  {CONTACT_DETAILS.syNo}, {CONTACT_DETAILS.village}<br />
                  {CONTACT_DETAILS.panchayat}, {CONTACT_DETAILS.taluk}<br />
                  {CONTACT_DETAILS.district}, {CONTACT_DETAILS.state} – {CONTACT_DETAILS.pin}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Meta Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#7F8F82]">
          <p>© {new Date().getFullYear()} Iris Biotech Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={onOpenCookieModal} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
              Cookie Preferences
            </button>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAF8F5] transition-colors">
              Sitemap
            </a>
            <button onClick={() => handleNav('/contact/')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
