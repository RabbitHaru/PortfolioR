"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Database, Server, Code } from "lucide-react";

export default function HeroVisual() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-[500px] bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase flex items-center gap-2">
                        <Terminal className="w-3 h-3" /> system.integrity.log
                    </div>
                </div>

                {/* Code / Terminal Content */}
                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed whitespace-pre">
                    <div className="flex gap-4 mb-4">
                        <span className="text-slate-600">01</span>
                        <span className="text-emerald-400">class</span> <span className="text-cyan-400">BackendDeveloper</span> <span className="text-white">{"{"}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600">02</span>
                        <span className="text-slate-400 ml-4">String</span> <span className="text-white">name</span> <span className="text-slate-400">=</span> <span className="text-amber-200">"KIM TAE WAN"</span><span className="text-slate-400">;</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600">03</span>
                        <span className="text-slate-400 ml-4">String</span> <span className="text-white">focus</span> <span className="text-slate-400">=</span> <span className="text-amber-200">"Data Integrity"</span><span className="text-slate-400">;</span>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <span className="text-slate-600">04</span>
                        <span className="text-pink-400 ml-4">void</span> <span className="text-cyan-400">solve</span><span className="text-white">(Problem p) {"{"}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600">05</span>
                        <span className="text-slate-400 ml-10">System.</span><span className="text-blue-400">out</span><span className="text-slate-400">.</span><span className="text-cyan-400">println</span><span className="text-slate-400">(</span><span className="text-amber-200">"Thinking..."</span><span className="text-slate-400">);</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600">06</span>
                        <span className="text-emerald-400 ml-10">architect</span><span className="text-slate-400">(p.rootCause);</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600">07</span>
                        <span className="text-white ml-4">{"}"}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600">08</span>
                        <span className="text-white">{"}"}</span>
                    </div>
                    
                    {/* Animated Beam */}
                    <motion.div 
                        animate={{ opacity: [0.3, 0.7, 0.3], x: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-4 bg-cyan-500 mt-4 inline-block ml-4"
                    />
                </div>

                {/* Status Bar */}
                <div className="px-6 py-3 bg-white/5 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <Cpu className="w-3 h-3 text-cyan-500" /> Java / Spring
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <Database className="w-3 h-3 text-emerald-500" /> MySQL
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> DEPLOYED
                    </div>
                </div>
            </motion.div>

            {/* Floating Icons for context */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-10 right-0 p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl"
            >
                <Server className="w-6 h-6 text-cyan-500" />
            </motion.div>
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-10 left-0 p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl"
            >
                <Code className="w-6 h-6 text-emerald-500" />
            </motion.div>
        </div>
    );
}
