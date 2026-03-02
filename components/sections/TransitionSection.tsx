"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TransitionSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const objectRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const clipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1.5,
                },
            });

            // Object zooms forward and fades
            tl.fromTo(
                objectRef.current,
                { scale: 1, opacity: 1 },
                { scale: 4, opacity: 0, ease: "power2.in" },
                0
            );

            // Content reveal with clip-path
            tl.fromTo(
                clipRef.current,
                { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 60 },
                { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", y: 0, ease: "expo.out" },
                0.2
            );

            // Text content fades in
            tl.fromTo(
                contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, ease: "power3.out" },
                0.4
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #030303 0%, #080818 100%)",
            }}
        >
            {/* Zoom object */}
            <div
                ref={objectRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ willChange: "transform, opacity" }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: 120,
                        height: 120,
                        background:
                            "radial-gradient(circle, rgba(0,245,212,0.2) 0%, rgba(123,47,255,0.2) 60%, transparent 100%)",
                        boxShadow:
                            "0 0 60px rgba(0,245,212,0.3), 0 0 120px rgba(123,47,255,0.2)",
                    }}
                />
            </div>

            {/* Clip reveal */}
            <div
                ref={clipRef}
                className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24"
                style={{
                    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                    willChange: "clip-path, transform",
                }}
            >
                <div ref={contentRef} className="text-center" style={{ opacity: 0 }}>
                    {/* Label */}
                    <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4 font-medium">
                        Built for Performance
                    </p>

                    {/* Heading */}
                    <h2
                        className="font-black text-white leading-tight"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
                    >
                        Engineered to{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, var(--accent-teal), var(--accent-purple))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Perfection
                        </span>
                    </h2>

                    <p
                        className="mt-6 text-white/40 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
                        style={{ textAlign: "center" }}
                    >
                        Every pixel. Every interaction. Every millisecond. Crafted with obsessive
                        attention to detail for an experience that sets the benchmark.
                    </p>

                    {/* Divider */}
                    <div className="mt-10 flex items-center justify-center gap-4">
                        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-white/20" />
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: "var(--accent-teal)", boxShadow: "0 0 10px var(--accent-teal)" }}
                        />
                        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-white/20" />
                    </div>
                </div>
            </div>

            {/* Bottom gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, transparent, rgba(10,10,20,0.8))",
                }}
            />
        </div>
    );
}
