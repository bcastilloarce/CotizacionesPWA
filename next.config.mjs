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
  images: {
    domains: ['localhost'],
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'
  }
};


export default withPWA(nextConfig);
