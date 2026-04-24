"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundGlow() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
      // 서버 사이드에서도 기본적인 어두운 배경은 유지되도록 함
      return <div className="fixed inset-0 -z-20 bg-[#020617]" />;
  }

  return (
    <>
      {/* 기본 베이스 배경색 (가장 뒤) */}
      <div className="fixed inset-0 -z-20 bg-[#0f172a]" />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* 아주 강력한 사이언 조명 */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5],
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full bg-cyan-400/40 blur-[130px]"
        />

        {/* 아주 강력한 퍼플 조명 */}
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.6, 0.4],
            x: [100, -100, 100],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-500/40 blur-[140px]"
        />

        {/* 하단에서 올라오는 블루 광채 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] left-[10%] w-[90%] h-[90%] rounded-full bg-blue-500/40 blur-[160px]"
        />

        {/* 격자 무늬 (더 선명하게) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* 비네팅 효과 (가장자리 어둡게) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f172a_90%)]" />

        {/* 노이즈 텍스처 */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </>
  );
}
