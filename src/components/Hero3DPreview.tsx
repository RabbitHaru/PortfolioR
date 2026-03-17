"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { BookOpen, Sparkles, ShieldCheck } from "lucide-react";

const PDFPreview = dynamic(() => import("@/components/PDFPreview"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-800/50 animate-pulse rounded-2xl" />
});

export default function Hero3DPreview() {
    return (
        <div className="relative w-full h-[450px] flex items-center justify-center p-4">
            {/* 배경 장식 요소들 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
            
            <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 30 }}
                animate={{ opacity: 1, x: 0, rotateY: -20, rotateX: 10 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ perspective: "1500px" }}
                className="relative w-full max-w-[340px] aspect-[1/1.414] group"
            >
                {/* 3D 카드 본체 */}
                <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full bg-[#1e293b] rounded-[40px] border border-white/20 shadow-[20px_40px_80px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu flex flex-col"
                >
                    {/* 카드 테두리 그라데이션 광택 */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 z-20 pointer-events-none" />
                    
                    {/* PDF 미리보기 영역 */}
                    <div className="flex-1 bg-slate-900 relative overflow-hidden">
                        <PDFPreview 
                            fileUrl="/downloads/Protfolio_김태완.V.260317.pdf" 
                            pageNumber={1} 
                            className="w-full h-full scale-110 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                    </div>
                    
                    {/* 하단 타이틀 영역 (책 커버 느낌) */}
                    <div className="p-8 bg-slate-900 border-t border-white/10 relative z-20">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                            <span className="text-[10px] font-bold text-cyan-400 tracking-[0.3em] uppercase">Architecture</span>
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight mb-2">Portfolio 2026</h3>
                        <p className="text-xs text-slate-500">Backend Engineering & System Integrity</p>
                    </div>

                    {/* 플로팅 뱃지 */}
                    <div className="absolute top-6 right-6 z-30">
                        <div className="px-3 py-1.5 rounded-full bg-cyan-500 text-white text-[10px] font-bold shadow-lg shadow-cyan-500/40 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            NEW
                        </div>
                    </div>
                </motion.div>

                {/* 3D 깊이감을 위한 뒤편 그림자 레이어 */}
                <div className="absolute inset-0 bg-cyan-900/20 blur-3xl -z-10 translate-x-10 translate-y-10 rounded-full" />
                
                {/* 인터랙션 가이드 아이콘 */}
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-6 -right-6 z-40 p-4 rounded-2xl bg-slate-800 border border-white/10 shadow-2xl flex items-center gap-3"
                >
                    <BookOpen className="w-6 h-6 text-cyan-400" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Preview</span>
                        <span className="text-[8px] text-slate-500">Main Document</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
