import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Paper uploads go through a Server Action (max file is 4 MB, see lib/config.ts).
    serverActions: { bodySizeLimit: "5mb" },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
