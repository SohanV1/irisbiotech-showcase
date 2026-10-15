import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InView } from '../components/motion/InView';
import { MANAGEMENT } from '../data/company';
import { ArrowUpRight, ArrowRight, ShieldCheck, HeartHandshake, Leaf, Thermometer } from 'lucide-react';

type AboutPageProps = {
  onNavigate: (path: string) => void;
};

export function AboutPage({ onNavigate }: AboutPageProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
        <Breadcrumbs items={[{ label: 'About' }]} onNavigate={handleNav} />

        {/* Hero */}
        <section className="py-12 sm:py-16 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
            Export Quality Roses · Grown With Utmost Care · Respect For Nature
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            About Iris Biotech — 20-Acre Floriculture Estate & Leadership
          </h1>
          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            Iris Biotech Private Limited is a premier Indian floriculture enterprise cultivating across 20 acres of high-precision greenhouse infrastructure in Bengaluru / Denkanikottai. We combine agronomic science, living soil stewardship, and post-harvest cold-chain precision to produce export quality Dutch roses and chrysanthemums.
          </p>
        </section>

        {/* Full-Width Team Photo */}
        <section className="py-8 border-b border-[#E4DFD5]">
          <InView once={true}>
            <div className="border border-[#E4DFD5] overflow-hidden bg-[#F3EFE6]">
              <img
                src={MANAGEMENT.teamPhoto}
                alt="Iris Biotech floriculture greenhouse farm and packhouse team at Denkanikottai near Bengaluru"
                loading="lazy"
                className="w-full aspect-[21/9] object-cover"
              />
              <div className="p-4 bg-[#FFFFFF] border-t border-[#E4DFD5] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#58615A] gap-2">
                <span className="font-semibold text-[#141715]">Iris Biotech Farm & Packhouse Operations Team</span>
                <span className="text-[11px] uppercase tracking-wider text-[#88928A]">Cultivating 20 Acres in Bengaluru</span>
              </div>
            </div>
          </InView>
        </section>

        {/* 4 Pillars Grid */}
        <section className="py-20 border-b border-[#E4DFD5]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            <InView once={true}>
              <div className="space-y-3 p-8 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C4AA7D] block">01 / Scale</span>
                <h3 className="text-2xl font-serif text-[#141715]">20 Acres Cultivation</h3>
                <p className="text-sm text-[#58615A] leading-relaxed font-light">
                  15 acres dedicated to export quality Dutch rose polyhouses and 5 acres specialized in chrysanthemum varieties, fully monitored for humidity and temperature.
                </p>
              </div>
            </InView>

            <InView once={true}>
              <div className="space-y-3 p-8 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C4AA7D] block">02 / Agronomy</span>
                <h3 className="text-2xl font-serif text-[#141715]">Utmost Care & Soil Stewardship</h3>
                <p className="text-sm text-[#58615A] leading-relaxed font-light">
                  Organic bio-amendments, beneficial microbes, and balanced root nutrition with deep respect for nature to ensure strong stems and extended vase life.
                </p>
              </div>
            </InView>

            <InView once={true}>
              <div className="space-y-3 p-8 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C4AA7D] block">03 / Cold Chain</span>
                <h3 className="text-2xl font-serif text-[#141715]">Precision Cold Storage (2°C–4°C)</h3>
                <p className="text-sm text-[#58615A] leading-relaxed font-light">
                  On-site packhouse grading and rapid pre-cooling at 2°C – 4°C with dual generator backup to maintain uninterrupted chain of custody.
                </p>
              </div>
            </InView>

            <InView once={true}>
              <div className="space-y-3 p-8 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C4AA7D] block">04 / Logistics</span>
                <h3 className="text-2xl font-serif text-[#141715]">Dual Market Distribution</h3>
                <p className="text-sm text-[#58615A] leading-relaxed font-light">
                  Serving premier domestic floral studios and wholesale distributors alongside international export auction buyers.
                </p>
              </div>
            </InView>
          </div>
        </section>

        {/* Management & Governance */}
        <section className="py-20 border-b border-[#E4DFD5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="border border-[#E4DFD5] overflow-hidden bg-[#F3EFE6] shadow-xs">
                <img
                  src="/images/owner-venkat-rao.jpg"
                  alt="K. Venkata Rao, Founder and Managing Director of Iris Biotech Private Limited"
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block">
                Governance & Leadership
              </span>
              <h2 className="text-4xl font-serif text-[#141715]">{MANAGEMENT.mdName}</h2>
              <p className="text-xs uppercase tracking-widest text-[#767E79] font-medium">
                {MANAGEMENT.mdTitle} · {MANAGEMENT.location}
              </p>

              <blockquote className="text-xl sm:text-2xl font-serif leading-relaxed text-[#141715] border-l-2 border-[#1E3926] pl-6 py-2">
                &ldquo;{MANAGEMENT.mdQuote}&rdquo;
              </blockquote>

              <p className="text-sm text-[#58615A] leading-relaxed font-light">
                {MANAGEMENT.mdBio}
              </p>

              <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] inline-block shadow-xs">
                <div className="text-[10px] uppercase tracking-widest text-[#88928A] mb-1">Co-Director</div>
                <div className="text-sm font-semibold text-[#141715]">{MANAGEMENT.coDirectorName}</div>
                <div className="text-xs text-[#58615A]">{MANAGEMENT.coDirectorTitle}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Cross-Linking Navigation */}
        <section className="py-20">
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block mb-2">
              Next Chapters
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141715]">Explore Iris Biotech</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => handleNav('/approach/')}
              className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] text-left transition-all group shadow-xs flex flex-col justify-between h-48 cursor-pointer"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#88928A] mb-2 block">Methodology</span>
                <h3 className="text-lg font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">Our Approach</h3>
                <p className="text-xs text-[#58615A] mt-2 font-light">Soil microbiology & natural crop nutrition.</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1E3926]">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => handleNav('/flowers/')}
              className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] text-left transition-all group shadow-xs flex flex-col justify-between h-48 cursor-pointer"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#88928A] mb-2 block">Catalog</span>
                <h3 className="text-lg font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">Flower Varieties</h3>
                <p className="text-xs text-[#58615A] mt-2 font-light">Export quality Dutch roses & chrysanthemums.</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1E3926]">
                <span>View Stems</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => handleNav('/cold-storage/')}
              className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] text-left transition-all group shadow-xs flex flex-col justify-between h-48 cursor-pointer"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#88928A] mb-2 block">Cold Chain</span>
                <h3 className="text-lg font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">Cold Storage</h3>
                <p className="text-xs text-[#58615A] mt-2 font-light">On-site 2°C–4°C multi-chamber pre-cooling.</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1E3926]">
                <span>Tour Facility</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => handleNav('/facilities/')}
              className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] text-left transition-all group shadow-xs flex flex-col justify-between h-48 cursor-pointer"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#88928A] mb-2 block">Packhouse</span>
                <h3 className="text-lg font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">Packhouse & Facilities</h3>
                <p className="text-xs text-[#58615A] mt-2 font-light">Laser stem grading & conditioned hydration.</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1E3926]">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
