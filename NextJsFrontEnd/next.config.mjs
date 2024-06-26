/** @type {import('next').NextConfig} */
const nextConfig = { images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
      }
    ],
  }};

export default nextConfig;
