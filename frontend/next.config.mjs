/** @type {import('next').NextConfig} */

const nextConfig = {
  allowedDevOrigins: ["10.0.0.52"],

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
