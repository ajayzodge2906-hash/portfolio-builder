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
  title: "Portfolio Builder",
  description: "Modern Portfolio Generator for Recruiter-Ready Profiles",

  // 🔥 Embedded Identity
  authors: [{ name: "Ajay Zodge" }],
  creator: "Ajay Zodge",
  metadataBase: new URL("https://portfolio-builder-swart.vercel.app"),

  openGraph: {
    title: "Portfolio Builder",
    description: "Built by Ajay Zodge • Next.js + Flask Portfolio Engine",
    siteName: "AZ Portfolio Engine",
    type: "website",
  },

  other: {
    designer: "Ajay Zodge",
    engine: "AZ Portfolio Engine 2026",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Invisible Embedded Signature */}
        <div className="absolute opacity-0 pointer-events-none select-none">
          EngineeredByAjayZodge_AZ_PortfolioEngine_2026
        </div>

      </body>
    </html>
  );
}