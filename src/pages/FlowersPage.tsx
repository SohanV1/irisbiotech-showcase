import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FLOWER_VARIETIES, FlowerVariety } from '../data/flowers';
import { VarietyModal } from '../components/VarietyModal';
import { QuotationForm } from '../components/QuotationForm';
import { InView } from '../components/motion/InView';
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal, Check, X, ShieldCheck, MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

type FlowersPageProps = {
  onNavigate: (path: string) => void;
};

export function FlowersPage({ onNavigate }: FlowersPageProps) {
  const [flowerFilter, setFlowerFilter] = useState<'all' | 'rose' | 'chrysanthemum'>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariety, setSelectedVariety] = useState<FlowerVariety | null>(null);
  const [quotePreselect, setQuotePreselect] = useState<string | undefined>(undefined);

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquiry = (varietyName: string) => {
    trackEvent('catalog_variety_enquiry_scroll', { variety: varietyName });
    setSelectedVariety(null);
    setQuotePreselect(varietyName);
    const element = document.getElementById('catalog-quote-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const colors = [
    { label: 'All Colours', value: 'all' },
    { label: 'Red', value: 'Red' },
    { label: 'Pink', value: 'Pink' },
    { label: 'Yellow', value: 'Yellow' },
    { label: 'Coral / Orange', value: 'Peach' },
    { label: 'Bi-Colour / White', value: 'White' },
  ];

  const filteredVarieties = FLOWER_VARIETIES.filter((item) => {
    if (flowerFilter !== 'all' && item.flower !== flowerFilter) return false;
    if (selectedColor !== 'all') {
      const match =
        item.colour.toLowerCase().includes(selectedColor.toLowerCase()) ||
        (selectedColor === 'Peach' && item.colour.toLowerCase().includes('orange')) ||
        (selectedColor === 'Lavender' && item.colour.toLowerCase().includes('purple'));
      if (!match) return false;
    }
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.colour.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Flower Catalog' }]} onNavigate={handleNav} />

        {/* Page Hero */}
        <section className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
            Commercial Floriculture Catalog
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            Commercial Floriculture Catalog — Dutch Roses & Chrysanthemums
          </h1>

          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            Cultivated across 20 acres in Bengaluru / Denkanikottai. Standardized for export stem strength, bud diameter (5.5–7.5cm), and 14–21 days post-harvest vase longevity by Iris Biotech.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#catalog-quote-form"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1E3926] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#141715] transition-all cursor-pointer shadow-xs"
            >
              <span>Jump to Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/919845300304?text=Hello%20Iris%20Biotech%2C%20I%20am%20reviewing%20your%20flower%20catalog%20and%20need%20a%20wholesale%20price%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#1EBE5D] transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Price Inquiry</span>
            </a>
          </div>
        </section>

        {/* Dedicated Category Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => handleNav('/flowers/dutch-roses/')}
            className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] cursor-pointer transition-all duration-300 group shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A8356] block">
                15 Acres Dedicated Greenhouse Polyhouses
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors font-bold">
                Export Quality Dutch Roses
              </h2>
              <p className="text-sm text-[#58615A] font-light leading-relaxed">
                7 premier commercial cultivars including Taj Mahal Deep Red, Sweet Avalanche Pink, Pink Tacazzi, Penny Lane, Voodoo, Jumilia, and Malibu with 60–90cm stem lengths and 14–18 days vase longevity.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#1E3926]">
              <span>Explore All Dutch Roses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => handleNav('/flowers/chrysanthemums/')}
            className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] cursor-pointer transition-all duration-300 group shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A8356] block">
                5 Acres Dedicated Polyhouse Beds
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors font-bold">
                Export Chrysanthemums
              </h2>
              <p className="text-sm text-[#58615A] font-light leading-relaxed">
                Spray, disbud, and button varieties including Baltika White, Yellow Zambla, Purple Feeling, and Bronze Regal with high bloom counts and 18–21 days vase longevity.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#1E3926]">
              <span>Explore Chrysanthemums</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] space-y-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Crop Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#767E79] mr-2">Crop:</span>
              {[
                { id: 'all', label: 'All Varieties' },
                { id: 'rose', label: 'Dutch Roses (15 Ac)' },
                { id: 'chrysanthemum', label: 'Chrysanthemums (5 Ac)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFlowerFilter(tab.id as any)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                    flowerFilter === tab.id
                      ? 'bg-[#1E3926] text-[#FAF8F5]'
                      : 'bg-[#F3EFE6] text-[#58615A] hover:text-[#141715] hover:bg-[#EAE5D9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#88928A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search variety or colour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E4DFD5] text-xs text-[#141715] placeholder-[#88928A] focus:outline-none focus:border-[#1E3926] transition-colors"
              />
            </div>
          </div>

          {/* Color Palette Chips */}
          <div className="pt-4 border-t border-[#E4DFD5] flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#767E79] mr-2">Colour:</span>
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                className={`px-3 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedColor === c.value
                    ? 'bg-[#141715] text-[#FAF8F5]'
                    : 'bg-[#FAF8F5] border border-[#E4DFD5] text-[#58615A] hover:text-[#141715]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* Variety Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#767E79]">
            <span>Showing <strong className="text-[#141715]">{filteredVarieties.length}</strong> cultivars</span>
            <span>Click any variety for bulk technical specifications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVarieties.map((item) => (
              <InView key={item.id} once={true}>
                <div
                  onClick={() => {
                    setSelectedVariety(item);
                    trackEvent('variety_view', { variety: item.name });
                  }}
                  className="bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between h-full group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F5F0] flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={`${item.name} (${item.flower === 'rose' ? 'Dutch Rose' : 'Chrysanthemum'}) cultivar cultivated at Iris Biotech Bengaluru`}
                        loading="lazy"
                        className={`w-full h-full ${item.flower === 'rose' ? 'object-contain' : 'object-cover'} group-hover:scale-[1.03] transition-transform duration-500 ease-out`}
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#E4DFD5] text-[10px] uppercase tracking-[0.16em] font-semibold text-[#141715] flex items-center gap-2 shadow-xs">
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: item.hex }} />
                        {item.colour}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#1E3926] font-semibold">
                        {item.flower === 'rose' ? 'Dutch Rose Cultivar' : 'Chrysanthemum Cultivar'}
                      </div>
                      <h3 className="text-2xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#58615A] leading-relaxed font-light line-clamp-2">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E4DFD5] text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#88928A] block">Stem Length</span>
                          <span className="font-semibold text-[#141715]">{item.stemLength}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#88928A] block">Vase Life</span>
                          <span className="font-semibold text-[#141715]">{item.vaseLife}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-[#F3EFE6] border-t border-[#E4DFD5] flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3926]">
                    <span>View Specifications & Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </section>

        {/* DIRECT EMBEDDED QUOTATION FORM ON THE FLOWERS PAGE */}
        <section id="catalog-quote-form" className="pt-10 border-t border-[#E4DFD5]">
          <QuotationForm
            preselectedVariety={quotePreselect}
            onNavigate={onNavigate}
            title="Request a Bulk Flower Quotation"
            subtitle="Select multiple cultivars above or in the form below. We respond with carton dimensions, MOQ, and FOB/CIF airport rates within 24 hours."
          />
        </section>

        {/* Variety Modal */}
        <VarietyModal
          variety={selectedVariety}
          isOpen={!!selectedVariety}
          onClose={() => setSelectedVariety(null)}
          onEnquiry={handleEnquiry}
        />
      </div>
    </div>
  );
}
