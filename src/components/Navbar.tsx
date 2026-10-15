import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { CONTACT_DETAILS } from '../data/company';
import { trackEvent } from '../lib/analytics';

type NavbarProps = {
  currentPath: string;
  onNavigate: (path: string) => void;
};

interface DropdownItem {
  label: string;
  sublabel?: string;
  path: string;
}

interface NavMenuItem {
  label: string;
  path: string;
  dropdown?: DropdownItem[];
}

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navMenuItems: NavMenuItem[] = [
    { label: 'Home', path: '/home/' },
    {
      label: 'Flowers',
      path: '/flowers/',
      dropdown: [
        { label: 'Dutch Roses (15 Acres)', sublabel: 'Taj Mahal, Sweet Avalanche, Tacazzi, Jumilia', path: '/flowers/dutch-roses/' },
        { label: 'Chrysanthemums (5 Acres)', sublabel: 'Spray, Disbud & Button Cultivars', path: '/flowers/chrysanthemums/' },
        { label: 'All Flower Cultivars', sublabel: 'Complete Commercial Export Catalog', path: '/flowers/' },
      ],
    },
    {
      label: 'Our Farm',
      path: '/about/',
      dropdown: [
        { label: 'About Iris Biotech', sublabel: '20-Acre Estate & Leadership', path: '/about/' },
        { label: 'Growing Philosophy', sublabel: 'Living Soil & Sustainable Agronomy', path: '/approach/' },
        { label: 'Facilities & Cold Storage', sublabel: '2°C–4°C Thermal Chain & Packhouse', path: '/facilities/' },
      ],
    },
    {
      label: 'Export',
      path: '/export/',
      dropdown: [
        { label: 'Export Overview', sublabel: '21 Verified Global Destinations', path: '/export/' },
        { label: 'Export Processes', sublabel: 'Harvest to Airport 6-Step Workflow', path: '/export/#process' },
        { label: 'Markets & Shipping', sublabel: 'Middle East, Europe, UK, Asia Hubs', path: '/export/#markets' },
        { label: 'Packaging & Logistics', sublabel: 'Telescopic Boxes & Specifications', path: '/export/#logistics' },
        { label: 'Request Export Quotation', sublabel: 'Direct Wholesale Standing Allocations', path: '/export/#quote-section' },
      ],
    },
    { label: 'Contact', path: '/contact/' },
  ];

  const handleLinkClick = (path: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    onNavigate(path);
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const hash = path.split('#')[1];
      setTimeout(() => {
        const elem = document.getElementById(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#E4DFD5] py-3.5 shadow-xs'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleLinkClick('/home/')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <img
              src="/images/iris-flower-mark.png"
              alt="Iris Biotech Emblem"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#141715] group-hover:text-[#1E3926] transition-colors font-bold">
                  Iris Biotech
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3926] opacity-80" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#88928A] font-semibold -mt-0.5">
                Export Roses from India
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navMenuItems.map((item) => {
              const isActive =
                currentPath === item.path ||
                (item.path !== '/' && currentPath.startsWith(item.path.replace(/\/$/, '')));

              const hasDropdown = item.dropdown && item.dropdown.length > 0;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                >
                  <button
                    onClick={() => handleLinkClick(item.path)}
                    className={`text-[11px] tracking-[0.16em] uppercase font-semibold transition-all py-2 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-[#1E3926]'
                        : 'text-[#58615A] hover:text-[#141715]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180 text-[#1E3926]' : 'text-[#88928A]'
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasDropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-[#FFFFFF] border border-[#E4DFD5] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-1">
                        {item.dropdown!.map((sub) => (
                          <button
                            key={sub.path}
                            onClick={() => handleLinkClick(sub.path)}
                            className="w-full text-left p-3 hover:bg-[#F3EFE6] transition-colors flex flex-col cursor-pointer group"
                          >
                            <span className="text-xs font-semibold text-[#141715] group-hover:text-[#1E3926] transition-colors">
                              {sub.label}
                            </span>
                            {sub.sublabel && (
                              <span className="text-[10px] text-[#88928A] font-light mt-0.5">
                                {sub.sublabel}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Direct Quotation CTA Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                trackEvent('quote_cta_navbar');
                handleLinkClick('/export/#quote-section');
              }}
              className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-6 py-2.5 bg-[#1E3926] text-[#FAF8F5] hover:bg-[#141715] transition-all duration-300 shadow-xs cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="lg:hidden p-2 text-[#141715] hover:text-[#1E3926] focus:outline-none cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300 overflow-y-auto">
          <div className="flex justify-between items-center pb-5 sm:pb-6 border-b border-[#E4DFD5]">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/iris-flower-mark.png"
                alt="Iris Biotech Emblem"
                className="w-7 h-7 object-contain"
              />
              <div>
                <span className="font-serif text-2xl font-bold text-[#141715]">Iris Biotech</span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#88928A]">
                  Export Roses from India
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 border border-[#E4DFD5] text-[#141715] hover:bg-[#F3EFE6] active:scale-95 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-3 py-6">
            {navMenuItems.map((item) => {
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              const isExpanded = mobileExpanded === item.label;

              return (
                <div key={item.label} className="border-b border-[#E4DFD5]/50 pb-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => (hasDropdown ? toggleMobileSubmenu(item.label) : handleLinkClick(item.path))}
                      className="text-left font-serif text-2xl text-[#141715] hover:text-[#1E3926] transition-colors py-1 cursor-pointer"
                    >
                      {item.label}
                    </button>
                    {hasDropdown && (
                      <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="p-2 text-[#88928A] cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#1E3926]' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasDropdown && isExpanded && (
                    <div className="pl-4 pt-2 pb-2 space-y-2 bg-[#F3EFE6]/50 rounded mt-1">
                      {item.dropdown!.map((sub) => (
                        <button
                          key={sub.path}
                          onClick={() => handleLinkClick(sub.path)}
                          className="w-full text-left py-1.5 text-xs text-[#58615A] hover:text-[#1E3926] font-medium flex items-center justify-between cursor-pointer"
                        >
                          <span>{sub.label}</span>
                          <span className="text-[10px] text-[#88928A]">→</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="border-t border-[#E4DFD5] pt-6 space-y-4">
            <button
              onClick={() => handleLinkClick('/export/#quote-section')}
              className="w-full py-4 bg-[#1E3926] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.2em] text-center shadow-sm cursor-pointer"
            >
              Request a Quote →
            </button>
            <div className="flex justify-between text-xs text-[#88928A] font-light pt-2">
              <a href={`tel:${CONTACT_DETAILS.phoneTel}`} className="hover:text-[#141715] font-medium text-[#141715]">
                {CONTACT_DETAILS.phone}
              </a>
              <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-[#141715]">
                {CONTACT_DETAILS.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
