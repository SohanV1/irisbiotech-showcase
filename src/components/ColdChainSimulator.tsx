import React, { useState } from 'react';
import { Thermometer, Droplets, ShieldCheck, Clock, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { InView } from './motion/InView';

export function ColdChainSimulator() {
  const [mode, setMode] = useState<'iris' | 'standard'>('iris');

  return (
    <section className="py-24 bg-[#F3EFE6] border-b border-[#E4DFD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <InView once={true}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block">
                Post-Harvest Technology
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#141715] leading-[1.1]">
                Precision Cold Storage & Longevity
              </h2>
              <p className="text-sm sm:text-base text-[#58615A] font-light leading-relaxed">
                Temperature is the single greatest determinant of vase life. See how our unbroken 2°C – 4°C cold chain preserves stem cellular turgidity versus conventional handling.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="inline-flex p-1.5 bg-[#FFFFFF] border border-[#D1CAB9] self-start md:self-auto shadow-sm">
              <button
                onClick={() => setMode('iris')}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'iris'
                    ? 'bg-[#1E3926] text-[#FAF8F5] shadow-xs'
                    : 'text-[#58615A] hover:text-[#141715]'
                }`}
              >
                Iris Biotech 2°C – 4°C Protocol
              </button>
              <button
                onClick={() => setMode('standard')}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'standard'
                    ? 'bg-[#991b1b] text-white shadow-xs'
                    : 'text-[#58615A] hover:text-[#141715]'
                }`}
              >
                Standard Ambient Handling
              </button>
            </div>
          </div>
        </InView>

        {/* Telemetry Dashboard Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Spec Grid */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E4DFD5] p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-4">
                <div className="flex items-center gap-2.5">
                  {mode === 'iris' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#1E3926]" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#991b1b]" />
                  )}
                  <span className="font-serif text-lg text-[#141715] font-semibold">
                    {mode === 'iris' ? 'Controlled Multi-Chamber Storage' : 'Uncontrolled Ambient Transit'}
                  </span>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold ${
                  mode === 'iris' ? 'bg-[#1E3926]/10 text-[#1E3926]' : 'bg-red-100 text-red-700'
                }`}>
                  {mode === 'iris' ? 'Optimal Export Grade' : 'Accelerated Respiration'}
                </span>
              </div>

              {/* Metric Comparison Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="flex items-center gap-1.5 text-[#88928A] mb-1">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-wider">Storage Temp</span>
                  </div>
                  <div className={`text-2xl font-serif font-semibold ${mode === 'iris' ? 'text-[#1E3926]' : 'text-red-700'}`}>
                    {mode === 'iris' ? '2°C – 4°C' : '22°C – 28°C'}
                  </div>
                  <div className="text-[10px] text-[#767E79] mt-0.5">
                    {mode === 'iris' ? 'Pre-cooled in < 30m' : 'Field heat retained'}
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="flex items-center gap-1.5 text-[#88928A] mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-wider">Humidity (RH)</span>
                  </div>
                  <div className={`text-2xl font-serif font-semibold ${mode === 'iris' ? 'text-[#1E3926]' : 'text-amber-700'}`}>
                    {mode === 'iris' ? '85% – 90%' : '45% – 60%'}
                  </div>
                  <div className="text-[10px] text-[#767E79] mt-0.5">
                    {mode === 'iris' ? 'Zero moisture loss' : 'Petal dehydration'}
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="flex items-center gap-1.5 text-[#88928A] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-wider">Vase Life</span>
                  </div>
                  <div className={`text-2xl font-serif font-semibold ${mode === 'iris' ? 'text-[#1E3926]' : 'text-red-700'}`}>
                    {mode === 'iris' ? '14 – 18 Days' : '4 – 6 Days'}
                  </div>
                  <div className="text-[10px] text-[#767E79] mt-0.5">
                    {mode === 'iris' ? 'Full bloom aperture' : 'Premature collapse'}
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E4DFD5]">
                  <div className="flex items-center gap-1.5 text-[#88928A] mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-wider">Respiration</span>
                  </div>
                  <div className={`text-2xl font-serif font-semibold ${mode === 'iris' ? 'text-[#1E3926]' : 'text-red-700'}`}>
                    {mode === 'iris' ? 'Basal Rate' : '10× Elevated'}
                  </div>
                  <div className="text-[10px] text-[#767E79] mt-0.5">
                    {mode === 'iris' ? 'Nutrients preserved' : 'Rapid sugar burn'}
                  </div>
                </div>
              </div>

              {/* Explanatory Paragraph */}
              <p className="text-sm text-[#58615A] font-light leading-relaxed">
                {mode === 'iris'
                  ? 'At 2°C–4°C, flower respiration and ethylene production slow dramatically. Combined with post-harvest hydration solutions, stems maintain cellular water tension so that roses and chrysanthemums open gradually and reach peak beauty at the consumer destination.'
                  : 'Without prompt pre-cooling, internal field heat accelerates respiration by up to 1000%, consuming cellular sugars and triggering premature petal senescence, bent necks, and severe vase life degradation.'}
              </p>
            </div>

            {/* Quality Guarantee Footnote */}
            <div className="pt-6 mt-6 border-t border-[#E4DFD5] flex items-center justify-between text-xs text-[#767E79]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1E3926]" />
                Dual Diesel Generator Uninterrupted Backup
              </span>
              <span className="font-mono">Calibrated Daily</span>
            </div>
          </div>

          {/* Right Image Stage */}
          <div className="lg:col-span-5 relative min-h-[320px] bg-[#141715] border border-[#E4DFD5] overflow-hidden group">
            <img
              src="/images/cold-room-facility.jpg"
              alt="Cold room storage at Iris Biotech"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141715]/85 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#FAF8F5]/95 backdrop-blur-sm border border-[#E4DFD5]">
              <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1E3926] mb-1">
                Facility Specifications
              </div>
              <div className="font-serif text-lg text-[#141715] font-semibold mb-2">
                Multi-Stage Cold Room Facility
              </div>
              <ul className="text-xs text-[#58615A] space-y-1">
                <li>• Pre-cooling chamber with forced air distribution</li>
                <li>• Dedicated rose and chrysanthemum temperature zones</li>
                <li>• Continuous data-logged digital temperature telemetry</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
