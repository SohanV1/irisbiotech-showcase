import React, { useState, useEffect, useRef } from 'react';
import { Sprout, Droplets, Sun, Sparkles, Scissors, Users, Box, Thermometer, Globe, ArrowRight } from 'lucide-react';
import { InView } from './motion/InView';

export type JourneyStep = {
  id: string;
  stage: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  metricLabel: string;
  metricValue: string;
  image: string;
  icon: React.ElementType;
};

const CONTINUUM_STEPS: JourneyStep[] = [
  {
    id: 'soil',
    stage: 'Stage 01',
    number: '01',
    title: 'Soil & Microbiology',
    tagline: 'Living foundations beneath every root.',
    description: 'Cultivation begins with living soil structure. We enhance the root rhizosphere with organic composts, beneficial microbes, and optimal drainage to foster vigorous root development before a single stem emerges.',
    details: ['Organic soil amendments & compost', 'Microbial bio-inoculants', 'Continuous moisture & aeration balance'],
    metricLabel: 'Rhizosphere Health',
    metricValue: 'pH 6.2 – 6.8',
    image: '/images/dutch-rose-cultivation.jpg',
    icon: Sprout,
  },
  {
    id: 'nutrition',
    stage: 'Stage 02',
    number: '02',
    title: 'Plant Nutrition',
    tagline: 'Precision bio-rational feeding regimes.',
    description: 'Tailored fertigation recipes deliver balanced macro and micro-nutrients through automated drip systems. Organic bio-stimulants ensure strong cellular cell walls and deep, natural flower pigmentation.',
    details: ['Automated drip fertigation', 'Chelated micronutrient delivery', 'Natural bio-stimulants for stem strength'],
    metricLabel: 'EC Precision',
    metricValue: '1.4 – 1.8 mS/cm',
    image: '/images/chrysanthemum-farm.jpg',
    icon: Droplets,
  },
  {
    id: 'cultivation',
    stage: 'Stage 03',
    number: '03',
    title: 'Greenhouse Cultivation',
    tagline: '20 acres of micro-climate mastery.',
    description: 'High-roof polyhouse structures protect 15 acres of Dutch roses and 5 acres of chrysanthemums from extreme weather, regulating ambient temperature, humidity, and airflow for continuous year-round growth.',
    details: ['Climate-monitored polyhouses', 'Thermal and shade screen regulation', 'Targeted biological crop care'],
    metricLabel: 'Estate Acreage',
    metricValue: '20 Total Acres',
    image: '/images/dutch-rose-hero.jpg',
    icon: Sun,
  },
  {
    id: 'flower',
    stage: 'Stage 04',
    number: '04',
    title: 'The Bloom',
    tagline: 'Flawless geometry, petal count, and hue.',
    description: 'Careful canopy management and disbudding yield robust buds with dense petal whorls. Stems develop straight, strong necks and vibrant, rich colors across our complete cultivar portfolio.',
    details: ['Dense petal whorl formation', 'High neck tensile strength', 'Lustrous, deep foliage color'],
    metricLabel: 'Petal Count',
    metricValue: '38 – 46 Petals',
    image: '/images/taj-mahal-rose.jpg',
    icon: Sparkles,
  },
  {
    id: 'harvest',
    stage: 'Stage 05',
    number: '05',
    title: 'Dawn Harvest',
    tagline: 'Harvested at the exact physiological peak.',
    description: 'Harvesting takes place during the cool early morning hours. Trained floriculturists cut stems at precise bud opening indices (Cut Stage 2–3) to preserve maximum vase longevity during transit.',
    details: ['Dawn harvesting protocols', 'Sanitized cutting blades', 'Cut aperture stage 2 index'],
    metricLabel: 'Optimal Harvest Temp',
    metricValue: '< 18°C Morning',
    image: '/images/rose-harvest.jpg',
    icon: Scissors,
  },
  {
    id: 'people',
    stage: 'Stage 06',
    number: '06',
    title: 'Human Craft & Care',
    tagline: 'Dedicated growers and skilled handlers.',
    description: 'Technology enables precision, but our people ensure excellence. Our team of experienced agronomists and handling personnel inspect each stem with careful, respectful artisanal attention.',
    details: ['Experienced floriculture artisans', 'Continuous quality inspection', 'Ethical and safe farm practices'],
    metricLabel: 'Trained Team',
    metricValue: '50+ Specialists',
    image: '/images/iris-biotech-team.jpg',
    icon: Users,
  },
  {
    id: 'packhouse',
    stage: 'Stage 07',
    number: '07',
    title: 'Packhouse & Grading',
    tagline: 'Immediate hydration and calibrated sorting.',
    description: 'Stems are instantly placed in specialized post-harvest hydration solutions. In our modern packhouse, stems are mechanically graded by length (60–90 cm), bud size, and sleeved in protective packaging.',
    details: ['Post-harvest conditioning solution', 'Laser-calibrated length sorting', 'Protective corrugated export sleeves'],
    metricLabel: 'Grading Lengths',
    metricValue: '60 – 90 cm Stems',
    image: '/images/iris-biotech-packhouse.jpg',
    icon: Box,
  },
  {
    id: 'coldroom',
    stage: 'Stage 08',
    number: '08',
    title: 'Cold Storage (2°C – 4°C)',
    tagline: 'Arresting aging, preserving freshness.',
    description: 'Within minutes of packing, flowers enter our precision multi-chamber cold storage. Rapid pre-cooling to 2°C–4°C slows respiration and locks in petal crispness for extended international journeys.',
    details: ['2°C to 4°C controlled atmosphere', '85% to 90% relative humidity', 'Uninterrupted dual backup power'],
    metricLabel: 'Cold-Room Spec',
    metricValue: '2°C – 4°C / 90% RH',
    image: '/images/cold-room-facility.jpg',
    icon: Thermometer,
  },
  {
    id: 'market',
    stage: 'Stage 09',
    number: '09',
    title: 'Global & Domestic Market',
    tagline: 'Delivered in prime condition worldwide.',
    description: 'Our flowers reach premier domestic wholesale markets and international buyers via unbroken cold chain logistics. Flowers arrive fresh with up to 18 days of vibrant vase life.',
    details: ['Unbroken cold-chain transport', 'International export air cargo', 'Tier-1 domestic distribution'],
    metricLabel: 'Vase Longevity',
    metricValue: '14 – 18 Days',
    image: '/images/sweet-avalanche-rose.jpg',
    icon: Globe,
  },
];

