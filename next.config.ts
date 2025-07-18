import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yqjvpaswwxjlrlrkqcjt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/gallery-images/**',
      },
    ],
  },
};

export default nextConfig;
