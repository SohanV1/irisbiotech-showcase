import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Thermometer,
  Box,
  Sprout,
  Wind,
  Droplets,
  Sparkles,
  Globe,
  Eye,
  Award,
  HeartHandshake,
  MessageCircle,
  Truck,
  Building2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { InView } from '../components/motion/InView';
import { AnimatedNumber } from '../components/motion/AnimatedNumber';
import { TextEffect } from '../components/motion/TextEffect';
import { InfiniteSlider } from '../components/motion/InfiniteSlider';
import { ScrollJourney } from '../components/ScrollJourney';
import { ColdChainSimulator } from '../components/ColdChainSimulator';
import { IrisPortalReveal } from '../components/IrisPortalReveal';
import { VarietyModal } from '../components/VarietyModal';
import { QuotationForm } from '../components/QuotationForm';
import { FLOWER_VARIETIES, FlowerVariety } from '../data/flowers';
import { REVIEWS, FAQS, MANAGEMENT, FACILITIES, CONTACT_DETAILS } from '../data/company';
import { trackEvent } from '../lib/analytics';

type HomePageProps = {
  onNavigate: (path: string) => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(FAQS[0].id);
  const [selectedVariety, setSelectedVariety] = useState<FlowerVariety | null>(null);
  const [quotePreselect, setQuotePreselect] = useState<string | undefined>(undefined);

  const handleNav = (path: string) => {
    onNavigate(path);
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const hash = path.split('#')[1];
      setTimeout(() => {
        const elem = document.getElementById(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const whyBuyPillars = [
    {
      title: 'Commercial Scale Growing',
      desc: '20+ acres of high-precision polyhouses ensuring reliable year-round harvest volumes.',
      icon: Building2,
    },
    {
      title: 'Export Quality Flowers',
      desc: 'Standardized A1 export grade stems with robust vascular strength and large bud aperture (5.5–7.5cm).',
      icon: Award,
    },
    {
      title: 'Consistent Supply',
      desc: '50,000+ stems harvested and processed weekly for uninterrupted wholesale allocations.',
      icon: Calendar,
    },
    {
      title: 'Professional Grading & Packing',
      desc: 'Calibrated grading tables, post-harvest conditioning, and heavy-duty insulated telescopic boxes.',
      icon: Box,
    },
    {
      title: 'Bengaluru-Based Production',
      desc: 'Ideal high-altitude plateau climate and direct 60-minute transit to Kempegowda International Airport (BLR).',
      icon: Globe,
    },
    {
      title: '25+ Years of International Experience',
      desc: 'Trusted by floral import brokers, wholesale distributors, and auction houses in 10+ countries.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#141715]">
      {/* 1. RESTRUCTURED HERO SECTION */}
      <section className="relative min-h-[94vh] flex flex-col justify-between pt-32 pb-14 overflow-hidden border-b border-[#E4DFD5]">
        {/* Background Image with luxury gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/dutch-rose-hero.jpg"
            alt="Export quality Dutch rose cultivation inside Iris Biotech 20-acre greenhouse farm near Bengaluru"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#FAF8F5]/65 backdrop-blur-[1px]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent" />
        </div>

        {/* Top Eyebrow Tagline */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#FAF8F5]/95 border border-[#D1CAB9] mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#1E3926]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#1E3926]">
              Fresh Cut Flowers. Grown for Global Markets
            </span>
          </div>
        </div>

        {/* Main Headline & Commercial Value Props */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <InView once={true}>
            <h1 className="text-4xl sm:text-6xl lg:text-[5.25rem] font-serif text-[#141715] leading-[1.02] max-w-5xl tracking-tight mb-6 font-bold">
              Export Quality Dutch Roses and Chrysanthemums from India
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-6">
                <p className="text-lg sm:text-2xl text-[#37413A] max-w-2xl font-light leading-relaxed">
                  Consistently grown and supplied from our Bengaluru farms to international flower markets.
                </p>

                {/* Key Spec Badges Banner */}
                <div className="flex flex-wrap items-center gap-3 py-2 text-xs sm:text-sm font-semibold text-[#1E3926]">
                  <span className="px-3 py-1.5 bg-[#F3EFE6] border border-[#D1CAB9]">20+ Acres</span>
                  <span className="text-[#88928A]">•</span>
                  <span className="px-3 py-1.5 bg-[#F3EFE6] border border-[#D1CAB9]">Commercial-Scale Production</span>
                  <span className="text-[#88928A]">•</span>
                  <span className="px-3 py-1.5 bg-[#F3EFE6] border border-[#D1CAB9]">Export-Ready Supply</span>
                </div>

                {/* Clickable Dual CTAs */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                  <button
                    onClick={() => {
                      trackEvent('view_flowers_hero_click');
                      handleNav('/flowers/');
                    }}
                    className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] px-8 py-4 bg-[#1E3926] text-[#FAF8F5] hover:bg-[#141715] transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <span>View our Flowers</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      trackEvent('quote_hero_click');
                      handleNav('/export/#quote-section');
                    }}
                    className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] px-8 py-4 bg-[#FAF8F5] border-2 border-[#1E3926] text-[#1E3926] hover:bg-[#1E3926] hover:text-[#FAF8F5] transition-all duration-300 cursor-pointer shadow-xs"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Quick Hero Stat Boxes */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-3 border-t lg:border-t-0 lg:border-l border-[#D1CAB9] pt-6 lg:pt-0 lg:pl-8">
                <div className="p-4 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#E4DFD5] shadow-xs">
                  <div className="font-serif text-3xl font-bold text-[#1E3926]">15+ Ac</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#767E79] font-bold mt-1">Dutch Roses</div>
                  <div className="text-[11px] text-[#58615A] mt-0.5">Taj Mahal & Sweet Avalanche</div>
                </div>
                <div className="p-4 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#E4DFD5] shadow-xs">
                  <div className="font-serif text-3xl font-bold text-[#1E3926]">5+ Ac</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#767E79] font-bold mt-1">Chrysanthemums</div>
                  <div className="text-[11px] text-[#58615A] mt-0.5">Spray & Disbud</div>
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* 2. INFINITE VARIETY MARQUEE */}
      <section className="py-4 border-b border-[#E4DFD5] bg-[#F3EFE6]">
        <InfiniteSlider gap={48} duration={35}>
          {FLOWER_VARIETIES.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariety(v)}
              className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: v.hex }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#767E79]">{v.flower}</span>
              <span className="text-sm font-serif text-[#141715] font-semibold">{v.name}</span>
              <span className="text-[#9A8356] text-xs font-serif ml-2">✦</span>
            </button>
          ))}
        </InfiniteSlider>
      </section>

      {/* 3. NEW SECTION: WHY BUY FROM IRIS? */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 border-b border-[#E4DFD5]">
        <InView once={true}>
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block">
              Commercial Advantage
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#141715] leading-[1.1]">
              Why Buy from Iris Biotech?
            </h2>
            <p className="text-base text-[#58615A] leading-relaxed font-light">
              We provide international floral importers, auction houses, and domestic wholesalers with direct access to consistent commercial-scale cut flower production backed by rigorous post-harvest cold chain discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {whyBuyPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs space-y-4 hover:border-[#1E3926] transition-all group"
                >
                  <div className="w-12 h-12 bg-[#F3EFE6] border border-[#E4DFD5] flex items-center justify-center text-[#1E3926] group-hover:bg-[#1E3926] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#141715]">{p.title}</h3>
                  <p className="text-xs text-[#58615A] leading-relaxed font-light">{p.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Export Team WhatsApp Direct Button */}
          <div className="p-8 bg-[#F3EFE6] border border-[#1E3926]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#1E3926] font-bold block">
                Standing Supply Contracts Available
              </span>
              <h4 className="text-xl font-serif font-bold text-[#141715]">
                Need regular weekly flower supply?
              </h4>
              <p className="text-xs text-[#58615A] font-light">
                Connect directly with Managing Director K. Venkata Rao for air-cargo freight allocations and contract rates.
              </p>
            </div>

            <a
              href="https://wa.me/919845300304?text=Hello%20Iris%20Biotech%20Team%2C%20I%20am%20interested%20in%20a%20regular%20commercial%20flower%20supply%20contract."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Talk to our export team</span>
            </a>
          </div>
        </InView>
      </section>

      {/* 4. RESTRUCTURED FARM BRANDING: GROWN AT SCALE. SUPPLIED WITH CONSISTENCY */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 border-b border-[#E4DFD5]">
        <InView once={true}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block">
                Farm Branding & Infrastructure
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#141715] leading-[1.1]">
                Grown at Scale. <br />
                Supplied with Consistency.
              </h2>
              <p className="text-sm sm:text-base text-[#58615A] leading-relaxed font-light">
                Our Bengaluru operations are rapidly growing, giving us the scale and control required to supply professional flower buyers with consistent and dependable volumes.
              </p>
            </div>

            {/* 4 Key Stat Boxes */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs">
                <div className="text-4xl sm:text-5xl font-serif text-[#1E3926] font-bold mb-1">
                  20+
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#141715] font-bold">Acres</div>
                <div className="text-[10px] text-[#767E79] mt-0.5">Commercial Polyhouse Farm</div>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs">
                <div className="text-4xl sm:text-5xl font-serif text-[#1E3926] font-bold mb-1">
                  50k+
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#141715] font-bold">Stems / Week</div>
                <div className="text-[10px] text-[#767E79] mt-0.5">Continuous Harvest Cycle</div>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs">
                <div className="text-4xl sm:text-5xl font-serif text-[#1E3926] font-bold mb-1">
                  25+
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#141715] font-bold">Years Experience</div>
                <div className="text-[10px] text-[#767E79] mt-0.5">International Floriculture</div>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs">
                <div className="text-4xl sm:text-5xl font-serif text-[#1E3926] font-bold mb-1">
                  10+
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#141715] font-bold">Countries</div>
                <div className="text-[10px] text-[#767E79] mt-0.5">Trusted Importer Network</div>
              </div>
            </div>
          </div>

          {/* Rich Farm Visuals Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#E4DFD5] bg-[#FFFFFF] overflow-hidden group">
              <img
                src="/images/dutch-rose-cultivation.jpg"
                alt="20-acre climate-controlled greenhouse polyhouses at Iris Biotech farm in Denkanikottai near Bengaluru"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="p-4 bg-[#FAF8F5] border-t border-[#E4DFD5]">
                <span className="text-xs font-bold text-[#141715] block">20-Acre Climate Polyhouses</span>
                <span className="text-[10px] text-[#767E79] uppercase tracking-wider">Automated Climate & Drip Dosing</span>
              </div>
            </div>

            <div className="border border-[#E4DFD5] bg-[#FFFFFF] overflow-hidden group">
              <img
                src="/images/cold-storage-flowers-3.jpg"
                alt="Iris Biotech post-harvest packhouse and export grading facility with fresh cut flowers"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="p-4 bg-[#FAF8F5] border-t border-[#E4DFD5]">
                <span className="text-xs font-bold text-[#141715] block">Export Grading & Packhouse</span>
                <span className="text-[10px] text-[#767E79] uppercase tracking-wider">Stem Caliber Sorting (50–90cm)</span>
              </div>
            </div>

            <div className="border border-[#E4DFD5] bg-[#FFFFFF] overflow-hidden group">
              <img
                src="/images/cold-storage-facility-4.jpg"
                alt="Iris Biotech on-site 2°C–4°C multi-chamber cold storage room for export cut flowers"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="p-4 bg-[#FAF8F5] border-t border-[#E4DFD5]">
                <span className="text-xs font-bold text-[#141715] block">On-Site 2°C – 4°C Cold Storage</span>
                <span className="text-[10px] text-[#767E79] uppercase tracking-wider">Dual Generator Backup & CoolPort Transit</span>
              </div>
            </div>
          </div>
        </InView>
      </section>

      {/* 5. CROP CATEGORIES SHOWCASE */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 border-b border-[#E4DFD5]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block mb-2">
              Commercial Crop Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141715]">
              Featured Export Cut Flowers
            </h2>
          </div>
          <button
            onClick={() => handleNav('/flowers/')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-bold text-[#1E3926] hover:underline cursor-pointer"
          >
            <span>View Full Flower Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Roses Card */}
          <div
            onClick={() => handleNav('/flowers/dutch-roses/')}
            className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] cursor-pointer transition-all duration-300 group shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A8356] block">
                15 Acres Dedicated Polyhouse
              </span>
              <h3 className="text-3xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors font-bold">
                Dutch Roses
              </h3>
              <p className="text-sm text-[#58615A] font-light leading-relaxed">
                Premium cultivars including Taj Mahal Red, Sweet Avalanche Pink, Pink Tacazzi, Penny Lane Yellow, Voodoo Orange, Jumilia, and Malibu with 60–90cm stem caliber and 14–18 days vase life.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-[#1E3926]">
              <span>Explore Dutch Roses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Chrysanthemums Card */}
          <div
            onClick={() => handleNav('/flowers/chrysanthemums/')}
            className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] cursor-pointer transition-all duration-300 group shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A8356] block">
                5 Acres Dedicated Cultivation
              </span>
              <h3 className="text-3xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors font-bold">
                Chrysanthemums
              </h3>
              <p className="text-sm text-[#58615A] font-light leading-relaxed">
                Spray and disbud varieties including Baltika White Spray, Yellow Zambla Disbud, Purple Feeling Button, and Bronze Regal with high bloom counts and 18–21 days vase longevity.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-[#1E3926]">
              <span>Explore Chrysanthemums</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. COLD CHAIN & AIRPORT LOGISTICS SIMULATOR */}
      <ColdChainSimulator onNavigate={handleNav} />

      {/* 7. VERIFIED BUYER REVIEWS */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 border-b border-[#E4DFD5]">
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#141715]">
            Trusted by Importers & Wholesalers Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-[#F59E0B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#58615A] font-light leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4DFD5]">
                <div className="font-serif font-bold text-[#141715] text-sm">{rev.author}</div>
                <div className="text-[11px] text-[#767E79]">{rev.company}</div>
                <div className="text-[9px] uppercase tracking-wider text-[#1E3926] font-semibold mt-1">
                  {rev.market} Buyer · {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EMBEDDED HOMEPAGE QUOTATION FORM */}
      <section id="home-quote-form" className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <QuotationForm
          preselectedVariety={quotePreselect}
          onNavigate={onNavigate}
          title="Request a Commercial Flower Quotation"
          subtitle="Direct from our Bengaluru packhouse to your destination market. Select your cultivars and receive standing export allocations within 24 hours."
        />
      </section>

      {/* Modal for variety popup */}
      {selectedVariety && (
        <VarietyModal
          variety={selectedVariety}
          isOpen={!!selectedVariety}
          onClose={() => setSelectedVariety(null)}
          onSelectForEnquiry={(name) => {
            setSelectedVariety(null);
            setQuotePreselect(name);
            const el = document.getElementById('home-quote-form');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      )}
    </div>
  );
}
