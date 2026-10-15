# 🌿 Iris Biotech — Commercial Floriculture & Cold Chain Export Platform

[![Production Live](https://img.shields.io/badge/Production-irisbiotech.co.in-22c55e?style=for-the-badge&logo=googlechrome&logoColor=white)](https://irisbiotech.co.in)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%C2%B7%20TypeScript%20%C2%B7%20Vite%20%C2%B7%20Tailwind-38bdf8?style=for-the-badge&logo=react)](https://github.com/SohanV1/irisbiotech-showcase)
[![Architecture](https://img.shields.io/badge/Architecture-28%20Edge%20SSG%20Routes-a855f7?style=for-the-badge)](https://irisbiotech.co.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

Pristine public architecture showcase of **Iris Biotech** — an enterprise-grade commercial floriculture export platform operating across 20 acres of high-tech climate-controlled greenhouse polyhouses in the Bangalore / Denkanikottai horticultural belt.

> 🔒 **Security Notice**: This public repository contains the complete frontend architecture, component hierarchy, Edge SSG pre-render scripts, and styling system. All private production secrets, deployment webhooks, server credentials, and configuration TOML files are segregated and maintained separately in private environments.

---

## ⚡ Key Architectural Highlights

1. **28 Pre-Rendered Edge SSG Routes**:
   - Custom post-Vite build synthesis script (`scripts/post-build.cjs`) generates static HTML directories across all 28 product and catalog paths.
   - Provides sub-second TTFB on Edge CDNs and full semantic HTML fallbacks (`<noscript>`) for Googlebot and search indexers without SSR server overhead.

2. **Enterprise JSON-LD Entity Disambiguation**:
   - Multi-tier structured schema (`Corporation`, `WholesaleStore`, `Florist`, `LocalBusiness`, `hasOfferCatalog`, `FAQPage`) directly in the root DOM.
   - Disambiguates regional Indian floriculture operations from European biotech namesakes across Google search indexing.

3. **Commercial Export Produce Catalog & RFQ Funnel**:
   - High-yield export Dutch Rose varieties (*Taj Mahal, Sweet Avalanche, Pink Tacazzi, Penny Lane, Gold Strike, Jumilia*).
   - Chrysanthemum varieties (*Baltika White, Zambla, Purple Feeling*).
   - Commercial quotation pipeline calculating stem length (60cm–90cm), packing density, and air-freight schedules.

4. **Airport Farm-to-Flight Cold Chain Integration**:
   - Real-time technical documentation of the 2°C–4°C cold chain sequence from harvest to Kempegowda International Airport (BLR) cargo hub.

---

## 🛠️ Tech Stack & Tooling

- **Core Framework**: React 18 & TypeScript (Strict Mode)
- **Bundler & Dev Server**: Vite 5 / 6 with Rollup multi-target code splitting
- **Styling**: Tailwind CSS & Lucide React Iconography
- **Static Generation**: Custom Node.js Edge SSG post-build synthesizer
- **Form & Pipeline Handling**: Semantic form pipelines with multi-market validation

---

## 🚀 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/SohanV1/irisbiotech-showcase.git
cd irisbiotech-showcase

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production bundle & synthesize SSG routes
npm run build
```

---

## 📄 License

This repository is distributed under the [MIT License](./LICENSE). Designed and built by [Sohan](https://github.com/SohanV1).
