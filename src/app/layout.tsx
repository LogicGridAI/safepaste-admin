import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafePaste Enterprise Admin",
  description: "SafePaste Enterprise control panel for IT administrators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
