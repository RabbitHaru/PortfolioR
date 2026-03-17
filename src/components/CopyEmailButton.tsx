"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

interface CopyEmailButtonProps {
    email: string;
}

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button 
            onClick={handleCopy}
            className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 font-mono shadow-sm hover:border-cyan-500/50 hover:bg-white/[0.08] transition-all group/email h-[52px]"
        >
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 group-hover/email:bg-cyan-500 group-hover/email:text-white transition-all">
                <Mail className="w-4 h-4" />
            </div>
            <span>{email}</span>
            <div className="ml-2 opacity-0 group-hover/email:opacity-100 transition-opacity">
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-500" />}
            </div>
        </button>
    );
}
