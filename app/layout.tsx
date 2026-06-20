import type React from "react";
import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import Navbar from "@/components/navbar";

const prestibook = localFont({
  src: "../public/fonts/PrestiDisplay-Book.woff",
  variable: "--font-prestibook",
  display: "swap",
});

const prestiblack = localFont({
  src: "../public/fonts/PrestiDisplay-Black.woff",
  variable: "--font-prestiblack",
  display: "swap",
});

const prestiregular = localFont({
  src: "../public/fonts/PrestiDisplay-Regular.woff",
  variable: "--font-prestiregular",
  display: "swap",
});

const prestisemibold = localFont({
  src: "../public/fonts/PrestiDisplay-Semibold.woff",
  variable: "--font-prestisemibold",
  display: "swap",
});

const prestibold = localFont({
  src: "../public/fonts/PrestiDisplay-Bold.woff",
  variable: "--font-prestibold",
  display: "swap",
});

const hopelessromantic = localFont({
  src: "../public/fonts/HopelessRomanticSociety.woff",
  variable: "--font-hopeless-romantic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.winnieswim.com"),

  title: "WinnieSwim",
  description:
    "WinnieSwim was born out of friendship, creativity, and love for sunshine.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  openGraph: {
    title: "WinnieSwim",
    description:
      "WinnieSwim was born out of friendship, creativity, and love for sunshine.",
    url: "https://www.winnieswim.com",
    siteName: "WinnieSwim",
    images: [
      {
        url: "/icons/og-preview.png",
        width: 1200,
        height: 630,
        alt: "WinnieSwim – More Sun + Less Clothes",
      },
    ],

    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WinnieSwim",
    description:
      "WinnieSwim was born out of friendship, creativity, and love for sunshine.",
    images: ["/icons/og-preview.png"],
  },
  alternates: {
    canonical: "https://www.winnieswim.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-NGGBCN9D90"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NGGBCN9D90', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </head>
      <body
        className={` ${prestibold.variable}  ${prestiblack.variable} ${prestiregular.variable} ${prestisemibold.variable} ${prestibold.variable} ${prestibook.variable}  ${hopelessromantic.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
