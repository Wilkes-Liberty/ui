/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Required for production Docker image (infra/docker/nextjs/Dockerfile.prod)
  // Creates a self-contained server.js with minimal node_modules for the runner stage
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        // pathname: '/sites/default/files/**',
      },
      // Allow HTTP for local Docker development (drupal service on same network)
      ...(process.env.NODE_ENV === 'development'
        ? [{ protocol: 'http', hostname: process.env.NEXT_IMAGE_DOMAIN }]
        : []),
    ],
  },
}

module.exports = nextConfig
