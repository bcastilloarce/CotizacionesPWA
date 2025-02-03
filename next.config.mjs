import NextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const withPWA = NextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compress: true,
  images: {
    remotePatterns: [],
    unoptimized: true, // This will prevent optimization errors for local images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
};

export default withPWA(nextConfig);
