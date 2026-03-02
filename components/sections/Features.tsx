"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupCardTilt } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    {
        icon: "⚡",
        title: "Lightning Performance",
        desc: "Sub-millisecond response times with neural-optimized rendering pipelines that redefine what fast feels like.",
        accent: "var(--accent-teal)",
    },
    {
        icon: "🎨",
        title: "Artisan Design",
        desc: "Every curve, gradient, and transition is deliberate. Design systems built with the craftsmanship of fine art.",
        accent: "var(--accent-purple)",
    },
    {
        icon: "🔒",
        title: "Fort Knox Security",
        desc: "End-to-end encryption, zero-trust architecture, and real-time threat intelligence protecting your every moment.",
        accent: "#ff6b6b",
    },
];

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title reveal
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            // Cards stagger entrance
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    { opacity: 0, y: 80, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                        },
                    }
                );

                // 3D tilt
                const cleanup = setupCardTilt(card);
                return cleanup;
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #080818 0%, #030303 100%)",
            }}
        >
            {/* Background decoration */}
            <div
                className="absolute pointer-events-none opacity-30"
                style={{
                    width: 800,
                    height: 800,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    background:
                        "radial-gradient(circle, rgba(123,47,255,0.08) 0%, transparent 65%)",
                    borderRadius: "50%",
                }}
            />

            {/* Title */}
            <div ref={titleRef} className="text-center mb-16 z-10 opacity-0">
                <p className="text-xs tracking-[0.4em] text-white/40 uppercase mb-3 font-medium">
                    What we deliver
                </p>
                <h2
                    className="font-black text-white"
                    style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                >
                    Built to{" "}
                    <span
                        style={{
                            background:
                                "linear-gradient(90deg, var(--accent-teal), var(--accent-purple))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Impress
                    </span>
                </h2>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
                {CARDS.map((card, i) => (
                    <div
                        key={card.title}
                        ref={(el) => { if (el) cardsRef.current[i] = el; }}
                        className="relative rounded-2xl p-7 opacity-0 border-glow"
                        data-cursor
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            willChange: "transform",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Glow accent on top */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px rounded-full opacity-50"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                            }}
                        />

                        {/* Icon */}
                        <div
                            className="flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-2xl"
                            style={{
                                background: `${card.accent}15`,
                                border: `1px solid ${card.accent}30`,
                                boxShadow: `0 0 20px ${card.accent}15`,
                            }}
                        >
                            {card.icon}
                        </div>

                        {/* Content */}
                        <h3
                            className="text-lg font-bold text-white mb-3"
                        >
                            {card.title}
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed">
                            {card.desc}
                        </p>

                        {/* Bottom accent line */}
                        <div
                            className="absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
