import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Product, Blog, Enquiry, Testimonial, Settings, SupportTicket } from '@/types';
import { mockDb } from './mockDb';

// Utility helper to check if Firebase is fully initialized and configured
export const isFirebaseConfigured = (): boolean => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
};

// ==========================================
// PRODUCT QUERIES & CRUD
// ==========================================

export const getProducts = async (pageSize: number = 20): Promise<Product[]> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getProducts().slice(0, pageSize);
  }
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('Firebase getProducts error, falling back to mock:', error);
    return mockDb.getProducts().slice(0, pageSize);
  }
};

export const getProductsByCategory = async (
  category: string,
  pageSize: number = 12
): Promise<Product[]> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getProducts().filter(p => p.category === category).slice(0, pageSize);
  }
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('Firebase getProductsByCategory error, falling back to mock:', error);
    return mockDb.getProducts().filter(p => p.category === category).slice(0, pageSize);
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getProducts().find(p => p.slug === slug) || null;
  }
  try {
    const q = query(collection(db, 'products'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.docs.length === 0) return null;
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    } as Product;
  } catch (error) {
    console.error('Firebase getProductBySlug error, falling back to mock:', error);
    return mockDb.getProducts().find(p => p.slug === slug) || null;
  }
};

export const getFeaturedProducts = async (pageSize: number = 6): Promise<Product[]> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getProducts().filter(p => p.featured).slice(0, pageSize);
  }
  try {
    const q = query(
      collection(db, 'products'),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('Firebase getFeaturedProducts error, falling back to mock:', error);
    return mockDb.getProducts().filter(p => p.featured).slice(0, pageSize);
  }
};

// CRUD for Products (Admin Panel)
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  const newProduct = {
    ...product,
    createdAt: new Date().toISOString()
  };
  if (!isFirebaseConfigured()) {
    const products = mockDb.getProducts();
    const created: Product = {
      id: `prod-${Math.random().toString(36).substr(2, 9)}`,
      ...newProduct
    };
    products.unshift(created);
    mockDb.saveProducts(products);
    return created;
  }
  const docRef = await addDoc(collection(db, 'products'), newProduct);
  return { id: docRef.id, ...newProduct };
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const products = mockDb.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
      mockDb.saveProducts(products);
    }
    return;
  }
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, productData);
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const products = mockDb.getProducts();
    const filtered = products.filter(p => p.id !== id);
    mockDb.saveProducts(filtered);
    return;
  }
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};


// ==========================================
// BLOG QUERIES & CRUD
// ==========================================

export const getBlogs = async (pageSize: number = 10): Promise<Blog[]> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getBlogs().slice(0, pageSize);
  }
  try {
    const q = query(
      collection(db, 'blogs'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Blog[];
  } catch (error) {
    console.error('Firebase getBlogs error, falling back to mock:', error);
    return mockDb.getBlogs().slice(0, pageSize);
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getBlogs().find(b => b.slug === slug) || null;
  }
  try {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.docs.length === 0) return null;
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    } as Blog;
  } catch (error) {
    console.error('Firebase getBlogBySlug error, falling back to mock:', error);
    return mockDb.getBlogs().find(b => b.slug === slug) || null;
  }
};

export const getRecentBlogs = async (pageSize: number = 5): Promise<Blog[]> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getBlogs().slice(0, pageSize);
  }
  try {
    const q = query(
      collection(db, 'blogs'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Blog[];
  } catch (error) {
    console.error('Firebase getRecentBlogs error, falling back to mock:', error);
    return mockDb.getBlogs().slice(0, pageSize);
  }
};

// CRUD for Blogs (Admin Panel)
export const addBlog = async (blog: Omit<Blog, 'id' | 'createdAt'>): Promise<Blog> => {
  const newBlog = {
    ...blog,
    createdAt: new Date().toISOString()
  };
  if (!isFirebaseConfigured()) {
    const blogs = mockDb.getBlogs();
    const created: Blog = {
      id: `blog-${Math.random().toString(36).substr(2, 9)}`,
      ...newBlog
    };
    blogs.unshift(created);
    mockDb.saveBlogs(blogs);
    return created;
  }
  const docRef = await addDoc(collection(db, 'blogs'), newBlog);
  return { id: docRef.id, ...newBlog };
};

export const updateBlog = async (id: string, blogData: Partial<Blog>): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const blogs = mockDb.getBlogs();
    const index = blogs.findIndex(b => b.id === id);
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...blogData };
      mockDb.saveBlogs(blogs);
    }
    return;
  }
  const docRef = doc(db, 'blogs', id);
  await updateDoc(docRef, blogData);
};

