import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

const timesNow = localFont({
  src: [
    { path: "../public/fonts/TimesNow-SemiLight.ttf",       weight: "300", style: "normal" },
    { path: "../public/fonts/TimesNow-SemiLightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/fonts/TimesNow-SemiBold.ttf",        weight: "600", style: "normal" },
    { path: "../public/fonts/TimesNow-SemiBoldItalic.ttf",  weight: "600", style: "italic" },
  ],
  variable: "--font-times-now",
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
    <html lang="en" className={`${spaceMono.variable} ${timesNow.variable}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bsv3osj.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
