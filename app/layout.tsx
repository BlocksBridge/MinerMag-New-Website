import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { revalidateTag } from "next/cache";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { geistMono, geistSans } from "./fonts/fonts";
import TopHeader from "@/components/Header/TopHeader";

export const metadata: Metadata = {
  title: "TheMinerMag - Bitcoin Mining Stocks, Data, Research and Analysis",
  description:
    "TheMinerMag is a bitcoin mining news and research platform brought to you by BlocksBridge Consulting, a public relations firm dedicated to the bitcoin mining industry. TheMinerMag operates with full editorial independence, delivering accurate, data-driven insights and unbiased analysis on industry trends.",
  publisher: "BlocksBridge Consulting",
  keywords: ["Bitcoin Mining"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
    other: { rel: "TheMinerMag Logo", url: "/images/logo.png" },
  },
  openGraph: {
    title: "TheMinerMag - Bitcoin Mining Stocks, Data, Research and Analysis",
    description:
      "TheMinerMag is a bitcoin mining news and research platform brought to you by BlocksBridge Consulting, a public relations firm dedicated to the bitcoin mining industry. TheMinerMag operates with full editorial independence, delivering accurate, data-driven insights and unbiased analysis on industry trends.",
    siteName: "TheMinerMag",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_website_url}/images/logo.png`,
        alt: "TheMinerMag Logo",
        width: 800,
        height: 600,
      },
    ],
  },
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
