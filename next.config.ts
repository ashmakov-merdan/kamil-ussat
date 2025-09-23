import type { NextConfig } from "next";
import createNextIntPlugin from "next-intl/plugin";
const apiUrl = process.env.API_URL || "kamilussat.com.tm";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: apiUrl,
        port: "",
        pathname: "/public/**"
      }
    ]
  },
  env: {
    API_URL: apiUrl
  }
};

const withNextIntl = createNextIntPlugin();

export default withNextIntl(nextConfig);
