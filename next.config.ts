import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental:{
  //   ppr:true
  // }
  // output:"export",
  // compress: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
