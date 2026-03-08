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
  title: "백엔드 개발자 포트폴리오 | 정합성을 고민합니다",
  description: "안전하고 논리적인 서버 아키텍처를 설계하는 신입 백엔드 개발자의 포트폴리오입니다.",
  openGraph: {
    title: "Backend Developer Portfolio",
    description: "데이터 중심 설계와 탄탄한 아키텍처를 지향하는 백엔드 개발자 포트폴리오",
    url: "https://your-domain.vercel.app", // 배포 후 본인 도메인으로 변경하세요
    siteName: "Backend Portfolio",
    images: [
      {
        url: "/og-image.jpg", // public 폴더에 og-image.jpg 를 추가하시면 카카오톡 링크 전송시 나타납니다.
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
