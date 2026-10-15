import React, { useState } from 'react';
import { FLOWER_VARIETIES } from '../data/flowers';
import { CONTACT_DETAILS } from '../data/company';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Check,
  Building2,
  Mail,
  Phone,
  Globe2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const QUANTITY_OPTIONS = [
  '1,000 – 2,500 Stems (Trial Order)',
  '5,000 Stems / Week (Standard Export)',
  '10,000+ Stems / Week (High-Volume Contract)',
  'Standing Weekly Standing Allocation',
  'Custom Quantity Specification',
];

export const DESTINATION_OPTIONS = [
  'UAE (Dubai / Abu Dhabi)',
  'UK (London Heathrow)',
  'Netherlands (Amsterdam / FloraHolland)',
  'Italy (Rome / Milan)',
  'France (Paris CDG)',
  'Australia (Sydney / Melbourne)',
  'New Zealand (Auckland)',
  'Singapore (Changi Logistics Hub)',
  'Malaysia (Kuala Lumpur)',
  'Qatar (Doha)',
  'Bahrain (Manama)',
  'Saudi Arabia (Riyadh / Jeddah)',
  'Kuwait (Kuwait City)',
  'Oman (Muscat)',
  'Lebanon (Beirut)',
  'Jordan (Amman)',
  'Egypt (Cairo)',
  'Thailand (Bangkok)',
  'Sri Lanka (Colombo)',
  'Russia (Moscow)',
  'Hong Kong (HKG)',
  'India Domestic (Wholesale Tier-1)',
  'Other International Air Hub',
];

export const STEM_LENGTH_OPTIONS = [
  '50–60 cm',
  '60–70 cm (Export Standard)',
  '70–80 cm (Premium Grade A1)',
  '80–90 cm (Luxury Long Stem)',
  'Mixed Stem Specifications',
];

interface QuotationFormProps {
  preselectedVariety?: string;
  preselectedCountry?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  onSuccess?: () => void;
  onNavigate?: (path: string) => void;
}

