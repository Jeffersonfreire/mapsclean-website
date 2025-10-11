import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // A raiz do workspace (monorepo) para evitar detecção incorreta pelo Next
  outputFileTracingRoot: path.resolve(__dirname, ".."), // C:\Users\PC\Desktop\MAPSCLEAN
  experimental: {},
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "geolocation=(self)" }
      ],
    },
  ],
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'mapsclean-web.onrender.com' }],
      destination: 'https://www.mapsclean.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'mapsclean.com' }],
      destination: 'https://www.mapsclean.com/:path*',
      permanent: true,
    },
  ],
  webpack: (config) => {
    // Polyfills for Node globals in browser (dev)
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      buffer: require.resolve('buffer/')
    };
    return config;
  }
};

export default nextConfig;
