export const TRAVEL_PACKAGES = [
  {
    id: 'pkg-paris',
    destination: 'Paris',
    country: 'France',
    tagline: 'The City of Lights, Love & Haute Couture',
    category: 'Romantic',
    basePrice: 75000,
    durationDays: 5,
    durationNights: 4,
    rating: 4.9,
    reviewCount: 142,
    featured: true,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    description: 'Experience romantic strolls along the Seine, private Eiffel Tower access at sunset, the world-renowned Louvre museum, and authentic French culinary tastings.',
    highlights: [
      'Skip-the-line Eiffel Tower 2nd Floor Access',
      'Evening River Seine Cruise with Champagne',
      'Louvre Guided Tour with Art Historian',
      'Versailles Palace & Gardens Day Trip'
    ],
    inclusions: ['4-Star Boutique Hotel', 'Daily Breakfast', 'Airport Luxury Transfer', 'Multilingual Guide']
  },
  {
    id: 'pkg-dubai',
    destination: 'Dubai',
    country: 'United Arab Emirates',
    tagline: 'Futuristic Skyscrapers & Golden Desert Dunes',
    category: 'Luxury',
    basePrice: 55000,
    durationDays: 4,
    durationNights: 3,
    rating: 4.8,
    reviewCount: 198,
    featured: true,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
    description: 'Immerse yourself in opulence. From ascending the towering Burj Khalifa to exhilarating 4x4 desert safaris and luxury yacht dinners in Dubai Marina.',
    highlights: [
      'Burj Khalifa 124th & 125th Floor Observation Deck',
      'VIP Red Dunes Desert Safari with BBQ Dinner & Tanoura Show',
      'Dubai Marina Luxury Yacht Cruise',
      'Dubai Mall & Spectacular Fountain Show'
    ],
    inclusions: ['5-Star Luxury Resort', 'Desert Camp Experience', 'Private Chauffeur', 'Buffet Breakfast']
  },
  {
    id: 'pkg-bali',
    destination: 'Bali',
    country: 'Indonesia',
    tagline: 'Tropical Temples, Emerald Terraces & Serene Beaches',
    category: 'Adventure',
    basePrice: 65000,
    durationDays: 6,
    durationNights: 5,
    rating: 4.9,
    reviewCount: 220,
    featured: true,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    description: 'Recharge your mind and spirit amidst Ubud lush rainforests, mystical sea cliff temples, Mount Batur sunrise treks, and the white sandy beaches of Seminyak.',
    highlights: [
      'Mount Batur Jeep Sunrise & Natural Hot Springs',
      'Ubud Monkey Forest & Tegalalang Rice Terraces',
      'Uluwatu Sunset Temple with Kecak Fire Dance',
      'Nusa Penida Island Speedboat Day Excursion'
    ],
    inclusions: ['Private Pool Villa', 'Daily Organic Breakfast', 'Speedboat Transfers', 'Balinese Spa Treatment']
  },
  {
    id: 'pkg-switzerland',
    destination: 'Switzerland',
    country: 'Switzerland',
    tagline: 'Alpine Peaks, Turquoise Lakes & World-Class Trains',
    category: 'Luxury',
    basePrice: 120000,
    durationDays: 7,
    durationNights: 6,
    rating: 5.0,
    reviewCount: 86,
    featured: true,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    description: 'A fairytale journey through the Swiss Alps, riding scenic panoramic trains, exploring quaint alpine villages, and sailing pristine Lake Lucerne.',
    highlights: [
      'Jungfraujoch – Top of Europe High Alpine Railway',
      'First Class Swiss Travel Pass (Unlimited Trains & Boats)',
      'Lake Geneva & Chateau de Chillon Tour',
      'Zermatt & Matterhorn Glacier Paradise Cable Car'
    ],
    inclusions: ['Alpine View Hotels', 'Swiss All-in-One Pass', 'Breakfast & Fondue Dinner', 'Mountain Excursions']
  },
  {
    id: 'pkg-singapore',
    destination: 'Singapore',
    country: 'Singapore',
    tagline: 'The Garden City of Innovation & Wonder',
    category: 'Family',
    basePrice: 70000,
    durationDays: 5,
    durationNights: 4,
    rating: 4.7,
    reviewCount: 165,
    featured: true,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80',
    description: 'An astonishing blend of nature and futuristic marvels. Marvel at Gardens by the Bay, ride thrilling attractions at Universal Studios, and dine at Michelin hawker stalls.',
    highlights: [
      'Gardens by the Bay Supertrees & Flower Dome',
      'Universal Studios Singapore Full-Day VIP Pass',
      'Sentosa Island Cable Car & S.E.A. Aquarium',
      'Marina Bay Sands Skypark Observation Deck'
    ],
    inclusions: ['City Center Hotel', 'Theme Park Passes', 'Daily Breakfast', 'Airport Return Transfers']
  },
  {
    id: 'pkg-maldives',
    destination: 'Maldives',
    country: 'Maldives',
    tagline: 'Overwater Bungalows & Crystal Lagoon Haven',
    category: 'Romantic',
    basePrice: 110000,
    durationDays: 5,
    durationNights: 4,
    rating: 4.95,
    reviewCount: 114,
    featured: false,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    description: 'Wake up above turquoise waters. Snorkel with manta rays and vibrant reef sharks, indulge in beachfront candlelit dinners, and unwind in secluded luxury.',
    highlights: [
      'Luxury Overwater Villa with Direct Ocean Access',
      'Guided Snorkeling Safari & Coral Garden Reef Excursion',
      'Sunset Dolphin Watching Cruise with Champagne',
      'Complimentary Stand-Up Paddleboarding & Kayaking'
    ],
    inclusions: ['Overwater Bungalow', 'All-Inclusive Dine & Drinks', 'Speedboat Transfer', 'Couple Spa Session']
  },
  {
    id: 'pkg-tokyo',
    destination: 'Tokyo & Kyoto',
    country: 'Japan',
    tagline: 'Neon Metropolis Meets Ancient Zen Traditions',
    category: 'Adventure',
    basePrice: 135000,
    durationDays: 7,
    durationNights: 6,
    rating: 4.88,
    reviewCount: 94,
    featured: false,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
    description: 'Ride the Shinkansen bullet train from futuristic Shibuya and Akihabara to the golden temples, bamboo groves, and geisha districts of ancient Kyoto.',
    highlights: [
      'teamLab Planets Immersive Digital Art Museum',
      'Shinkansen Bullet Train Experience Tokyo-Kyoto',
      'Fushimi Inari Shrine 10,000 Torii Gates Walk',
      'Traditional Tea Ceremony & Kimono Experience'
    ],
    inclusions: ['Modern City & Traditional Ryokan Stay', '7-Day JR Pass', 'Pocket Wi-Fi', 'English-Speaking Guide']
  },
  {
    id: 'pkg-kashmir',
    destination: 'Kashmir Paradise',
    country: 'India',
    tagline: 'Heaven on Earth – Snow Valleys & Dal Lake Houseboats',
    category: 'Family',
    basePrice: 42000,
    durationDays: 5,
    durationNights: 4,
    rating: 4.82,
    reviewCount: 156,
    featured: false,
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80',
    description: 'Discover the paradise of Kashmir. Glide on serene shikaras in Dal Lake, ride the Gulmarg Gondola over snowy pines, and wander through lush Pahalgam pine valleys.',
    highlights: [
      'Gulmarg Gondola Ride Phase 1 & 2',
      'Traditional Shikara Boat Ride on Dal Lake at Sunset',
      'Heritage Srinagar Mughal Gardens (Shalimar & Nishat)',
      'Betaab Valley & Aru Valley Excursion in Pahalgam'
    ],
    inclusions: ['Luxury Houseboat & Resort Stays', 'All Meals (Breakfast & Dinner)', 'Private Heated Cab', 'Shikara Ride']
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Ayesha Rahman',
    destination: 'Paris',
    rating: 5,
    date: 'March 2026',
    comment: 'RIDHA Travel Agency arranged our honeymoon to Paris flawlessly. The boutique hotel near the Seine was charming and the Eiffel Tower sunset pass saved us hours of queuing!',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Vikram & Priya Malhotra',
    destination: 'Switzerland',
    rating: 5,
    date: 'February 2026',
    comment: 'The Swiss Travel Pass and the Jungfraujoch trip were completely stress-free. Every transfer was on time and the itinerary had the perfect balance of relaxation and adventure.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Farhan Siddiqui',
    destination: 'Dubai',
    rating: 4,
    date: 'January 2026',
    comment: 'Red dunes desert safari was thrilling! The children had a blast sandboarding and the luxury hotel was top notch. Highly recommended for families.',
    verified: true
  }
];

