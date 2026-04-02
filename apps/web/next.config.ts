import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@renonext/shared'],
  serverExternalPackages: ['@react-pdf/renderer', 'pdf-parse'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ae-pic-a1.aliexpress-media.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/for-contractors',
        destination: '/contractors',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
