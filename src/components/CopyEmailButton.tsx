"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyEmailButtonProps {
    email: string;
}

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // 2초 후 원래 텍스트로 복귀
        } catch (error) {
            console.error("이메일 복사 실패:", error);
            alert("이메일 복사에 실패했습니다.");
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors flex items-center gap-2"
        >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            {copied ? "이메일 복사완료!" : "이메일 주소 복사"}
        </button>
    );
}
