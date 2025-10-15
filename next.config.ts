import type { NextConfig } from "next";
import createNextIntPlugin from "next-intl/plugin";
const apiUrl = process.env.API_URL;
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kamilussat.com",
        port: "",
        pathname: "/public/**"
      },
      {
        protocol: "https",
        hostname: "kamilussat.com.tm",
        port: "",
        pathname: "/public/**"
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  env: {
    API_URL: apiUrl
  }
};

const withNextIntl = createNextIntPlugin();

export default withNextIntl(nextConfig);
