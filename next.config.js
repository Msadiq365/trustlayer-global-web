/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [],
  },

  // API proxying for production and local development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://trustlayers.com.ng/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig