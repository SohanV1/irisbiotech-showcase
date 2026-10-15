import React, { useState } from 'react';
import { ExportJourney } from '../components/ExportJourney/ExportJourney';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuotationForm } from '../components/QuotationForm';
import { DESTINATIONS } from '../components/ExportJourney/destinations';
import { CountryFlag } from '../components/ExportJourney/CountryFlag';
import {
  Plane,
  Thermometer,
  ShieldCheck,
  Clock,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Award,
  Globe2,
} from 'lucide-react';

type MapAnimationPageProps = {
  onNavigate: (path: string) => void;
};

export function MapAnimationPage({ onNavigate }: MapAnimationPageProps) {
  const [selectedCountryForQuote, setSelectedCountryForQuote] = useState<string | undefined>(undefined);

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
    }
  };

  const marketRegions = [
    {
      name: 'Europe & United Kingdom',
      badge: 'FloraHolland & London Boutiques',
      countries: ['UK', 'Netherlands', 'Italy', 'France', 'Russia'],
      transit: '8 – 10 Hours Direct Air Freight',
      stems: 'Taj Mahal Red Roses (70–90cm), Sweet Avalanche Pink, Tacazzi Pink',
    },
    {
      name: 'Middle East & GCC',
      badge: 'Daily Commercial Dispatches',
      countries: ['UAE', 'Qatar', 'Bahrain', 'Saudi Arabia', 'Kuwait', 'Oman'],
      transit: '4 – 5 Hours Direct Air Cargo',
      stems: 'Taj Mahal Red Roses (60–80cm), Sweet Avalanche Pink, Baltika Chrysanthemums',
    },
    {
      name: 'Asia Pacific & Oceania',
      badge: 'Phytosanitary Compliant Hubs',
      countries: ['Australia', 'New Zealand', 'Singapore', 'Malaysia', 'Thailand', 'Sri Lanka', 'Hong Kong'],
      transit: '1.5 – 14 Hours Cargo Transit',
      stems: 'Spray & Disbud Chrysanthemums, Export Grade A1 Dutch Roses',
    },
    {
      name: 'Levant & North Africa',
      badge: 'Scheduled Wholesale Allocations',
      countries: ['Lebanon', 'Jordan', 'Egypt'],
      transit: '6.5 – 7 Hours Air Cargo',
      stems: 'Dutch Roses, Mixed Spray Chrysanthemums',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Export & Logistics', path: '/export/' },
            { label: '3D Export Map Animation' },
          ]}
          onNavigate={handleNav}
        />

        {/* Section 1: Hero Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F3EFE6] border border-[#1E3926]/20 text-[10px] uppercase tracking-[0.22em] font-bold text-[#1E3926] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
            Global Floriculture Logistics · Denkanikottai / Bengaluru
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E3926] leading-[1.1]">
            Global Export Routes — 21 Verified Destinations
          </h1>

          <p className="text-base sm:text-lg text-[#58645C] leading-relaxed font-light">
            Watch our automated 3D flight trajectory tour from our 20-acre Denkanikottai floriculture estate to 21 international destination markets across Europe, the Middle East, Asia Pacific, and Africa with unbroken 2°C–4°C cold-chain preservation.
          </p>
        </div>

        {/* Section 2: THE EMBEDDED 3D MAP ANIMATION */}
        <section className="relative w-full">
          <ExportJourney onNavigate={onNavigate} onSelectCountry={handleSelectCountry} />
        </section>

        {/* Section 3: 21 Destinations Detailed Matrix (Scrollable Content Below Map) */}
        <section className="space-y-8 border-t border-[#E5EAE6] pt-12">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block">
              Market Distribution
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1E3926]">
              All 21 International Destination Markets
            </h2>
            <p className="text-sm text-[#58645C] max-w-3xl">
              Iris Biotech dispatches scheduled temperature-monitored air cargo consignments directly from Kempegowda International Airport (BLR) to premier wholesale floral auctions and distributors worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketRegions.map((region, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 bg-white border-2 border-[#1E3926]/15 hover:border-[#1E3926] transition-all rounded-2xl shadow-xs space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE6]">
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#1E3926]">
                    {region.name}
                  </span>
                  <span className="text-[9px] px-2.5 py-1 bg-[#F3EFE6] border border-[#1E3926]/20 text-[#1E3926] font-bold uppercase tracking-wider rounded-md">
                    {region.badge}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#767E79] font-bold mb-2">
                    Serviced Countries:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.countries.map((c) => {
                      const match = DESTINATIONS.find((d) => d.country === c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleSelectCountry(c)}
                          className="text-xs font-semibold text-[#1E3926] bg-[#FAF8F5] hover:bg-[#EAE4D5] hover:border-[#1E3926] px-3 py-1.5 rounded-md border border-[#1E3926]/15 flex items-center gap-2 transition-colors cursor-pointer"
                          title={`Request export allocation to ${c}`}
                        >
                          <CountryFlag code={match?.countryCode || 'in'} className="w-4 h-3 object-cover rounded-xs shadow-xs" />
                          <span>{c}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-[#E5EAE6]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#767E79]">Direct Flight Transit:</span>
                    <span className="font-bold text-[#1E3926]">{region.transit}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#767E79] shrink-0">Key Cultivars:</span>
                    <span className="font-medium text-[#1E3926] text-right">{region.stems}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: 4-Stage Cold-Chain Logistics Protocol */}
        <section className="space-y-8 border-t border-[#E5EAE6] pt-12">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E3926] block">
              Cold Chain Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1E3926]">
              Unbroken 2°C – 4°C Thermal Chain Custody
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#1E3926]/15 rounded-xl space-y-3">
              <span className="font-serif text-3xl font-bold text-[#1E3926]">01</span>
              <h3 className="font-bold text-[#141715] text-base">Dawn Harvesting</h3>
              <p className="text-xs text-[#58645C] leading-relaxed">
                Hand-cut at first light when stem turgor pressure is peak. Immersed in post-harvest conditioning solutions within 30 minutes.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#1E3926]/15 rounded-xl space-y-3">
              <span className="font-serif text-3xl font-bold text-[#1E3926]">02</span>
              <h3 className="font-bold text-[#141715] text-base">Laser Grading</h3>
              <p className="text-xs text-[#58645C] leading-relaxed">
                Calibrated optical grading for stem caliber (50–90cm), bloom aperture, and foliar purity under 2°C–4°C chilled packing rooms.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#1E3926]/15 rounded-xl space-y-3">
              <span className="font-serif text-3xl font-bold text-[#1E3926]">03</span>
              <h3 className="font-bold text-[#141715] text-base">Reefer Truck Logistics</h3>
              <p className="text-xs text-[#58645C] leading-relaxed">
                60-minute direct highway transit in dedicated refrigerated trucks with real-time temperature loggers to BLR Airport CoolPort.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#1E3926]/15 rounded-xl space-y-3">
              <span className="font-serif text-3xl font-bold text-[#1E3926]">04</span>
              <h3 className="font-bold text-[#141715] text-base">Widebody Air Cargo</h3>
              <p className="text-xs text-[#58645C] leading-relaxed">
                Pressurized temperature-controlled air freight on direct flights arriving fresh in wholesale markets within 4.5 to 12 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Commercial Contact & Quotation CTA */}
        <section className="p-8 sm:p-12 bg-[#1E3926] text-white rounded-2xl shadow-sm space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#10B981] block">
              Commercial Export Allocations
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Reserve Standing Weekly Flower Consignments
            </h2>
            <p className="text-sm text-[#E5EAE6] font-light leading-relaxed">
              We supply international wholesale importers, auction houses, and event decorators with guaranteed standing allocations of Dutch roses and chrysanthemums.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#quote-section"
              className="px-8 py-3.5 bg-white text-[#1E3926] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF8F5] transition-all rounded-lg cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <span>Request Commercial Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/919845300304?text=Hello%20Iris%20Biotech%20Export%20Desk%2C%20I%20am%20interested%20in%20flower%20export%20allocations."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all rounded-lg cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Commercial Desk (+91 98453 00304)</span>
            </a>
          </div>
        </section>

        {/* Section 6: Embedded Quotation Form */}
        <section id="quote-section" className="border-t border-[#E5EAE6] pt-12">
          <QuotationForm
            preselectedCountry={selectedCountryForQuote}
            onNavigate={onNavigate}
            title="Request a Commercial Export Quotation"
            subtitle="Select your destination country, required cultivars, and weekly stem volume. We respond with carton dimensions and FOB/CIF rates within 24 hours."
          />
        </section>
      </div>
    </div>
  );
}
