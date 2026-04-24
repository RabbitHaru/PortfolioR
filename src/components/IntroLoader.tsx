"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, Sparkles } from "lucide-react";

interface Particle {
    id: number;
    left: string;
    top: string;
    duration: number;
    delay: number;
}

export default function IntroLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // 하이드레이션 오류 방지를 위해 클라이언트에서만 입자 생성
        const newParticles = [...Array(20)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2
        }));
        setParticles(newParticles);

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsVisible(false), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]"
                >
                    {/* 로딩 중에도 배경 조명 일부 노출 */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full" />

                    {/* 우주적인 배경 입자 효과 (클라이언트에서만 렌더링) */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {particles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: [0, 0.5, 0],
                                }}
                                transition={{ 
                                    duration: p.duration, 
                                    repeat: Infinity,
                                    delay: p.delay
                                }}
                                className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
                                style={{
                                    left: p.left,
                                    top: p.top
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative flex flex-col items-center gap-12 z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="p-8 rounded-[40px] bg-slate-900 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                                <Terminal className="w-16 h-16 text-cyan-500" />
                            </div>
                            <motion.div 
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute -top-4 -right-4"
                            >
                                <Sparkles className="w-8 h-8 text-cyan-400" />
                            </motion.div>
                        </motion.div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-col items-center gap-1">
                              <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">TaeWan Kim</h2>
                              <p className="text-[10px] font-mono font-bold text-cyan-500/60 uppercase tracking-[0.5em]">Backend Systems Architecture</p>
                            </div>
                            
                            {/* 프로그레스 바 */}
                            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-6 relative">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-cyan-500"
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                            </div>
                            
                            <span className="text-[10px] font-mono text-cyan-400/40 tracking-widest">{progress}% SYNCHRONIZED</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-12 text-[10px] text-slate-700 font-mono tracking-widest"
                    >
                        © 2026 REPOSITORY.ALL_SYSTEMS_OPERATIONAL
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
