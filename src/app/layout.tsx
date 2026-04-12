import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "DJ ADOT | Clubs, Weddings & Events",
  description: "Professional DJ for clubs, weddings, and private events. Check availability and book your next event.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text-primary)]">
        <ConvexClientProvider>
          <Navbar />
          <div className="pt-16 flex-1">
            {children}
          </div>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}