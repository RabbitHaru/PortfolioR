"use client";

import { X, ChevronLeft, ChevronRight, Maximize2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PDFPreview = dynamic(() => import("@/components/PDFPreview"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center text-slate-500 font-mono text-xs">LOADING DOCUMENT...</div>
});

interface PDFModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
    title: string;
    initialPage?: number;
}

export default function PDFModal({ isOpen, onClose, fileUrl, title, initialPage = 1 }: PDFModalProps) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPageCount, setTotalPageCount] = useState(0);

    // 모달이 열릴 때 페이지 초기화
    useEffect(() => {
        if (isOpen) {
            setCurrentPage(initialPage);
            // ESC 키 감지하여 닫기
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden"; // 배경 스크롤 차단
            return () => {
                window.removeEventListener("keydown", handleEsc);
                document.body.style.overflow = "auto";
            };
        }
    }, [isOpen, initialPage, onClose]);

    const goToPrev = () => {
        if (currentPage > 1) setCurrentPage(p => p - 1);
    };

    const goToNext = () => {
        if (currentPage < totalPageCount) setCurrentPage(p => p + 1);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    {/* 배경 오버레이 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                    />

                    {/* 모달 콘텐츠 */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-6xl h-[85vh] bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* 헤더 바 */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-900/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                                    <Maximize2 className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg text-white truncate max-w-[200px] md:max-w-md">{title}</h3>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/30 rounded-full text-xs font-mono text-cyan-400">
                                    PAGE {currentPage} / {totalPageCount || '?'}
                                </div>
                                <a 
                                    href={fileUrl} 
                                    download 
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                                    title="Download PDF"
                                >
                                    <Download className="w-5 h-5" />
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-all active:scale-90"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* 메인 뷰어 영역 */}
                        <div className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden">
                            <PDFPreview 
                                fileUrl={fileUrl} 
                                pageNumber={currentPage} 
                                onLoadSuccess={setTotalPageCount}
                                className="w-full h-full"
                            />

                            {/* 네비게이션 버튼 (옆으로 크게 배치) */}
                            <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none">
                                <button
                                    onClick={goToPrev}
                                    disabled={currentPage <= 1}
                                    className="p-4 rounded-full bg-black/60 text-white hover:bg-cyan-500 transition-all pointer-events-auto disabled:opacity-0 disabled:scale-90 shadow-xl"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <button
                                    onClick={goToNext}
                                    disabled={currentPage >= totalPageCount}
                                    className="p-4 rounded-full bg-black/60 text-white hover:bg-cyan-500 transition-all pointer-events-auto disabled:opacity-0 disabled:scale-90 shadow-xl"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                        
                        {/* 하단 모바일 바 */}
                        <div className="md:hidden flex items-center justify-center gap-6 py-4 bg-slate-900/80 border-t border-white/5">
                            <span className="text-sm font-mono text-cyan-400">{currentPage} / {totalPageCount}</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
