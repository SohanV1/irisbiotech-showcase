import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Check } from 'lucide-react';
import { getCookieConsent, setCookieConsent, CookiePreferences } from '../lib/analytics';

type CookieConsentProps = {
  isOpenModalOverride?: boolean;
  onCloseModalOverride?: () => void;
};

export function CookieConsent({ isOpenModalOverride, onCloseModalOverride }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    preferences: true,
    marketing: false,
  });

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      setShowBanner(true);
    } else {
      setPreferences(existing);
    }
  }, []);

  useEffect(() => {
    if (isOpenModalOverride) {
      setShowModal(true);
    }
  }, [isOpenModalOverride]);

  const handleAcceptAll = () => {
    const allOn: CookiePreferences = { necessary: true, analytics: true, preferences: true, marketing: true };
    setPreferences(allOn);
    setCookieConsent(allOn);
    setShowBanner(false);
    setShowModal(false);
    if (onCloseModalOverride) onCloseModalOverride();
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = { necessary: true, analytics: false, preferences: false, marketing: false };
    setPreferences(onlyNecessary);
    setCookieConsent(onlyNecessary);
    setShowBanner(false);
    setShowModal(false);
    if (onCloseModalOverride) onCloseModalOverride();
  };

  const handleSavePreferences = () => {
    setCookieConsent(preferences);
    setShowBanner(false);
    setShowModal(false);
    if (onCloseModalOverride) onCloseModalOverride();
  };

  return (
    <>
      {/* Bottom Sticky Cookie Banner */}
      {showBanner && !showModal && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-50 bg-[#FAF8F5] border border-[#E4DFD5] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start gap-3.5 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#1E3926] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#141715] font-serif">Cookie & Privacy Choices</h3>
              <p className="text-xs text-[#58615A] leading-relaxed mt-1">
                We use cookies to understand how visitors explore our floriculture catalog and to improve the browsing experience.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 pt-2 border-t border-[#E4DFD5]">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] bg-[#1E3926] hover:bg-[#141715] text-[#FAF8F5] transition-colors text-center"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 py-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] bg-[#EAE5D9] hover:bg-[#D9D2C1] text-[#141715] transition-colors text-center"
            >
              Reject
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="py-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#58615A] hover:text-[#141715] underline"
            >
              Preferences
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#E4DFD5] max-w-lg w-full p-7 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#1E3926]" />
                <h3 className="text-xl font-serif text-[#141715]">Manage Cookie Preferences</h3>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  if (onCloseModalOverride) onCloseModalOverride();
                }}
                className="text-[#88928A] hover:text-[#141715]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#58615A]">
              <div className="flex items-start justify-between p-4 bg-[#F3EFE6] border border-[#E4DFD5]">
                <div>
                  <h4 className="font-semibold text-[#141715]">Necessary Cookies</h4>
                  <p className="text-[#88928A] mt-0.5">Required for site functionality, page routing, and security.</p>
                </div>
                <span className="px-2.5 py-1 bg-[#1E3926] text-[#FAF8F5] text-[9px] font-semibold uppercase tracking-wider">
                  Always Active
                </span>
              </div>

              <div className="flex items-start justify-between p-4 bg-[#F3EFE6] border border-[#E4DFD5]">
                <div>
                  <h4 className="font-semibold text-[#141715]">Analytics Cookies</h4>
                  <p className="text-[#88928A] mt-0.5">Helps us measure traffic and visitor engagement on flower varieties.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 rounded accent-[#1E3926] cursor-pointer mt-1"
                />
              </div>

              <div className="flex items-start justify-between p-4 bg-[#F3EFE6] border border-[#E4DFD5]">
                <div>
                  <h4 className="font-semibold text-[#141715]">Preferences Cookies</h4>
                  <p className="text-[#88928A] mt-0.5">Remembers display settings and accessibility preferences.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.preferences}
                  onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                  className="w-4 h-4 rounded accent-[#1E3926] cursor-pointer mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 py-3 text-xs font-semibold uppercase tracking-[0.18em] bg-[#1E3926] hover:bg-[#141715] text-[#FAF8F5] transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
