import type { Metadata } from "next";
import "./globals.css";
import inter from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Kämil Ussat",
  description: "Kämil Ussat – A team of skilled software engineers and web developers dedicated to building innovative solutions for both local and international companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`no-scrollbar ${inter.variable}`}>
      <body
        className={`antialiased bg-white dark:bg-[#0C111D]`}
      >
        {children}
      </body>
    </html>
  );
}
