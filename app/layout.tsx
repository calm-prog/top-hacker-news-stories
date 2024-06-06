import type { Metadata } from "next";
import { JetBrains_Mono } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  title: "Top Hacker News",
  description: "An app that displays 10 top hacker news",
};

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.className}>
      <body>{children}</body>
    </html>
  );
}
