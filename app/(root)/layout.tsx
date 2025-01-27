import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import Bottombar from "@/components/shared/Bottombar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Writer - Write. Share. Inspire.",
    template: "%s | Writer - Write. Share. Inspire.",
  },
  description:
    "Discover the ultimate platform for writers and bloggers. Share your stories, connect with readers, and unleash your creativity with our user-friendly blogging app. Join now and start your writing journey!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="view-area pt-[70px]">{children}</main>
        <Bottombar />
        <Toaster />
      </body>
    </html>
  );
}
