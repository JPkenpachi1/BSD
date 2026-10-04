import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on your Wi-Fi open the dev server via your LAN IP.
  // Change to your machine's IP if it differs (check with `ifconfig` / `ipconfig`).
  allowedDevOrigins: ["192.168.1.48"],
};

export default nextConfig;
