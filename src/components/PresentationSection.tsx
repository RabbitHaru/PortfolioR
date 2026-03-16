import { Presentation, Download, FileText, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function PresentationSection() {
    // 예시 데이터 3장. (실제 이미지가 있다면 public 폴더에 넣고 경로 값을 맵핑합니다.)
    const slides = [
        { id: 1, title: "시스템 아키텍처 개요", image: "/slides/slide-1-placeholder.jpg" },
        { id: 2, title: "데이터 파이프라인 흐름도", image: "/slides/slide-2-placeholder.jpg" },
        { id: 3, title: "보안 / 클라우드 인프라 설계", image: "/slides/slide-3-placeholder.jpg" },
    ];

    return (
        <section id="presentation" className="py-24 bg-[#0f172a]">
            <div className="container mx-auto px-6 max-w-6xl">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        {/* 섹션 제목 */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Presentation className="w-8 h-8 text-cyan-500" />
                                <h2 className="text-3xl font-bold text-white">Project Presentation</h2>
                                <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Preparing
                                </span>
                            </div>
                            <p className="text-slate-400">
                                전체 포트폴리오 요약 자료는 준비 중입니다. <br />
                                <span className="text-cyan-400/80 text-sm"> 각 프로젝트의 상세 발표 자료는 [Projects] 섹션의 상세 보기에서 확인하실 수 있습니다.</span>
                            </p>
                        </div>

                        {/* 다운로드 버튼 그룹 */}
                        <div className="flex flex-wrap gap-3 opacity-50 grayscale pointer-events-none">
                            <div
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600/20 text-cyan-400 font-medium border border-cyan-500/30 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                PDF 다운로드 (준비중)
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* PPT 슬라이드 카드 그리드 (3장) */}
                <div className="grid md:grid-cols-3 gap-6">
                    {slides.map((slide, idx) => (
                        <ScrollReveal key={slide.id} delay={idx * 0.15}>
                            <div
                                className="group flex flex-col overflow-hidden rounded-xl bg-slate-900 border border-white/10 shadow-lg"
                            >
                                {/* 이미지 영역 (가로세로 비율 유지 박스) */}
                                <div className="relative aspect-video bg-slate-800 border-b border-white/10 flex items-center justify-center overflow-hidden">
                                    {/* 
                      TODO: 실제 이미지가 추가되면 img 태그에 src={slide.image} 를 사용할 수 있습니다.
                      현재는 이미지가 없으므로 CSS 애니메이션이 있는 '가짜 화면'으로 대체합니다. 
                    */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 opacity-80" />
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                                    <div className="relative z-10 text-center p-4">
                                        <Presentation className="w-8 h-8 text-slate-600 mx-auto mb-3 group-hover:text-cyan-500 transition-colors duration-300" />
                                        <span className="text-sm font-medium text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
                                            Slide {slide.id} Preview
                                        </span>
                                    </div>
                                </div>

                                {/* 하단 텍스트 코멘트 영역 */}
                                <div className="p-4 bg-white/5">
                                    <span className="text-xs font-bold text-cyan-500 mb-1 block">페이지 {slide.id}</span>
                                    <h3 className="font-medium text-slate-200">{slide.title}</h3>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
