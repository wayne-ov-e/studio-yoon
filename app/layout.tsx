import type { Metadata } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "../public/fonts/SpaceMono-Regular.ttf",    weight: "400", style: "normal" },
    { path: "../public/fonts/SpaceMono-Italic.ttf",     weight: "400", style: "italic" },
    { path: "../public/fonts/SpaceMono-Bold.ttf",       weight: "700", style: "normal" },
    { path: "../public/fonts/SpaceMono-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YOON — Interior Design Studio",
  description:
    "An interior design studio passionate about transforming houses into homes through textural details.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${ebGaramond.variable}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bsv3osj.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