export const HOTEL_TIERS = [
  { id: 'standard', name: 'Standard (3-Star)', priceModifier: 0, desc: 'Comfortable, verified central 3-star hotels with breakfast' },
  { id: 'deluxe', name: 'Deluxe Upgrade (4-Star)', priceModifier: 12000, desc: 'Premium 4-star hotels with city views, pool & spa access' },
  { id: 'luxury', name: 'Ultra Luxury (5-Star)', priceModifier: 28000, desc: 'World-class 5-star brand hotels, club lounge & butler service' }
];

export const ADDONS = [
  { id: 'insurance', name: 'Comprehensive Travel & Medical Insurance', price: 2500, desc: 'Covers flight delays, medical emergencies up to $100k, and luggage protection' },
  { id: 'airportTransfer', name: 'Private VIP Airport Chauffeur (Both Ways)', price: 3500, desc: 'Meet-and-greet at arrivals with luxury air-conditioned sedan' },
  { id: 'guidedPass', name: 'Fast-Track City Landmark & Museum Pass', price: 4500, desc: 'Skip-the-line entrance to top 15 regional attractions' }
];

export const PROMO_CODES = {
  RIDHA10: { discountPercent: 10, minSpend: 40000, label: '10% Off Agency Special' },
  FIRSTTRIP: { discountFixed: 5000, minSpend: 50000, label: '₹5,000 Flat Off New Traveler Welcome' },
  GLOBAL20: { discountPercent: 20, minSpend: 150000, label: '20% Mega Explorer Discount' }
};
