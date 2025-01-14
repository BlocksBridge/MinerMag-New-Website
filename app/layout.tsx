import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { revalidateTag } from "next/cache";
import Header from "@/components/Header/Header";

import Footer from "@/components/Footer/Footer";
import { geistMono, geistSans } from "./fonts/fonts";
import TopHeader from "@/components/Header/TopHeader";

export const metadata: Metadata = {
  title: "theMinerMag",
  description: "Best Bitcoin Mining Updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <TopHeader />
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
