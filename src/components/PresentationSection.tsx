"use client";

import { useState } from "react";
import { Presentation, Download, FileText, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
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
        { id: 1, title: "전체 포트폴리오 메인", file: "/downloads/Protfolio_김태완.V.260317.pdf", category: "Full Portfolio" },
        { id: 2, title: "Ex-Ledger 상세 아키텍처", file: "/downloads/ex-ledger_presentation.pdf", category: "Ex-Ledger" },
        { id: 3, title: "Weatherly 데이터 흐름", file: "/downloads/weatherly_presentation.pdf", category: "Weatherly" },
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
        <section id="presentation" className="py-24 bg-[#0f172a]">
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
                                href="/downloads/Protfolio_김태완.V.260317.pdf"
                                download
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold border border-cyan-400/30 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                            >
                                <Download className="w-5 h-5" />
                                전체 포트폴리오 PDF
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

                {/* PPT 슬라이드 카드 그리드 (3장) */}
                <div className="grid md:grid-cols-3 gap-8">
                    {slidesData.map((slide, idx) => (
                        <ScrollReveal key={slide.id} delay={idx * 0.15}>
                            <div className="group flex flex-col bg-slate-900 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all overflow-hidden shadow-2xl">
                                
                                {/* 이미지 영역 (제어 버튼 포함) */}
                                <div className="relative aspect-video bg-slate-800 overflow-hidden cursor-zoom-in">
                                    <div className="absolute inset-0 z-10" onClick={() => setSelectedSlide(slide)}>
                                      <PDFPreview 
                                          fileUrl={slide.file} 
                                          pageNumber={currentPages[slide.id]} 
                                          onLoadSuccess={(total) => setTotalPageCounts(prev => ({ ...prev, [slide.id]: total }))}
                                          className="w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700"
                                      />
                                    </div>

                                    {/* 크게 보기 런처 아이콘 */}
                                    <div className="absolute top-3 left-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className="p-2 rounded-lg bg-cyan-600 shadow-xl">
                                            <Maximize2 className="w-4 h-4 text-white" />
                                        </div>
                                    </div>

                                    {/* 페이지 컨트롤 Overlays */}
                                    <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handlePageChange(slide.id, 'prev'); }}
                                            disabled={currentPages[slide.id] <= 1}
                                            className="p-2 rounded-full bg-black/60 text-white hover:bg-cyan-500 transition-colors pointer-events-auto disabled:opacity-0"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <div className="px-3 py-1 bg-black/60 rounded-full text-[10px] text-cyan-400 font-mono pointer-events-auto border border-white/10">
                                          {currentPages[slide.id]} / {totalPageCounts[slide.id] || '?'}
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handlePageChange(slide.id, 'next'); }}
                                            disabled={currentPages[slide.id] >= (totalPageCounts[slide.id] || 1)}
                                            className="p-2 rounded-full bg-black/60 text-white hover:bg-cyan-500 transition-colors pointer-events-auto disabled:opacity-0"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-15 pointer-events-none" />
                                </div>

                                {/* 하단 텍스트 코멘트 영역 */}
                                <div className="p-6 bg-[#1e293b]/50 border-t border-white/5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-1 w-8 bg-cyan-500 rounded-full" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{slide.category}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-100 text-lg mb-2">{slide.title}</h3>
                                    <button 
                                        onClick={() => setSelectedSlide(slide)}
                                        className="text-xs text-cyan-400 font-medium flex items-center gap-1 hover:text-cyan-300 transition-colors"
                                    >
                                        전문화면으로 보기 <Maximize2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
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
