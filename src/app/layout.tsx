import type { Metadata } from "next";
import "./globals.css";

import { siteName } from "@/lib/site";
import { PageShell } from "@/components/frame";

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
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
