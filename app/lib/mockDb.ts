import { Product, Blog, Enquiry, Testimonial, Settings } from '@/types';

// Static seed data for products
// Static seed data for products (Inventor Packages)
const initialProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Idea Evaluation Package',
    slug: 'idea-evaluation-package',
    description: 'Best for inventors exploring whether their invention is worth pursuing. Includes prior art search coordination, patentability review, and innovation readiness assessment.',
    category: 'Inventor Packages',
    image: '/images/packages/idea_evaluation.png',
    gallery: [
      '/images/packages/idea_evaluation.png',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    features: [
      'Initial intake & review',
      'Confidentiality assurance & NDA option',
      'Comprehensive Prior Art Search coordination',
      'Patentability Assessment & Strategy alignment',
      'One Point of Contact through client portal'
    ],
    specifications: [
      'Search Scope: US & International Patents',
      'Turnaround: 5–10 Business Days',
      'Consultation: 45-min strategy review',
      'Portal Access: Yes (Project tracking & reports)'
    ]
  },
  {
    id: 'prod-2',
    title: 'Provisional Patent Package',
    slug: 'provisional-patent-package',
    description: 'Best for inventors seeking an early filing date while continuing product development. Establishes a "patent pending" status valid for 12 months.',
    category: 'Inventor Packages',
    image: '/images/packages/provisional_patent.png',
    gallery: [
      '/images/packages/provisional_patent.png',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    features: [
      'Confidential intake & roadmap setup',
      'Provisional application documentation support',
      'Standard Patent Drawings coordination (up to 3 views)',
      'Filing package preparation by network professionals',
      'Portal tracking & status updates'
    ],
    specifications: [
      'Application Type: Provisional Patent',
      'Protection Term: 12 months (non-extendable)',
      'Turnaround: 10–15 Business Days',
      'Attorney Coordination: Included'
    ]
  },
  {
    id: 'prod-3',
    title: 'Utility Patent Package',
    slug: 'utility-patent-package',
    description: 'Best for inventors ready to pursue full patent protection for functional features, systems, processes, and mechanical/electrical assemblies.',
    category: 'Inventor Packages',
    image: '/images/packages/utility_patent.png',
    gallery: [
      '/images/packages/utility_patent.png',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    features: [
      'Specification & Technical documentation assembly',
      'USPTO-compliant Utility Patent Drawings (custom views)',
      'Coordination with registered patent attorneys/agents',
      'Office Action and prosecution support tracking',
      'Complete project visibility in Client Portal'
    ],
    specifications: [
      'Application Type: Non-Provisional (Utility)',
      'Protection Term: 20 years from filing date',
      'Drawings Included: Compliant line illustrations',
      'Office Action Monitoring: Yes'
    ]
  },
  {
    id: 'prod-4',
    title: 'Design Patent Package',
    slug: 'design-patent-package',
    description: 'Best for protecting the unique visual appearance and ornamental design features of a product or device.',
    category: 'Inventor Packages',
    image: '/images/packages/design_patent.png',
    gallery: [
      '/images/packages/design_patent.png'
    ],
    featured: false,
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    features: [
      'USPTO-compliant Design Patent Drawings',
      'Surface shading & perspective views',
      'Filing package preparation by registered practitioners',
      'Quality review checks and revision support',
      'Deliverable portal access'
    ],
    specifications: [
      'Application Type: Design Patent',
      'Protection Term: 15 years from issuance',
      'Turnaround: 5–10 Business Days',
      'Views Covered: Front, Rear, Left, Right, Top, Bottom, Isometric'
    ]
  },
  {
    id: 'prod-5',
    title: 'Trademark Protection Package',
    slug: 'trademark-protection-package',
    description: 'Best for businesses seeking brand protection for names, logos, slogans, and trade dress packages.',
    category: 'Brand Packages',
    image: '/images/packages/trademark_protection.png',
    gallery: [
      '/images/packages/trademark_protection.png'
    ],
    featured: false,
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    features: [
      'Trademark availability screening coordination',
      'High-quality logo/specimen graphics preparation',
      'Application compilation by trademark specialists',
      'Filing coordination & class selection support',
      'Client Portal communications'
    ],
    specifications: [
      'Protection: Brand name, Logo, Slogan or Trade Dress',
      'Search Scope: USPTO TESS Database',
      'Turnaround: 3–5 Business Days',
      'Status Updates: Yes'
    ]
  },
  {
    id: 'prod-6',
    title: 'Complete IP Launch Package',
    slug: 'complete-ip-launch-package',
    description: 'Best for startups and emerging companies launching a new product. Provides comprehensive protection for technology and brand.',
    category: 'Startup Packages',
    image: '/images/packages/complete_ip_launch.png',
    gallery: [
      '/images/packages/complete_ip_launch.png'
    ],
    featured: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    features: [
      'Patent Search & Patentability assessment',
      'Utility Patent Application coordination & drawings',
      'Trademark Registration coordination & specimens',
      'Office Action response monitoring & tracking',
      'Ongoing IP portfolio advisory and support'
    ],
    specifications: [
      'Scope: Redundant protection (Patent + Brand)',
      'Timeline: Prioritized project staging',
      'Consultation: Ongoing milestone sessions',
      'Access: Enterprise portal dashboard'
    ]
  }
];

// Static seed data for blogs
const initialBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'The Critical Importance of USPTO-Compliant Patent Drawings',
    slug: 'critical-importance-of-uspto-compliant-patent-drawings',
    excerpt: 'Failing to meet USPTO requirements for patent drawings is a leading cause of Office Actions. Learn how to avoid these common formatting and shading mistakes.',
    content: `## Why Do Patent Drawings Matter?
Many inventors believe that as long as their technical description is detailed, their drawings are of secondary importance. In reality, the United States Patent and Trademark Office (USPTO) enforces strict, non-negotiable guidelines regarding line weight, margins, font sizes, and shading.

### 1. Common Rejection Triggers
The examiner can reject your application if drawings lack proper margins, have blurry text, or fail to use standard reference numerals. Utility patents require black-and-white line drawings with standard hatch lines, while design patents demand detailed stippling and surface shading to accurately represent ornamental shape.

### 2. Utility vs. Design Drawing Standards
*   **Utility Drawings:** Focus on demonstrating functional interfaces, assemblies, electrical schematics, or workflow logic. Lines must be crisp, uniform, and reference numbers must match the written specifications exactly.
*   **Design Drawings:** Must showcase all outer surfaces with absolute geometric precision. Shading is used to identify contour, depth, and transparency. Solid lines define claimed features, while broken/dashed lines illustrate environmental structures.

### 3. Digitizing and File Formatting
To prevent translation errors, drawings should be prepared in vector format (CAD/SVG) and exported to high-resolution, scale-exact PDFs. Working with experienced technical illustrators ensures all figures automatically conform to the MPEP (Manual of Patent Examining Procedure) guidelines.

### Conclusion
A high-quality set of drawings does more than prevent administrative delays; it enhances the examiner's comprehension of your invention, resulting in a smoother, faster prosecution lifecycle.`,
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    author: 'KORK Editorial Board',
    category: 'Patent Drawings',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'blog-2',
    title: 'Navigating Your First Filing: Provisional vs. Non-Provisional',
    slug: 'navigating-first-filing-provisional-vs-non-provisional',
    excerpt: 'Understand the distinct pathways of provisional and non-provisional applications to optimize your filing budget and establish early priority.',
    content: `## The Strategic Path to Patent Protection
For early-stage startups and independent inventors, resource management is key. Before investing thousands of dollars in a non-provisional utility patent application, it is essential to understand the advantages of the provisional route.

### 1. The Provisional Application (Your 1-Year Hold)
A provisional patent application acts as a low-cost placeholder. It establishes an early priority date with the USPTO and allows you to use the term "Patent Pending" for exactly 12 months.
*   **Benefits:** Requires fewer formal specifications, has a lower filing fee, and allows you to test market feasibility, seek funding, or refine the prototype before committing to the full filing.
*   **Warning:** A provisional application is never examined and expires automatically after 12 months. To maintain protection, you must file a corresponding non-provisional application before it expires.

### 2. The Non-Provisional Application (The Examination Road)
The non-provisional utility application is the official request for a patent. It undergoes detailed examination by a USPTO examiner who will compare your claims against prior art.
*   **Structure:** Requires formal claims, a detailed description, abstract, and compliant illustrations. 
*   **Cost & Time:** Typically involves attorney fees, higher USPTO fees, and a multi-year examination process.

### Strategic Summary
If you are still developing your product, start with a **Provisional Patent**. If your design is finalized and you have identified market traction, proceed directly with a **Non-Provisional Patent**.`,
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    author: 'IP Strategy Team',
    category: 'Patent Filing',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'blog-3',
    title: 'Surviving a USPTO Office Action: A Survival Guide for Innovators',
    slug: 'surviving-uspto-office-action-guide-inventors',
    excerpt: 'Receiving an Office Action rejection is a normal phase of the patent journey. Here is how we coordinate responses and drawing revisions.',
    content: `## Rejections Are Normal
Over 80% of non-provisional patent applications receive at least one Office Action rejection or objection during their examination lifecycle. An Office Action is simply an official letter from the examiner stating their findings, objections, or rejections regarding your claims or drawings.

### Types of Office Actions
1. **Non-Final Office Action:** The examiner's first evaluation. They will highlight which claims are rejected (usually citing prior art under 35 U.S.C. 102 or 103) and specify drawing formatting corrections.
2. **Final Office Action:** Issued if the examiner is not satisfied with your previous response. However, this is rarely "final" and can be resolved through amendments, RCEs (Request for Continued Examination), or appeals.

### Steps to Respond
*   **Analyze the Prior Art:** Work with your registered attorney or agent to study the examiner's citations. You can often narrow the scope of your claims to differentiate your invention from the cited art.
*   **Correct Drawing Objections:** If the examiner requests cleaner margins, reference number alignments, or surface line weights, coordinate with a technical illustrator immediately to prepare replacement sheets.
*   **Timely Filing:** Respond within the set timeframe (typically 3 months, extendable to 6 months) to avoid application abandonment.

Our Client Portal tracks these deadlines and keeps you connected to our registered patent professionals so you never miss a submission window.`,
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    author: 'Office Action Support Team',
    category: 'Office Actions',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Testimonials data
const initialTestimonials: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Jonathan Miller',
    companyName: 'Apex Medical Systems',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    review: 'KORK coordinated our prior art search and utility drawings in record time. Their secure client portal made collaboration with our assigned patent attorney completely seamless.',
    rating: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 't-2',
    clientName: 'Elena Rostova',
    companyName: 'SmartGlow Technologies',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    review: 'We selected KORK\'s Design Patent Package. The surface shading and perspectives prepared by their illustrators were absolutely flawless, getting us filed without a single USPTO objection.',
    rating: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 't-3',
    clientName: 'David Vance',
    companyName: 'EcoAg Equipment Systems',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    review: 'KORK\'s coordination on our USPTO Office Action drawing revisions saved our application. They updated our mechanical figures within 48 hours to satisfy examiner requirements.',
    rating: 5,
    createdAt: new Date().toISOString()
  }
];

// General settings data
const initialSettings: Settings = {
  id: 'general',
  companyName: 'KORK InventReX',
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

  getTestimonials: (): Testimonial[] => getStoredData<Testimonial[]>('mock_testimonials', initialTestimonials),
  
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
  }
};
