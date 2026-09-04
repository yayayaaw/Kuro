import { MenuItem, CafeSpace, ReviewItem } from '../types';

export const CAFE_INFO = {
  name: 'KURO',
  subName: 'Coffee Atelier',
  tagline: 'Kesederhanaan Bentuk. Ketelitian Rasa.',
  headline: 'Ruang hening untuk merayakan secangkir kopi istimewa.',
  address: 'Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan',
  gmapsUrl: 'https://maps.google.com/?q=Jl.+Senopati+Raya+No.+42+Jakarta',
  phone: '+62 812-8899-2340',
  whatsappNumber: '6281288992340',
  instagram: '@kuro.coffee',
  hours: {
    weekdays: '08:00 – 22:00',
    weekends: '07:30 – 23:00',
  },
};

export const MENU_ITEMS: MenuItem[] = [
  // Espresso & Milk
  {
    id: 'e1',
    name: 'Espresso Double Shot',
    category: 'espresso',
    description: 'Biji kopi pilihan Colombia Huila Washed dengan profil acidity manis dan aroma aprikot.',
    price: '38K',
    notes: ['Apricot', 'Brown Sugar', 'Clean Finish'],
  },
  {
    id: 'e2',
    name: 'Piccolo / Cortado',
    category: 'espresso',
    description: 'Double ristretto dipadu dengan microfoam susu segar dalam takaran presisi 1:2.',
    price: '42K',
    notes: ['Smooth Milk', 'Nutty', 'Dark Chocolate'],
  },
  {
    id: 'e3',
    name: 'Velvet Flat White',
    category: 'espresso',
    description: 'Tekstur susu tipis sutra menyatu seimbang dengan espresso blend house-roasted kami.',
    price: '45K',
    notes: ['Hazelnut', 'Toffee', 'Creamy'],
  },
  {
    id: 'e4',
    name: 'Single Origin Latte',
    category: 'espresso',
    description: 'Susu segar pilihan organik dengan ekstraksi espresso single origin Ethiopia.',
    price: '48K',
    notes: ['Floral Cocoa', 'Vanilla Bean', 'Subtle Berry'],
  },

  // Manual Brew & Slow Bar
  {
    id: 'f1',
    name: 'Ethiopia Guji Hambela',
    category: 'filter',
    description: 'Metode seduh V60. Biji natural anaerobic dengan aroma melati segar dan rasa buah persik manis.',
    price: '55K',
    notes: ['Jasmine Floral', 'White Peach', 'Citrus Blossom'],
  },
  {
    id: 'f2',
    name: 'Aceh Gayo Wine Process',
    category: 'filter',
    description: 'Seduhan Origami dripper. Fermentasi ceri alami dengan body tebal dan rasa kismis merah.',
    price: '50K',
    notes: ['Red Grape', 'Dried Cranberry', 'Spice Sweet'],
  },
  {
    id: 'f3',
    name: 'Panama Boquete Geisha',
    category: 'filter',
    description: 'Lot mikro sangat terbatas. Karakter rasa luar biasa menyerupai teh earl grey dan madu bunga.',
    price: '90K',
    notes: ['Bergamot', 'Orange Blossom', 'Honeyed Tea'],
  },
  {
    id: 'f4',
    name: 'Toraja Sapan Pulu Pulu',
    category: 'filter',
    description: 'Disiapkan dengan metode Kalita Wave. Sentuhan rempah pala manis, cedar, dan dark cacao 70%.',
    price: '48K',
    notes: ['Dark Cacao', 'Sweet Cinnamon', 'Cedarwood'],
  },

  // Signature
  {
    id: 's1',
    name: 'Kuro Noir Cold Drip',
    category: 'signature',
    description: 'Seduhan tetes lambat 12 jam dengan infused bergamot alami dan busa lembut oat milk.',
    price: '52K',
    notes: ['Slow Extracted', 'Velvety Foam', 'Citrus Whisper'],
  },
  {
    id: 's2',
    name: 'Smoked Sea Salt Caramel',
    category: 'signature',
    description: 'Espresso ganda, karamel gula kelapa bakar, dan taburan sea salt kristal murni Kusamba.',
    price: '50K',
    notes: ['Burnt Sugar', 'Flaky Sea Salt', 'Rich Body'],
  },
  {
    id: 's3',
    name: 'Kyoto Yuzu Tonic',
    category: 'signature',
    description: 'Sari buah yuzu segar Jepang dipadukan soda botani dan shot espresso dingin.',
    price: '48K',
    notes: ['Zesty Yuzu', 'Crisp Sparkle', 'Deep Espresso'],
  },
  {
    id: 's4',
    name: 'Uji Ceremonial Matcha Latte',
    category: 'signature',
    description: 'Matcha first-harvest dari perkebunan Kyoto, dikocok tradisional dengan chasen bambu.',
    price: '52K',
    notes: ['Umami', 'Fresh Vegetal', 'Silky Sweetness'],
  },

  // Artisan Pastry
  {
    id: 'p1',
    name: 'Normandy Butter Croissant',
    category: 'pastry',
    description: 'Dipanggang segar tiap pagi menggunakan mentega Normandia Prancis. Renyah berlapis.',
    price: '34K',
    notes: ['Flaky Pastry', 'Golden Butter', 'Freshly Baked'],
  },
  {
    id: 'p2',
    name: 'Valrhona Pain au Chocolat',
    category: 'pastry',
    description: 'Dua batang dark chocolate Valrhona 66% dalam lipatan adonan mentega artisan.',
    price: '38K',
    notes: ['French Chocolate', 'Crisp Crust', 'Decadent'],
  },
  {
    id: 'p3',
    name: 'Truffle Mushroom Brioche',
    category: 'pastry',
    description: 'Brioche mentega tebal dengan topping tumisan jamur liar, keju gruyere, dan minyak truffle Alba.',
    price: '58K',
    notes: ['Alba Truffle', 'Gruyere Cheese', 'Warm Savory'],
  },
];

