import { Presentation, Download, FileText } from "lucide-react";
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
                            </div>
                            <p className="text-slate-400">
                                세부 시스템 설계 및 아키텍처에 대한 발표 자료입니다.
                            </p>
                        </div>

                        {/* 다운로드 버튼 그룹 */}
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="/downloads/portfolio_presentation.pdf" // 나중에 실제 PDF 파일 경로로 변경하세요.
                                download
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 font-medium border border-cyan-500/30 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                PDF 다운로드
                            </a>
                            <a
                                href="/downloads/portfolio_presentation.pptx" // 나중에 실제 PPTX 파일 경로로 변경하세요.
                                download
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors shadow-lg"
                            >
                                <Download className="w-4 h-4" />
                                원본 PPT 파일
                            </a>
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
