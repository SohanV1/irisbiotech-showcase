import React, { useState } from 'react';
import { Key, ExternalLink, ShieldCheck, X, Check } from 'lucide-react';

interface GoogleApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string) => void;
  currentKey: string;
}

export const GoogleApiKeyModal: React.FC<GoogleApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSaveKey,
  currentKey,
}) => {
  const [inputKey, setInputKey] = useState(currentKey);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = inputKey.trim();
    onSaveKey(cleanKey);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#08100C]/95 border border-[#2DD4BF]/40 rounded-2xl p-6 sm:p-8 text-[#FAF8F5] shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#88988D] hover:text-[#FAF8F5] p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF]">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold tracking-wide">Google Earth 3D Connection</h2>
            <p className="text-xs text-[#2DD4BF] font-medium">Photorealistic 3D Maps API</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#143021]/50 border border-[#2DD4BF]/20 rounded-xl p-4 text-xs space-y-2 text-[#CBD5E1]">
          <div className="flex items-center gap-2 font-semibold text-[#F59E0B]">
            <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
            <span>Google Cloud Requirements:</span>
          </div>
          <p className="leading-relaxed">
            To stream photorealistic 3D Earth terrain & buildings with Google's native <code>&lt;gmp-map-3d&gt;</code> engine, enable these APIs in your Google Cloud Console:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-[#FAF8F5] pl-1 font-mono">
            <li>Maps JavaScript API</li>
            <li>Map Tiles API (Photorealistic 3D Tiles)</li>
          </ul>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#88988D] mb-2">
              Google Maps API Key
            </label>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm font-mono text-[#FAF8F5] placeholder-[#88988D] focus:outline-none focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]"
            />
            <p className="text-[10px] text-[#88988D] mt-1.5">
              Your key is saved locally in your browser's secure storage.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://console.cloud.google.com/google/maps-apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#2DD4BF] hover:underline flex items-center gap-1.5"
            >
              Get API Key <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-2">
              {currentKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-2 text-xs text-[#CBD5E1] hover:text-red-400 transition-colors cursor-pointer"
                >
                  Clear Key
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2DD4BF] text-[#08100C] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#14B8A6] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#2DD4BF]/20"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" /> Connected!
                  </>
                ) : (
                  'Connect Google Earth'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
