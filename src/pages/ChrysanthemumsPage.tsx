import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FLOWER_VARIETIES, FlowerVariety } from '../data/flowers';
import { VarietyModal } from '../components/VarietyModal';
import { QuotationForm } from '../components/QuotationForm';
import { InView } from '../components/motion/InView';
import { ArrowRight, Ruler, Calendar, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

type ChrysanthemumsPageProps = {
  onNavigate: (path: string) => void;
};

export function ChrysanthemumsPage({ onNavigate }: ChrysanthemumsPageProps) {
  const [selectedVariety, setSelectedVariety] = useState<FlowerVariety | null>(null);
  const [quotePreselect, setQuotePreselect] = useState<string | undefined>('Baltika White Spray');

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquiry = (varietyName: string) => {
    trackEvent('contact_cta_click', { location: 'chrysanthemums_variety_enquiry', variety: varietyName });
    setSelectedVariety(null);
    setQuotePreselect(varietyName);
    const el = document.getElementById('chrysanthemums-quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const chrysanthemums = FLOWER_VARIETIES.filter((f) => f.flower === 'chrysanthemum');

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: 'Flowers', path: '/flowers/' }, { label: 'Chrysanthemums' }]}
          onNavigate={handleNav}
        />

        {/* Page Hero */}
        <section className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#E4DFD5] text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1E3926]">
            5 Acres Cultivation Area
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            Export Chrysanthemums (5 Acres) — Spray & Disbud Cultivars
          </h1>
          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            Cultivated across 5 acres of specialized polyhouse beds in Bengaluru / Denkanikottai. Iris Biotech’s spray, disbud, and button chrysanthemums deliver intense color vibrancy, strong neck rigidity, and remarkable post-harvest vase longevity up to 21 days.
          </p>
        </section>

        {/* Specifications Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Stem Caliber', val: '65 – 85 cm', desc: 'Heavy bloom density', icon: Ruler },
            { label: 'Vase Longevity', val: '18 – 21 Days', desc: 'Extended shelf integrity', icon: Calendar },
            { label: 'Cultivation Area', val: '5 Acres', desc: 'Specialized polyhouses', icon: ShieldCheck },
            { label: 'Categories', val: 'Spray & Disbud', desc: 'Button varieties available', icon: Award },
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

        {/* Variety Grid */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block mb-1">
                Cultivar Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#141715]">Chrysanthemum Cultivars</h2>
            </div>
            <span className="text-xs text-[#767E79]">Select a cultivar for bulk packaging specifications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chrysanthemums.map((c) => (
              <InView key={c.id} once={true}>
                <div
                  onClick={() => {
                    setSelectedVariety(c);
                    trackEvent('variety_view', { variety: c.name });
                  }}
                  className="bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] overflow-hidden cursor-pointer transition-all duration-300 grid grid-cols-1 sm:grid-cols-2 group shadow-sm hover:shadow-md h-full"
                >
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full overflow-hidden bg-[#F3EFE6]">
                    <img
                      src={c.image}
                      alt={`${c.name} spray chrysanthemum cultivar grown at Iris Biotech Bengaluru`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#E4DFD5] text-[10px] uppercase tracking-[0.16em] font-semibold text-[#141715] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                      {c.colour}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#767E79] block">
                        Cultivar
                      </span>
                      <h3 className="text-2xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">
                        {c.name}
                      </h3>
                      <p className="text-xs text-[#58615A] leading-relaxed font-light">
                        {c.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E4DFD5] text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#88928A] block">Stem Length</span>
                          <span className="font-semibold text-[#141715]">{c.stemLength}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#88928A] block">Vase Life</span>
                          <span className="font-semibold text-[#141715]">{c.vaseLife}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E4DFD5] flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3926]">
                      <span>View Specifications</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </section>

        {/* Cultivation Practices */}
        <section className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E4DFD5] space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A8356] block">
              Agronomic Method
            </span>
            <h2 className="text-3xl font-serif text-[#141715]">
              Chrysanthemum Hydration & Photoperiod Control
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-[#58615A] leading-relaxed">
            <div className="p-5 bg-[#FAF8F5] border border-[#E4DFD5] space-y-2">
              <div className="font-serif text-base text-[#141715] font-semibold">Photoperiod Management</div>
              <p>Blackout curtain automation controls day-length to stimulate uniform terminal bud set across all 5 acres.</p>
            </div>
            <div className="p-5 bg-[#FAF8F5] border border-[#E4DFD5] space-y-2">
              <div className="font-serif text-base text-[#141715] font-semibold">Immediate Hydration</div>
              <p>Stems are immersed in conditioned uptake solution immediately following cut to prevent vascular air embolisms.</p>
            </div>
            <div className="p-5 bg-[#FAF8F5] border border-[#E4DFD5] space-y-2">
              <div className="font-serif text-base text-[#141715] font-semibold">Sleeving & Dispatch</div>
              <p>Stems are sleeved in breathable micro-perforated polypropylene sleeves to prevent botrytis during refrigerated transport.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 sm:p-12 bg-[#1E3926] text-[#FAF8F5] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-serif text-[#FAF8F5]">Commercial Chrysanthemum Enquiries</h2>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 font-light">Discuss wholesale volume pricing and domestic/export supply agreements.</p>
          </div>
          <button
            onClick={() => handleNav('/contact/')}
            className="px-8 py-4 bg-[#FAF8F5] text-[#1E3926] hover:bg-[#F3EFE6] text-xs font-semibold uppercase tracking-[0.2em] transition-colors shrink-0 cursor-pointer"
          >
            Contact Sales →
          </button>
        </section>

        {/* Quotation Form Section */}
        <section id="chrysanthemums-quote-form" className="pt-8 border-t border-[#E4DFD5]">
          <QuotationForm
            preselectedVariety={quotePreselect}
            onNavigate={onNavigate}
            title="Request a Commercial Chrysanthemums Quotation"
            subtitle="Direct standing allocations from our 5-acre chrysanthemum facility. Select your spray or disbud cultivars, carton sizes, and delivery timeline."
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
