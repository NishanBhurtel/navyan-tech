// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/lib/toast";
import InnerLayoutClient from "./innerLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TechHub Pro - Premium Computers, Laptops & Components",
  description:
    "Discover cutting-edge computers, gaming laptops, and high-performance components. Build your dream PC with professional-grade hardware.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <html
        lang="en"
        className={`${playfair.variable} ${sourceSans.variable} antialiased`}
      >
        <body className="font-sans">
          <InnerLayoutClient>{children}</InnerLayoutClient>
        </body>
      </html>
    </ToastProvider>
  );
}
