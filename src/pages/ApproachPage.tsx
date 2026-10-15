import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InView } from '../components/motion/InView';
import { Sprout, Sun, Droplets, HeartPulse, ShieldCheck, ArrowRight, Check, X, Thermometer } from 'lucide-react';

type ApproachPageProps = {
  onNavigate: (path: string) => void;
};

export function ApproachPage({ onNavigate }: ApproachPageProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Our Approach' }]} onNavigate={handleNav} />

        {/* Page Hero */}
        <section className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
            Export Quality Roses · Grown With Utmost Care · Respect For Nature
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            Agronomic Approach & Living Soil Stewardship — Iris Biotech
          </h1>
          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            At Iris Biotech Private Limited, we believe that flower longevity, petal pigmentation, and stem caliber originate in the living soil ecosystem. We emphasize responsible crop management, natural plant nutrition, and bio-rational soil amendments over short-term chemical forcing — cultivating every bloom with utmost care and deep respect for nature.
          </p>
        </section>

        {/* 5 Core Pillars */}
        <section className="space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C4AA7D] block">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141715]">Our 5 Cultivation Practices</h2>
            <p className="text-sm text-[#58615A] font-light">Responsible agronomy engineered for export quality, stem resilience, and long-term soil health.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Natural Cultivation',
                icon: Sprout,
                desc: 'Balancing greenhouse climate management with natural cross-ventilation and bio-protective techniques to cultivate robust, thick-walled stems.',
              },
              {
                step: '02',
                title: 'Organic Bio-Amendments',
                icon: Droplets,
                desc: 'Utilizing organic compost, humic extracts, and beneficial bio-inoculants to build a biodiverse and active root zone microbiome.',
              },
              {
                step: '03',
                title: 'Precision Soil Nutrition',
                icon: Sun,
                desc: 'Formulating customized macro and micro-nutrient blends tailored to the specific phenological uptake stages of roses and chrysanthemums.',
              },
              {
                step: '04',
                title: 'Soil Health Monitoring',
                icon: HeartPulse,
                desc: 'Continuous analytical testing for pH balance, electrical conductivity (EC), and beneficial microbial counts to maintain optimal soil structure.',
              },
              {
                step: '05',
                title: 'Responsible Crop Care',
                icon: ShieldCheck,
                desc: 'Integrated Pest Management (IPM) protocols that prioritize biological controls and bio-pesticides over harsh residual chemicals.',
              },
            ].map((pillar, idx) => (
              <InView key={idx} once={true}>
                <div className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] space-y-4 relative h-full shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-serif font-bold text-[#C4AA7D]">
                        {pillar.step}
                      </span>
                      <pillar.icon className="w-5 h-5 text-[#1E3926]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#141715]">{pillar.title}</h3>
                    <p className="text-xs text-[#58615A] leading-relaxed font-light">{pillar.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-[#E4DFD5] text-[10px] uppercase tracking-widest text-[#88928A] font-semibold">
                    Standard Operating Procedure
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </section>

        {/* Agronomic Comparison Table */}
        <section className="p-8 sm:p-12 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xs space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block">
              The Botanical Difference
            </span>
            <h2 className="text-3xl font-serif text-[#141715]">
              Conventional Production vs. Iris Biotech Stewardship
            </h2>
            <p className="text-xs text-[#58615A] font-light">
              How our biological soil management directly impacts post-harvest flower quality and vase life.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E4DFD5] text-[10px] uppercase tracking-wider text-[#767E79]">
                  <th className="py-4 pr-6 font-semibold">Agronomic Factor</th>
                  <th className="py-4 px-6 font-semibold text-[#88928A]">Conventional Chemical Farming</th>
                  <th className="py-4 pl-6 font-semibold text-[#1E3926] bg-[#F3EFE6]">Iris Biotech Soil Stewardship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DFD5]">
                <tr>
                  <td className="py-4 pr-6 font-medium text-[#141715]">Root Zone Health</td>
                  <td className="py-4 px-6 text-[#58615A]">Sterilized substrate with synthetic salt buildup</td>
                  <td className="py-4 pl-6 font-semibold text-[#1E3926] bg-[#F3EFE6]/50">Living microbiome with bio-amendments & mycorrhizae</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium text-[#141715]">Stem Cell Wall Thickness</td>
                  <td className="py-4 px-6 text-[#58615A]">Thin, watery cell structure prone to neck bending</td>
                  <td className="py-4 pl-6 font-semibold text-[#1E3926] bg-[#F3EFE6]/50">Dense, lignified vascular bundles for structural rigidity</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium text-[#141715]">Pest Management</td>
                  <td className="py-4 px-6 text-[#58615A]">Heavy reliance on chemical calendar spraying</td>
                  <td className="py-4 pl-6 font-semibold text-[#1E3926] bg-[#F3EFE6]/50">Biological IPM, beneficial predators, neem & botanicals</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium text-[#141715]">Vase Longevity</td>
                  <td className="py-4 px-6 text-[#58615A]">7 – 10 Days typical retail window</td>
                  <td className="py-4 pl-6 font-semibold text-[#1E3926] bg-[#F3EFE6]/50">14 – 21 Days verified commercial vase shelf-life</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cross-Link Navigation */}
        <section className="pt-8 border-t border-[#E4DFD5]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={() => handleNav('/flowers/')}
              className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] text-left transition-all group shadow-xs flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#88928A] font-semibold block mb-1">
                  Explore Products
                </span>
                <h3 className="text-xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">
                  View Flowers
                </h3>
                <p className="text-xs text-[#58615A] mt-1 font-light">Export quality Dutch roses & chrysanthemums.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#1E3926] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => handleNav('/cold-storage/')}
              className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] text-left transition-all group shadow-xs flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#88928A] font-semibold block mb-1">
                  Cold Chain
                </span>
                <h3 className="text-xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">
                  Cold Storage (2°C–4°C)
                </h3>
                <p className="text-xs text-[#58615A] mt-1 font-light">On-site multi-chamber pre-cooling facility.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#1E3926] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => handleNav('/facilities/')}
              className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] text-left transition-all group shadow-xs flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#88928A] font-semibold block mb-1">
                  Post-Harvest
                </span>
                <h3 className="text-xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">
                  Packhouse & Logistics
                </h3>
                <p className="text-xs text-[#58615A] mt-1 font-light">Laser stem grading & hydration lines.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#1E3926] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
