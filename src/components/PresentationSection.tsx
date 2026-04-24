"use client";

import { useState } from "react";
import { Presentation, Download, FileText, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import dynamic from "next/dynamic";
import PDFModal from "@/components/PDFModal";

const PDFPreview = dynamic(() => import("@/components/PDFPreview"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-800 animate-pulse rounded-lg" />
});

export default function PresentationSection() {
    // 실제 업로드해주신 PDF 파일들을 미리보기로 연결합니다.
    const slidesData = [
        { id: 1, title: "2026 BACKEND PORTFOLIO", file: "/downloads/Protfolio_김태완.V.260423.pdf", category: "Featured Portfolio", description: "전체 핵심 역량과 프로젝트 요약이 담긴 통합 포트폴리오 자료입니다." },
        { id: 2, title: "Ex-Ledger 상세 아키텍처", file: "/downloads/ex-ledger_presentation.pdf", category: "Ex-Ledger", description: "B2B 결제 보안 및 API 설계 상세 분석" },
        { id: 3, title: "Weatherly 데이터 흐름", file: "/downloads/weatherly_presentation.pdf", category: "Weatherly", description: "공공데이터 연동 및 파이프라인 구조도" },
    ];

    // 각 카드별 현재 보여지는 페이지들을 관리하는 상태입니다.
    const [currentPages, setCurrentPages] = useState<Record<number, number>>({
        1: 1, 2: 1, 3: 1
    });

    // 각 카드별 PDF의 전체 페이지 수를 저장합니다.
    const [totalPageCounts, setTotalPageCounts] = useState<Record<number, number>>({});

    // 모달 상태 관리
    const [selectedSlide, setSelectedSlide] = useState<typeof slidesData[0] | null>(null);

    const handlePageChange = (slideId: number, direction: 'prev' | 'next') => {
        const currentPage = currentPages[slideId] || 1;
        const totalPages = totalPageCounts[slideId] || 1;

        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPages(prev => ({ ...prev, [slideId]: currentPage + 1 }));
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPages(prev => ({ ...prev, [slideId]: currentPage - 1 }));
        }
    };

    return (
        <section id="presentation" className="py-24 bg-transparent">
            <div className="container mx-auto px-6 max-w-6xl">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        {/* 섹션 제목 */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Presentation className="w-8 h-8 text-cyan-500" />
                                <h2 className="text-3xl font-bold text-white">Project Presentation</h2>
                                <span className="px-2 py-0.5 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full flex items-center gap-1">
                                    Interactive
                                </span>
                            </div>
                            <p className="text-slate-400">
                                각 프로젝트의 상세 설계를 고화질로 확인해 보세요. (이미지를 클릭하면 크게 볼 수 있습니다.)
                            </p>
                        </div>

                        {/* 다운로드 버튼 그룹 */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/downloads/Protfolio_김태완.V.260423.pdf"
                                download
                                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.3)] group/btn"
                            >
                                <Download className="w-6 h-6 group-hover/btn:animate-bounce" />
                                DOWNLOAD FULL PORTFOLIO (PDF)
                            </a>
                            <div className="flex gap-2">
                                <a
                                    href="/downloads/ex-ledger_presentation.pdf"
                                    download
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-white/10"
                                >
                                    Ex-Ledger
                                </a>
                                <a
                                    href="/downloads/weatherly_presentation.pdf"
                                    download
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-white/10"
                                >
                                    Weatherly
                                </a>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col gap-12 relative">
                    {/* 섹션 배경 액센트 조명 */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute top-1/2 -right-20 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

                    {/* 1. 메인 포트폴리오 (강조형 와이드 카드) */}
                    <ScrollReveal>
                        <div className="group relative flex flex-col lg:flex-row bg-white/70 dark:bg-slate-900/40 rounded-[40px] border border-slate-200 dark:border-cyan-500/50 hover:border-cyan-500 transition-all overflow-hidden shadow-xl dark:shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-2xl">
                            {/* 프리뷰 영역 */}
                            <div className="lg:w-3/5 relative aspect-video bg-slate-100 dark:bg-black/60 overflow-hidden cursor-zoom-in border-r border-slate-200 dark:border-white/10">
                                <div className="absolute inset-0 z-10" onClick={() => setSelectedSlide(slidesData[0])}>
                                    <PDFPreview 
                                        fileUrl={slidesData[0].file} 
                                        pageNumber={currentPages[1]} 
                                        onLoadSuccess={(total) => setTotalPageCounts(prev => ({ ...prev, [1]: total }))}
                                        className="w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-1000"
                                    />
                                </div>
                                <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-between px-8 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={(e) => { e.stopPropagation(); handlePageChange(1, 'prev'); }} disabled={currentPages[1] <= 1} className="p-3 rounded-full bg-black/60 text-white hover:bg-cyan-500 disabled:opacity-0"><ChevronLeft className="w-6 h-6" /></button>
                                    <div className="px-4 py-1.5 bg-black/80 rounded-full text-xs text-cyan-400 font-mono border border-white/10 tracking-widest">{currentPages[1]} / {totalPageCounts[1] || '?'}</div>
                                    <button onClick={(e) => { e.stopPropagation(); handlePageChange(1, 'next'); }} disabled={currentPages[1] >= (totalPageCounts[1] || 1)} className="p-3 rounded-full bg-black/60 text-white hover:bg-cyan-500 disabled:opacity-0"><ChevronRight className="w-6 h-6" /></button>
                                </div>
                                <div className="absolute top-6 left-6 z-30">
                                    <div className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-black text-xs tracking-widest shadow-xl flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" /> FEATURED
                                    </div>
                                </div>
                            </div>

                            {/* 텍스트 영역 */}
                            <div className="lg:w-2/5 p-10 lg:p-14 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-12 bg-cyan-500 rounded-full" />
                                    <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em]">Full Portfolio</span>
                                </div>
                                <h3 className="font-black text-white text-3xl lg:text-4xl mb-6 leading-tight">
                                    Backend Engineer<br/>Career Portfolio
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                                    기술적 도전과 문제 해결 과정, 그리고 백엔드 엔지니어로서의 철학이 담긴 통합 포트폴리오입니다.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button 
                                        onClick={() => setSelectedSlide(slidesData[0])}
                                        className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 transition-all"
                                    >
                                        <Maximize2 className="w-5 h-5 text-cyan-500" /> 전문화면 보기
                                    </button>
                                    <a 
                                        href={slidesData[0].file}
                                        download
                                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/20 transition-all"
                                    >
                                        <Download className="w-5 h-5" /> 다운로드
                                    </a>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* 2. 서브 프로젝트 PPT (2열 그리드) */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {slidesData.slice(1).map((slide, idx) => (
                            <ScrollReveal key={slide.id} delay={idx * 0.15}>
                                <div className="group flex flex-col bg-white/50 dark:bg-slate-900/20 rounded-[32px] border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 transition-all overflow-hidden backdrop-blur-xl">
                                    <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-zoom-in">
                                        <div className="absolute inset-0 z-10" onClick={() => setSelectedSlide(slide)}>
                                            <PDFPreview 
                                                fileUrl={slide.file} 
                                                pageNumber={currentPages[slide.id]} 
                                                onLoadSuccess={(total) => setTotalPageCounts(prev => ({ ...prev, [slide.id]: total }))}
                                                className="w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={(e) => { e.stopPropagation(); handlePageChange(slide.id, 'prev'); }} disabled={currentPages[slide.id] <= 1} className="p-2 rounded-full bg-white/80 dark:bg-black/60 text-slate-900 dark:text-white hover:bg-cyan-500 disabled:opacity-0 shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
                                            <div className="px-3 py-1 bg-white/80 dark:bg-black/60 rounded-full text-[10px] text-cyan-600 dark:text-cyan-400 font-mono border border-slate-200 dark:border-white/10">{currentPages[slide.id]} / {totalPageCounts[slide.id] || '?'}</div>
                                            <button onClick={(e) => { e.stopPropagation(); handlePageChange(slide.id, 'next'); }} disabled={currentPages[slide.id] >= (totalPageCounts[slide.id] || 1)} className="p-2 rounded-full bg-white/80 dark:bg-black/60 text-slate-900 dark:text-white hover:bg-cyan-500 disabled:opacity-0 shadow-sm"><ChevronRight className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-1 w-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{slide.category}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xl mb-4">{slide.title}</h3>
                                        <button onClick={() => setSelectedSlide(slide)} className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">전문화면으로 보기 <Maximize2 className="w-3 h-3" /></button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* 상세 모달 창 */}
            <PDFModal 
                isOpen={!!selectedSlide}
                onClose={() => setSelectedSlide(null)}
                fileUrl={selectedSlide?.file || ""}
                title={selectedSlide?.title || ""}
                initialPage={selectedSlide ? currentPages[selectedSlide.id] : 1}
            />
        </section>
    );
}
