
export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  imageUrl: string;
  description: string;
  concept: string;
  howToPlay: string;
  playerCount: { min: number; max: number | string };
  useCases: string[];
  badges: string[];
  category: 'Card Game' | 'Board Game' | 'Puzzle' | 'Murder Mystery';
  occasion: 'Party' | 'Family' | 'Couples' | 'Ice Breaker';
  mood: 'Competitive' | 'Casual' | 'Strategy' | 'Funny';
}

export interface Event {
  id: string;
  name:string;
  date: string;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
  isPast: boolean;
}

export interface WalletTransaction {
  id: string;
  description: string;
  points: number;
  date: string;
}

export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
  username?: string;
}
