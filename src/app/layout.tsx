import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WIBEN — Wisconsin Beninese Community Association",
  description: "Connecting and empowering the Beninese community in Wisconsin since 2019.",
  keywords: ["WIBEN", "Beninese", "Wisconsin", "community", "association", "Madison"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
