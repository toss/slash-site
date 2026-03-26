import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Slash",
  description:
    "The Slash library is a collection of TypeScript/JavaScript packages used by Toss.",
  icons: {
    icon: "/logo-toss-symbol-dark-fill.ico",
  },
  openGraph: {
    title: "Slash",
    description:
      "The Slash library is a collection of TypeScript/JavaScript packages used by Toss.",
    url: "https://www.slash.page",
    siteName: "Slash",
    images: [
      {
        url: "/og.png",
        width: 2402,
        height: 1462,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slash",
    description:
      "The Slash library is a collection of TypeScript/JavaScript packages used by Toss.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
