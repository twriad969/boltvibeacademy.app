/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Next.js automatically makes NEXT_PUBLIC_ variables available to the client
  // No need to explicitly expose them in next.config.js
};

module.exports = nextConfig;
