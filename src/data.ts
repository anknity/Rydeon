import { PredefinedLandmark, RideOption, Captain } from './types';

export const landmarks: PredefinedLandmark[] = [
  {
    id: 'tech_park',
    name: 'Global Women\'s Tech Park',
    type: 'both',
    address: 'Block C, IT Boulevard, Tech Precinct',
    coordinates: { x: 25, y: 35 },
    popularity: 'Heavy Office Commute'
  },
  {
    id: 'metro_station',
    name: 'Sector 5 Metro Central Gate 3',
    type: 'both',
    address: 'Metro Exchange, Link Road Junction',
    coordinates: { x: 45, y: 55 },
    popularity: 'Transit Hub (Ladies Special Coach zone)'
  },
  {
    id: 'shopping_mall',
    name: 'La Fenice Premium Plaza',
    type: 'both',
    address: 'Avenue of Elites, Galleria Main Wing',
    coordinates: { x: 70, y: 25 },
    popularity: 'Popular Shopping & Lounge'
  },
  {
    id: 'airport',
    name: 'International Airport Gate A (Arrivals)',
    type: 'both',
    address: 'Terminal 2, Airport Expressway Link',
    coordinates: { x: 90, y: 70 },
    popularity: 'Late-Night Arrivals'
  },
  {
    id: 'ladies_hostel_park',
    name: 'St. Mary\'s Women\'s College & Hostel',
    type: 'both',
    address: 'Vidyalaya Marg, Residential Sector 4',
    coordinates: { x: 15, y: 75 },
    popularity: 'University Quarter'
  },
  {
    id: 'arts_theatre',
    name: 'Imperial Arts & Opera Guild',
    type: 'both',
    address: 'Theater Way, Cultural Plaza Sector 12',
    coordinates: { x: 55, y: 85 },
    popularity: 'Evening Drama & Recreations'
  }
];

export const rideOptions: RideOption[] = [
  {
    id: 'bike',
    title: 'RydeOn Bike Captain',
    subtitle: 'Swift, safe, & affordable bike taxi standard',
    description: 'Perfect for quick office & college runs. Led exclusively by verified female or highly vetted pro-safety riders.',
    pricePerKm: 8,
    etaMinutes: 2,
    badge: 'Fastest Matching',
    iconName: 'Bike',
    safetyFeatures: [
      'Two pink Helmets with fresh organic hairnets',
      'Anti-slip comfortable seating with support waist belt',
      'Free disposable rain covers on request',
      'Captain verified through multi-tier background check'
    ]
  },
  {
    id: 'auto',
    title: 'Aura Auto SafeCover',
    subtitle: 'Covered three-wheeler for cozy group/solo',
    description: 'Best of both worlds: open ventilation with physical plexiglass separation barrier and smart GPS tracking.',
    pricePerKm: 12,
    etaMinutes: 4,
    badge: 'Most Popular',
    iconName: 'Sparkles',
    safetyFeatures: [
      'Plexiglass safety partition installed',
      'Double high-durability safe seat belts',
      'Fitted with dual panic buttons linking police',
      'Quiet-Ride mode: silent safe travel space'
    ]
  },
  {
    id: 'cab',
    title: 'SafeGuard Cab Premium',
    subtitle: 'All-weather absolute luxury and comfort',
    description: 'Immersive premium comfort with live audio/CCTV backup stream, private tinted curtains, and elite top-rated captains.',
    pricePerKm: 18,
    etaMinutes: 6,
    badge: 'Maximum Secure',
    iconName: 'Car',
    safetyFeatures: [
      'Live dual-facing safety camera system',
      'Rear luxury block-out blinds for full privacy',
      'Panic buzzer + automated car door-lock override',
      'Includes complementary hygiene/sanitation pouch'
    ]
  }
];

