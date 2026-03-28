import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-cormorant", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = { title: "WIBEN Admin", robots: "noindex, nofollow" };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jakarta.variable} antialiased`} style={{ backgroundColor: "#080f08" }}>
        {children}
      </body>
    </html>
  );
}
