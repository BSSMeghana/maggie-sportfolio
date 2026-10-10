import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PortfolioPreloader } from "@/components/portfolio-preloader";
import { CustomCursor } from "@/components/custom-cursor";

import "./globals.css";

export const metadata: Metadata = {
  title: "Maggie’s Portfolio",
  description: "Product design portfolio",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <PortfolioPreloader />
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
