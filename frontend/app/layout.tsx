import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import InnerLayoutClient from "./innerLayout";
import ClientProviders from "@/lib/clientProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  title: "NavyanTech | Computer & Laptop Store & Repairing",
  description:
    "NavyanTech is your trusted computer and laptop store in Nepal. We provide high-quality laptops, accessories, and expert repair services at affordable prices.",
  keywords: [
    "NavyanTech",
    "laptop store Nepal",
    "computer shop Butwal",
    "laptop repairing",
    "PC accessories",
    "computer repair Nepal",
  ],
  metadataBase: new URL("https://navyantech.com"),
  openGraph: {
    title: "NavyanTech | Computer & Laptop Store & Repairing",
    description:
      "Trusted laptop & computer store in Nepal. Shop laptops, PCs, and get reliable repair services.",
    url: "https://navyantech.com",
    siteName: "NavyanTech",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "NavyanTech Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NavyanTech | Computer & Laptop Store & Repairing",
    description:
      "Computer & laptop sales and repairing service in Nepal. Trusted by thousands.",
    images: ["/logo.png"],
    creator: "@your_twitter_handle",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body>
        <ClientProviders>
          <InnerLayoutClient>{children}</InnerLayoutClient>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ClientProviders>
      </body>
    </html>
  );
}
