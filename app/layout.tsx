import type { Metadata, Viewport } from "next";
import "./globals.css";
import BackgroundMusic from "@/components/background";

export const metadata: Metadata = {
  title: "Divyashree & Balasubramani — Wedding Invitation",
  description: "Together with their families — 24 October 2026",
};

export const viewport: Viewport = {
  themeColor: "#fdf6ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream-50 text-stone-800 antialiased">
        <BackgroundMusic/>
        {children}</body>
    </html>
  );
}
