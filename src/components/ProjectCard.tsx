"use client";

import { Project } from "@/types";
import { Calendar, Users, Building, Code } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { useState } from "react";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* 카드 전체 컨테이너입니다. hover 시 떠오르는 효과(hover:-translate-y-2)가 적용되어 있습니다. */}
            <div
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-white/20 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                {/* 상단: 프로젝트 제목, 구분(팀/개인), 기간, 인원, 기관명 요약 */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {project.title}
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {project.type}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-cyan-500" />
                            <span>{project.period}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-cyan-500" />
                                <span>{project.teamSize === 1 ? "1인 프로젝트" : `${project.teamSize}인 프로젝트`}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-cyan-500" />
                                <span>{project.organization}</span>
                            </div>
                        </div>
                    </div>

                    {/* 중단: 프로젝트 요약 설명 (최대 3줄 표시 후 말줄임표 처리 - line-clamp-3) */}
                    <div className="mt-4">
                        <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">
                            {project.backgroundAndSummary}
                        </p>
                    </div>
                </div>

                {/* 하단: 기술 스택 (Tech Stack) 뱃지 목록 */}
                <div className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Code className="w-4 h-4 text-cyan-500" />
                        <h4 className="text-sm font-semibold text-slate-200">Tech Stack</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.environment.map((tech, index) => (
                            <span
                                key={index}
                                className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-slate-300 border border-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <ProjectModal
                project={project}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
