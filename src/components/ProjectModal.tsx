"use client";

import { Project } from "@/types";
import { X, ExternalLink, PlayCircle, FileText, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

interface ProjectModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // 모달창이 열렸을 때 화면 전체를 덮는 투명한 검은 베경입니다.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 opacity-100 transition-opacity">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* 실제 모달 컨텐츠가 들어가는 하얀 테두리 박스입니다. */}
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col pointer-events-auto">

                {/* Header: 상단 고정 바 (프로젝트 제목과 닫기 버튼) */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
                    <h2 className="text-2xl font-bold tracking-tight text-white">{project.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col gap-8">

                    {/* Quick Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                        <span className="px-3 py-1 font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                            {project.type}
                        </span>
                        <span>{project.period}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>{project.teamSize === 1 ? "1인 프로젝트" : `${project.teamSize}인 프로젝트`}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>{project.organization}</span>
                    </div>

                    {/* Background */}
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-3">개발 배경 및 주요 내용</h3>
                        <p className="text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                            {project.backgroundAndSummary}
                        </p>
                    </section>

                    {/* Roles */}
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-3">담당 역할 및 성과</h3>
                        <ul className="space-y-3">
                            {project.role.map((item, index) => (
                                <li key={index} className="flex gap-3 text-slate-300 leading-relaxed">
                                    <span className="text-cyan-500 mt-1.5">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Troubleshooting: 트러블슈팅 및 문제 해결 경험 */}
                    {project.troubleshooting && project.troubleshooting.length > 0 && (
                        <section>
                            <h3 className="text-lg font-semibold text-rose-400 mb-3 flex items-center gap-2">
                                <span className="p-1 bg-rose-500/10 rounded-md">🛠️</span>
                                문제 해결 및 트러블슈팅
                            </h3>
                            <ul className="space-y-3">
                                {project.troubleshooting.map((item, index) => (
                                    <li key={index} className="flex gap-3 text-slate-300 leading-relaxed bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                                        <span className="text-rose-400 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Tech Stack: 사용된 기술 스택 배지 */}
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-3">사용 기술 및 개발 환경</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.environment.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800 text-slate-200 border border-white/5 shadow-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Links: 구동 영상이나 깃허브 링크 버튼 */}
                    {((project.links && project.links.length > 0) || project.presentationUrl) && (
                        <section className="pt-4 border-t border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">관련 링크 및 자료</h3>
                            <div className="flex flex-wrap gap-4">
                                {project.links && project.links.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white/5 text-white hover:bg-white/10 border border-white/10 transition-colors"
                                    >
                                        {link.name.toLowerCase().includes('github') ? (
                                            <ExternalLink className="w-4 h-4" />
                                        ) : (
                                            <PlayCircle className="w-4 h-4" />
                                        )}
                                        {link.name}
                                    </a>
                                ))}

                                {project.presentationUrl && (
                                    <a
                                        href={project.presentationUrl}
                                        download
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors"
                                    >
                                        <FileText className="w-4 h-4" />
                                        발표 자료 (PDF)
                                    </a>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Footer Info: 업데이트 날짜 등 */}
                    {project.lastUpdated && (
                        <div className="pt-2 flex justify-end">
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                <RefreshCcw className="w-2.5 h-2.5" />
                                자료 최신 업데이트: {project.lastUpdated}
                            </span>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
