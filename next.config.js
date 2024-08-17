/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  ...nextConfig,
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    MONGODB_URL: process.env.MONGODB_URL,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};
