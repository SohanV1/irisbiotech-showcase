import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuotationForm } from '../components/QuotationForm';
import { DESTINATIONS } from '../components/ExportJourney/destinations';
import { CountryFlag } from '../components/ExportJourney/CountryFlag';
import { ExportJourney } from '../components/ExportJourney/ExportJourney';
import {
  Plane,
  ShieldCheck,
  Thermometer,
  Box,
  Truck,
  Globe2,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileCheck2,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { trackEvent } from '../lib/analytics';

type ExportPageProps = {
  onNavigate: (path: string) => void;
  activeSection?: string;
};

export function ExportPage({ onNavigate, activeSection }: ExportPageProps) {
  const [selectedCountryForQuote, setSelectedCountryForQuote] = React.useState<string | undefined>(undefined);

  const handleSelectCountry = (country: string) => {
    setSelectedCountryForQuote(country);
    const elem = document.getElementById('quote-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Smooth scroll to section if hash or activeSection is present
  useEffect(() => {
    const hash = window.location.hash || (activeSection ? `#${activeSection}` : '');
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [activeSection]);

  const marketRegions = [
    {
      name: 'Middle East & GCC',
      countries: ['UAE', 'Qatar', 'Bahrain', 'Saudi Arabia', 'Kuwait', 'Oman'],
      hubs: 'Dubai (DXB), Doha (DOH), Riyadh (RUH), Kuwait (KWI), Muscat (MCT)',
      transit: '4–5 Hours Direct Air Freight',
      badge: 'Daily Dispatches',
      stems: 'Taj Mahal Red Roses (60–80cm), Sweet Avalanche Pink, Tacazzi Cerise, Zambla Disbuds',
    },
    {
      name: 'Europe & United Kingdom',
      countries: ['UK', 'Netherlands', 'Italy', 'France', 'Russia'],
      hubs: 'London Heathrow (LHR), Amsterdam (AMS), Rome (FCO), Paris (CDG), Moscow (SVO)',
      transit: '8–10 Hours Direct Air Cargo',
      badge: 'FloraHolland & Wholesale Hubs',
      stems: 'Long-Stem Dutch Roses (70–90cm), Baltika Spray Chrysanthemums',
    },
    {
      name: 'Asia Pacific & Oceania',
      countries: ['Australia', 'New Zealand', 'Singapore', 'Malaysia', 'Thailand', 'Sri Lanka', 'Hong Kong'],
      hubs: 'Sydney (SYD), Auckland (AKL), Singapore (SIN), KL (KUL), Bangkok (BKK), Colombo (CMB), Hong Kong (HKG)',
      transit: '1.5 – 13 Hours Direct Air Cargo',
      badge: 'Strict Phytosanitary Certified',
      stems: 'Spray & Disbud Chrysanthemums, Export Grade A1 Roses',
    },
    {
      name: 'Levant & North Africa',
      countries: ['Lebanon', 'Jordan', 'Egypt'],
      hubs: 'Beirut (BEY), Amman (AMM), Cairo (CAI)',
      transit: '6.5 – 7.5 Hours Air Freight',
      badge: 'Scheduled Wholesale Shipments',
      stems: 'High-Petal Dutch Roses, Spray Chrysanthemums',
    },
  ];

  const exportWorkflow = [
    {
      step: '01',
      title: 'Harvest',
      subtitle: 'Dawn Cut at Peak Hydration',
      desc: 'Hand-cut by trained floriculturists at first light when vascular stem turgidity and bud aperture (5.5–7.5cm) are optimal.',
      icon: Sparkles,
    },
    {
      step: '02',
      title: 'Grading',
      subtitle: 'Export Standard A1 Laser Sorting',
      desc: 'Sorted by stem length (50–90cm), bud diameter, straightness, and foliar purity with zero pest or blemish tolerance.',
      icon: Award,
    },
    {
      step: '03',
      title: 'Bunching',
      subtitle: 'Protective Bud Netting & Sleeving',
      desc: 'Stems are bunched in sets of 10 or 20, sleeved in micro-perforated breathable wraps, and capped with protective bud netting.',
      icon: Layers,
    },
    {
      step: '04',
      title: 'Packing',
      subtitle: 'Reinforced 5-Ply Telescopic Boxes',
      desc: 'Packed in export master cartons lined with thermal reflective blankets and post-harvest conditioning hydration sachets.',
      icon: Box,
    },
    {
      step: '05',
      title: 'Cold Chain',
      subtitle: '2°C – 4°C Unbroken Custody',
      desc: 'Pre-cooled within 30 minutes of cutting in on-site cold storage chambers with dual generator backup and calibrated dataloggers.',
      icon: Thermometer,
    },
    {
      step: '06',
      title: 'Destination',
      subtitle: 'BLR Airport & Widebody Air Cargo',
      desc: '60-minute reefer truck transit to Kempegowda International Airport (BLR) CoolPort for prioritized widebody direct cargo palletizing.',
      icon: Plane,
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-12 sm:space-y-20">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Export & Logistics' }]} onNavigate={handleNav} />

        {/* 1. HERO HEADER */}
        <section className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
            Global Commercial Floriculture Export Desk · Bengaluru, India
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.05] text-[#141715] font-bold">
            International Flower Export & Cold Chain Logistics — Iris Biotech
          </h1>

          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            Supplying 50,000+ export-grade Dutch rose and chrysanthemum stems each week from our 20+ acre Bengaluru / Denkanikottai facilities to wholesale flower import brokers, distributors, and auction houses in <strong>21+ international countries</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#quote-section"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1E3926] active:scale-[0.99] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#141715] transition-all shadow-xs cursor-pointer text-center"
            >
              <span>Request Export Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/919845300304?text=Hello%20Iris%20Biotech%20Team%2C%20I%20am%20interested%20in%20commercial%20flower%20export%20allocations."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#1EBE5D] transition-all shadow-xs cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Export Desk (+91 98453 00304)</span>
            </a>
          </div>
        </section>

        {/* 2. AMBIENT 3D FLIGHT TRAJECTORY ANIMATION */}
        <section id="map-animation" className="w-full border-t border-[#E4DFD5] pt-12">
          <ExportJourney onNavigate={onNavigate} onSelectCountry={handleSelectCountry} />
        </section>

        {/* 3. WHERE WE SHIP (MARKETS SERVED - ALL 21 COUNTRIES) */}
        <section id="markets" className="space-y-10 border-t border-[#E4DFD5] pt-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block">
              Where We Ship
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141715] font-bold">
              21 International Export Destinations
            </h2>
            <p className="text-sm text-[#58615A] leading-relaxed font-light">
              Iris Biotech delivers refrigerated air-cargo shipments directly from Bengaluru to major international floral hubs across the Middle East, Europe, UK, Asia Pacific, and Africa.
            </p>
          </div>

          {/* Quick Country Badges Cloud (All 21 Countries) */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E4DFD5]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#767E79] font-bold block">
                  Direct International Export Network:
                </span>
                <span className="text-xs text-[#1E3926] font-semibold">
                  21 Global Destinations from Denkanikottai / Bengaluru
                </span>
              </div>
              <a
                href="#quote-section"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3926] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider hover:bg-[#141715] transition-all cursor-pointer shadow-xs self-start sm:self-auto"
              >
                <span>Request Country Allocation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => handleSelectCountry(dest.country)}
                  className="px-3 py-1.5 bg-[#F3EFE6] hover:bg-[#EAE4D5] hover:border-[#1E3926] border border-[#D1CAB9] text-xs font-semibold text-[#1E3926] flex items-center gap-2 transition-all cursor-pointer rounded-xs"
                  title={`Request export allocation to ${dest.country} (${dest.name} - ${dest.airportCode})`}
                >
                  <CountryFlag code={dest.countryCode} className="w-4 h-3 object-cover rounded-xs shadow-xs" />
                  <span>{dest.country}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Regional Detailed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketRegions.map((region, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs flex flex-col justify-between hover:border-[#1E3926] transition-colors space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD5]">
                    <span className="font-serif text-xl font-bold text-[#1E3926]">
                      {region.name}
                    </span>
                    <span className="text-[9px] px-2.5 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[#1E3926] font-bold uppercase tracking-wider rounded">
                      {region.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#767E79] font-bold mb-1.5">
                      Destinations Serviced:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {region.countries.map((c) => {
                        const match = DESTINATIONS.find((d) => d.country === c);
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => handleSelectCountry(c)}
                            className="text-xs font-semibold text-[#141715] bg-[#FAF8F5] hover:bg-[#EAE4D5] hover:border-[#1E3926] hover:text-[#1E3926] px-2.5 py-1 border border-[#E4DFD5] flex items-center gap-1.5 rounded-xs transition-colors cursor-pointer"
                            title={`Request export allocation to ${c}`}
                          >
                            <CountryFlag code={match?.countryCode || 'in'} className="w-3.5 h-2.5 object-cover rounded-xs shadow-xs" />
                            <span>{c}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#58615A] pt-3 border-t border-[#E4DFD5]/60">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[#88928A] shrink-0">Key Air Hubs:</span>
                      <span className="font-medium text-[#141715] text-right">{region.hubs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#88928A]">Flight Transit:</span>
                      <span className="font-bold text-[#1E3926]">{region.transit}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E4DFD5]/60 text-xs text-[#767E79]">
                  <strong className="text-[#141715]">Key Cultivars:</strong> {region.stems}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. HOW WE PREPARE FLOWERS (6-STEP SUPPLY CHAIN FLOW) */}
        <section id="process" className="space-y-10 border-t border-[#E4DFD5] pt-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block">
              How We Prepare Flowers
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141715] font-bold">
              Six-Stage Export Supply Chain Order
            </h2>
            <p className="text-sm text-[#58615A] leading-relaxed font-light">
              From dawn hand-harvesting to pressurized widebody air-cargo loading, our standardized post-harvest protocol guarantees peak freshness upon arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportWorkflow.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs space-y-4 relative overflow-hidden group hover:border-[#1E3926] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-[#1E3926]">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 bg-[#F3EFE6] border border-[#E4DFD5] flex items-center justify-center text-[#1E3926]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#141715]">{step.title}</h3>
                  <div className="text-xs font-semibold text-[#9A8356] uppercase tracking-wider">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-[#58615A] leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. EXPORT SPECIFICATIONS & PACKAGING */}
        <section id="logistics" className="space-y-8 border-t border-[#E4DFD5] pt-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block">
              Technical Specifications & Logistics
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141715] font-bold">
              Export Grades & Carton Dimensions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dutch Roses Specs */}
            <div className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#E4DFD5]">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#141715]">Dutch Roses</h3>
                  <span className="text-xs text-[#88928A]">Taj Mahal, Sweet Avalanche, Tacazzi, Jumilia, Malibu, Penny Lane, Voodoo</span>
                </div>
                <span className="text-xs font-bold text-[#1E3926] uppercase tracking-wider px-3 py-1 bg-[#F3EFE6] border border-[#D1CAB9]">
                  15 Acres
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="text-[10px] text-[#767E79] uppercase font-semibold">Stem Caliber</div>
                  <div className="text-sm font-semibold text-[#141715] mt-0.5">50 cm – 90 cm</div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="text-[10px] text-[#767E79] uppercase font-semibold">Bud Diameter</div>
                  <div className="text-sm font-semibold text-[#141715] mt-0.5">5.5 cm – 7.5 cm</div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="text-[10px] text-[#767E79] uppercase font-semibold">Box Packing</div>
                  <div className="text-sm font-semibold text-[#141715] mt-0.5">250 – 350 Stems/Box</div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="text-[10px] text-[#767E79] uppercase font-semibold">Vase Life</div>
                  <div className="text-sm font-bold text-[#1E3926] mt-0.5">14 – 18 Days</div>
                </div>
              </div>
            </div>

            {/* Chrysanthemums Specs */}
            <div className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#E4DFD5]">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#141715]">Chrysanthemums</h3>
                  <span className="text-xs text-[#88928A]">Spray, Disbud & Button Cultivars</span>
                </div>
                <span className="text-xs font-bold text-[#1E3926] uppercase tracking-wider px-3 py-1 bg-[#F3EFE6] border border-[#D1CAB9]">
                  5 Acres
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="text-[10px] text-[#767E79] uppercase font-semibold">Stem Caliber</div>
                  <div className="text-sm font-semibold text-[#141715] mt-0.5">65 cm – 85 cm</div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="text-[10px] text-[#767E79] uppercase font-semibold">Bloom Count</div>
                  <div className="text-sm font-semibold text-[#141715] mt-0.5">5 – 9 Buds / Spray</div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="text-[10px] text-[#767E79] uppercase font-semibold">Box Packing</div>
                  <div className="text-sm font-semibold text-[#141715] mt-0.5">150 – 200 Stems/Box</div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="text-[10px] text-[#767E79] uppercase font-semibold">Vase Life</div>
                  <div className="text-sm font-bold text-[#1E3926] mt-0.5">18 – 21 Days</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMMERCIAL TERMS & MOQ */}
        <section className="p-6 sm:p-12 bg-[#1E3926] text-[#FAF8F5] space-y-6 sm:space-y-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C4AA7D] block">
                Commercial Terms & Logistics
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF8F5] font-bold">
                Flexible Standing Contracts & Air Freight Reliability
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4 text-xs">
                <div className="p-3 sm:p-0 bg-white/5 sm:bg-transparent rounded-xs sm:rounded-none">
                  <div className="text-[#C4AA7D] font-bold uppercase tracking-wider text-[10px]">Minimum Order</div>
                  <div className="text-base font-serif font-medium mt-1">500 – 1,000 Stems</div>
                  <p className="text-[11px] text-[#CBD5E1] mt-0.5 font-light">Trial consignments welcome</p>
                </div>
                <div className="p-3 sm:p-0 bg-white/5 sm:bg-transparent rounded-xs sm:rounded-none">
                  <div className="text-[#C4AA7D] font-bold uppercase tracking-wider text-[10px]">Booking Lead Time</div>
                  <div className="text-base font-serif font-medium mt-1">48 – 72 Hours</div>
                  <p className="text-[11px] text-[#CBD5E1] mt-0.5 font-light">Prior to airport dispatch</p>
                </div>
                <div className="p-3 sm:p-0 bg-white/5 sm:bg-transparent rounded-xs sm:rounded-none">
                  <div className="text-[#C4AA7D] font-bold uppercase tracking-wider text-[10px]">Certifications</div>
                  <div className="text-base font-serif font-medium mt-1">Phyto & COO</div>
                  <p className="text-[11px] text-[#CBD5E1] mt-0.5 font-light">100% compliant export docs</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="#quote-section"
                className="w-full py-4 bg-[#FAF8F5] text-[#1E3926] text-center text-xs font-bold uppercase tracking-[0.18em] hover:bg-white active:scale-[0.99] transition-all shadow-sm cursor-pointer"
              >
                Request Quotation
              </a>
              <a
                href="https://wa.me/919845300304?text=Hello%20Iris%20Biotech%20Team%2C%20I%20want%20to%20discuss%20a%20standing%20weekly%20flower%20export%20contract."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] text-white text-center text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#1EBE5D] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp Export Desk
              </a>
            </div>
          </div>
        </section>

        {/* 6. EMBEDDED QUOTATION FORM */}
        <section id="quote-section" className="pt-8">
          <QuotationForm
            preselectedCountry={selectedCountryForQuote}
            onNavigate={onNavigate}
            title="Request an Export Supply Quotation"
            subtitle="Specify your required flower cultivars, carton allocations, and target air hub. Our commercial desk responds within 24 business hours."
          />
        </section>
      </div>
    </div>
  );
}

function Layers(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.5-8.58 3.9a2 2 0 0 1-1.66 0L2 12.5" />
      <path d="m22 17.5-8.58 3.9a2 2 0 0 1-1.66 0L2 17.5" />
    </svg>
  );
}
