export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  gallery: string[];
  featured: boolean;
  createdAt: string;
  specifications?: string[];
  features?: string[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  author: string;
  createdAt: string;
  category?: string;
  excerpt?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  type?: 'general' | 'partner';
  partnershipInterest?: string;
  subject?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  companyName: string;
  photo: string;
  review: string;
  rating: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photo?: string;
  position?: string;
  linkedIn?: string;
  bio?: string;
}

export interface Settings {
  id: string;
  companyName: string;
  companyDescription: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  favicon: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketId: string; // 6-digit reference number
  clientId: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}

