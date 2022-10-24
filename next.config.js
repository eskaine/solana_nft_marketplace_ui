/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    pinataKey: '',
    pinataSecret: ''
  }
}

module.exports = nextConfig
