import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frontend-test-api.yoldi.agency',
        port: '',
        pathname: '/api/image/src/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
