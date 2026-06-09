import type { Metadata } from "next";
import "./globals.css";

import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: siteName,
  description: "Selected work by Meirion Pritchard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
