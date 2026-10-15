const fs = require('fs');
const path = require('path');

const srcHtmlPath = path.resolve('node_modules/@designcodeio/threeui/lib-dist/assets/landing-pages/inner-green-3d.html');
let html = fs.readFileSync(srcHtmlPath, 'utf8');

// 1. Meta & Title (No 'Sylva')
html = html.replace('<title>Sylva — Into the living world</title>', '<title>Iris Biotech — 3D Living Floriculture Experience</title>');
html = html.replace('Restoring wild places through patient design, native planting, and a deeper kind of stewardship.', 'Cultivating premier export quality Dutch roses and chrysanthemums across 20 acres in Bengaluru / Denkanikottai with living soil stewardship and unbroken 2°C–4°C cold chain.');
html = html.replace(/aria-label="Sylva — home"/g, 'aria-label="Iris Biotech — Home"');
html = html.replace(/aria-label="Read about Sylva"/g, 'aria-label="Learn about Iris Biotech"');

// 2. Custom CSS to fix sizing, overlapping, phone responsiveness, and clickability
const customCSS = `
  /* Tailored Iris Biotech Shared Styles */
  html, body {
    overflow-x: hidden !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    height: auto !important;
    min-height: 100% !important;
  }
  .ghost {
    position: absolute; z-index: 1;
    left: calc(46 * var(--u)) !important;
    bottom: calc(20 * var(--u)) !important;
    font-size: calc(100 * var(--u)) !important;
    letter-spacing: calc(10 * var(--u)) !important;
    opacity: 0.035 !important;
    pointer-events: none !important;
    user-select: none !important;
    white-space: nowrap !important;
  }
  .card {
    cursor: pointer !important;
    pointer-events: auto !important;
    z-index: 5 !important;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .card:hover {
    transform: translateY(calc(-4 * var(--u))) scale(1.01) !important;
    box-shadow: 0 calc(35 * var(--u)) calc(80 * var(--u)) rgba(0,0,0,0.55) !important;
  }
  .card * {
    cursor: pointer !important;
    pointer-events: auto !important;
  }
  .card .pixel-reveal {
    pointer-events: none !important;
  }
  .knob, .knob button, .knob-float {
    cursor: pointer !important;
    pointer-events: auto !important;
    z-index: 6 !important;
  }
  .stat {
    cursor: pointer !important;
    pointer-events: auto !important;
    transition: transform 0.3s ease !important;
  }
  .stat:hover {
    transform: translateY(calc(-2 * var(--u))) !important;
  }

  /* Desktop layout (>= 901px) */
  @media (min-width: 901px) {
    .headline {
      position: absolute; z-index: 5;
      left: calc(46 * var(--u)) !important;
      top: calc(185 * var(--u)) !important;
      max-width: calc(460 * var(--u)) !important;
      font-size: calc(38 * var(--u)) !important;
      line-height: calc(43 * var(--u)) !important;
      font-weight: 300 !important;
      letter-spacing: calc(-0.4 * var(--u)) !important;
      color: var(--ink) !important;
      text-shadow: 0 calc(2 * var(--u)) calc(12 * var(--u)) rgba(0,0,0,0.4) !important;
    }
    .lede {
      position: absolute; z-index: 5;
      left: calc(46 * var(--u)) !important;
      top: calc(295 * var(--u)) !important;
      width: calc(440 * var(--u)) !important;
      max-width: calc(440 * var(--u)) !important;
      font-size: calc(14.5 * var(--u)) !important;
      line-height: calc(23 * var(--u)) !important;
      font-weight: 300 !important;
      color: rgba(255,255,255,0.82) !important;
      text-shadow: 0 calc(2 * var(--u)) calc(10 * var(--u)) rgba(0,0,0,0.5) !important;
    }
    .play-wrap {
      position: absolute; z-index: 5;
      left: calc(46 * var(--u)) !important;
      top: calc(415 * var(--u)) !important;
      width: calc(150 * var(--u)) !important;
      height: calc(150 * var(--u)) !important;
      cursor: pointer !important;
      pointer-events: auto !important;
    }
    .play-wrap * {
      cursor: pointer !important;
      pointer-events: auto !important;
    }
    .pill-clip {
      position: absolute; z-index: 5;
      left: calc(320 * var(--u)) !important;
      top: calc(490 * var(--u)) !important;
      width: calc(380 * var(--u)) !important;
      height: calc(250 * var(--u)) !important;
      margin: calc(-125 * var(--u)) 0 0 calc(-190 * var(--u)) !important;
      clip-path: inset(calc(72 * var(--u)) calc(50 * var(--u)) calc(26 * var(--u)) calc(50 * var(--u)) round calc(62 * var(--u))) !important;
      cursor: pointer !important;
      pointer-events: auto !important;
    }
    .pill-clip * {
      cursor: pointer !important;
      pointer-events: auto !important;
    }
  }

  /* Mobile & Tablet layout (<= 900px) */
  @media (max-width: 900px) {
    :root { --u: calc(100vw / 760); }
    .hero {
      height: auto !important;
      min-height: 100vh !important;
      overflow: visible !important;
    }
    .stage {
      position: relative !important;
      left: auto !important; top: auto !important; margin: 0 !important;
      width: 100% !important;
      height: calc(1660 * var(--u)) !important;
    }
    .dock-wrap {
      top: calc(18 * var(--u)) !important;
    }
    .headline {
      position: absolute !important;
      left: calc(34 * var(--u)) !important;
      top: calc(115 * var(--u)) !important;
      width: calc(692 * var(--u)) !important;
      max-width: calc(692 * var(--u)) !important;
      font-size: calc(44 * var(--u)) !important;
      line-height: calc(50 * var(--u)) !important;
      font-weight: 300 !important;
      letter-spacing: calc(-0.4 * var(--u)) !important;
      color: var(--ink) !important;
    }
    .lede {
      position: absolute !important;
      left: calc(34 * var(--u)) !important;
      top: calc(230 * var(--u)) !important;
      width: calc(692 * var(--u)) !important;
      max-width: calc(692 * var(--u)) !important;
      font-size: calc(21 * var(--u)) !important;
      line-height: calc(30 * var(--u)) !important;
      font-weight: 300 !important;
      color: rgba(255,255,255,0.85) !important;
    }
    .pill-clip {
      position: absolute !important;
      left: calc(34 * var(--u)) !important;
      top: calc(385 * var(--u)) !important;
      width: calc(460 * var(--u)) !important;
      height: calc(300 * var(--u)) !important;
      margin: calc(-145 * var(--u)) 0 0 calc(-70 * var(--u)) !important;
      clip-path: inset(calc(85 * var(--u)) calc(65 * var(--u)) calc(5 * var(--u)) calc(65 * var(--u)) round calc(70 * var(--u))) !important;
      cursor: pointer !important;
      pointer-events: auto !important;
      z-index: 5 !important;
    }
    .play-wrap {
      position: absolute !important;
      left: calc(530 * var(--u)) !important;
      top: calc(320 * var(--u)) !important;
      width: calc(140 * var(--u)) !important;
      height: calc(140 * var(--u)) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      pointer-events: auto !important;
      z-index: 5 !important;
    }
    .stat--a {
      left: calc(34 * var(--u)) !important;
      top: calc(490 * var(--u)) !important;
    }
    .stat--b {
      left: calc(390 * var(--u)) !important;
      top: calc(490 * var(--u)) !important;
    }
    .card--about {
      left: calc(34 * var(--u)) !important;
      top: calc(990 * var(--u)) !important;
      width: calc(692 * var(--u)) !important;
      height: calc(255 * var(--u)) !important;
    }
    .card--about .label { top: calc(96 * var(--u)) !important; }
    .card--about h2 { top: calc(124 * var(--u)) !important; width: calc(400 * var(--u)) !important; font-size: calc(30 * var(--u)) !important; line-height: calc(34 * var(--u)) !important; }
    .card--stove {
      left: calc(34 * var(--u)) !important;
      top: calc(1280 * var(--u)) !important;
      width: calc(692 * var(--u)) !important;
      height: calc(268 * var(--u)) !important;
    }
    .card--stove h2 { font-size: calc(30 * var(--u)) !important; }
    .knob-float {
      left: calc(644 * var(--u)) !important;
      top: calc(1170 * var(--u)) !important;
    }
    .scroll {
      left: calc(702 * var(--u)) !important;
      top: calc(440 * var(--u)) !important;
    }
  }

  /* Extra Small Phone optimization (<= 480px) */
  @media (max-width: 480px) {
    .headline {
      font-size: calc(42 * var(--u)) !important;
      line-height: calc(48 * var(--u)) !important;
    }
    .lede {
      font-size: calc(22 * var(--u)) !important;
      line-height: calc(31 * var(--u)) !important;
    }
  }
`;

