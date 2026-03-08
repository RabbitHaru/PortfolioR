"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right";
    className?: string;
}

export default function ScrollReveal({ children, delay = 0, direction = "up", className = "" }: ScrollRevealProps) {
    const directions = {
        up: { y: 40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