export const deleteBlog = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const blogs = mockDb.getBlogs();
    const filtered = blogs.filter(b => b.id !== id);
    mockDb.saveBlogs(filtered);
    return;
  }
  const docRef = doc(db, 'blogs', id);
  await deleteDoc(docRef);
};


// ==========================================
// TESTIMONIAL QUERIES
// ==========================================

export const getTestimonials = async (): Promise<Testimonial[]> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getTestimonials();
  }
  try {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error('Firebase getTestimonials error, falling back to mock:', error);
    return mockDb.getTestimonials();
  }
};


// ==========================================
// SETTINGS QUERIES & CRUD
// ==========================================

export const getSettings = async (): Promise<Settings> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getSettings();
  }
  try {
    const docRef = doc(db, 'settings', 'general');
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // Seed settings if empty
      const initial = mockDb.getSettings();
      await setDoc(docRef, initial);
      return initial;
    }
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Settings;
  } catch (error) {
    console.error('Firebase getSettings error, falling back to mock:', error);
    return mockDb.getSettings();
  }
};

export const saveSettings = async (settingsData: Settings): Promise<void> => {
  const updatedSettings = {
    ...settingsData,
    updatedAt: new Date().toISOString()
  };
  if (!isFirebaseConfigured()) {
    mockDb.saveSettings(updatedSettings);
    return;
  }
  const docRef = doc(db, 'settings', 'general');
  await setDoc(docRef, updatedSettings);
};


// ==========================================
// ENQUIRIES QUERIES & CRUD
// ==========================================

export const getEnquiries = async (): Promise<Enquiry[]> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getEnquiries();
  }
  try {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Enquiry[];
  } catch (error) {
    console.error('Firebase getEnquiries error, falling back to mock:', error);
    return mockDb.getEnquiries();
  }
};

export const saveEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'createdAt'>): Promise<Enquiry> => {
  if (!isFirebaseConfigured()) {
    return mockDb.saveEnquiry(enquiry);
  }
  const newEnquiry = {
    ...enquiry,
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(collection(db, 'enquiries'), newEnquiry);
  return { id: docRef.id, ...newEnquiry };
};

export const deleteEnquiry = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    mockDb.deleteEnquiry(id);
    return;
  }
  const docRef = doc(db, 'enquiries', id);
  await deleteDoc(docRef);
};

// ==========================================
// SUPPORT TICKETS QUERIES & CRUD
// ==========================================

export const getSupportTickets = async (): Promise<SupportTicket[]> => {
  if (!isFirebaseConfigured()) {
    return mockDb.getSupportTickets();
  }
  try {
    const q = query(collection(db, 'support_tickets'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SupportTicket[];
  } catch (error) {
    console.error('Firebase getSupportTickets error, falling back to mock:', error);
    return mockDb.getSupportTickets();
  }
};

export const updateTicketStatus = async (id: string, status: 'Open' | 'In Progress' | 'Resolved'): Promise<void> => {
  if (!isFirebaseConfigured()) {
    mockDb.updateSupportTicketStatus(id, status);
    return;
  }
  const docRef = doc(db, 'support_tickets', id);
  await updateDoc(docRef, { status });
};

export const deleteTicket = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    mockDb.deleteSupportTicket(id);
    return;
  }
  const docRef = doc(db, 'support_tickets', id);
  await deleteDoc(docRef);
};
