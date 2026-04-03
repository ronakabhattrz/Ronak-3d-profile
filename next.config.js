/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** Hide the floating Next.js dev tools badge in development */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/upwork-cloud/**",
      },
    ],
  },
};

module.exports = nextConfig;
