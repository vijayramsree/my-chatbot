import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.infrastructureLogging = { level: 'none' };
    return config;
  },
};

export default nextConfig;