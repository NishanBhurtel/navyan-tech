// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import InnerLayoutClient from "./innerLayout";
import ClientProviders from "@/lib/clientProvider";
import { SessionProvider } from "next-auth/react";

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

// export const metadata: Metadata = {
//   title: "TechHub Pro - Premium Computers, Laptops & Components",
//   description:
//     "Discover cutting-edge computers, gaming laptops, and high-performance components. Build your dream PC with professional-grade hardware.",
//   generator: "v0.app",
//   icons: {
//     icon: "/NavYantra-Logo.png",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
          <ClientProviders>
            <InnerLayoutClient>{children}</InnerLayoutClient>
          </ClientProviders>
      </body>
    </html>
  );
}
