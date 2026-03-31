import type { Metadata } from "next";
import { Fira_Code, Inter, Montserrat } from "next/font/google";

import { ThemeInitScript } from "@/ds";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blueprint",
  description: "DS-first starter kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeInitScript />
      </head>
      <body>
        <a className="ui-skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
