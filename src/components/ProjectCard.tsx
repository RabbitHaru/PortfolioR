"use client";

import { Project } from "@/types";
import { Calendar, Users, Building, Code, ExternalLink, Sparkles } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // 마우스 위치에 따른 3D 기울기 효과를 위한 값들
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-8 backdrop-blur-xl transition-all hover:border-cyan-500/50 cursor-pointer shadow-xl dark:shadow-2xl"
                onClick={() => setIsModalOpen(true)}
            >
                {/* 내부 광채 효과 (다크모드 전용) */}
                <div className="absolute -inset-2 bg-cyan-500/10 blur-[40px] opacity-0 dark:group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* 배경 광택 효과 */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ transform: "translateZ(50px)" }}
                />

                <div className="relative z-10 flex flex-col gap-6" style={{ transform: "translateZ(75px)" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">{project.organization}</span>
                          <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors leading-tight">
                              {project.title}
                          </h3>
                        </div>
                        <div className="p-2 rounded-xl bg-white/5 text-slate-400 group-hover:text-cyan-400 transition-colors">
                            <ExternalLink className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-cyan-500/50" />
                            <span>{project.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-cyan-500/50" />
                            <span>{project.teamSize}인</span>
                        </div>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">
                        {project.backgroundAndSummary}
                    </p>
                </div>

                <div className="mt-8 relative z-10" style={{ transform: "translateZ(65px)" }}>
                    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 mb-6 group-hover:bg-cyan-500/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Key Engineering Role</span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-medium italic">
                            {project.role[0].split(":")[0]}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tech Stack</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.environment.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-white/[0.03] text-slate-400 border border-white/5 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-all"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 하단 글로우 장식 */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-all duration-700" />
            </motion.div>

            <ProjectModal
                project={project}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
