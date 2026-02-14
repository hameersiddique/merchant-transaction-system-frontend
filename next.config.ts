/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  experimental: {
    disableOptimizedLoading: true,
  },
}

module.exports = nextConfig