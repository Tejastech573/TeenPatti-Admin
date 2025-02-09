/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.pravatar.cc"],
  },
  productionBrowserSourceMaps: false,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
