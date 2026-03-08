import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import { Project, SkillCategory } from "@/types";
import { Server, Database, Container, Code2 } from "lucide-react";
import CopyEmailButton from "@/components/CopyEmailButton";

export default function Home() {
  const projects: Project[] = projectsData;
  const skills: SkillCategory[] = skillsData;

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-50 selection:bg-cyan-500/30 font-sans">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0f172a] to-[#0f172a]" />

        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          {/* 깜빡이는 점과 직군(Backend Developer) 뱃지 텍스트입니다. */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Backend Developer
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            견고하고 안정적인<br />서버를 설계합니다.
          </h1>

          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl leading-relaxed mb-6">
            데이터 중심의 아키텍처와 객체지향적 설계를 통해<br className="hidden sm:block" />
            유지보수가 용이하고 확장 가능한 백엔드 시스템 구축을 지향합니다.
          </p>

          {/* 자기 소개 텍스트 (추가됨) */}
          <div className="max-w-2xl mb-10 p-5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 leading-relaxed shadow-lg">
            안녕하세요. 비즈니스 로직과 데이터 정합성을 깊게 고민하는 개발자입니다.
            주어진 문제를 체계적인 아키텍처 설계와 기술적 접근으로 해결하는 과정을 즐깁니다.
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors shadow-lg shadow-cyan-500/20">
              프로젝트 보기
            </a>
            {/* Contact 이메일 버튼 (복사 기능) */}
            <CopyEmailButton email="rabbitharu1020@gmail.com" />
            <a href="https://github.com/RabbitHaru" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      {/* 보유 기술(Tech Stack) 섹션입니다. data/skills.json 에서 데이터를 불러옵니다. */}
      <section id="skills" className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-3 mb-12">
            <Database className="w-8 h-8 text-cyan-500" />
            <h2 className="text-3xl font-bold">Tech Stack</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((category, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-colors">
                <h3 className="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
                  {category.category === 'Backend' && <Server className="w-5 h-5" />}
                  {category.category === 'Database' && <Database className="w-5 h-5" />}
                  {category.category === 'Tools / Infra' && <Container className="w-5 h-5" />}
                  {category.category}
                </h3>
                <div className="space-y-6">
                  {category.items.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <h4 className="font-medium text-slate-200 mb-2">{skill.name}</h4>
                      <ul className="space-y-2">
                        {skill.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-sm text-slate-400 flex gap-2 leading-relaxed">
                            <span className="text-cyan-500/50 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      {/* 프로젝트 나열 섹션입니다. data/projects.json 에서 데이터를 불러옵니다. */}
      {/* 각각의 아이템은 components/ProjectCard.tsx 컴포넌트로 렌더링됩니다. */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <Code2 className="w-8 h-8 text-cyan-500" />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 mt-auto text-center text-slate-500 text-sm">
        <p className="mb-2">본 사이트는 포트폴리오 목적으로 제작되었습니다.</p>
        <p>© 2026 Backend Developer Portfolio. All rights reserved.</p>
      </footer>

    </main>
  );
}
