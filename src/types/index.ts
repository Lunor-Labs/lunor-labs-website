export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  business: string;
  image: string;
  quote: string;
  rating: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
  link?: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}