import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";

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

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
};

export default AuthLayout;
