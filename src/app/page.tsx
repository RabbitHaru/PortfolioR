"use client";

import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import { Project, SkillCategory } from "@/types";
import { Server, Database, Code2, Github, Sparkles, Container, Filter, Search, Download } from "lucide-react";
import CopyEmailButton from "@/components/CopyEmailButton";
import CopyPhoneButton from "@/components/CopyPhoneButton";
import PresentationSection from "@/components/PresentationSection";
import ScrollReveal from "@/components/ScrollReveal";
import HeroVisual from "@/components/HeroVisual";
import BackToTop from "@/components/BackToTop";
import Timeline from "@/components/Timeline";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const projects: Project[] = projectsData;
  const skills: SkillCategory[] = skillsData;

  // 프로젝트 필터링 상태
  const [activeFilter, setActiveFilter] = useState("All");
  
  // 프로젝트에서 사용된 모든 기술 스택 추출 (중복 제거)
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.environment.forEach(t => techs.add(t)));
    // 주요 기술들만 필터 버튼으로 노출 (너무 많으면 지저분하므로)
    const priorityTechs = ["Spring Boot", "MySQL", "JPA", "Docker", "Java", "Redis"];
    return ["All", ...priorityTechs.filter(t => techs.has(t))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.environment.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <main className="min-h-screen bg-transparent text-slate-50 selection:bg-cyan-500/30 font-sans selection:text-white">

      {/* --- 1. HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            
            <div className="flex-1 text-left">
              <ScrollReveal direction="right">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-[0.2em] mb-8 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Backend Systems Architect
                </div>

                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-100 to-indigo-300 leading-[1.1] break-keep">
                  견고함과 정합성을<br className="hidden sm:block" />
                  <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">고민하는</span> 개발자입니다.
                </h1>

                <p className="text-slate-300/80 text-lg lg:text-xl max-w-2xl leading-relaxed mb-10 border-l border-indigo-500/30 pl-6 py-2 break-keep">
                  비즈니스 로직의 복잡성을 시스템의 견고함으로 해결하며,<br className="hidden md:block" /> 
                  데이터 정합성과 객체지향적 설계를 포기하지 않는 백엔드 개발자 김태완입니다.
                </p>

                {/* 연락처 퀵 링크 (복사 기능 포함) */}
                <div className="flex flex-wrap gap-4 mb-20">
                  <CopyPhoneButton phone="010 . 4695 . 4572" />
                  <CopyEmailButton email="rabbitharu1020@gmail.com" />
                </div>

                {/* 메인 액션 버튼 */}
                <div className="flex flex-wrap gap-5">
                  <a 
                    href="/downloads/Protfolio_김태완.V.260423.pdf" 
                    download
                    className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black transition-all hover:translate-y-[-4px] active:scale-95 shadow-[0_20px_40px_rgba(6,182,212,0.4)] flex items-center gap-3 group"
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    DOWNLOAD PORTFOLIO
                  </a>
                  <a href="#projects" className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all hover:translate-y-[-2px] border border-white/10">
                    프로젝트 리스트
                  </a>
                  <a href="https://github.com/RabbitHaru" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-white/20 text-white font-bold transition-all flex items-center gap-3">
                    <Github className="w-6 h-6" />
                    GITHUB
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
                <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* --- 2. PRESENTATION SECTION --- */}
      <PresentationSection />

      {/* --- 3. PROJECTS SECTION --- */}
      <section id="projects" className="py-24 bg-transparent">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Projects</h2>
                  <span className="text-xs font-mono text-cyan-500 font-bold uppercase tracking-widest pl-1">Filtered by Tech Stack</span>
                </div>
              </div>

              {/* 필터 탭 추가 (기능성/가독성) */}
              <div className="flex flex-wrap gap-2 pb-2">
                {allTechs.map(tech => (
                  <button
                    key={tech}
                    onClick={() => setActiveFilter(tech)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      activeFilter === tech 
                      ? "bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-900/50 scale-105" 
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px] relative">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-white/10 rounded-3xl"
                >
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p>해당 기술 스택과 일치하는 프로젝트가 없습니다.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <Timeline />

      {/* --- 4. SKILLS SECTION --- */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-24">
              <div className="inline-block p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-3xl mb-6">
                <Database className="w-10 h-10 text-cyan-500" />
              </div>
              <h2 className="text-5xl font-black text-white tracking-tight mb-4">Tech Experience</h2>
              <p className="text-slate-500 font-medium uppercase tracking-[0.4em]">Growth & Knowledge</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12">
            {skills.map((category, idx) => (
              <ScrollReveal direction={idx % 2 === 0 ? "right" : "left"} delay={idx * 0.15} key={idx}>
                <div className="bg-[#1e293b]/20 backdrop-blur-md border border-white/5 rounded-[40px] p-8 md:p-12 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-700 h-full group">
                  <h3 className="text-2xl font-black mb-10 text-white flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      {category.category === 'Backend' && <Server className="w-6 h-6 text-cyan-500" />}
                      {category.category === 'Database' && <Database className="w-6 h-6 text-emerald-500" />}
                      {category.category === 'Tools / Infra' && <Container className="w-6 h-6 text-amber-500" />}
                      {category.category}
                    </span>
                  </h3>
                  <div className="grid gap-10">
                    {category.items.map((skill, sIdx) => (
                      <div key={sIdx} className="relative pl-6 group/skill">
                        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-800 rounded-full group-hover/skill:bg-cyan-500/50 transition-colors" />
                        
                        <div className="flex items-center gap-3 mb-4">
                          <h4 className="font-bold text-slate-100 text-lg">{skill.name}</h4>
                          {/* 숙련도 점수 대신, 주력 스택을 표시하거나 학습 중임을 담백하게 표현 */}
                          {(skill.name === "Spring Boot" || skill.name === "Java" || skill.name === "MySQL") && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md uppercase tracking-wider">Main</span>
                          )}
                        </div>

                        <ul className="grid gap-3">
                          {skill.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-sm text-slate-400 flex gap-4 leading-relaxed bg-white/5 p-3 rounded-2xl border border-transparent group-hover/skill:border-white/5 transition-all">
                              <span className="text-cyan-500/40 text-xs mt-1 font-mono">#{dIdx+1}</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 bg-[#0a1120] text-center">
        <div className="container mx-auto px-6">
          <p className="text-slate-400 text-base mb-4 font-medium italic opacity-60">"복잡한 문제를 단순하고 견고한 시스템으로 해결합니다."</p>
          <div className="w-12 h-[1px] bg-slate-800 mx-auto mb-8" />
          <p className="text-slate-500 text-xs mb-2 uppercase tracking-[0.2em] font-bold">© 2026 KIM TAE WAN. ALL RIGHTS RESERVED.</p>
          <p className="text-slate-600 text-[10px] tracking-widest font-mono">LAST UPDATED: 2026.03.17 (TUE)</p>
        </div>
      </footer>

      {/* 최상단 이동 버튼 (편의성) */}
      <BackToTop />
    </main>
  );
}
