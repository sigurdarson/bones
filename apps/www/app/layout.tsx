import type { Metadata } from "next";
import "@usebones/tokens/index.css";
import "@usebones/react/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "bones — minimal components, built for AI",
  description:
    "A minimal, themable component library built on Base UI. Designed to be read, composed, and extended by humans and agents alike.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
