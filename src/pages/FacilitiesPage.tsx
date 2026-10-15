import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InView } from '../components/motion/InView';
import { FACILITIES } from '../data/company';
import { ColdChainSimulator } from '../components/ColdChainSimulator';
import { ArrowRight, Thermometer, ShieldCheck, Box, Building2, Check, ArrowUpRight } from 'lucide-react';

type FacilitiesPageProps = {
  onNavigate: (path: string) => void;
};

export function FacilitiesPage({ onNavigate }: FacilitiesPageProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Facilities' }]} onNavigate={handleNav} />

        {/* Page Hero */}
        <section className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
            Export Quality Roses · Grown With Utmost Care · Respect For Nature
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            Packhouse & Cold Storage Facilities — Iris Biotech
          </h1>
          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            Flower vase longevity and petal integrity depend fundamentally on post-harvest handling. Iris Biotech maintains integrated infrastructure featuring a modern packhouse, specialized hydration lines, and precision on-site 2°C – 4°C cold storage in Bengaluru / Denkanikottai.
          </p>
        </section>

        {/* Dedicated Cold Storage Spotlight Feature */}
        <section className="p-8 sm:p-12 bg-[#1E3926] text-[#FAF8F5] shadow-md border border-[#1C2D20]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C4AA7D] block">
                Post-Harvest Core Facility
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5]">
                Precision Cold Storage (2°C – 4°C)
              </h2>
              <p className="text-sm text-[#FAF8F5]/80 font-light leading-relaxed">
                Tour our newly expanded multi-chamber cold storage facilities with uninterrupted dual generator backup, calibrated forced-air pre-cooling, and live thermal monitoring.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleNav('/cold-storage/')}
                  className="inline-flex items-center gap-3 px-7 py-4 bg-[#FAF8F5] text-[#1E3926] hover:bg-[#F3EFE6] text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-sm cursor-pointer"
                >
                  <span>Tour Cold Storage Facility</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] bg-black/40 overflow-hidden border border-white/20">
              <img
                src="/images/cold-storage-facility-4.jpg"
                alt="Iris Biotech on-site multi-chamber cold storage facility (Chamber 04) in Bengaluru"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 text-[10px] uppercase font-mono tracking-wider text-[#C4AA7D]">
                Chamber 04 · Live Facility View
              </div>
            </div>
          </div>
        </section>

        {/* Facility Blocks */}
        <section className="space-y-12">
          {FACILITIES.map((facility, index) => (
            <InView key={facility.id} once={true}>
              <div className="p-8 sm:p-12 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className={`lg:col-span-6 space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A8356] block">
                      {facility.tagline}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#141715]">{facility.title}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed font-light">{facility.description}</p>

                  <div className="p-4 bg-[#F3EFE6] border border-[#E4DFD5] space-y-2.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#88928A] font-semibold block mb-2">
                      Technical Specifications
                    </span>
                    {facility.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center text-xs py-1 border-b border-[#E4DFD5] last:border-0">
                        <span className="text-[#58615A]">{spec.label}:</span>
                        <span className="text-[#141715] font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-[4/3] overflow-hidden border border-[#E4DFD5] bg-[#F3EFE6]">
                    <img
                      src={facility.image}
                      alt={`${facility.title} infrastructure at Iris Biotech floriculture farm in Bengaluru`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </InView>
          ))}
        </section>

        {/* Interactive Cold Chain Simulator */}
        <ColdChainSimulator />

        {/* Cold Chain Protocol Detail */}
        <section className="p-8 sm:p-12 bg-[#0F1812] text-[#FAF8F5] shadow-xs space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C4AA7D] block">
              Cold Chain Management
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5]">
              Unbroken Thermal Chain of Custody
            </h2>
            <p className="text-xs sm:text-sm text-[#C4AA7D] leading-relaxed font-light">
              From harvest in Bengaluru polyhouses to final arrival at global auction terminals or domestic floral boutiques, flowers are kept strictly within thermal boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#FAF8F5]">1. Rapid Field Pre-Cooling</span>
              <p className="text-xs text-[#88928A] font-light">Cut stems enter cold hydration baths within 45 minutes of harvest to halt respiration.</p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#FAF8F5]">2. Stable 2°C – 4°C Storage</span>
              <p className="text-xs text-[#88928A] font-light">Dual-redundant compressor systems and automated generator backup maintain steady temperature.</p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#FAF8F5]">3. Refrigerated Dispatch</span>
              <p className="text-xs text-[#88928A] font-light">Dedicated refrigerated trucks transport packed cartons directly to airport cold hubs.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-8 border-t border-[#E4DFD5] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-[#141715]">Schedule a Packhouse or Farm Inspection</h3>
            <p className="text-xs text-[#58615A] mt-1 font-light">Export buyers and domestic distributors are welcome to visit our Bengaluru facilities.</p>
          </div>
          <button
            onClick={() => handleNav('/contact/')}
            className="px-8 py-4 bg-[#1E3926] text-[#FAF8F5] hover:bg-[#141715] text-xs font-semibold uppercase tracking-[0.2em] transition-colors shrink-0 cursor-pointer"
          >
            Arrange Visit →
          </button>
        </section>
      </div>
    </div>
  );
}