html = html.replace('</style>', customCSS + '\n</style>');

// 3. Navigation Dock
const dockStart = html.indexOf('<div class="dock-wrap">');
const dockEnd = html.indexOf('</div>\n\n  <div class="stage"') + 6;
const oldDock = html.substring(dockStart, dockEnd);

const newDock = `<div class="dock-wrap">
    <nav class="dock par-dock" style="--pd:5" data-spec aria-label="Primary">
      <a class="dock-item dock-mark" data-dock data-spec data-burst href="/home/" style="--d:120ms" aria-label="Iris Biotech — Home" onclick="if(window.top){window.top.location.href='/home/';}else{window.location.href='/home/';} return false;">
        <svg viewBox="0 0 22 24" aria-hidden="true">
          <path d="M11 1.3c-2.1 0-3.95 1.2-4.75 2.95C3.95 4.55 2.3 6.25 2.3 8.35c0 2.3 1.9 4.2 4.3 4.2h8.8c2.4 0 4.3-1.9 4.3-4.2 0-2.1-1.65-3.8-4-4.1C14.95 2.5 13.1 1.3 11 1.3Z"/>
          <path d="M9.6 12.55h2.8v4.2c1.35.3 2.45 1.15 3.15 2.4-1.35.4-2.4.15-3.15-.4v4.15H9.6v-4.15c-.75.55-1.8.8-3.15.4.7-1.25 1.8-2.1 3.15-2.4v-4.2Z"/>
        </svg>
      </a>
      <a class="dock-item" data-dock data-spec data-burst href="/flowers/" style="--d:180ms" onclick="if(window.top){window.top.location.href='/flowers/';}else{window.location.href='/flowers/';} return false;">
        <span class="glyph" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M8 14V9"/><path d="M8 9c0-2.4 1.7-4.3 4-4.3.2 2.6-1.6 4.6-4 4.3Z"/><path d="M8 10.5C7.9 8.4 6.4 6.8 4.4 6.8 4.3 8.9 5.9 10.6 8 10.5Z"/></svg>
        </span>
        <span>Products</span>
      </a>
      <a class="dock-item" data-dock data-spec data-burst href="/facilities/" style="--d:230ms" onclick="if(window.top){window.top.location.href='/facilities/';}else{window.location.href='/facilities/';} return false;">
        <span class="glyph" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M1.6 12.4c2.4-3.4 4.3-5.1 5.7-5.1 2 0 3 3.6 5 3.6 1.1 0 1.9-.5 2.4-1.4"/><path d="M4.3 6.2C5.5 4.4 6.6 3.5 7.6 3.5c1.5 0 2.2 2.4 3.7 2.4"/></svg>
        </span>
        <span>20-Acre Farm</span>
      </a>
      <a class="dock-item" data-dock data-spec data-burst href="/approach/" style="--d:280ms" onclick="if(window.top){window.top.location.href='/approach/';}else{window.location.href='/approach/';} return false;">
        <span class="glyph" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M4 2.4h5.3L12 5.1v8.5H4z"/><path d="M9.2 2.4V5h2.7"/><path d="M6 8.4h4M6 10.8h2.8"/></svg>
        </span>
        <span>How We Grow</span>
      </a>
      <a class="dock-item dock-item--enter" data-dock data-spec data-burst href="/home/" style="--d:330ms" onclick="if(window.top){window.top.location.href='/home/';}else{window.location.href='/home/';} return false;">
        <span class="glyph" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M6.6 2.5h5.1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6.6"/><path d="M2.6 8h6.6"/><path d="m7 5.6 2.4 2.4L7 10.4"/></svg>
        </span>
        <span>Discover Website</span>
      </a>
    </nav>
  </div>`;

