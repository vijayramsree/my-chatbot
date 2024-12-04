import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.infrastructureLogging = { level: 'none' };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["llamaindex"],
  },
  turbo: {
    loaders: {
      '.pdf': ['file-loader'],
    },
    resolveAlias: {
      '@/*': './src/*'
    }
  }
};

export default nextConfig;