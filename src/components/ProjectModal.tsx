"use client";

import { useState, useEffect } from "react";
import { X, ExternalLink, PlayCircle, RefreshCcw, Download, Maximize2, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import PDFModal from "./PDFModal";
import PDFPreview from "./PDFPreview";

interface ProjectModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setCurrentPage(1);
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                onClick={onClose}
            />
            
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 flex flex-col pointer-events-auto"
            >
                {/* Header */}
                <div className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-1">{project.type}</span>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{project.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-90 border border-slate-200 dark:border-white/5"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* PPT Preview Section */}
                    <div className="relative group/gallery aspect-video bg-slate-100 dark:bg-black overflow-hidden border-b border-slate-200 dark:border-white/5">
                        {project.presentationUrl ? (
                            <>
                                <div className="absolute inset-0 z-10 flex items-center justify-center">
                                    <PDFPreview 
                                        fileUrl={project.presentationUrl} 
                                        pageNumber={currentPage}
                                        onLoadSuccess={(total) => setTotalPages(total)}
                                        className="w-full h-full object-contain opacity-90 group-hover/gallery:opacity-100 transition-opacity"
                                    />
                                </div>
                                
                                {/* Controls */}
                                <div className="absolute inset-0 z-20 flex items-center justify-between px-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handlePageChange('prev')}
                                        disabled={currentPage <= 1}
                                        className="p-3 rounded-full bg-white/80 dark:bg-black/60 text-slate-900 dark:text-white hover:bg-cyan-500 disabled:opacity-0 shadow-lg border border-slate-200 dark:border-white/10"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button 
                                        onClick={() => handlePageChange('next')}
                                        disabled={currentPage >= totalPages}
                                        className="p-3 rounded-full bg-white/80 dark:bg-black/60 text-slate-900 dark:text-white hover:bg-cyan-500 disabled:opacity-0 shadow-lg border border-slate-200 dark:border-white/10"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold shadow-lg">
                                    {currentPage} / {totalPages || '?'}
                                </div>
                            </>
                        ) : (
                            <div className="relative h-full flex flex-col items-center justify-center overflow-hidden">
                                {/* 배경 그라데이션 및 그리드 */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-950" />
                                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                                
                                <div className="relative z-10 flex flex-col items-center text-center px-6">
                                    <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                                        <PlayCircle className="w-10 h-10 text-cyan-600 dark:text-cyan-500" />
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{project.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-[0.3em]">Project Experience & Development Journey</p>
                                    
                                    <div className="mt-8 flex gap-2">
                                        {project.environment.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-white/5">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 sm:p-12 space-y-12">
                        {/* Quick Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Period", value: project.period },
                                { label: "Team", value: project.teamSize === 1 ? "개인 프로젝트" : `${project.teamSize}인 프로젝트` },
                                { label: "Tech Stack", value: project.environment.length + " Layers" },
                                { label: "Organization", value: project.organization }
                            ].map((spec, i) => (
                                <div key={i} className="flex flex-col gap-1 p-4 rounded-2xl bg-white/5 border border-white/5 group/spec hover:border-cyan-500/20 transition-all">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{spec.label}</span>
                                    <span className="text-sm font-bold text-slate-200 group/spec group-hover/spec:text-white transition-colors">{spec.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Background */}
                        <section className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-6 bg-cyan-600 rounded-full" />
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Overview</h3>
                            </div>
                            <p className="text-slate-300 leading-[1.8] text-lg bg-slate-800/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                                {project.backgroundAndSummary}
                            </p>
                        </section>

                        {/* Roles & Tech in 2 Columns */}
                        <div className="grid lg:grid-cols-2 gap-12">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Core Contributions</h3>
                                </div>
                                <ul className="space-y-4">
                                    {project.role.map((item, index) => (
                                        <li key={index} className="group/role flex gap-4 text-slate-400 p-5 rounded-2xl bg-white/[0.02] border border-transparent hover:border-white/5 hover:bg-white/[0.05] transition-all">
                                            <span className="text-emerald-500 font-mono text-xs mt-1.5">0{index + 1}</span>
                                            <span className="text-sm leading-relaxed group-hover/role:text-slate-200 transition-colors">
                                                <strong className="text-slate-200 block mb-1 font-bold">{item.split(':')[0]}</strong>
                                                {item.split(':')[1]}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1.5 h-6 bg-amber-600 rounded-full" />
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Development Env</h3>
                                </div>
                                <div className="flex flex-wrap gap-2.5 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                    {project.environment.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 text-[11px] font-bold rounded-xl bg-slate-800 text-slate-300 border border-white/5 shadow-inner hover:border-cyan-500/30 transition-all uppercase tracking-wider"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Troubleshooting */}
                        {project.troubleshooting && project.troubleshooting.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-6 bg-rose-600 rounded-full" />
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Troubleshooting</h3>
                                </div>
                                <div className="space-y-4">
                                    {project.troubleshooting.map((item, index) => (
                                        <div key={index} className="flex gap-5 text-slate-300 leading-relaxed bg-rose-500/5 p-6 rounded-[24px] border border-rose-500/10 hover:bg-rose-500/10 transition-colors group/error">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xs group-hover/error:scale-110 transition-transform tracking-tighter">FIX</div>
                                            <p className="text-sm leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Action Links */}
                        <section className="pt-12 border-t border-white/5">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">Project Resources</h3>
                                    <p className="text-xs text-slate-500 font-mono">DOCUMENTATION & REPOSITORIES</p>
                                </div>
                                
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    {project.links && project.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/5 text-white font-bold border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all active:scale-95 group/link"
                                        >
                                            {link.name.toLowerCase().includes('github') ? (
                                                <div className="p-1 px-1.5 rounded-lg bg-white/10 group-hover/link:bg-cyan-500/20 transition-colors">
                                                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                                                </div>
                                            ) : (
                                                <PlayCircle className="w-5 h-5 text-rose-500" />
                                            )}
                                            {link.name}
                                        </a>
                                    ))}

                                    {project.presentationUrl && (
                                       <div className="flex gap-2">
                                           <a
                                               href={project.presentationUrl}
                                               download
                                               className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/5 text-slate-300 font-bold border border-white/10 hover:bg-white/10 transition-all hover:text-white"
                                           >
                                               <Download className="w-4 h-4" />
                                               PDF
                                           </a>
                                           <button
                                               onClick={() => setIsPDFModalOpen(true)}
                                               className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold border border-white/10 transition-all hover:translate-y-[-2px] active:scale-95 shadow-xl shadow-cyan-900/50"
                                           >
                                               <Maximize2 className="w-4 h-4" />
                                               DOCS FULLSCREEN
                                           </button>
                                       </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        <div className="pt-6 border-t border-white/5 flex justify-between items-center opacity-40">
                             <span className="text-[9px] font-mono tracking-[0.3em] uppercase">SYSTEM.INTEGRITY.VERIFIED</span>
                             {project.lastUpdated && (
                                <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono uppercase tracking-widest">
                                    <RefreshCcw className="w-2.5 h-2.5" />
                                    SYNCED: {project.lastUpdated}
                                </span>
                             )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* PPT 전문화면 모달 */}
            {project.presentationUrl && (
                <PDFModal
                    isOpen={isPDFModalOpen}
                    onClose={() => setIsPDFModalOpen(false)}
                    fileUrl={project.presentationUrl}
                    title={`${project.title} 상세 아키텍처`}
                />
            )}
        </div>
    );
}