html = html.replace(oldDock, newDock);

// 4. Ghost Watermark
html = html.replace('<div class="ghost fade" style="--d:1150ms" aria-hidden="true">SYLVA</div>', '<div class="ghost fade" style="--d:1150ms" aria-hidden="true">IRIS BIOTECH</div>');

// 5. Card 1 (Founder & Managing Director K. Venkata Rao -> /about/)
const card1Start = html.indexOf('<article class="card card--about mask"');
const card1End = html.indexOf('</button>\n    </span>') + 21;
const oldCard1 = html.substring(card1Start, card1End);

const newCard1 = `<article class="card card--about mask" style="--d:760ms; --pd:10; --pr:2.2; cursor:pointer;" onclick="if(window.top){window.top.location.href='/about/';}else{window.location.href='/about/';}">
      <figure class="portal" data-delay="920" style="cursor:pointer;" onclick="if(window.top){window.top.location.href='/about/';}else{window.location.href='/about/';}">
        <span class="portal-media" style="cursor:pointer;"><img src="inner-green-assets/card-owner.jpg" alt="K. Venkata Rao - Founder & Managing Director" loading="eager" decoding="async"></span>
        <canvas class="pixel-reveal" aria-hidden="true" style="pointer-events:none;"></canvas>
      </figure>
      <p class="label" style="cursor:pointer;" onclick="if(window.top){window.top.location.href='/about/';}else{window.location.href='/about/';}">Founder & MD</p>
      <h2 style="cursor:pointer;" onclick="if(window.top){window.top.location.href='/about/';}else{window.location.href='/about/';}">K. Venkata Rao</h2>
    </article>

    <span class="knob-float" style="--pd:10; --pr:2.2">
      <button class="knob knob--about mask-circle" style="--d:1100ms; cursor:pointer;" aria-label="Learn about Founder K. Venkata Rao" onclick="if(window.top){window.top.location.href='/about/';}else{window.location.href='/about/';}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 21v-7"/><path d="M12 14c0-3.3 2.4-6 5.5-6 .3 3.6-2.2 6.4-5.5 6Z"/>
          <path d="M12 16c-.1-2.9-2.2-5.2-4.9-5.2C6.8 13.7 9 16 12 16Z"/>
        </svg>
      </button>
    </span>`;
