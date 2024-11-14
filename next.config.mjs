/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io'], // Add 'ik.imagekit.io' to the domains list
  },
};

export default nextConfig;
