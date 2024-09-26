/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: { 
      serverComponentsExternalPackages: ['grammy'], 
    }, 
};

export default nextConfig;
