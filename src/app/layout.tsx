import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BadgeEarnedToast } from "@/components/BadgeEarnedToast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Brainy Bit — Unlock the mind of a genius",
    template: "%s · Brainy Bit",
  },
  description:
    "Bite-sized, well-explained learning for curious kids: money, world news, geography & history, big questions & cool tech, books, and science & maths.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <BadgeEarnedToast />
      </body>
    </html>
  );
}
