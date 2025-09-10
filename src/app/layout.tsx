import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "BizNews Agent – Headlines that affect business",
    template: "%s – BizNews Agent",
  },
  description:
    "AI agent that fetches recent business news and filters for impact on existing businesses and opportunities. Access articles for $0.05 per request via the x402 protocol. Use GET /news with x402 payment.",
  keywords: [
    "business news",
    "AI agent",
    "x402",
    "paid API",
    "GET /news",
    "headlines",
    "business opportunities",
  ],
  openGraph: {
    title: "BizNews Agent – Headlines that affect business",
    description:
      "AI agent that fetches recent business news and filters for impact on existing businesses and opportunities. Access articles for $0.05 per request via the x402 protocol.",
    type: "website",
    siteName: "BizNews Agent",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizNews Agent – Headlines that affect business",
    description:
      "AI agent that fetches recent business news and filters for impact on existing businesses and opportunities. Access articles for $0.05 per request via the x402 protocol.",
  },
  robots: { index: true, follow: true },
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
        {children}
      </body>
    </html>
  );
}
