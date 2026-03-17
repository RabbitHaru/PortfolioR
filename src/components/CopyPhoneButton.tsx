"use client";

import { useState } from "react";
import { Phone, Copy, Check } from "lucide-react";

interface CopyPhoneButtonProps {
    phone: string;
}

export default function CopyPhoneButton({ phone }: CopyPhoneButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(phone.replace(/\s/g, ""));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button 
            onClick={handleCopy}
            className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 font-mono shadow-sm hover:border-cyan-500/50 hover:bg-white/[0.08] transition-all group/phone h-[52px]"
        >
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 group-hover/phone:bg-cyan-500 group-hover/phone:text-white transition-all">
                <Phone className="w-4 h-4" />
            </div>
            <span>{phone}</span>
            <div className="ml-2 opacity-0 group-hover/phone:opacity-100 transition-opacity">
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-500" />}
            </div>
        </button>
    );
}
