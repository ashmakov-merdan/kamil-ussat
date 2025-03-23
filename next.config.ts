import type { NextConfig } from "next";
import createNextIntPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kamilussat.com.tm",
        port: "",
        pathname: "/public/**"
      }
    ]
  }
};

const withNextIntl = createNextIntPlugin();

export default withNextIntl(nextConfig);
