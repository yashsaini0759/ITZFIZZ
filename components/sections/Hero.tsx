"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCountUp } from "@/hooks/useCountUp";

// ─── Headline letters ──────────────────────────────────────────
const HEADLINE = "WELCOME ITZFIZZ".split("");

// ─── Metrics data ──────────────────────────────────────────────
const METRICS = [
    { target: 92, suffix: "%", label: "Client Satisfaction", decimals: 0 },
    { target: 4.8, suffix: "★", label: "Average Rating", decimals: 1 },
    { target: 120, suffix: "+", label: "Projects Delivered", decimals: 0 },
    { target: 98, suffix: "%", label: "Performance Score", decimals: 0 },
];

// ─── Single Metric ─────────────────────────────────────────────
function Metric({
    target,
    suffix,
    label,
    decimals,
    index,
}: {
    target: number;
    suffix: string;
    label: string;
    decimals: number;
    index: number;
}) {
    const { value, ref: countRef } = useCountUp({ target, suffix, decimals, duration: 2200 });

    return (
        <div
            ref={countRef as React.RefObject<HTMLDivElement>}
            className="metric-card flex flex-col items-center px-6 py-4 rounded-xl glass-card border-glow group"
            data-cursor
            style={{
                animationDelay: `${index * 0.2}s`,
                willChange: "transform",
            }}
        >
            <span
                className="text-3xl md:text-5xl font-bold tracking-tight"
                style={{
                    background: "linear-gradient(135deg, #fff 30%, var(--accent-teal))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                {value}
            </span>
            <span className="text-xs md:text-sm text-white/50 mt-1 font-medium tracking-widest uppercase">
                {label}
            </span>
        </div>
    );
}

// ─── Hero Component ─────────────────────────────────────────────
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const lettersRef = useRef<HTMLSpanElement[]>([]);
    const metricsRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const sweepRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1) Letter reveal
            tl.fromTo(
                lettersRef.current,
                { opacity: 0, y: 40, filter: "blur(8px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.045,
                }
            );

            // 2) Glow sweep after letters appear
            tl.fromTo(
                sweepRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut", transformOrigin: "left center" },
                "-=0.2"
            );
            tl.to(sweepRef.current, { opacity: 0, duration: 0.5 }, "+=0.3");

            // 3) Metrics section
            if (metricsRef.current) {
                tl.fromTo(
                    metricsRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
                    "-=0.3"
                );
            }

            // 4) Scroll hint
            if (subRef.current) {
                tl.fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4"
            style={{
                background:
                    "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(123,47,255,0.12) 0%, transparent 60%), #030303",
            }}
        >
            {/* ── Background grid lines ── */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            {/* ── Radial accent glow ── */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 600,
                    height: 600,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -60%)",
                    background:
                        "radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%)",
                    borderRadius: "50%",
                }}
            />

            {/* ── Headline ── */}
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex flex-wrap justify-center gap-x-[0.12em] gap-y-2 mb-2 leading-none">
                    {HEADLINE.map((char, i) => (
                        <span
                            key={i}
                            ref={(el) => { if (el) lettersRef.current[i] = el; }}
                            className="inline-block font-black tracking-[0.08em] text-white opacity-0"
                            style={{
                                fontSize: "clamp(2.8rem, 7vw, 8rem)",
                                willChange: "transform, opacity, filter",
                                color: char === " " ? "transparent" : undefined,
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>

                {/* Glow sweep bar */}
                <div
                    ref={sweepRef}
                    className="absolute inset-x-0 rounded-full pointer-events-none opacity-0"
                    style={{
                        height: 4,
                        bottom: -8,
                        background:
                            "linear-gradient(90deg, transparent, var(--accent-teal), var(--accent-purple), transparent)",
                        filter: "blur(2px)",
                        willChange: "transform, opacity",
                    }}
                />

                {/* Tagline */}
                <p
                    className="mt-6 text-sm md:text-base tracking-[0.3em] text-white/40 uppercase font-light"
                >
                    Premium Digital Experiences
                </p>
            </div>

            {/* ── Metrics ── */}
            <div
                ref={metricsRef}
                className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
            >
                {METRICS.map((m, i) => (
                    <Metric key={m.label} {...m} index={i} />
                ))}
            </div>

            {/* ── Scroll hint ── */}
            <div ref={subRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
                <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
            </div>
        </section>
    );
}
