/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Configure images for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  // Reduce bundle size by excluding source maps in production
  productionBrowserSourceMaps: false,

  // PoweredByHeader removes the X-Powered-By header
  poweredByHeader: false,
};

module.exports = nextConfig;