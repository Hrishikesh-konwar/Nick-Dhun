/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable Next.js image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'], // Use WebP for better compression
  },
  // Don't include public folder in build
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'public/images/**/*',
      ],
    },
  },
}

export default nextConfig
