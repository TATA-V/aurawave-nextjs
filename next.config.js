/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'], // Firebase Storage 호스트 추가
  },
};

module.exports = nextConfig;
