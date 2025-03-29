import type { Metadata } from "next";
import "./globals.css";
import inter from "@/styles/fonts";
import { QueryProvider } from "@/providers";
import { Toaster } from "react-hot-toast";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Kämil Ussat",
  description: "Kämil Ussat – A team of skilled software engineers and web developers dedicated to building innovative solutions for both local and international companies.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <QueryProvider>
      <NextIntlClientProvider messages={messages}>
        <html className={`no-scrollbar ${inter.variable}`} lang={locale}>
          <body className={`antialiased bg-white dark:bg-[#0C111D]`}>
            {children}
            <Toaster position="bottom-center" />
          </body>
        </html>
      </NextIntlClientProvider>
    </QueryProvider>
  );
}
