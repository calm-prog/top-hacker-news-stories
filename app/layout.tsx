import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Top Hacker News",
  description: "An app that displays 10 top hacker news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
