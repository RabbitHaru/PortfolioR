"use client";

import { Project } from "@/types";
import { X, ExternalLink, PlayCircle } from "lucide-react";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 opacity-100 transition-opacity">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col pointer-events-auto">

                {/* Header */}
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

                    {/* Tech Stack */}
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

                    {/* Links */}
                    {(project.links && project.links.length > 0) && (
                        <section className="pt-4 border-t border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">관련 링크</h3>
                            <div className="flex gap-4">
                                {project.links.map((link, index) => (
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
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
}