type ScrollJourneyProps = {
  onNavigate?: (path: string) => void;
};

export function ScrollJourney({ onNavigate }: ScrollJourneyProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStep = CONTINUUM_STEPS[activeStepIndex];

  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#E4DFD5] relative overflow-hidden" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E3926]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C4AA7D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <InView once={true}>
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#D1CAB9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
                The Cultivation Continuum
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141715] leading-[1.08] tracking-tight">
              The Journey of Quality
            </h2>
            <p className="text-base sm:text-lg text-[#58615A] font-light leading-relaxed">
              &ldquo;The quality of a flower begins long before it blooms.&rdquo; Explore our 9-stage integrated process from deep microbial soil health to international market dispatch.
            </p>
          </div>
        </InView>

        {/* Step Navigation Bar / Progress Rail */}
        <div className="mb-12 border-b border-[#E4DFD5] pb-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {CONTINUUM_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group flex items-center gap-2.5 px-4 py-2.5 border transition-all duration-300 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#1E3926] text-[#FAF8F5] border-[#1E3926] shadow-sm'
                      : 'bg-[#FFFFFF] text-[#58615A] border-[#E4DFD5] hover:border-[#1E3926] hover:text-[#141715]'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-semibold ${isActive ? 'text-[#C4AA7D]' : 'text-[#88928A]'}`}>
                    {step.number}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C4AA7D]' : 'text-[#58615A] group-hover:text-[#1E3926]'}`} />
                  <span className="text-xs font-medium tracking-wide">
                    {step.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Master Card Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Story Content */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-10 bg-[#FFFFFF] border border-[#E4DFD5] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-4">
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#1E3926]">
                  {activeStep.stage} · {activeStep.number} of 09
                </span>
                <span className="px-3 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[11px] font-mono font-medium text-[#141715]">
                  {activeStep.metricLabel}: <strong className="text-[#1E3926] font-semibold">{activeStep.metricValue}</strong>
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-serif text-[#141715] mb-2">
                  {activeStep.title}
                </h3>
                <p className="text-sm font-medium text-[#9A8356] italic">
                  &ldquo;{activeStep.tagline}&rdquo;
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#58615A] font-light leading-relaxed">
                {activeStep.description}
              </p>

              {/* Specific Quality Criteria */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#767E79] block">
                  Quality Protocols
                </span>
                <ul className="space-y-2">
                  {activeStep.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-[#141715]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926] mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step Controls */}
            <div className="pt-8 mt-8 border-t border-[#E4DFD5] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 border border-[#E4DFD5] text-xs font-semibold uppercase tracking-wider text-[#141715] hover:bg-[#F3EFE6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Prev
                </button>
                <button
                  disabled={activeStepIndex === CONTINUUM_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(CONTINUUM_STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 bg-[#1E3926] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#141715] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step →
                </button>
              </div>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('/approach/')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3926] hover:underline"
                >
                  <span>Learn agronomy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Visual Stage with High-Res Image & Overlay Badges */}
          <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px] border border-[#E4DFD5] overflow-hidden bg-[#141715] group">
            <img
              key={activeStep.image}
              src={activeStep.image}
              alt={activeStep.title}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141715]/80 via-transparent to-black/20" />

            {/* Floating Metric Callout on Image */}
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E4DFD5] shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#767E79] font-medium block">
                  Agronomic Metric
                </span>
                <span className="font-serif text-lg text-[#141715] font-semibold">
                  {activeStep.metricValue}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1E3926] font-semibold block">
                  Iris Standard
                </span>
                <span className="text-xs text-[#58615A]">
                  Verified Batch Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
