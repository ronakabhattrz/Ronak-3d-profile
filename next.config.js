/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ronakbhatt.in",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "ronakbhatt.in",
        pathname: "/assets/**",
      },
    ],
  },
};

module.exports = nextConfig;
