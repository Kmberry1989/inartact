import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indiana Art Activist Inventory",
  description: "Discover the artists, murals, and movements shaping social justice in Indiana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}