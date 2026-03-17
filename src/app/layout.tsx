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
  title: "김태완 | Backend Developer Portfolio",
  description: "데이터의 정합성과 안정적인 아키텍처를 고민하는 백엔드 개발자 김태완의 포트폴리오입니다.",
  openGraph: {
    title: "김태완 | 백엔드 개발자 포트폴리오",
    description: "데이터 중심 설계와 탄탄한 아키텍처를 지향하는 백엔드 개발자 포트폴리오",
    url: "https://rabbitharu-portfolio.vercel.app", // 배포 후 본인의 실제 도메인으로 변경하세요
    siteName: "TaeWan Kim Portfolio",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
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
