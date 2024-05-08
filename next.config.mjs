/** @type {import('next').NextConfig} */
import pkg from "@next/env";

const { loadEnvConfig } = pkg;

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "s3.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`,
      },
    ];
  },
};

export default nextConfig;
