export type AnalyticsEvent = 
  | 'page_view'
  | 'contact_cta_click'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'contact_form_success'
  | 'contact_form_error'
  | 'quote_form_submit'
  | 'quote_form_success'
  | 'quote_form_error'
  | 'quote_whatsapp_direct_click'
  | 'catalog_variety_enquiry_scroll'
  | 'flower_page_view'
  | 'variety_view'
  | 'phone_click'
  | 'email_click'
  | 'whatsapp_click'
  | 'map_click'
  | 'review_view'
  | 'faq_open';

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
};

const CONSENT_KEY = 'iris_biotech_cookie_consent_v1';

export function getCookieConsent(): CookiePreferences | null {
  try {
    const data = localStorage.getItem(CONSENT_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCookieConsent(prefs: CookiePreferences) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
    if (prefs.analytics) {
      trackEvent('page_view', { path: window.location.pathname });
    }
  } catch (e) {
    console.error(e);
  }
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: AnalyticsEvent, payload?: Record<string, any>) {
  const consent = getCookieConsent();
  // Always honor user consent for analytics tracking
  if (consent && !consent.analytics) {
    return;
  }

  const timestamp = new Date().toISOString();
  console.log(`[Analytics Event] ${eventName}`, { timestamp, payload });
  
  // Send to Google Analytics 4 (GA4)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload || {});
  }

  // Custom event dispatch for internal state logging if needed
  window.dispatchEvent(new CustomEvent('iris_analytics', { detail: { eventName, payload, timestamp } }));
}
