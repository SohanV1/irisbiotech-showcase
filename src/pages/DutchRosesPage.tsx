import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FLOWER_VARIETIES, FlowerVariety } from '../data/flowers';
import { VarietyModal } from '../components/VarietyModal';
import { QuotationForm } from '../components/QuotationForm';
import { InView } from '../components/motion/InView';
import { ArrowRight, ArrowUpRight, Ruler, Calendar, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

type DutchRosesPageProps = {
  onNavigate: (path: string) => void;
};

export function DutchRosesPage({ onNavigate }: DutchRosesPageProps) {
  const [selectedVariety, setSelectedVariety] = useState<FlowerVariety | null>(null);
  const [quotePreselect, setQuotePreselect] = useState<string | undefined>('Taj Mahal Red Rose');

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquiry = (varietyName: string) => {
    trackEvent('contact_cta_click', { location: 'roses_variety_enquiry', variety: varietyName });
    setSelectedVariety(null);
    setQuotePreselect(varietyName);
    const el = document.getElementById('roses-quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const roses = FLOWER_VARIETIES.filter((f) => f.flower === 'rose');

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: 'Flowers', path: '/flowers/' }, { label: 'Dutch Roses' }]}
          onNavigate={handleNav}
        />

        {/* Page Hero */}
        <section className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#E4DFD5] text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1E3926]">
            15 Acres Polyhouse Cultivation
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            Export Quality Dutch Roses (15 Acres) — Iris Biotech
          </h1>
          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            Iris Biotech cultivates commercial export-grade Dutch roses across approximately 15 acres of high-roof greenhouse polyhouses in Bengaluru / Denkanikottai. Standardized for uniform stem caliber (60–90cm), rich petal count, and robust cold-chain resilience.
          </p>
        </section>

        {/* Specifications Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Stem Caliber', val: '60 – 90 cm', desc: 'Calibrated length tiers', icon: Ruler },
            { label: 'Vase Longevity', val: '14 – 18 Days', desc: 'Tested room opening', icon: Calendar },
            { label: 'Cultivation Area', val: '15 Acres', desc: 'Greenhouse polyhouse', icon: ShieldCheck },
            { label: 'Commercial Market', val: 'Export & Domestic', desc: 'A1 grading criteria', icon: Award },
          ].map((stat, idx) => (
            <div key={idx} className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] space-y-3 shadow-sm">
              <stat.icon className="w-5 h-5 text-[#1E3926]" />
              <div>
                <div className="text-2xl font-serif text-[#141715]">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#88928A] font-semibold mt-0.5">{stat.label}</div>
                <div className="text-xs text-[#58615A] font-light mt-1">{stat.desc}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Variety Gallery */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block mb-1">
                Cultivar Selection
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#141715]">Dutch Rose Cultivars</h2>
            </div>
            <span className="text-xs text-[#767E79]">Select a cultivar for bulk packaging specifications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roses.map((rose) => (
              <InView key={rose.id} once={true}>
                <div
                  onClick={() => {
                    setSelectedVariety(rose);
                    trackEvent('variety_view', { variety: rose.name });
                  }}
                  className="bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between h-full group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F5F0] flex items-center justify-center">
                      <img
                        src={rose.image}
                        alt={`${rose.name} export quality Dutch rose cultivar grown at Iris Biotech Bengaluru`}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#E4DFD5] text-[10px] uppercase tracking-[0.16em] font-semibold text-[#141715] flex items-center gap-2 shadow-xs">
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: rose.hex }} />
                        {rose.colour}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-2xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">
                        {rose.name}
                      </h3>
                      <p className="text-xs text-[#58615A] leading-relaxed font-light line-clamp-2">
                        {rose.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E4DFD5] text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#88928A] block">Stem Length</span>
                          <span className="font-semibold text-[#141715]">{rose.stemLength}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#88928A] block">Vase Life</span>
                          <span className="font-semibold text-[#141715]">{rose.vaseLife}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-[#F3EFE6] border-t border-[#E4DFD5] flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3926]">
                    <span>View Specifications</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </section>

        {/* Export Packaging Standards */}
        <section className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E4DFD5] space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A8356] block">
              Grading & Packaging Standards
            </span>
            <h2 className="text-3xl font-serif text-[#141715]">
              International Export Packaging Protocol
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-[#58615A] leading-relaxed">
            <div className="p-5 bg-[#FAF8F5] border border-[#E4DFD5] space-y-2">
              <div className="font-serif text-base text-[#141715] font-semibold">1. Laser Sorting & Grading</div>
              <p>Stems are sorted by height (60cm, 70cm, 80cm, 90cm) with precise stem neck thickness and bud aperture verification.</p>
            </div>
            <div className="p-5 bg-[#FAF8F5] border border-[#E4DFD5] space-y-2">
              <div className="font-serif text-base text-[#141715] font-semibold">2. Netting & Corrugated Sleeve</div>
              <p>Individual buds are protected with soft elastic netting and bundled into 20-stem protective export corrugated wraps.</p>
            </div>
            <div className="p-5 bg-[#FAF8F5] border border-[#E4DFD5] space-y-2">
              <div className="font-serif text-base text-[#141715] font-semibold">3. Rapid 2°C–4°C Pre-Cooling</div>
              <p>Packed cartons are immediately transferred into our multi-chamber cold storage facility to eliminate internal field heat.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 sm:p-12 bg-[#1E3926] text-[#FAF8F5] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-serif text-[#FAF8F5]">Reserve Dutch Rose Allocations</h2>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 font-light">Contact our sales team for weekly wholesale standing orders and export cargo schedules.</p>
          </div>
          <button
            onClick={() => handleNav('/contact/')}
            className="px-8 py-4 bg-[#FAF8F5] text-[#1E3926] hover:bg-[#F3EFE6] text-xs font-semibold uppercase tracking-[0.2em] transition-colors shrink-0 cursor-pointer"
          >
            Contact Sales →
          </button>
        </section>

        {/* Quotation Form Section */}
        <section id="roses-quote-form" className="pt-8 border-t border-[#E4DFD5]">
          <QuotationForm
            preselectedVariety={quotePreselect}
            onNavigate={onNavigate}
            title="Request a Commercial Dutch Roses Quotation"
            subtitle="Direct standing allocations from our 15-acre Dutch rose facility. Select your required stem lengths, cartons, and airport destinations."
          />
        </section>

        {/* Variety Modal */}
        <VarietyModal
          variety={selectedVariety}
          onClose={() => setSelectedVariety(null)}
          onSelectForEnquiry={handleEnquiry}
        />
      </div>
    </div>
  );
}
