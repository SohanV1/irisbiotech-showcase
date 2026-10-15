export interface JourneyStage {
  id: string;
  stageNumber: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  minProgress: number; // 0.0 - 1.0
  maxProgress: number; // 0.0 - 1.0
  telemetry: {
    temp: string;
    humidity: string;
    locationName: string;
    status: string;
  };
}

export const GLOBAL_JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'global-harvest',
    stageNumber: 1,
    badge: 'STAGE 01 / SIMULTANEOUS HARVEST',
    title: 'ESTATE HARVEST',
    subtitle: 'Simultaneous harvest across 20 acres at Denkanikottai',
    description:
      'Stems across 15 acres of Dutch roses and 5 acres of chrysanthemums are cut at dawn at optimal aperture, ensuring maximum vitality for 21 export destinations.',
    minProgress: 0.0,
    maxProgress: 0.18,
    telemetry: {
      temp: '18°C Ambient',
      humidity: '82% RH',
      locationName: 'Denkanikottai Farm (Origin)',
      status: 'Dawn Cut Completed',
    },
  },
  {
    id: 'global-precool',
    stageNumber: 2,
    badge: 'STAGE 02 / HYDRO-COOLING',
    title: '2°C–4°C COLD-CHAIN LOCK',
    subtitle: 'Rapid temperature pulldown in on-site cold storage',
    description:
      'Field heat is extracted within 30 minutes in our on-site precision cold storage facility. Stems are pulsed in floral conditioning nutrients for unbroken freshness.',
    minProgress: 0.18,
    maxProgress: 0.38,
    telemetry: {
      temp: '3.0°C Controlled',
      humidity: '88% RH',
      locationName: 'Packhouse Cold Storage Room',
      status: 'Field Heat Extracted',
    },
  },
  {
    id: 'global-dispatch',
    stageNumber: 3,
    badge: 'STAGE 03 / BLR LOGISTICS HUB',
    title: 'AIRPORT DISPATCH',
    subtitle: 'Kempegowda Intl Airport (BLR) cold-port cargo center',
    description:
      'Consignments packed in thermal export cartons are loaded into temperature-monitored reefer trucks and transferred to BLR coolport for 21 scheduled international flights.',
    minProgress: 0.38,
    maxProgress: 0.62,
    telemetry: {
      temp: '3.6°C Monitored',
      humidity: '85% RH',
      locationName: 'BLR Coolport Cargo Logistics',
      status: 'Palletized for 21 Flights',
    },
  },
  {
    id: 'global-flight',
    stageNumber: 4,
    badge: 'STAGE 04 / GLOBAL TRANSIT',
    title: '21 SIMULTANEOUS FLIGHTS',
    subtitle: 'Airborne across Middle East, Europe, UK, Asia & Oceania',
    description:
      'Widebody cargo flights cruise high over international airways simultaneously delivering fresh flowers to GCC hubs, European floral auctions, and Asian trading centers.',
    minProgress: 0.62,
    maxProgress: 0.85,
    telemetry: {
      temp: '4.0°C Cargo Hold',
      humidity: '82% RH',
      locationName: 'Global Air Corridors',
      status: '21 Consignments Airborne',
    },
  },
  {
    id: 'global-arrival',
    stageNumber: 5,
    badge: 'STAGE 05 / 21 DESTINATIONS REACHED',
    title: 'WORLDWIDE ARRIVAL',
    subtitle: 'Cleared and delivered to premier floral importers in 21 countries',
    description:
      'All 21 shipments touch down fresh and vibrant across Europe, UK, UAE, Saudi Arabia, Qatar, Singapore, Malaysia, Australia, New Zealand, and beyond.',
    minProgress: 0.85,
    maxProgress: 1.0,
    telemetry: {
      temp: '3.8°C Handover',
      humidity: '85% RH',
      locationName: '21 International Hubs',
      status: 'All Consignments Handed Over',
    },
  },
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'harvest',
    stageNumber: 1,
    badge: 'STAGE 01 / ORIGIN',
    title: 'HARVESTED',
    subtitle: 'Freshly harvested at the Iris Biotech 20-Acre Farm',
    description:
      'Stems are hand-harvested at first morning light at precise bud-break aperture. Living soil microbiology ensures vibrant petal pigmentation and heavy bud weight.',
    minProgress: 0.0,
    maxProgress: 0.18,
    telemetry: {
      temp: '18°C Ambient',
      humidity: '82% RH',
      locationName: 'Denkanikottai Estate, India',
      status: 'Dawn Cut Completed',
    },
  },
  {
    id: 'pre-cool',
    stageNumber: 2,
    badge: 'STAGE 02 / THERMAL CARE',
    title: 'PRE-COOLED',
    subtitle: 'Post-harvest 2°C – 4°C cold-chain preparation',
    description:
      'Within 30 minutes of cutting, stems enter our on-site precision cold storage. Field heat is rapidly removed in conditioning solutions to double vase longevity.',
    minProgress: 0.18,
    maxProgress: 0.38,
    telemetry: {
      temp: '3.2°C Controlled',
      humidity: '88% RH',
      locationName: 'Packhouse Cold Room, Iris Biotech',
      status: 'Field Heat Extracted',
    },
  },
  {
    id: 'packed',
    stageNumber: 3,
    badge: 'STAGE 03 / EXPORT SPEC',
    title: 'PACKED',
    subtitle: 'A1 Export grading & thermal insulation',
    description:
      'Stems are sorted by stem length (60–80cm) and head size. Packed in reinforced telescopic cartons lined with thermal insulation blankets and hydration gel pouches.',
    minProgress: 0.38,
    maxProgress: 0.58,
    telemetry: {
      temp: '3.8°C Monitored',
      humidity: '85% RH',
      locationName: 'Export Packhouse Facility',
      status: 'Sealed & Certified A1',
    },
  },
  {
    id: 'blr-airport',
    stageNumber: 4,
    badge: 'STAGE 04 / AIR TRANSIT',
    title: 'BLR AIRPORT',
    subtitle: 'Bengaluru International Airport refrigerated cargo hub',
    description:
      'Dedicated reefer trucks deliver cartons to Kempegowda International Airport (BLR) cool-port logistics center for prioritized widebody direct flight palletizing.',
    minProgress: 0.58,
    maxProgress: 0.85,
    telemetry: {
      temp: '4.0°C Cargo Hold',
      humidity: '80% RH',
      locationName: 'BLR International Air Cargo',
      status: 'Airborne over Arabian Sea',
    },
  },
  {
    id: 'destination',
    stageNumber: 5,
    badge: 'STAGE 05 / ARRIVAL',
    title: 'DESTINATION',
    subtitle: 'Destination airport arrival & wholesale distribution',
    description:
      'Flowers touch down fresh and crisp, ready for same-day distribution to luxury hotel chains, wedding designers, and premier florist auctions.',
    minProgress: 0.85,
    maxProgress: 1.0,
    telemetry: {
      temp: '4.1°C Receipt',
      humidity: '85% RH',
      locationName: 'International Air Cargo Hub',
      status: 'Cleared & Handed Over',
    },
  },
];

export function getCurrentStage(progress: number, isSimultaneous: boolean = true): JourneyStage {
  const clamped = Math.max(0, Math.min(1, progress));
  const stages = isSimultaneous ? GLOBAL_JOURNEY_STAGES : JOURNEY_STAGES;
  const found = stages.find(
    (s) => clamped >= s.minProgress && clamped <= s.maxProgress
  );
  return found || stages[stages.length - 1];
}

