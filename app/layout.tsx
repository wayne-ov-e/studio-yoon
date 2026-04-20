import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ebGaramond = localFont({
  src: [
    { path: "../public/fonts/EBGaramond-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/EBGaramond-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-garamond",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "../public/fonts/SpaceMono-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/SpaceMono-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "../public/fonts/CormorantGaramond-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/CormorantGaramond-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/CormorantGaramond-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/CormorantGaramond-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/CormorantGaramond-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/CormorantGaramond-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/CormorantGaramond-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/CormorantGaramond-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-cormorant",
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
    <html lang="en" className={`${ebGaramond.variable} ${spaceMono.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
