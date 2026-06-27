export interface Product {
  id: string
  name: string
  category: string
  description: string
  ctaText: string
  ctaLink: string
  features: string[]
  icon: string
  visibility: boolean
}

export const products: Product[] = [
  {
    id: 'dataflow',
    name: 'DataFlow',
    category: 'Digital Utility Platform',
    description:
      'DataFlow provides convenient VTU services that enable users to access essential digital services quickly and reliably.',
    ctaText: 'Visit DataFlow',
    ctaLink: '#',
    features: ['Airtime Top-Up', 'Data Bundles', 'Electricity Payments', 'And more'],
    icon: '📱',
    visibility: true,
  },
  {
    id: 'trustpay',
    name: 'Trust Pay',
    category: 'Digital Payment Solution',
    description:
      'Trust Pay provides secure and convenient digital payment experiences designed to make transactions simpler.',
    ctaText: 'Visit Trust Pay',
    ctaLink: '#',
    features: ['Secure Payments', 'Fast Transactions', 'Easy to Use', 'Reliable Service'],
    icon: '💳',
    visibility: true,
  },
]