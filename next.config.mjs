/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true, // Оптимизация кода с помощью SWC
  experimental: { 
      serverComponentsExternalPackages: ['grammy'], 
    }, 
};

export default nextConfig;
