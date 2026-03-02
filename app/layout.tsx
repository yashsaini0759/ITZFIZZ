import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageEntryTransition from "@/components/ui/PageEntryTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ITZFIZZ — Premium Digital Experience",
  description:
    "A cinematic, scroll-driven landing page showcasing premium digital craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <PageEntryTransition />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
