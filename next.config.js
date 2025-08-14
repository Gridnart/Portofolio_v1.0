/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
  },
  // Configure webpack to handle SVGs and other assets
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // Optional: Add basePath if your site is served from a subdirectory
  // basePath: '/portfolio',
  // Optional: Enable static HTML export for all pages
  trailingSlash: true,
};

module.exports = nextConfig;
