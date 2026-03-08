import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Backend Developer Portfolio",
  description: "Portfolio showcasing backend development projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body
        className={`${notoSansKr.variable} font-sans antialiased bg-[#0f172a] text-slate-50 relative`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
