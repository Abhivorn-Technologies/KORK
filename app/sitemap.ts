import { MetadataRoute } from 'next';
import { getBlogs, getProducts } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.korkinventrex.tech';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/about/how-it-works',
    '/about/industries',
    '/accessibility',
    '/blogs',
    '/client-portal',
    '/contact',
    '/napp-member',
    '/nda-policy',
    '/privacy-policy',
    '/products',
    '/resources',
    '/services',
    '/services/inventor-services',
    '/services/patent-filing-support',
    '/services/patent-illustrations',
    '/services/patent-search-evaluation',
    '/terms-of-service',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic routes (Blogs)
  try {
    const blogs = await getBlogs(100);
    if (blogs && Array.isArray(blogs)) {
      const blogEntries = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: new Date(blog.createdAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
      sitemapEntries.push(...blogEntries);
    }
  } catch (error) {
    console.error('Sitemap blog generation error:', error);
  }

  // Dynamic routes (Products)
  try {
    const products = await getProducts(100);
    if (products && Array.isArray(products)) {
      const productEntries = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(product.createdAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
      sitemapEntries.push(...productEntries);
    }
  } catch (error) {
    console.error('Sitemap product generation error:', error);
  }

  return sitemapEntries;
}