export const mockCaptains: Captain[] = [
  {
    id: 'cap_priya',
    name: 'Priya Sharma',
    rating: 4.9,
    completedRides: 1420,
    phone: '+91 98765 01234',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80',
    vehicleModel: 'Pink Electric Vespa SR-6',
    licensePlate: 'KA-03-SR-2026',
    currentLocation: { x: 22, y: 31 }
  },
  {
    id: 'cap_ananya',
    name: 'Ananya Deshmukh',
    rating: 4.88,
    completedRides: 870,
    phone: '+91 91234 56789',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80',
    vehicleModel: 'Bajaj RE Electric SafeAuto',
    licensePlate: 'KA-51-AU-9904',
    currentLocation: { x: 42, y: 52 }
  },
  {
    id: 'cap_shreya',
    name: 'Shreya Iyer',
    rating: 4.95,
    completedRides: 2840,
    phone: '+91 99001 12233',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80',
    vehicleModel: 'Hyundai Accent SafeGuard EV',
    licensePlate: 'KA-01-CB-4412',
    currentLocation: { x: 67, y: 22 }
  },
  {
    id: 'cap_meera',
    name: 'Meera Nair',
    rating: 4.92,
    completedRides: 610,
    phone: '+91 94451 88990',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80',
    vehicleModel: 'Pink Electric Vespa SR-9',
    licensePlate: 'KA-05-SR-8090',
    currentLocation: { x: 12, y: 72 }
  }
];

export const faqs = [
  {
    question: 'How do you guarantee the safety of female passengers?',
    answer: 'Our service has been custom-tailored with a strict comprehensive security stack specifically for women’s concerns. This includes: employing 100% background-verified female Captains or highly vetted family-rated drivers, mandatory OTP PINs to commence a ride, physical partition panels in autos, and a 24/7 Live Emergency Command Center with integrated SOS buttons.'
  },
  {
    question: 'Can I choose to only ride with female Captains?',
    answer: 'Yes, absolutely. In the ride options, our RydeOn Bike and Aura Auto modes connect you primarily with professional female Captains. You can also toggle the "Prefer Verified Female Partner" feature in the app during matching to enforce gender matching.'
  },
  {
    question: 'What happens if I press the SOS button during a ride?',
    answer: 'Pressing the SOS button instantly: 1) Rings our 24/7 Emergency Command Center, 2) Sends your live coordinate tracking link via SMS to your 5 registered emergency contacts, and 3) Activates an on-screen Safety Agent Audio Call simulator that can call your phone physically to speak with you and de-escalate any situation.'
  },
  {
    question: 'Is RydeOn available during late-night or early morning hours?',
    answer: 'Yes! We operate 24/7. To empower women who work night or morning-shift jobs (such as health professionals, tech employees, or aviation staff), we have waived all night peak surcharges and integrated prioritized safety patrol units along high-frequency office-metro corridors.'
  },
  {
    question: 'Can I join as a RydeOn Captain (Rider or Driver)?',
    answer: 'Absolutely! We are deeply committed to women\'s financial independence. If you have a valid commercial or non-commercial driving license and a registered vehicle, you can register through our quick Captain application portal on this site. We offer industry-best commissions, flexible timings, and dedicated safety patrol modules for captains.'
  }
];

export const blogPosts = [
  {
    id: 'blog1',
    title: 'Navigating Cities Safely: The Ultimate Commute Blueprint for Night-Shift Professionals',
    date: 'May 28, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Detailed tech-level practices and app safeguards every professional woman should activate before starting a night journey.'
  },
  {
    id: 'blog2',
    title: 'Driving Financial Sovereignty: How 15,000+ Female Captains Redefined Ride-Hailing',
    date: 'May 15, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'An inspiring investigation of women earning independent livelihoods with two-wheelers and redefining streets as safe communal networks.'
  },
  {
    id: 'blog3',
    title: 'The Psychology of Shared Safety: How Live GPS & Multi-Contact Sharing Reduces Travel Anxiety',
    date: 'May 02, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Why transparency in vehicle tracking and automated emergency checkpoints are bringing true peace of mind on the road.'
  }
];
