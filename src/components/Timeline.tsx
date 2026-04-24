"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code, Award, Calendar } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface TimelineItem {
    id: number;
    title: string;
    organization: string;
    period: string;
    description: string;
    icon: React.ReactNode;
    techs?: string[];
}

const timelineData: TimelineItem[] = [
    {
        id: 1,
        title: "rBook: Architecture Modernization",
        organization: "Personal Development",
        period: "2026.03 ~ 2026.04",
        description: "수료 후, 과거 직접 개발했던 Servlet/JSP 기반 rBook의 기술적 부채를 해결하기 위해 Spring Boot와 React로 전면 리팩토링을 완료했습니다.",
        icon: <Briefcase className="w-5 h-5" />,
        techs: ["Refactoring", "Architecture Design", "Decoupling"]
    },
    {
        id: 2,
        title: "Advanced Backend Research",
        organization: "Self-Directed Learning",
        period: "2026.03 ~ Present",
        description: "데이터 정합성과 보안 아키텍처에 집중하여 포트폴리오를 고도화하고 있습니다. JPA 성능 최적화 및 Querydsl을 활용한 복잡한 쿼리 처리를 학습 중입니다.",
        icon: <Award className="w-5 h-5" />,
        techs: ["Spring Security", "JPA", "Querydsl", "Redis"]
    },
    {
        id: 3,
        title: "Ex-Ledger: B2B Security Architecture",
        organization: "Project Development",
        period: "2026.02 ~ 2026.03",
        description: "팀 프로젝트의 백엔드 리더로서 5단계 보안 계층과 JWT+Redis RTR 인증 체계를 구축했습니다. Spring AOP를 이용한 전역 감사 로그 시스템을 구현했습니다.",
        icon: <Code className="w-5 h-5" />,
        techs: ["Spring Boot", "Spring AOP", "JWT", "AWS"]
    },
    {
        id: 4,
        title: "Weatherly: Data Pipeline Optimization",
        organization: "Project Development",
        period: "2026.01 ~ 2026.01",
        description: "다량의 외부 API 데이터를 효율적으로 수집하고 정제하는 데이터 파이프라인을 구축했습니다. 비정형 데이터의 안정적인 처리를 위한 DTO 구조 최적화에 집중했습니다.",
        icon: <Code className="w-5 h-5" />,
        techs: ["Spring Boot", "MariaDB", "RESTful API"]
    },
    {
        id: 5,
        title: "rBook: Initial Backend Development",
        organization: "Personal Project",
        period: "2025.11 ~ 2025.12",
        description: "백엔드의 근본 원리를 이해하기 위해 프레임워크 없이 Java Servlet과 JSP만을 활용하여 도서 관리 시스템의 핵심 로직을 구현했습니다.",
        icon: <Briefcase className="w-5 h-5" />,
        techs: ["Java Servlet", "JSP", "JDBC", "MVC Pattern"]
    },
    {
        id: 6,
        title: "Full-Stack 개발자 양성 과정",
        organization: "부산IT교육센터",
        period: "2025.10 ~ 2026.03",
        description: "자바 기초부터 웹 애플리케이션 프레임워크까지 백엔드 중심의 풀스택 개발 역량을 쌓았습니다.",
        icon: <GraduationCap className="w-5 h-5" />,
        techs: ["Java", "Oracle", "MySQL", "Web Programming"]
    }
];

export default function Timeline() {
    return (
        <section id="experience" className="py-24 relative overflow-hidden bg-transparent">
            {/* 배경 데코레이션 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-[0.2em] mb-6 uppercase">
                            Career & Learning
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tight leading-tight">
                            성장의 <span className="text-cyan-500 italic">궤적</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="relative">
                    {/* 중앙 선 */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-slate-800 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {timelineData.map((item, idx) => (
                            <ScrollReveal 
                                key={item.id} 
                                direction={idx % 2 === 0 ? "right" : "left"}
                                delay={idx * 0.1}
                            >
                                <div className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* 원형 마커 */}
                                    <div className="absolute left-4 md:left-1/2 top-0 md:top-8 w-8 h-8 rounded-full bg-[#0f172a] border-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-20 -translate-x-1/2 flex items-center justify-center">
                                         <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    </div>

                                    {/* 콘텐츠 카드 */}
                                    <div className="flex-1 w-full pl-12 md:pl-0">
                                        <div className={`p-8 rounded-[32px] bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-slate-800/40 transition-all duration-500 group`}>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 group-hover:scale-110 transition-transform">
                                                            {item.icon}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                                            <p className="text-sm text-slate-500 font-bold">{item.organization}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/50 text-[10px] font-bold text-slate-400 border border-white/5 whitespace-nowrap">
                                                        <Calendar className="w-3 h-3 text-cyan-600" />
                                                        {item.period}
                                                    </div>
                                                </div>
                                                
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    {item.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {item.techs?.map((tech, tIdx) => (
                                                        <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-slate-500 border border-transparent group-hover:border-cyan-500/20 group-hover:text-cyan-500 transition-all">
                                                            #{tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 반대편 여백 (데스크탑) */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
