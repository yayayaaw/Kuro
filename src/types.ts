export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'filter' | 'signature' | 'pastry';
  description: string;
  price: string;
  notes?: string[];
}

export interface CafeSpace {
  id: string;
  title: string;
  caption: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  favoriteItem?: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}
