/** @type {import('next').NextConfig} */

const nextConfig = {
  allowedDevOrigins: ["http://localhost"],

  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
};



export default nextConfig;
