import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import { Project, SkillCategory } from "@/types";
import { Server, Database, Code2, Phone, Github, Sparkles, Container } from "lucide-react";
import CopyEmailButton from "@/components/CopyEmailButton";
import PresentationSection from "@/components/PresentationSection";
import ScrollReveal from "@/components/ScrollReveal";
import HeroVisual from "@/components/HeroVisual";

export default function Home() {
  const projects: Project[] = projectsData;
  const skills: SkillCategory[] = skillsData;

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-50 selection:bg-cyan-500/30 font-sans selection:text-white">

      {/* --- 1. HERO SECTION (Professional Dashboard Layout) --- */}
      <section id="home" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/5">
        {/* Subtle Background Effects */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            
            {/* Left Content Column */}
            <div className="flex-1 text-left">
              <ScrollReveal direction="right">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-[0.2em] mb-8 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Backend Systems Architect
                </div>

                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500 leading-[1.05]">
                  견고함과 정합성을<br />
                  <span className="text-cyan-500 text-shadow-glow">고민하는</span> 개발자입니다.
                </h1>

                <p className="text-slate-400 text-lg lg:text-xl max-w-2xl leading-relaxed mb-10 border-l border-cyan-500/30 pl-6 py-2">
                  비즈니스 로직의 복잡성을 시스템의 견고함으로 해결하며,<br className="hidden md:block" /> 
                  데이터 정합성과 객체지향적 설계를 포기하지 않는 백엔드 개발자 김태완입니다.
                </p>

                {/* Contact Quick Link (Clean Pills) */}
                <div className="flex flex-wrap gap-4 mb-20">
                  <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 font-mono shadow-sm">
                    <Phone className="w-4 h-4 text-cyan-500" />
                    <span>010 . 4695 . 4572</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 font-mono shadow-sm">
                    <div className="w-4 h-4 flex items-center justify-center font-bold text-cyan-500">@</div>
                    <span>rabbitharu1020@gmail.com</span>
                  </div>
                </div>

                {/* Main Action Group */}
                <div className="flex flex-wrap gap-5">
                  <a href="#projects" className="px-10 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all hover:translate-y-[-2px] active:scale-95 shadow-2xl shadow-cyan-950">
                    프로젝트 리스트
                  </a>
                  <CopyEmailButton email="rabbitharu1020@gmail.com" />
                  <a href="https://github.com/RabbitHaru" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-white/20 text-white font-bold transition-all flex items-center gap-3 shadow-xl">
                    <Github className="w-6 h-6" />
                    GITHUB
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Visual Column (Modern, Clean Terminal) */}
            <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
                <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* --- 2. PROJECTS SECTION --- */}
      <section id="projects" className="py-24 bg-slate-900/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-white/5 pb-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-4xl font-black text-white italic tracking-tighter">PROJECTS</h2>
                  <span className="text-xs font-mono text-cyan-500 font-bold uppercase tracking-widest pl-1">Engineering results</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm md:text-base max-w-md">실제 비즈니스 문제를 해결하며 데이터와 시스템의 균형을 맞추기 위해 노력한 프로젝트들입니다.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ScrollReveal delay={idx * 0.15} key={project.id}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. PRESENTATION SECTION (인터랙틱 PDF) --- */}
      {/* 이제 깔끔하게 클릭 시 확대되는 모달 기능이 포함되어 있어 퀄리티가 훨씬 높습니다. */}
      <PresentationSection />

      {/* --- 4. SKILLS SECTION --- */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-24">
              <div className="inline-block p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-3xl mb-6">
                <Database className="w-10 h-10 text-cyan-500" />
              </div>
              <h2 className="text-5xl font-black text-white tracking-tight mb-4">Tech Experience</h2>
              <p className="text-slate-500 font-medium uppercase tracking-[0.4em]">Mastery & Proficiency</p>
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
                      <div key={sIdx}>
                        <h4 className="font-bold text-slate-100 text-lg mb-4 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-500" />
                          {skill.name}
                        </h4>
                        <ul className="grid gap-3">
                          {skill.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-sm text-slate-400 flex gap-4 leading-relaxed bg-white/5 p-3 rounded-2xl border border-transparent group-hover:border-white/5 transition-all">
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

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 bg-[#0a1120] text-center">
        <div className="container mx-auto px-6">
          <p className="text-slate-400 text-base mb-4 font-medium italic opacity-60">"복잡한 문제를 단순하고 견고한 시스템으로 해결합니다."</p>
          <div className="w-12 h-[1px] bg-slate-800 mx-auto mb-8" />
          <p className="text-slate-500 text-xs mb-2 uppercase tracking-[0.2em] font-bold">© 2026 KIM TAE WAN. ALL RIGHTS RESERVED.</p>
          <p className="text-slate-600 text-[10px] tracking-widest font-mono">LAST UPDATED: 2026.03.17 (TUE)</p>
        </div>
      </footer>

    </main>
  );
}
