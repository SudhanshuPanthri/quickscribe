import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/sonner"
import {
  ClerkProvider
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Quickscribe",
  description: "An AI App that helps you summarize your PDF's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