export const QuotationForm: React.FC<QuotationFormProps> = ({
  preselectedVariety,
  preselectedCountry,
  title = 'Request a Commercial Quotation',
  subtitle = 'Receive tailored wholesale pricing, carton capacities, and air-freight schedules within 24 hours.',
  className = '',
  onSuccess,
  onNavigate,
}) => {
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>(
    preselectedVariety ? [preselectedVariety] : ['Taj Mahal Red Rose']
  );

  React.useEffect(() => {
    if (preselectedVariety) {
      setSelectedVarieties((prev) =>
        prev.includes(preselectedVariety) ? prev : [...prev, preselectedVariety]
      );
    }
  }, [preselectedVariety]);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    quantity: '5,000 Stems / Week (Standard Export)',
    customQuantity: '',
    deliveryDate: '',
    destinationCountry: 'UAE (Dubai / Abu Dhabi)',
    customDestination: '',
    stemLength: '60–70 cm (Export Standard)',
    notes: '',
  });

  React.useEffect(() => {
    if (preselectedCountry) {
      const clean = preselectedCountry.trim().toLowerCase();
      const matched = DESTINATION_OPTIONS.find((opt) => {
        const lower = opt.toLowerCase();
        if (clean === 'united arab emirates' && lower.startsWith('uae')) return true;
        if (clean === 'uae' && lower.startsWith('uae')) return true;
        if (clean === 'uk' && lower.startsWith('uk')) return true;
        if (clean === 'united kingdom' && lower.startsWith('uk')) return true;
        return lower.includes(clean);
      });

      if (matched) {
        setFormData((prev) => ({ ...prev, destinationCountry: matched }));
      } else {
        setFormData((prev) => ({
          ...prev,
          destinationCountry: 'Other International Air Hub',
          customDestination: preselectedCountry,
        }));
      }
    }
  }, [preselectedCountry]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const toggleVariety = (varietyName: string) => {
    setSelectedVarieties((prev) =>
      prev.includes(varietyName)
        ? prev.filter((v) => v !== varietyName)
        : [...prev, varietyName]
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full contact name is required';
    if (!formData.company.trim()) errs.company = 'Company / trading entity name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid commercial business email is required';
    if (!formData.whatsapp.trim())
      errs.whatsapp = 'WhatsApp / phone contact is required for fast dispatch updates';
    if (selectedVarieties.length === 0)
      errs.varieties = 'Please select at least one flower variety of interest';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `*New Commercial Quotation Request - Iris Biotech*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Buyer Name:* ${formData.name}`,
      `*Company:* ${formData.company}`,
      `*Email:* ${formData.email}`,
      `*WhatsApp:* ${formData.whatsapp}`,
      `*Destination:* ${formData.destinationCountry === 'Other International Air Hub' ? formData.customDestination : formData.destinationCountry}`,
      `*Target Delivery Date:* ${formData.deliveryDate || 'Immediate / Next Available'}`,
      `*Selected Cultivars:* ${selectedVarieties.join(', ')}`,
      `*Stem Length Spec:* ${formData.stemLength}`,
      `*Quantity Allocation:* ${formData.quantity === 'Custom Quantity Specification' ? formData.customQuantity : formData.quantity}`,
    ];

    if (formData.notes.trim()) {
      lines.push(`*Notes/Specs:* ${formData.notes}`);
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`_Submitted via irisbiotech.co.in quotation portal_`);

    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      trackEvent('quote_form_error');
      return;
    }

    setIsSubmitting(true);
    trackEvent('quote_form_submit', {
      company: formData.company,
      destination: formData.destinationCountry,
      varieties: selectedVarieties.join(', '),
    });

    try {
      // 1. Submit form payload (Netlify / Form handler compatible)
      const payload: Record<string, string> = {
        'form-name': 'commercial-quotation',
        name: formData.name,
        company: formData.company,
        email: formData.email,
        whatsapp: formData.whatsapp,
        destinationCountry: formData.destinationCountry,
        preferredDeliveryDate: formData.deliveryDate || 'Immediate / Next Available',
        quantity: formData.quantity,
        stemLength: formData.stemLength,
        selectedCultivars: selectedVarieties.join(', '),
        notes: formData.notes,
      };

      const formBody = Object.keys(payload)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]))
        .join('&');

      const isLocalDev =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname === '');

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody,
        });

        if (!response.ok && !isLocalDev) {
          throw new Error(`Submission server response error: ${response.status}`);
        }
      } catch (fetchErr) {
        if (!isLocalDev) {
          throw fetchErr;
        }
      }

      // Also persist lead in local state
      try {
        const existingLeads = JSON.parse(localStorage.getItem('iris_quote_leads') || '[]');
        existingLeads.push({ ...payload, timestamp: new Date().toISOString() });
        localStorage.setItem('iris_quote_leads', JSON.stringify(existingLeads));
      } catch (e) {
        // ignore localStorage errors
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      trackEvent('quote_form_success');
      if (onSuccess) onSuccess();

      // Redirect to /thank-you/
      if (onNavigate) {
        onNavigate('/thank-you');
      } else {
        window.history.pushState({}, '', '/thank-you');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setIsSubmitting(false);
      setIsSuccess(false);
      setServerError('Unable to submit your quotation request. Please verify your connection or contact our commercial desk directly via WhatsApp (+91 98453 00304).');
      trackEvent('quote_form_error', { reason: 'submission_failed' });
    }
  };

  const openDirectWhatsApp = () => {
    const waUrl = `https://wa.me/919845300304?text=${buildWhatsAppMessage()}`;
    trackEvent('quote_whatsapp_direct_click');
    window.open(waUrl, '_blank');
  };

  return (
    <div className={`bg-[#FFFFFF] border border-[#E4DFD5] p-4 sm:p-10 shadow-sm ${className}`}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#D1CAB9] text-[9px] uppercase tracking-[0.25em] font-semibold text-[#1E3926] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926]" />
          Direct Commercial Quotation Desk
        </div>
        <h2 className="text-xl sm:text-3xl font-serif text-[#141715]">{title}</h2>
        <p className="text-xs sm:text-sm text-[#58615A] font-light mt-1.5 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {isSuccess ? (
        <div className="p-8 bg-[#F3EFE6] border border-[#1E3926] text-center space-y-6">
          <CheckCircle2 className="w-12 h-12 text-[#1E3926] mx-auto" />
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-[#141715]">Quotation Request Received</h3>
            <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed max-w-lg mx-auto">
              Thank you, <strong className="text-[#141715]">{formData.name}</strong> ({formData.company}). Your export specifications have been logged with the Iris Biotech commercial estate desk.
            </p>
          </div>

          {/* Instant WhatsApp Direct Channel */}
          <div className="p-5 bg-white border border-[#25D366]/40 rounded-lg max-w-md mx-auto space-y-3 shadow-xs">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#128C7E] uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 fill-current" /> Instant Mobile Priority Response
            </div>
            <p className="text-[11px] text-[#58615A]">
              Connect directly with Managing Director K. Venkata Rao on WhatsApp with your request already prepared:
            </p>
            <button
              onClick={openDirectWhatsApp}
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-[0.16em] rounded transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Open WhatsApp Chat (+91 98453 00304)
            </button>
          </div>

          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs text-[#767E79] hover:text-[#141715] underline cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form
          name="commercial-quotation"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-7"
          noValidate
        >
          <input type="hidden" name="form-name" value="commercial-quotation" />
          {serverError && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* 1. Multi-Cultivar Selection */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold">
                1. Select Desired Cultivars <span className="text-[#1E3926]">*</span>
              </label>
              <span className="text-[10px] text-[#767E79]">Select multiple varieties</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {FLOWER_VARIETIES.map((v) => {
                const isSelected = selectedVarieties.includes(v.name);
                return (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => toggleVariety(v.name)}
                    className={`px-3.5 py-2 text-xs font-medium border transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E3926] text-[#FAF8F5] border-[#1E3926] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#58615A] border-[#E4DFD5] hover:border-[#1E3926]'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: v.hex }}
                    />
                    <span>{v.name}</span>
                    <span className="text-[10px] opacity-75 font-light">({v.flower === 'rose' ? 'Rose' : 'Chrysanth'})</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#C4AA7D] ml-0.5" />}
                  </button>
                );
              })}
            </div>
            {errors.varieties && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.varieties}
              </p>
            )}
          </div>

          {/* 2. Quantity & Stem Length */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
                2. Target Volume / Frequency
              </label>
              <select
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border border-[#E4DFD5] focus:border-[#1E3926] text-base sm:text-sm text-[#141715] focus:outline-none transition-colors cursor-pointer"
              >
                {QUANTITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
                3. Stem Length Specification
              </label>
              <select
                value={formData.stemLength}
                onChange={(e) => setFormData({ ...formData, stemLength: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border border-[#E4DFD5] focus:border-[#1E3926] text-base sm:text-sm text-[#141715] focus:outline-none transition-colors cursor-pointer"
              >
                {STEM_LENGTH_OPTIONS.map((sl) => (
                  <option key={sl} value={sl}>
                    {sl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Destination Country & Delivery Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
                4. Destination Country / Hub <span className="text-[#1E3926]">*</span>
              </label>
              <select
                value={formData.destinationCountry}
                onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border border-[#E4DFD5] focus:border-[#1E3926] text-base sm:text-sm text-[#141715] focus:outline-none transition-colors cursor-pointer"
              >
                {DESTINATION_OPTIONS.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
                5. Preferred Delivery Date
              </label>
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border border-[#E4DFD5] focus:border-[#1E3926] text-base sm:text-sm text-[#141715] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* 4. Company & Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
                6. Company / Trading Entity <span className="text-[#1E3926]">*</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Royal Flora Wholesalers Ltd"
                className={`w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border ${
                  errors.company ? 'border-red-500' : 'border-[#E4DFD5] focus:border-[#1E3926]'
                } text-base sm:text-sm text-[#141715] placeholder-[#88928A] focus:outline-none transition-colors`}
              />
              {errors.company && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.company}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
                7. Contact Name <span className="text-[#1E3926]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Marcus Vance"
                className={`w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border ${
                  errors.name ? 'border-red-500' : 'border-[#E4DFD5] focus:border-[#1E3926]'
                } text-base sm:text-sm text-[#141715] placeholder-[#88928A] focus:outline-none transition-colors`}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                </p>
              )}
            </div>
          </div>

          {/* 5. Business Email & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
                8. Business Email <span className="text-[#1E3926]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="procurement@company.com"
                className={`w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border ${
                  errors.email ? 'border-red-500' : 'border-[#E4DFD5] focus:border-[#1E3926]'
                } text-base sm:text-sm text-[#141715] placeholder-[#88928A] focus:outline-none transition-colors`}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
                9. WhatsApp / Direct Phone <span className="text-[#1E3926]">*</span>
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+971 50 123 4567 or +91 98453 00304"
                className={`w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border ${
                  errors.whatsapp ? 'border-red-500' : 'border-[#E4DFD5] focus:border-[#1E3926]'
                } text-base sm:text-sm text-[#141715] placeholder-[#88928A] focus:outline-none transition-colors`}
              />
              {errors.whatsapp && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.whatsapp}
                </p>
              )}
            </div>
          </div>

          {/* 6. Special Instructions */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#141715] font-semibold mb-2">
              10. Additional Packaging / Cargo Instructions (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Specify carton markings, cold-chain temperature logger requirements, custom bunched sleeve preferences, or airport customs clearance details..."
              className="w-full px-3.5 sm:px-4 py-3 bg-[#FAF8F5] border border-[#E4DFD5] focus:border-[#1E3926] text-base sm:text-sm text-[#141715] placeholder-[#88928A] focus:outline-none transition-colors"
            />
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 bg-[#1E3926] hover:bg-[#141715] active:scale-[0.99] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Transmitting Quotation...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Request Quote
                </>
              )}
            </button>

            <button
              type="button"
              onClick={openDirectWhatsApp}
              className="w-full py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Instant WhatsApp Quote
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