html = html.replace(oldCard1, newCard1);

// 6. Headline & Lede
const headlineStart = html.indexOf('<h1 class="headline"');
const headlineEnd = html.indexOf('</p>\n\n    <div class="pill-clip">') + 4;
const oldHeadline = html.substring(headlineStart, headlineEnd);

const newHeadline = `<h1 class="headline" style="--pd:18; --pr:1.2">
      <span><i style="--d:260ms">Grown with care.</i></span>
      <span><i style="--d:360ms">Cultivated with purpose.</i></span>
    </h1>

    <p class="lede mask" style="--d:480ms; --pd:14; --pr:1">Iris Biotech cultivates premier export quality Dutch roses and chrysanthemums across 20 acres in Bengaluru with living soil stewardship and unbroken 2°C–4°C cold chain.</p>`;
html = html.replace(oldHeadline, newHeadline);

// 7. Explore Pill Button
html = html.replace('<span class="lbl">Explore the work</span>', '<span class="lbl">Explore Products</span>');
html = html.replace('<button class="liquid-button liquid-button--explore btn" type="button">', '<button class="liquid-button liquid-button--explore btn" type="button" onclick="if(window.top){window.top.location.href=\'/flowers/\';}else{window.location.href=\'/flowers/\';}">');

// 8. Tour / Play Button (Navigates to Main Website /home/)
html = html.replace('<span class="play-wrap" style="--pd:20">', '<span class="play-wrap" style="--pd:20; cursor:pointer;" onclick="if(window.top){window.top.location.href=\'/home/\';}else{window.location.href=\'/home/\';}">');
html = html.replace('aria-label="Play the film"', 'aria-label="Explore Iris Biotech Website" onclick="if(window.top){window.top.location.href=\'/home/\';}else{window.location.href=\'/home/\';}"');

// 9. Stats A & B
const statAStart = html.indexOf('<dl class="stat stat--a mask"');
const statAEnd = html.indexOf('</dl>\n\n    <dl class="stat stat--b mask"') + 5;
const oldStatA = html.substring(statAStart, statAEnd);

const newStatA = `<dl class="stat stat--a mask" style="--d:700ms; --pd:12; cursor:pointer;" onclick="if(window.top){window.top.location.href='/facilities/';}else{window.location.href='/facilities/';}">
      <span class="mark" aria-hidden="true">
        <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
          <circle cx="15" cy="15" r="10.5" stroke-dasharray="0.6 3.6"/>
          <circle cx="15" cy="15" r="5.6" stroke-dasharray="0.6 3.2"/>
          <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/>
        </svg>
      </span>
      <div><dt>Estate Cultivation</dt><dd>20 Acres</dd></div>
    </dl>`;
html = html.replace(oldStatA, newStatA);

const statBStart = html.indexOf('<dl class="stat stat--b mask"');
const statBEnd = html.indexOf('</dl>\n\n    <article class="card card--stove mask"') + 5;
const oldStatB = html.substring(statBStart, statBEnd);

