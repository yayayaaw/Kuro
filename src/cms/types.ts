import { MenuItem, CafeSpace, ReviewItem } from '../types';

export interface CafeCMSContent {
  branding: {
    name: string;
    subName: string;
    headline: string;
    tagline: string;
    announcement: string;
  };
  hero: {
    headline: string;
    italicPart: string;
    description: string;
    image: string;
    captionLeft: string;
    captionCenter: string;
    captionRight: string;
  };
  philosophy: {
    label: string;
    title: string;
    italicTitle: string;
    paragraph1: string;
    paragraph2: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
  location: {
    address: string;
    gmapsUrl: string;
    phone: string;
    whatsappNumber: string;
    instagram: string;
    weekdayHours: string;
    weekendHours: string;
    facilities: string[];
  };
  menu: MenuItem[];
  spaces: CafeSpace[];
  reviews: ReviewItem[];
}
