import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  swcMinify: true,            // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'       // Remove console.log in production
  }
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default pwaConfig(nextConfig);
