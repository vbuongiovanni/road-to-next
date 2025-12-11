import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  //   // Application level route-specific caching, set at 15 seconds for dynamic routes
  // experimental: {
  //   staleTimes: { dynamic: 15 },
  // },
};

export default nextConfig;
