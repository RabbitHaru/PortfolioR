"use client";

import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    // 스크롤 감지 이벤트로 헤더 배경의 투명도 조절
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 부드러운 스크롤 이동을 위한 핸들러
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // 상단 헤더 높이를 고려하여 여백을 두고 스크롤
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3 shadow-xl"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">

                {/* 상단 로고 역할 (Home으로 이동) */}
                <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, "home")}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-shadow">
                        <Terminal className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors hidden sm:block">
                        Backend Dev
                    </span>
                </a>

                {/* 내비게이션 메뉴 */}
                <nav className="flex items-center gap-1 sm:gap-6 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    <a
                        href="#skills"
                        onClick={(e) => scrollToSection(e, "skills")}
                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1"
                    >
                        Tech Stack
                    </a>
                    <a
                        href="#projects"
                        onClick={(e) => scrollToSection(e, "projects")}
                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1"
                    >
                        Projects
                    </a>
                    <a
                        href="#presentation"
                        onClick={(e) => scrollToSection(e, "presentation")}
                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1"
                    >
                        Presentation
                    </a>
                </nav>

            </div>
        </header>
    );
}
