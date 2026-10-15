import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { REVIEWS } from '../data/company';
import { InView } from '../components/motion/InView';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

type ReviewsPageProps = {
  onNavigate: (path: string) => void;
};

export function ReviewsPage({ onNavigate }: ReviewsPageProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Buyer Reviews' }]} onNavigate={handleNav} />

        {/* Page Hero */}
        <section className="max-w-4xl space-y-6">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] block">
            Commercial Client Feedback
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            Verified Commercial Buyer Reviews — Iris Biotech
          </h1>
          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            Verified feedback from wholesale floral distributors, import brokers, and auction procurement managers who depend on Iris Biotech's cold-chain Dutch roses and chrysanthemums grown in Bengaluru / Denkanikottai.
          </p>
        </section>

        {/* Reviews Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <InView key={rev.id} once={true}>
              <div className="p-8 bg-[#FFFFFF] border border-[#E4DFD5] space-y-6 flex flex-col justify-between h-full shadow-sm hover:border-[#1E3926] transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#C4AA7D]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C4AA7D]" />
                      ))}
                    </div>
                    <span className="px-2.5 py-1 bg-[#F3EFE6] border border-[#E4DFD5] text-[10px] text-[#1E3926] uppercase tracking-wider font-semibold">
                      {rev.market} Buyer
                    </span>
                  </div>

                  <blockquote className="text-sm sm:text-base text-[#141715] font-serif italic leading-relaxed">
                    "{rev.text}"
                  </blockquote>
                </div>

                <div className="border-t border-[#E4DFD5] pt-4 space-y-1">
                  <div className="text-sm font-semibold text-[#141715]">{rev.author}</div>
                  <div className="text-xs text-[#1E3926] font-medium">{rev.company}</div>
                  <div className="text-[11px] text-[#767E79]">{rev.role}</div>
                  <div className="text-[10px] text-[#88928A] pt-1 uppercase tracking-wider font-semibold">
                    Cultivar: {rev.product}
                  </div>
                </div>
              </div>
            </InView>
          ))}
        </section>

        {/* Contact CTA */}
        <section className="p-10 sm:p-14 bg-[#0F1812] text-[#FAF8F5] text-center space-y-6 shadow-sm">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C4AA7D] block">
            Commercial Supply Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF8F5]">Partner With Iris Biotech</h2>
          <p className="text-[#C4AA7D] text-sm max-w-xl mx-auto font-light leading-relaxed">
            Contact our commercial desk today for sample shipments, wholesale pricing schedules, or standing export allocation contracts.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                trackEvent('contact_cta_click', { location: 'reviews_page' });
                handleNav('/contact/');
              }}
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] bg-[#1E3926] hover:bg-[#FAF8F5] text-[#FAF8F5] hover:text-[#141715] transition-all"
            >
              <span>Initiate Commercial Dialogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
