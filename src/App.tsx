import React, { useState, useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FlowersPage } from './pages/FlowersPage';
import { DutchRosesPage } from './pages/DutchRosesPage';
import { ChrysanthemumsPage } from './pages/ChrysanthemumsPage';
import { ApproachPage } from './pages/ApproachPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ColdStoragePage } from './pages/ColdStoragePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ExportPage } from './pages/ExportPage';
import { Scene } from './components/LandingScene';

// Lazy load 3D Map Animation prototype for high-performance isolated loading
const MapAnimationPage = lazy(() =>
  import('./pages/MapAnimationPage').then((module) => ({
    default: module.MapAnimationPage,
  }))
);

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  // Global Lenis Smooth Momentum Scrolling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Helper to normalize paths cleanly (e.g. "/", "/about/", "/about", "/export/#process" -> "/export")
  const normalizePath = (p: string) => {
    if (!p) return '/';
    const clean = p.split('#')[0].split('?')[0];
    if (!clean || clean === '/' || clean === '') return '/';
    const trimmed = clean.replace(/^\/+|\/+$/g, '');
    return `/${trimmed}`;
  };

  // Auto-scroll on hash anchors (e.g. /export/#process, /export/#markets, /export/#logistics)
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
          setTimeout(() => {
            elem.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [currentPath]);

  // Comprehensive Dynamic SEO & OpenGraph Meta Synchronization
  useEffect(() => {
    const normalized = normalizePath(currentPath);

    let title = 'Iris Biotech | Export Quality Dutch Roses & Chrysanthemums | 20 Acres Bengaluru';
    let metaDesc = 'Iris Biotech cultivates 15 acres of export quality Dutch roses and 5 acres of chrysanthemums in Bengaluru / Denkanikottai with utmost care, living soil microbiology, and on-site 2°C–4°C cold storage.';
    let canonicalUrl = 'https://irisbiotech.co.in/';

    if (normalized === '/' || normalized === '/home' || normalized === '/overview') {
      title = 'Iris Biotech | Export Quality Dutch Roses & Chrysanthemums from India | Bengaluru';
      metaDesc = 'Iris Biotech Private Limited is India’s premier commercial floriculture grower and flower exporter, cultivating 20+ acres of export quality Dutch roses and chrysanthemums in Bengaluru / Denkanikottai with unbroken 2°C–4°C cold chain logistics.';
      canonicalUrl = 'https://irisbiotech.co.in/';
    } else if (normalized === '/landing' || normalized === '/scene') {
      title = 'Iris Biotech | 3D Living Floriculture Experience';
      metaDesc = 'Experience Iris Biotech: 20 acres of high-precision greenhouse Dutch roses and chrysanthemums with living soil stewardship and unbroken 2°C–4°C cold chain.';
      canonicalUrl = 'https://irisbiotech.co.in/landing/';
    } else if (normalized === '/about' || normalized === '/farm') {
      title = 'About Iris Biotech | 20-Acre Floriculture Estate & Leadership | Bengaluru';
      metaDesc = 'Learn about Iris Biotech Private Limited, our 20-acre floriculture estate, natural soil cultivation philosophy, and founder K. Venkata Rao in Denkanikottai / Bengaluru.';
      canonicalUrl = 'https://irisbiotech.co.in/about/';
    } else if (normalized === '/flowers') {
      title = 'Floriculture Catalog | Export Dutch Roses & Chrysanthemums | Iris Biotech';
      metaDesc = 'Browse Iris Biotech’s commercial wholesale catalog of export quality Dutch roses and spray/disbud chrysanthemums with full technical grading specifications.';
      canonicalUrl = 'https://irisbiotech.co.in/flowers/';
    } else if (normalized === '/flowers/dutch-roses') {
      title = 'Export Quality Dutch Roses (15 Acres) | Taj Mahal Red & Sweet Avalanche | Iris Biotech';
      metaDesc = 'Explore 15 acres of greenhouse Dutch rose cultivars including Taj Mahal Red, Sweet Avalanche, Tacazzi, Penny Lane, Voodoo, Jumilia, and Malibu with 60–90cm stem caliber and 14–18 days vase life.';
      canonicalUrl = 'https://irisbiotech.co.in/flowers/dutch-roses/';
    } else if (normalized === '/flowers/chrysanthemums') {
      title = 'Export Chrysanthemums (5 Acres) | Spray & Disbud Cultivars | Iris Biotech';
      metaDesc = 'Explore 5 acres of spray, disbud, and button chrysanthemums with photoperiod control, high bloom counts, and 18–21 days vase longevity from Iris Biotech.';
      canonicalUrl = 'https://irisbiotech.co.in/flowers/chrysanthemums/';
    } else if (normalized === '/approach') {
      title = 'Agronomic Approach | Living Soil & Natural Cultivation | Iris Biotech';
      metaDesc = 'Discover Iris Biotech’s agronomic focus on rhizosphere soil microbiology, organic bio-nutrients, and IPM stewardship for stronger vascular stems and extended shelf life.';
      canonicalUrl = 'https://irisbiotech.co.in/approach/';
    } else if (normalized === '/facilities') {
      title = 'Packhouse & Cold Storage Facilities | Iris Biotech Bengaluru';
      metaDesc = 'Explore our modern packhouse, calibrated laser grading lines, post-harvest stem hydration protocols, and integrated 2°C–4°C cold-room infrastructure.';
      canonicalUrl = 'https://irisbiotech.co.in/facilities/';
    } else if (normalized === '/cold-storage') {
      title = 'Precision Cold Storage (2°C – 4°C) | Post-Harvest Thermal Chain | Iris Biotech';
      metaDesc = 'Tour our precision multi-chamber 2°C–4°C cold storage facilities in Denkanikottai / Bengaluru with dual diesel generator backup and direct airport refrigerated logistics.';
      canonicalUrl = 'https://irisbiotech.co.in/cold-storage/';
    } else if (normalized === '/reviews') {
      title = 'Verified Buyer Reviews | Global Export & Domestic Wholesalers | Iris Biotech';
      metaDesc = 'Read verified reviews from international export brokers, wholesale distributors, and floral auction houses who rely on Iris Biotech cold-chain flowers.';
      canonicalUrl = 'https://irisbiotech.co.in/reviews/';
    } else if (
      normalized === '/export' ||
      normalized === '/export-logistics' ||
      normalized.startsWith('/export/')
    ) {
      title = 'International Flower Export & Logistics (21 Countries) | Iris Biotech India';
      metaDesc = 'Direct air-cargo export of Dutch roses and chrysanthemums to 21+ countries across the Middle East, Europe, UK, and Asia Pacific with unbroken 2°C–4°C cold chain logistics.';
      canonicalUrl = 'https://irisbiotech.co.in/export/';
    } else if (
      normalized === '/contact' ||
      normalized === '/contact-us' ||
      normalized === '/quote' ||
      normalized === '/request-quote' ||
      normalized === '/quotation'
    ) {
      title = 'Contact & Request Wholesale Quotation | Iris Biotech Floriculture';
      metaDesc = 'Request commercial quotations for standing wholesale flower allocations, export air-cargo freight, and farm inspections from Iris Biotech.';
      canonicalUrl = 'https://irisbiotech.co.in/contact/';
    } else if (normalized === '/map-animation' || normalized === '/journey') {
      title = 'Global Export Flight Routes (3D Globe) | Iris Biotech';
      metaDesc = 'Interactive 3D flight visualization of Iris Biotech flower export trajectories from Bengaluru / Denkanikottai to 21 global destinations.';
      canonicalUrl = 'https://irisbiotech.co.in/map-animation/';
    } else if (normalized === '/thank-you') {
      title = 'Thank You | Commercial Inquiry Received | Iris Biotech';
      metaDesc = 'Thank you for submitting your commercial flower supply inquiry to Iris Biotech Private Limited.';
      canonicalUrl = 'https://irisbiotech.co.in/thank-you/';
    } else {
      title = '404 Page Not Found | Iris Biotech';
      metaDesc = 'The requested page could not be located on Iris Biotech.';
      canonicalUrl = `https://irisbiotech.co.in${currentPath}`;
    }

    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', nameOrProperty);
        } else {
          element.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 3. Helper to set canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 4. Update Meta Descriptions & Social Graphs
    setMeta('description', metaDesc);
    setMeta('og:title', title, true);
    setMeta('og:description', metaDesc, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', metaDesc);
  }, [currentPath]);

  // Handle client-side redirect for /sylva
  useEffect(() => {
    const normalized = normalizePath(currentPath);
    if (normalized === '/sylva') {
      window.history.replaceState({}, '', '/landing');
      setCurrentPath('/landing');
    }
  }, [currentPath]);

  const renderPage = () => {
    const normalized = normalizePath(currentPath);

    switch (normalized) {
      case '/':
      case '/home':
      case '/overview':
        return <HomePage onNavigate={navigate} />;
      case '/landing':
      case '/scene':
        return <Scene onNavigate={navigate} />;
      case '/map-animation':
      case '/journey':
        return (
          <Suspense
            fallback={
              <div className="w-full h-screen bg-[#060C08] flex flex-col items-center justify-center text-[#FAF8F5]">
                <div className="font-serif text-2xl tracking-[0.25em] uppercase mb-2">Iris Biotech</div>
                <div className="text-xs text-[#2DD4BF] tracking-widest italic">Preparing 3D Journey...</div>
              </div>
            }
          >
            <MapAnimationPage onNavigate={navigate} />
          </Suspense>
        );
      case '/about':
      case '/farm':
        return <AboutPage onNavigate={navigate} />;
      case '/export':
      case '/export-logistics':
      case '/export/process':
      case '/export/processes':
      case '/export/markets':
      case '/export/logistics':
      case '/export/quote':
        return <ExportPage onNavigate={navigate} />;
      case '/quote':
      case '/request-quote':
      case '/quotation':
        return <ContactPage onNavigate={navigate} />;
      case '/flowers':
        return <FlowersPage onNavigate={navigate} />;
      case '/flowers/dutch-roses':
        return <DutchRosesPage onNavigate={navigate} />;
      case '/flowers/chrysanthemums':
        return <ChrysanthemumsPage onNavigate={navigate} />;
      case '/approach':
        return <ApproachPage onNavigate={navigate} />;
      case '/facilities':
        return <FacilitiesPage onNavigate={navigate} />;
      case '/cold-storage':
        return <ColdStoragePage onNavigate={navigate} />;
      case '/reviews':
        return <ReviewsPage onNavigate={navigate} />;
      case '/contact':
      case '/contact-us':
      case '/inquiry':
      case '/enquiry':
        return <ContactPage onNavigate={navigate} />;
      case '/thank-you':
        return <ThankYouPage onNavigate={navigate} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  const normalized = normalizePath(currentPath);
  const isLanding = normalized === '/landing' || normalized === '/scene';
  const isMapAnimation = normalized === '/map-animation' || normalized === '/journey';
  const isHome = normalized === '/' || normalized === '/home' || normalized === '/overview';

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-[#141715]">
        {!isLanding && <Navbar currentPath={currentPath} onNavigate={navigate} />}
        
        <main className={`flex-grow ${isHome || isLanding ? 'pt-0' : 'pt-20'}`}>
          {renderPage()}
        </main>

        {!isLanding && (
          <Footer
            onNavigate={navigate}
            onOpenCookieModal={() => setIsCookieModalOpen(true)}
          />
        )}

        <CookieConsent
          isOpenModalOverride={isCookieModalOpen}
          onCloseModalOverride={() => setIsCookieModalOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
