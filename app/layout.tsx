import type { Metadata } from "next";
import "./globals.css";
import inter from "@/styles/fonts";
import { QueryProvider } from "@/providers";
import { Toaster } from "react-hot-toast";

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
    <QueryProvider>
      <html lang="en" className={`no-scrollbar ${inter.variable}`}>
        <body className={`antialiased bg-white dark:bg-[#0C111D]`}>
          {children}
          <Toaster position="bottom-center" />
        </body>
      </html>
    </QueryProvider>
  );
}
