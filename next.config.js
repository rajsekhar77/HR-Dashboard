/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable webpack cache to resolve caching issues
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

exports = nextConfig;