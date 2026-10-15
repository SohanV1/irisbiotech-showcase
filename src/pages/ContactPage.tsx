import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuotationForm } from '../components/QuotationForm';
import { CONTACT_DETAILS } from '../data/company';
import { Phone, Mail, MapPin, Globe, ArrowRight, Clock, User, MessageCircle, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

type ContactPageProps = {
  onNavigate: (path: string) => void;
};

export function ContactPage({ onNavigate }: ContactPageProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141715] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Contact & Quotations' }]} onNavigate={handleNav} />

        {/* Page Hero */}
        <section className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[10px] uppercase tracking-[0.25em] font-semibold text-[#1E3926]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
            Commercial Floriculture Desk · Bengaluru, India
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#141715]">
            Contact Iris Biotech — Wholesale & Export Floriculture Desk
          </h1>
          <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed font-light">
            Whether you represent an international import broker requiring refrigerated air-cargo shipments or a tier-1 domestic wholesaler scheduling daily morning harvest pickups, our commercial sales desk in Bengaluru / Denkanikottai is prepared to assist you.
          </p>
        </section>

        {/* Main Grid: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Reusable Embedded Quotation Form */}
          <div className="lg:col-span-7">
            <QuotationForm
              onNavigate={onNavigate}
              title="Request a Commercial Quotation"
              subtitle="Specify your required flower cultivars, carton allocations, and target air hub. Our commercial desk responds within 24 business hours."
            />
          </div>

          {/* Contact Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFFFF] border border-[#E4DFD5] p-8 sm:p-10 space-y-8 shadow-xs">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A8356] block mb-1">
                  Estate Information
                </span>
                <h2 className="text-2xl font-serif text-[#141715]">Direct Channels</h2>
              </div>

              {/* Direct WhatsApp Quick Card */}
              <div className="p-5 bg-[#F3EFE6] border border-[#25D366]/40 rounded space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E3926] uppercase tracking-wider">
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                  Instant WhatsApp Quotations
                </div>
                <p className="text-xs text-[#58615A] font-light">
                  For immediate export quotation confirmation and cold-room stem allocations:
                </p>
                <a
                  href="https://wa.me/919845300304?text=Hello%20Iris%20Biotech%20Team%2C%20I%20am%20looking%20for%20a%20commercial%20flower%20supply%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'contact_sidebar' })}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp (+91 98453 00304)</span>
                </a>
              </div>

              <ul className="space-y-6 text-sm text-[#58615A]">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F3EFE6] border border-[#E4DFD5] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-[#1E3926]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#88928A] font-semibold">Founder & Director</div>
                    <div className="text-base text-[#141715] font-serif font-semibold">{CONTACT_DETAILS.name}</div>
                    <div className="text-xs text-[#767E79]">{CONTACT_DETAILS.role}</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F3EFE6] border border-[#E4DFD5] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#1E3926]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#88928A] font-semibold">Direct Phone / WhatsApp</div>
                    <a
                      href={`tel:${CONTACT_DETAILS.phoneTel}`}
                      onClick={() => trackEvent('phone_click', { location: 'contact_page' })}
                      className="text-base text-[#141715] font-serif font-medium hover:text-[#1E3926] transition-colors block"
                    >
                      {CONTACT_DETAILS.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F3EFE6] border border-[#E4DFD5] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#1E3926]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#88928A] font-semibold">Official Commercial Desk</div>
                    <a
                      href={`mailto:${CONTACT_DETAILS.email}`}
                      onClick={() => trackEvent('email_click', { location: 'contact_page' })}
                      className="text-base text-[#141715] font-serif hover:text-[#1E3926] transition-colors block"
                    >
                      {CONTACT_DETAILS.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F3EFE6] border border-[#E4DFD5] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#1E3926]" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#88928A] font-semibold">Farm Estate & Packhouse</div>
                    <p className="text-xs text-[#141715] font-medium leading-relaxed">
                      {CONTACT_DETAILS.syNo}, {CONTACT_DETAILS.village}<br />
                      {CONTACT_DETAILS.panchayat}, {CONTACT_DETAILS.taluk}<br />
                      {CONTACT_DETAILS.district}, {CONTACT_DETAILS.state} – {CONTACT_DETAILS.pin} (Near Bengaluru)
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F3EFE6] border border-[#E4DFD5] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#1E3926]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#88928A] font-semibold">Operating Hours</div>
                    <p className="text-xs text-[#58615A] leading-relaxed mt-0.5 font-light">
                      Monday – Saturday: 06:00 – 19:00 IST (Harvest, Pre-Cooling & Airport Cargo Dispatch)
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Estate Location Card */}
            <div className="bg-[#FFFFFF] border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
              <div className="h-44 bg-[#F3EFE6] border border-[#E4DFD5] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1E3926_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <MapPin className="w-6 h-6 text-[#1E3926] mx-auto" />
                  <span className="text-xs font-semibold text-[#141715] block">Iris Biotech 20-Acre Estate</span>
                  <p className="text-[11px] text-[#767E79] font-light">
                    Denkanikottai Tq, Krishnagiri / Bengaluru – 635107
                  </p>
                  <a
                    href="https://maps.google.com/?q=Denkanikottai+Krishnagiri+Tamilnadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('map_click')}
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1E3926] hover:underline pt-1"
                  >
                    Open Location in Maps <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
