import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InView } from '../components/motion/InView';
import { ColdChainSimulator } from '../components/ColdChainSimulator';
import { Thermometer, Droplets, ShieldCheck, Zap, Box, Clock, ArrowRight, Check, Award, Eye } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

type ColdStoragePageProps = {
  onNavigate: (path: string) => void;
};

export function ColdStoragePage({ onNavigate }: ColdStoragePageProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const galleryImages = [
    {
      src: '/images/cold-storage-facility-4.jpg',
      title: 'Precision Multi-Chamber Cold Room',
      desc: 'Controlled 2°C – 4°C ambient chamber with continuous digital telemetry and forced-air circulation.',
      tag: 'Chamber 04',
    },
    {
      src: '/images/cold-storage-flowers-3.jpg',
      title: 'Post-Harvest Hydration Staging',
      desc: 'Stems immersed in conditioned uptake solution immediately following dawn harvest to preserve vascular turgidity.',
      tag: 'Hydration Protocol',
    },
    {
      src: '/images/flowers-cold-storage-2.jpg',
      title: 'Export-Grade Dutch Rose Storage',
      desc: 'Graded and sleeved export roses pre-cooling at optimal 85%–90% relative humidity before air-cargo dispatch.',
      tag: 'Export Inventory',
    },
    {
      src: '/images/flowers-cold-storage-interior.jpg',
      title: 'Cold Storage Staging & Inspection',
      desc: 'Hygienic cold-room facility where stems undergo final aperture and caliber verification prior to packing.',
      tag: 'Quality Control',
    },
    {
      src: '/images/cold-storage-exterior.jpg',
      title: 'Logistics Bay & Cold Facility Exterior',
      desc: 'Direct refrigerated transport docking bay with backup diesel power infrastructure for zero thermal breaks.',
      tag: 'Logistics Dock',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: 'Facilities', path: '/facilities/' }, { label: 'Cold Storage' }]}
          onNavigate={handleNav}
        />

        {/* Page Hero */}
        <section className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
            Post-Harvest Thermal Integrity · 2°C – 4°C
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            Precision Cold Storage (2°C – 4°C) & Post-Harvest Handling
          </h1>

          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            At Iris Biotech, our export quality roses and chrysanthemums are grown with utmost care and deep respect for nature. Because true flower longevity is protected after harvest, our on-site 2°C – 4°C multi-chamber cold storage halts respiration, locks in petal crispness, and guarantees 14 to 18 days of vibrant vase life.
          </p>
        </section>

        {/* Key Metrics Strip */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[#1E3926]">
              <Thermometer className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#767E79]">Target Temp</span>
            </div>
            <div className="text-3xl font-serif text-[#1E3926] font-normal">2°C – 4°C</div>
            <div className="text-xs text-[#58615A] font-light">Rapid pre-cooling in &lt; 30 mins</div>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[#1E3926]">
              <Droplets className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#767E79]">Humidity</span>
            </div>
            <div className="text-3xl font-serif text-[#1E3926] font-normal">85% – 90% RH</div>
            <div className="text-xs text-[#58615A] font-light">Zero moisture or weight loss</div>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[#1E3926]">
              <Clock className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#767E79]">Vase Life</span>
            </div>
            <div className="text-3xl font-serif text-[#1E3926] font-normal">14 – 18 Days</div>
            <div className="text-xs text-[#58615A] font-light">Export quality guaranteed</div>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#E4DFD5] space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[#1E3926]">
              <Zap className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#767E79]">Redundancy</span>
            </div>
            <div className="text-3xl font-serif text-[#1E3926] font-normal">Dual Diesel</div>
            <div className="text-xs text-[#58615A] font-light">Unbroken backup power</div>
          </div>
        </section>

        {/* Real Cold Storage Facility Photo Gallery */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block">
                Facility Photographic Tour
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#141715]">
                Inside Our On-Site Cold-Room Infrastructure
              </h2>
            </div>
            <span className="text-xs text-[#767E79]">Actual photographs from Iris Biotech Bengaluru estate</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((img, idx) => (
              <InView key={idx} once={true}>
                <div
                  onClick={() => setActivePhoto(img.src)}
                  className="bg-[#FFFFFF] border border-[#E4DFD5] hover:border-[#1E3926] overflow-hidden cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EFE6]">
                      <img
                        src={img.src}
                        alt={`${img.title} at Iris Biotech on-site cold storage facility in Bengaluru`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#E4DFD5] text-[10px] uppercase tracking-[0.16em] font-semibold text-[#1E3926]">
                        {img.tag}
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2.5 bg-[#FAF8F5] rounded-full text-[#1E3926] shadow-md">
                          <Eye className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-xl font-serif text-[#141715] group-hover:text-[#1E3926] transition-colors">
                        {img.title}
                      </h3>
                      <p className="text-xs text-[#58615A] leading-relaxed font-light">
                        {img.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-[#F3EFE6] border-t border-[#E4DFD5] flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1E3926]">
                    <span>Inspect Facility Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </section>

        {/* Interactive Cold-Chain Simulator */}
        <ColdChainSimulator />

        {/* 3-Step Cold Chain Protocol */}
        <section className="p-8 sm:p-12 bg-[#FFFFFF] border border-[#E4DFD5] space-y-8 shadow-sm">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#9A8356] block">
              Standard Operating Protocols
            </span>
            <h2 className="text-3xl font-serif text-[#141715]">
              How We Safeguard Export Quality Stems
            </h2>
            <p className="text-xs sm:text-sm text-[#58615A] font-light leading-relaxed">
              Every step from dawn harvest to airport cold cargo transfer follows rigorous time and temperature checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-[#58615A] leading-relaxed">
            <div className="p-6 bg-[#FAF8F5] border border-[#E4DFD5] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1E3926] text-white flex items-center justify-center font-mono text-xs font-semibold">
                01
              </div>
              <h3 className="font-serif text-lg text-[#141715] font-semibold">Immediate Hydration Bath</h3>
              <p>Within minutes of harvest, cut stems are placed into conditioned post-harvest solutions with balanced pH and antimicrobial floral nutrients.</p>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-[#E4DFD5] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1E3926] text-white flex items-center justify-center font-mono text-xs font-semibold">
                02
              </div>
              <h3 className="font-serif text-lg text-[#141715] font-semibold">Rapid Pre-Cooling</h3>
              <p>Stems enter our primary pre-cooling chamber to remove all residual field heat, dropping stem core temperature to 2°C in under 45 minutes.</p>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-[#E4DFD5] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1E3926] text-white flex items-center justify-center font-mono text-xs font-semibold">
                03
              </div>
              <h3 className="font-serif text-lg text-[#141715] font-semibold">Refrigerated Logistics</h3>
              <p>Graded and boxed flowers are transferred into dedicated refrigerated transport vehicles for direct delivery to export air hubs and domestic terminals.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-10 sm:p-14 bg-[#1E3926] text-[#FAF8F5] flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C4AA7D] block">
              Commercial Export Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5]">
              Experience The Cold-Chain Difference
            </h2>
            <p className="text-sm text-[#FAF8F5]/80 font-light leading-relaxed">
              Export quality roses and chrysanthemums grown with utmost care and deep respect for nature. Reserve your weekly wholesale allocation or schedule a facility inspection.
            </p>
          </div>

          <button
            onClick={() => handleNav('/contact/')}
            className="px-9 py-5 bg-[#FAF8F5] text-[#1E3926] hover:bg-[#F3EFE6] text-xs font-semibold uppercase tracking-[0.2em] transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            Inquire For Supply →
          </button>
        </section>

        {/* Fullscreen Photo Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] bg-[#FAF8F5] p-2 border border-white/20 shadow-2xl">
              <img
                src={activePhoto}
                alt="Enlarged facility view"
                className="w-full max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Close ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
