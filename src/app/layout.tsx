import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Slash",
  description: "PRODUCTIVITY THAT READS AS UX",
  icons: {
    icon: "/logo-toss-symbol-dark-fill.ico",
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
        <link rel="preconnect" href="https://static.toss.im" crossOrigin="anonymous" />
        <link rel="preload" href="https://static.toss.im/tps/main.css" as="style" />
        <link rel="preload" href="https://static.toss.im/tps/others.css" as="style" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