export const CAFE_SPACES: CafeSpace[] = [
  {
    id: 'sp1',
    title: 'The Slow Bar',
    caption: 'Meja kayu solid terintegrasi dengan Modbar kustom untuk dialog santai bersama barista.',
    image: '/src/assets/images/cafe_hero_interior_1788457993006.jpg',
  },
  {
    id: 'sp2',
    title: 'The Quiet Lounge',
    caption: 'Area duduk intim berjarak lapang dengan material peredam bunyi dan pencahayaan hangat.',
    image: '/src/assets/images/cafe_private_room_1788458010504.jpg',
  },
  {
    id: 'sp3',
    title: 'The Sunlit Corner',
    caption: 'Cahaya alami pagi menyapa melalui jendela kaca arsitektural bersiluet minimalis.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Aditya Pramono',
    role: 'Architect & Urbanist',
    rating: 5,
    date: '3 hari lalu',
    comment: 'Tempat paling tenang di kawasan Senopati. Akustik ruangannya terisolasi dengan baik, pencahayaannya hangat dan tidak menyilaukan. Biji Ethiopia Hambela V60-nya memiliki clarity rasa bunga melati yang sangat bersih.',
    favoriteItem: 'Ethiopia Guji Hambela V60',
  },
  {
    id: 'rev-2',
    author: 'Clara Sasmita',
    role: 'Brand Designer',
    rating: 5,
    date: '1 minggu lalu',
    comment: 'Pilihan musik jazz dan ambient piano diputar dengan desibel yang sangat sopan. Meja kayu solidnya lapang dengan stopkontak rapi. Kuro Noir Cold Drip benar-benar minuman favorit baru saya.',
    favoriteItem: 'Kuro Noir Cold Drip',
  },
  {
    id: 'rev-3',
    author: 'Bagas Wicaksono',
    role: 'Specialty Coffee Enthusiast',
    rating: 5,
    date: '2 minggu lalu',
    comment: 'Baristanya sangat teliti dan ramah saat diajak berdiskusi tentang origin beans serta profil sangrai. Pain au Chocolat dengan cokelat Valrhona-nya renyah sempurna.',
    favoriteItem: 'Valrhona Pain au Chocolat',
  },
  {
    id: 'rev-4',
    author: 'Nadia Kartika',
    role: 'Creative Director',
    rating: 5,
    date: '3 minggu lalu',
    comment: 'Estetika minimalis 2 warnanya sangat menenangkan mata di tengah kebisingan kota. Tidak ada ornamen visual norak atau musik kencang, benar-benar ruang untuk bernapas dan bekerja fokus.',
    favoriteItem: 'Velvet Flat White',
  },
  {
    id: 'rev-5',
    author: 'Dimas Anggoro',
    role: 'Software Architect',
    rating: 5,
    date: '1 bulan lalu',
    comment: 'WiFi simetris sangat kencang (100 Mbps+) dan stabil sepanjang hari. Kursi duduknya ergonomis dan staf tidak pernah mengganggu konsentrasi kerja.',
    favoriteItem: 'Smoked Sea Salt Caramel',
  },
  {
    id: 'rev-6',
    author: 'Felicia Kusuma',
    role: 'Author & Essayist',
    rating: 5,
    date: '1 bulan lalu',
    comment: 'Menemukan sudut meja bermandikan cahaya alami pagi sambil menikmati Panama Geisha adalah momen favorit saya di Senopati. Secangkir ketenangan yang langka.',
    favoriteItem: 'Panama Boquete Geisha',
  },
];
