"use client";

import { motion } from "framer-motion";

function Pane({
  left,
  width,
  delay,
  opacity = 0.14,
}: {
  left: string;
  width: string;
  delay: number;
  opacity?: number;
}) {
  return (
    <motion.div
      className="absolute top-0 bottom-0 rounded-[28px]"
      style={{
        left,
        width,
        opacity,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.04) 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      animate={{ x: [0, 26, 0] }}
      transition={{
        duration: 14,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

export default function ManaBackground({
  accent = "rgba(130,90,255,0.42)",
  accent2 = "rgba(60,210,255,0.16)",
}: {
  accent?: string;
  accent2?: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#07070B]" />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1000px 520px at 50% 10%, ${accent}, transparent 58%),
            radial-gradient(900px 520px at 10% 45%, ${accent2}, transparent 62%),
            radial-gradient(900px 520px at 95% 70%, rgba(255,120,220,0.12), transparent 60%)
          `,
          opacity: 0.9,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(70% 60% at 50% 25%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 25%, black 0%, transparent 70%)",
        }}
      >
        <Pane left="6%" width="180px" delay={0} opacity={0.10} />
        <Pane left="22%" width="220px" delay={1.2} opacity={0.11} />
        <Pane left="41%" width="260px" delay={0.6} opacity={0.12} />
        <Pane left="63%" width="210px" delay={1.8} opacity={0.10} />
        <Pane left="79%" width="190px" delay={0.9} opacity={0.09} />
      </div>

      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage:
            "radial-gradient(60% 60% at 50% 20%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 20%, black 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 65% at 50% 12%, rgba(255,255,255,0.05), transparent 70%), radial-gradient(120% 90% at 50% 100%, rgba(0,0,0,0.74), transparent 55%)",
        }}
      />
    </div>
  );
}