const newStatB = `<dl class="stat stat--b mask" style="--d:770ms; --pd:13; cursor:pointer;" onclick="if(window.top){window.top.location.href='/flowers/';}else{window.location.href='/flowers/';}">
      <span class="mark" aria-hidden="true">
        <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
          <g id="rays">
            <path d="M15 3.5v5"/><path d="M15 21.5v5"/><path d="M3.5 15h5"/><path d="M21.5 15h5"/>
            <path d="M6.9 6.9l3.5 3.5"/><path d="M19.6 19.6l3.5 3.5"/><path d="M23.1 6.9l-3.5 3.5"/><path d="M10.4 19.6l-3.5 3.5"/>
          </g>
          <circle cx="15" cy="15" r="3.6"/>
        </svg>
      </span>
      <div><dt>Export Cultivars</dt><dd>15+ Varieties</dd></div>
    </dl>`;
html = html.replace(oldStatB, newStatB);

// 10. Card 2 (Farm Location & Google Maps Link)
const card2Start = html.indexOf('<article class="card card--stove mask"');
const card2End = html.indexOf('</article>\n\n    <a class="scroll mask"') + 10;
const oldCard2 = html.substring(card2Start, card2End);

const newCard2 = `<article class="card card--stove mask" style="--d:880ms; --pd:22; --pr:2.4; cursor:pointer;" onclick="window.open('https://maps.google.com/?q=12.5247,77.7944+(Iris+Biotech+Floriculture+Farm)', '_blank')">
      <p class="label" style="cursor:pointer;">Farm Location (Google Maps)</p>
      <h2 style="cursor:pointer;">Denkanikottai / BLR</h2>
      <figure class="portal" data-delay="1080" style="cursor:pointer;" onclick="window.open('https://maps.google.com/?q=12.5247,77.7944+(Iris+Biotech+Floriculture+Farm)', '_blank')">
        <span class="portal-media" style="cursor:pointer;"><img src="inner-green-assets/card-farm.jpg" alt="Iris Biotech 20-Acre Farm Denkanikottai" loading="eager" decoding="async"></span>
        <canvas class="pixel-reveal" aria-hidden="true" style="pointer-events:none;"></canvas>
      </figure>
      <button class="knob" aria-label="Open Google Maps Location" style="cursor:pointer;" onclick="window.open('https://maps.google.com/?q=12.5247,77.7944+(Iris+Biotech+Floriculture+Farm)', '_blank')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      </button>
    </article>`;
html = html.replace(oldCard2, newCard2);

// 11. Discover Link
html = html.replace('<a class="scroll mask" style="--d:1040ms; --pd:9" href="#">Discover<span class="track"></span></a>', '<a class="scroll mask" style="--d:1040ms; --pd:9" href="/home/" onclick="if(window.top){window.top.location.href=\'/home/\';}else{window.location.href=\'/home/\';} return false;">Discover<span class="track"></span></a>');

function copyDir(s, d) {
  fs.mkdirSync(d, { recursive: true });
  for (const entry of fs.readdirSync(s, { withFileTypes: true })) {
    const sp = path.join(s, entry.name);
    const dp = path.join(d, entry.name);
    if (entry.isDirectory()) copyDir(sp, dp);
    else fs.copyFileSync(sp, dp);
  }
}

const lpSrc = path.resolve('node_modules/@designcodeio/threeui/lib-dist/assets/landing-pages');
copyDir(lpSrc, path.resolve('public/landing-pages'));

const assetSrc = path.resolve('node_modules/@designcodeio/threeui/lib-dist/assets/landing-pages/inner-green-assets');
copyDir(assetSrc, path.resolve('public/landing-pages/inner-green-assets'));

// Copy custom owner and farm images
fs.copyFileSync(path.resolve('public/images/owner-venkat-rao.jpg'), path.resolve('public/landing-pages/inner-green-assets/card-owner.jpg'));
fs.copyFileSync(path.resolve('public/images/dutch-rose-cultivation.jpg'), path.resolve('public/landing-pages/inner-green-assets/card-farm.jpg'));

fs.writeFileSync('public/landing-pages/inner-green-3d.html', html);

['public/landing', 'public/scene'].forEach(folder => {
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), html);
  copyDir(path.resolve('public/landing-pages/inner-green-assets'), path.join(folder, 'inner-green-assets'));
});

// Remove any legacy sylva folder if it exists
if (fs.existsSync('public/sylva')) {
  fs.rmSync('public/sylva', { recursive: true, force: true });
}

console.log('Successfully tailored all Iris Biotech 3D Landing Page assets!');