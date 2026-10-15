export type Review = {
  id: string;
  author: string;
  company: string;
  role: string;
  text: string;
  rating: number;
  product: string;
  market: 'Export' | 'Domestic';
  date: string;
};

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Klaus Vermeer',
    company: 'Vermeer Floral Imports BV',
    role: 'Managing Director & Global Buyer',
    text: 'Iris Biotech’s Dutch roses consistently deliver export-grade stem strength and vase longevity that rival top European farms. Their packhouse cold-chain discipline is flawless.',
    rating: 5,
    product: 'Dutch Roses (Taj Mahal Red & Sweet Avalanche)',
    market: 'Export',
    date: 'February 2026',
  },
  {
    id: 'rev-2',
    author: 'Rajesh Malhotra',
    company: 'Malhotra Luxury Botanicals',
    role: 'Lead Wholesale Distributor',
    text: 'We have sourced chrysanthemums and roses from Iris Biotech for three years. Their commitment to soil health and organic nutrition is obvious in the vibrant petal color and head size.',
    rating: 5,
    product: 'Chrysanthemums & Dutch Roses',
    market: 'Domestic',
    date: 'January 2026',
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    company: 'Eastern Rose Traders Group',
    role: 'Senior Procurement Manager',
    text: 'The cold-room logistics and grading precision at Iris Biotech guarantee zero heat damage on transit. A reliable primary supplier for international markets.',
    rating: 5,
    product: 'Dutch Roses',
    market: 'Export',
    date: 'December 2025',
  },
];

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: 'Farming' | 'Products' | 'Logistics' | 'General';
};

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What flowers does Iris Biotech grow?',
    answer: 'Iris Biotech specializes in export quality Dutch Roses (cultivated across 15 acres of climate-controlled greenhouse structures) and Chrysanthemums (cultivated across 5 acres). We produce multiple color varieties tailored for export and premium domestic markets.',
    category: 'Products',
  },
  {
    id: 'faq-2',
    question: 'How large is the Iris Biotech farm?',
    answer: 'Our state-of-the-art facility spans approximately 20 acres in total, comprising 15 acres of high-tech Dutch rose greenhouses and 5 acres of specialized chrysanthemum beds in Denkanikottai Tq, Krishnagiri District.',
    category: 'Farming',
  },
  {
    id: 'faq-3',
    question: 'Does Iris Biotech serve export and domestic markets?',
    answer: 'Yes. We supply premium wholesalers, distributors, and floral auction houses across international export destinations (Europe, Middle East, Asia) as well as tier-1 domestic markets.',
    category: 'General',
  },
  {
    id: 'faq-4',
    question: 'What is Iris Biotech’s approach to natural farming and soil health?',
    answer: 'Our core philosophy is that "the quality of a flower begins long before it blooms." We prioritize soil microbial health, balanced organic fertilization, bio-rational pest management, and targeted plant nutrition with utmost care and deep respect for nature.',
    category: 'Farming',
  },
  {
    id: 'faq-5',
    question: 'How does Iris Biotech handle flowers after harvesting?',
    answer: 'Immediately post-harvest, stems are placed in hydrating conditioned solutions, transported to our packhouse for meticulous sorting and laser grading, and pre-cooled in our on-site 2°C–4°C cold storage facilities.',
    category: 'Logistics',
  },
];

export type FacilityItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
};

export const FACILITIES: FacilityItem[] = [
  {
    id: 'coldroom',
    title: 'Precision Cold-Room Storage',
    tagline: '2°C – 4°C Controlled Thermal Chain.',
    description: 'Post-harvest shelf life depends on rapid cooling. Stems enter our multi-chamber cold storage within minutes of harvest, maintaining precise ambient humidity and stable temperatures between 2°C and 4°C with dual generator backup.',
    specs: [
      { label: 'Target Temperature', value: '2°C – 4°C Controlled' },
      { label: 'Relative Humidity', value: '85% – 90% Monitored' },
      { label: 'Backup Power', value: 'Dual Diesel Generator Backup' },
    ],
    image: '/images/cold-storage-facility-4.jpg',
  },
  {
    id: 'packhouse',
    title: 'Modern Packhouse Facility',
    tagline: 'Care does not stop at harvest.',
    description: 'Our modern, hygienic packhouse is equipped with calibrated grading tables, automated stem trimmers, and post-harvest hydration stations. Skilled floriculture specialists sort stems by length, bud size, and petal perfection.',
    specs: [
      { label: 'Processing Capacity', value: '50,000+ Stems / Day' },
      { label: 'Grading Protocol', value: 'Export Standard A1 Criteria' },
      { label: 'Hydration Protocol', value: 'Conditioned Post-Harvest Solution' },
    ],
    image: '/images/cold-storage-flowers-3.jpg',
  },
  {
    id: 'greenhouse',
    title: '20-Acre Greenhouse Infrastructure',
    tagline: 'Precision climate & soil ecosystem.',
    description: 'High-roof polyhouses with automated thermal screens, drip fertigation systems, and computer-controlled ventilation ensure ideal growing micro-climates for Dutch roses and chrysanthemums year-round.',
    specs: [
      { label: 'Dutch Rose Polyhouse', value: '15 Acres' },
      { label: 'Chrysanthemum Area', value: '5 Acres' },
      { label: 'Fertigation System', value: 'Automated Drip Dosing' },
    ],
    image: '/images/dutch-rose-cultivation.jpg',
  },
];

export const CONTACT_DETAILS = {
  name: 'K. Venkata Rao',
  role: 'Founder & Managing Director',
  phone: '+91 98453 00304',
  phoneTel: '+919845300304',
  email: 'info@irisbiotech.co.in',
  syNo: 'Sy no. 718/2',
  village: 'Alahally Village',
  panchayat: 'Erudukottai Panchayat',
  taluk: 'Denkanikottai Tq',
  district: 'Krishnagiri District',
  state: 'Tamil Nadu',
  pin: '635107',
  fullAddress: 'Sy no. 718/2, Alahally Village, Erudukottai Panchayat, Denkanikottai Tq, Krishnagiri District, Tamil Nadu – 635107',
};

export const MANAGEMENT = {
  mdName: 'K. Venkata Rao',
  mdTitle: 'Founder & Managing Director',
  coDirectorName: 'Chandana Kopuru',
  coDirectorTitle: 'Co-Director & Whole-Time Director',
  phone: '+91 98453 00304',
  phoneTel: '+919845300304',
  email: 'info@irisbiotech.co.in',
  location: 'Denkanikottai Tq, Krishnagiri District, Tamil Nadu – 635107',
  mdImage: '/images/owner-venkat-rao.jpg',
  mdBio: 'Under the leadership of K. Venkata Rao, Iris Biotech has established itself as a premier 20-acre producer and supplier of export quality Dutch roses and chrysanthemums, grown with utmost care and deep respect for nature.',
  mdQuote: 'The true beauty of a flower is a reflection of the care, soil nutrition, and human dedication that nurtured it. We built Iris Biotech to set a standard for quality, integrity, and sustainable floriculture.',
  teamPhoto: '/images/iris-biotech-team.jpg',
};
