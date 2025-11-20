// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['localhost','typescript-blog-backend.onrender.com'], // or your deployed Strapi domain
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Best free fix (stops Next.js optimizer from fetching)
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "typescript-blog-backend.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      }
    ],
  },
};

module.exports = nextConfig;
