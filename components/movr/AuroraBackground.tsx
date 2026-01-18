"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#07080C]" />

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(60% 55% at 50% 25%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(60% 55% at 50% 25%, black 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(160,120,255,0.45), transparent 60%), radial-gradient(circle at 70% 60%, rgba(70,220,255,0.30), transparent 55%)",
        }}
        animate={{ y: [0, 18, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-56 -left-32 h-[520px] w-[520px] rounded-full blur-[85px]"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(90,255,185,0.22), transparent 60%), radial-gradient(circle at 70% 70%, rgba(160,120,255,0.22), transparent 55%)",
        }}
        animate={{ x: [0, 26, 0], y: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-220px] right-[-220px] h-[680px] w-[680px] rounded-full blur-[95px]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,120,220,0.18), transparent 60%), radial-gradient(circle at 60% 70%, rgba(70,220,255,0.18), transparent 55%)",
        }}
        animate={{ x: [0, -22, 0], y: [0, 18, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 15%, rgba(255,255,255,0.06), transparent 70%), radial-gradient(120% 90% at 50% 100%, rgba(0,0,0,0.65), transparent 60%)",
        }}
      />
    </div>
  );
}
