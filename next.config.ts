import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
