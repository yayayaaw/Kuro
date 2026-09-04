import { CafeCMSContent } from './types';
import { CAFE_INFO, MENU_ITEMS, CAFE_SPACES, REVIEWS } from '../data/cafeData';

export const CMS_STORAGE_KEY = 'kuro_cafe_cms_content_v1';

export const DEFAULT_CMS_CONTENT: CafeCMSContent = {
  branding: {
    name: CAFE_INFO.name,
    subName: CAFE_INFO.subName,
    headline: CAFE_INFO.headline,
    tagline: CAFE_INFO.tagline,
    announcement: '',
  },
  hero: {
    headline: 'Ketenangan Ruang.',
    italicPart: 'Kemurnian Secangkir Kopi.',
    description:
      'KURO adalah studio seduh kopi lambat yang dirancang bagi mereka yang menghargai ketelitian rasa, keheningan visual, dan jeda yang bermakna.',
    image: '/src/assets/images/cafe_hero_interior_1788457993006.jpg',
    captionLeft: 'The Slow Bar Atelier',
    captionCenter: '08:00 – 22:00 WIB',
    captionRight: 'Senopati Raya 42',
  },
  philosophy: {
    label: 'Filosofi Kami',
    title: 'Ketiadaan Distraksi,',
    italicTitle: 'Kejernihan Rasa.',
    paragraph1:
      'KURO lahir dari kerinduan akan ruang yang tenang di tengah hiruk-pikuk kota. Kami mengeliminasi segala ornamen yang tidak esensial, menyisakan dua fokus murni: kehangatan ruang arsitektural dan kejujuran rasa secangkir kopi.',
    paragraph2:
      'Setiap biji kopi kami kurasi dari perkebunan mikro dengan skor cupping 85+ SCA. Kami menyangrai dalam kuantitas kecil setiap pekan dan menyeduhnya dengan air berstandar mineral presisi. Di sini, waktu bergerak lebih lambat agar Anda dapat menikmati setiap tegukan.',
    stat1Number: '85+',
    stat1Label: 'SCA Cup Score',
    stat2Number: '100%',
    stat2Label: 'Arabica Single Origin',
    stat3Number: '12h',
    stat3Label: 'Cold Slow Drip',
  },
  location: {
    address: CAFE_INFO.address,
    gmapsUrl: CAFE_INFO.gmapsUrl,
    phone: CAFE_INFO.phone,
    whatsappNumber: CAFE_INFO.whatsappNumber,
    instagram: CAFE_INFO.instagram,
    weekdayHours: CAFE_INFO.hours.weekdays,
    weekendHours: CAFE_INFO.hours.weekends,
    facilities: [
      'Koneksi internet serat optik berkecepatan tinggi & stabil di seluruh area.',
      'Stopkontak universal di setiap meja untuk kebutuhan kerja laptop.',
      'Ruang sholat bersih dan nyaman dengan tempat wudhu terpisah.',
      'Area bebas asap rokok berpendingin udara & area terbuka semi-outdoor.',
      'Lahan parkir kendaraan roda empat dan roda dua.',
    ],
  },
  menu: MENU_ITEMS,
  spaces: CAFE_SPACES,
  reviews: REVIEWS,
};

export function loadCMSContent(): CafeCMSContent {
  try {
    const saved = localStorage.getItem(CMS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Clean up deprecated announcement if previously saved
      if (parsed.branding?.announcement === 'Specialty Coffee & Architecture • Senopati, Jakarta') {
        parsed.branding.announcement = '';
      }
      return {
        ...DEFAULT_CMS_CONTENT,
        ...parsed,
        branding: { ...DEFAULT_CMS_CONTENT.branding, ...(parsed.branding || {}) },
        hero: { ...DEFAULT_CMS_CONTENT.hero, ...(parsed.hero || {}) },
        philosophy: { ...DEFAULT_CMS_CONTENT.philosophy, ...(parsed.philosophy || {}) },
        location: { ...DEFAULT_CMS_CONTENT.location, ...(parsed.location || {}) },
        menu: Array.isArray(parsed.menu) ? parsed.menu : DEFAULT_CMS_CONTENT.menu,
        spaces: Array.isArray(parsed.spaces) ? parsed.spaces : DEFAULT_CMS_CONTENT.spaces,
        reviews: Array.isArray(parsed.reviews) ? parsed.reviews : DEFAULT_CMS_CONTENT.reviews,
      };
    }
  } catch (err) {
    console.error('Failed to load CMS content from localStorage', err);
  }
  return DEFAULT_CMS_CONTENT;
}

export function saveCMSContent(content: CafeCMSContent): void {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event('kuro_cms_updated'));
  } catch (err) {
    console.error('Failed to save CMS content to localStorage', err);
  }
}

export function resetCMSContent(): CafeCMSContent {
  try {
    localStorage.removeItem(CMS_STORAGE_KEY);
    window.dispatchEvent(new Event('kuro_cms_updated'));
  } catch (err) {
    console.error('Failed to reset CMS content', err);
  }
  return DEFAULT_CMS_CONTENT;
}
