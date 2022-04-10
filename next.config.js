/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV !== 'production',
  },
  images: {
    domains: ['media.api-sports.io', "lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  }
}

module.exports = withPWA(nextConfig)
