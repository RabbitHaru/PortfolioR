"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { Loader2, FileText } from "lucide-react";

interface PDFPreviewProps {
    fileUrl: string;
    pageNumber?: number;
    className?: string;
    onLoadSuccess?: (totalPages: number) => void;
}

export default function PDFPreview({ fileUrl, pageNumber = 1, className = "", onLoadSuccess }: PDFPreviewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // 클라이언트 사이드에서만 워커를 설정합니다.
        if (typeof window !== "undefined") {
            pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        }

        let isMounted = true;

        const renderPage = async () => {
            try {
                if (!canvasRef.current) return;
                
                setLoading(true);
                setError(false);

                // 1. PDF 문서 로드
                const loadingTask = pdfjs.getDocument(fileUrl);
                const pdf = await loadingTask.promise;

                if (!isMounted) return;
                
                setTotalPages(pdf.numPages);
                if (onLoadSuccess) onLoadSuccess(pdf.numPages);

                // 2. 특정 페이지 가져오기 (범위 제한)
                const pageNum = Math.max(1, Math.min(pageNumber, pdf.numPages));
                const page = await pdf.getPage(pageNum);
                
                if (!isMounted || !canvasRef.current) return;

                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                if (!context) return;

                // 3. 렌더링 배율(Scale) 설정
                // 고해상도 출력을 위해 scale을 충분히 높게 설정 (2.0 이상 추천)
                const viewport = page.getViewport({ scale: 2.0 });

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // 4. Canvas에 페이지 렌더링
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                    canvas: canvas,
                } as any;

                await page.render(renderContext).promise;
                
                if (isMounted) setLoading(false);
            } catch (err) {
                console.error("PDF Preview Error:", err);
                if (isMounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        renderPage();

        return () => {
            isMounted = false;
        };
    }, [fileUrl, pageNumber]);

    return (
        <div className={`relative w-full h-full flex items-center justify-center bg-slate-900/50 ${className}`}>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <Loader2 className="w-6 h-6 text-cyan-500 animate-spin" />
                </div>
            )}
            
            {error ? (
                <div className="flex flex-col items-center gap-2 text-slate-600">
                    <FileText className="w-8 h-8 opacity-20" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter">Cannot render PDF</span>
                </div>
            ) : (
                <canvas 
                    ref={canvasRef} 
                    className={`max-w-full max-h-full object-contain transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
                />
            )}
        </div>
    );
}
