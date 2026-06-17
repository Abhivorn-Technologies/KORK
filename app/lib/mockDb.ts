import { Product, Blog, Enquiry, Testimonial, Settings, SupportTicket } from '@/types';

// Static seed data for products
// Static seed data for products (Inventor Packages)
const initialProducts: Product[] = [];

// Static seed data for blogs
const initialBlogs: Blog[] = [];

// Testimonials data
const initialTestimonials: Testimonial[] = [];

// General settings data
const initialSettings: Settings = {
  id: 'general',
  companyName: 'KORK InventRex',
  companyDescription: 'From Idea to Intellectual Property™',
  email: 'contact@korkinventrex.com',
  phone: '330-353-9850',
  address: '24 hours | 9 AM–6 PM ET',
  logo: '/kork_logo.jpg',
  favicon: '/favicon.ico',
  socialLinks: {
    linkedin: 'https://linkedin.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com'
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Initial enquiries
const initialEnquiries: Enquiry[] = [];

// Helper to interact with local storage safely during SSR
const getStoredData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(item);
};

const setStoredData = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const mockDb = {
  getProducts: (): Product[] => getStoredData<Product[]>('mock_products_v2', initialProducts),
  saveProducts: (products: Product[]) => setStoredData('mock_products_v2', products),
  
  getBlogs: (): Blog[] => getStoredData<Blog[]>('mock_blogs', initialBlogs),
  saveBlogs: (blogs: Blog[]) => setStoredData('mock_blogs', blogs),

  getTestimonials: (): Testimonial[] => getStoredData<Testimonial[]>('mock_testimonials_v3', initialTestimonials),
  
  getSettings: (): Settings => getStoredData<Settings>('mock_settings', initialSettings),
  saveSettings: (settings: Settings) => setStoredData('mock_settings', settings),

  getEnquiries: (): Enquiry[] => getStoredData<Enquiry[]>('mock_enquiries', initialEnquiries),
  saveEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt'>) => {
    const enquiries = getStoredData<Enquiry[]>('mock_enquiries', initialEnquiries);
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    enquiries.unshift(newEnquiry);
    setStoredData('mock_enquiries', enquiries);
    return newEnquiry;
  },
  deleteEnquiry: (id: string) => {
    const enquiries = getStoredData<Enquiry[]>('mock_enquiries', initialEnquiries);
    const filtered = enquiries.filter(e => e.id !== id);
    setStoredData('mock_enquiries', filtered);
  },

  getSupportTickets: (): SupportTicket[] => getStoredData<SupportTicket[]>('mock_support_tickets', initialSupportTickets),
  saveSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => {
    const tickets = getStoredData<SupportTicket[]>('mock_support_tickets', initialSupportTickets);
    const newTicket: SupportTicket = {
      ...ticket,
      id: `ticket-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    tickets.unshift(newTicket);
    setStoredData('mock_support_tickets', tickets);
    return newTicket;
  },
  updateSupportTicketStatus: (id: string, status: 'Open' | 'In Progress' | 'Resolved') => {
    const tickets = getStoredData<SupportTicket[]>('mock_support_tickets', initialSupportTickets);
    const updated = tickets.map(t => t.id === id ? { ...t, status } : t);
    setStoredData('mock_support_tickets', updated);
  },
  deleteSupportTicket: (id: string) => {
    const tickets = getStoredData<SupportTicket[]>('mock_support_tickets', initialSupportTickets);
    const filtered = tickets.filter(t => t.id !== id);
    setStoredData('mock_support_tickets', filtered);
  }
};

const initialSupportTickets: SupportTicket[] = [];

