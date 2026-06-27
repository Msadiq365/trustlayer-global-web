export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Trust in Digital Solutions',
    excerpt: 'How Trust Layer Technologies is redefining security and reliability in the digital space.',
    date: 'March 15, 2025',
    author: 'Trust Layer Team',
    category: 'Security',
    slug: 'building-trust-in-digital-solutions',
  },
  {
    id: '2',
    title: 'The Future of Digital Payments in Africa',
    excerpt: 'Exploring the growth of digital payment solutions and how Trust Pay is leading the way.',
    date: 'March 10, 2025',
    author: 'Trust Layer Team',
    category: 'Payments',
    slug: 'future-of-digital-payments-africa',
  },
  {
    id: '3',
    title: 'Simplifying VTU Services with DataFlow',
    excerpt: 'How DataFlow is making essential digital services more accessible to everyone.',
    date: 'March 5, 2025',
    author: 'Trust Layer Team',
    category: 'Products',
    slug: 'simplifying-vtu-services-dataflow',
  },
]