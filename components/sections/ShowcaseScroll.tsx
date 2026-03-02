"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Futuristic Car SVG ───────────────────────────────────── */
function CarShape() {
    return (
        <svg
            viewBox="0 0 800 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            {/* Glow filter */}
            <defs>
                <filter id="carGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="bodyGlow" x="-5%" y="-5%" width="110%" height="110%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                </filter>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a2e" />
                    <stop offset="40%" stopColor="#0d0d1a" />
                    <stop offset="100%" stopColor="#050510" />
                </linearGradient>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0,245,212,0)" />
                    <stop offset="30%" stopColor="rgba(0,245,212,0.9)" />
                    <stop offset="70%" stopColor="rgba(123,47,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(123,47,255,0)" />
                </linearGradient>
                <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1f1f2e" />
                    <stop offset="100%" stopColor="#0a0a15" />
                </linearGradient>
                <radialGradient id="lightGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,245,212,0.8)" />
                    <stop offset="100%" stopColor="rgba(0,245,212,0)" />
                </radialGradient>
                <radialGradient id="rearGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,60,60,0.8)" />
                    <stop offset="100%" stopColor="rgba(255,60,60,0)" />
                </radialGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="400" cy="370" rx="310" ry="18" fill="rgba(0,0,0,0.5)" />

            {/* Body shadow glow */}
            <ellipse cx="400" cy="290" rx="300" ry="60" fill="rgba(0,245,212,0.04)" filter="url(#bodyGlow)" />

            {/* Main body */}
            <path
                d="M120 290 L140 240 L200 200 L280 175 L380 165 L490 170 L570 185 L640 220 L670 260 L680 290 Z"
                fill="url(#bodyGrad)"
                stroke="url(#edgeGrad)"
                strokeWidth="1.5"
                filter="url(#carGlow)"
            />

            {/* Roof */}
            <path
                d="M250 200 L290 160 L370 145 L460 148 L530 165 L570 190 L490 185 L380 178 L280 185 Z"
                fill="url(#bodyGrad)"
                stroke="rgba(0,245,212,0.3)"
                strokeWidth="1"
            />

            {/* Windshield */}
            <path
                d="M260 200 L295 162 L370 147 L380 178 L295 185 Z"
                fill="rgba(0,245,212,0.03)"
                stroke="rgba(0,245,212,0.2)"
                strokeWidth="1"
            />

            {/* Rear window */}
            <path
                d="M460 150 L525 168 L565 192 L490 187 Z"
                fill="rgba(0,245,212,0.03)"
                stroke="rgba(0,245,212,0.15)"
                strokeWidth="1"
            />

            {/* Door lines */}
            <path d="M320 200 L325 280" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M440 195 L445 280" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Accent stripe */}
            <path
                d="M140 258 L660 258"
                stroke="url(#edgeGrad)"
                strokeWidth="1"
                opacity="0.6"
            />

            {/* Headlight */}
            <ellipse cx="155" cy="248" rx="22" ry="10" fill="url(#lightGrad)" opacity="0.9" />
            <ellipse cx="155" cy="248" rx="12" ry="5" fill="rgba(0,245,212,0.9)" />
            {/* Headlight glow beam */}
            <path
                d="M133 248 L80 230 L70 260 L133 258"
                fill="rgba(0,245,212,0.05)"
                filter="url(#bodyGlow)"
            />

            {/* Tail light */}
            <ellipse cx="660" cy="258" rx="20" ry="9" fill="url(#rearGrad)" opacity="0.8" />
            <ellipse cx="660" cy="258" rx="10" ry="4" fill="rgba(255,60,60,0.9)" />

            {/* Front wheel */}
            <circle cx="220" cy="305" r="52" fill="url(#wheelGrad)" stroke="rgba(0,245,212,0.2)" strokeWidth="1.5" />
            <circle cx="220" cy="305" r="38" fill="url(#wheelGrad)" stroke="rgba(0,245,212,0.1)" strokeWidth="1" />
            <circle cx="220" cy="305" r="14" fill="rgba(0,245,212,0.15)" stroke="rgba(0,245,212,0.4)" strokeWidth="1" />
            {/* Spokes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <line
                    key={i}
                    x1={220 + 14 * Math.cos((angle * Math.PI) / 180)}
                    y1={305 + 14 * Math.sin((angle * Math.PI) / 180)}
                    x2={220 + 36 * Math.cos((angle * Math.PI) / 180)}
                    y2={305 + 36 * Math.sin((angle * Math.PI) / 180)}
                    stroke="rgba(0,245,212,0.25)"
                    strokeWidth="1.5"
                />
            ))}

            {/* Rear wheel */}
            <circle cx="565" cy="305" r="52" fill="url(#wheelGrad)" stroke="rgba(0,245,212,0.2)" strokeWidth="1.5" />
            <circle cx="565" cy="305" r="38" fill="url(#wheelGrad)" stroke="rgba(0,245,212,0.1)" strokeWidth="1" />
            <circle cx="565" cy="305" r="14" fill="rgba(0,245,212,0.15)" stroke="rgba(0,245,212,0.4)" strokeWidth="1" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <line
                    key={i}
                    x1={565 + 14 * Math.cos((angle * Math.PI) / 180)}
                    y1={305 + 14 * Math.sin((angle * Math.PI) / 180)}
                    x2={565 + 36 * Math.cos((angle * Math.PI) / 180)}
                    y2={305 + 36 * Math.sin((angle * Math.PI) / 180)}
                    stroke="rgba(0,245,212,0.25)"
                    strokeWidth="1.5"
                />
            ))}
        </svg>
    );
}

/* ─── Particle ─────────────────────────────────────────────── */
const PARTICLES = [
    { x: "10%", y: "30%", size: 2, speed: -0.4 },
    { x: "25%", y: "70%", size: 3, speed: -0.2 },
    { x: "45%", y: "20%", size: 2, speed: -0.6 },
    { x: "65%", y: "80%", size: 2, speed: -0.3 },
    { x: "80%", y: "40%", size: 3, speed: -0.5 },
    { x: "90%", y: "65%", size: 2, speed: -0.25 },
];

/* ─── ShowcaseScroll ────────────────────────────────────────── */
export default function ShowcaseScroll() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinnedRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const particleRefs = useRef<HTMLDivElement[]>([]);
    const lightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                    pin: pinnedRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                },
            });

            // Car movement
            tl.fromTo(
                carRef.current,
                { x: "-18%", rotateY: -12, scale: 0.92 },
                { x: "18%", rotateY: 12, scale: 1.1, ease: "none" },
                0
            );

            // Light reflection sweep
            tl.fromTo(
                lightRef.current,
                { x: "-60%", opacity: 0 },
                { x: "160%", opacity: 0.6, ease: "none" },
                0
            );

            // Background gradient shift
            tl.fromTo(
                bgRef.current,
                { background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(123,47,255,0.18) 0%, transparent 70%), #030303" },
                { background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,245,212,0.12) 0%, transparent 70%), #030303", ease: "none" },
                0
            );

            // Headline fades out
            tl.to(headlineRef.current, { opacity: 0, y: -40, ease: "none" }, 0);

            // Label fades in
            tl.fromTo(
                labelRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, ease: "none" },
                0.4
            );

            // Parallax particles
            particleRefs.current.forEach((p, i) => {
                if (!p) return;
                tl.to(p, { y: PARTICLES[i].speed * 200, ease: "none" }, 0);
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="relative"
            style={{ height: "300vh" }}
        >
            {/* Pinned viewport */}
            <div
                ref={pinnedRef}
                className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
            >
                {/* Background */}
                <div
                    ref={bgRef}
                    className="absolute inset-0 transition-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(123,47,255,0.18) 0%, transparent 70%), #030303",
                    }}
                />

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Particles */}
                {PARTICLES.map((p, i) => (
                    <div
                        key={i}
                        ref={(el) => { if (el) particleRefs.current[i] = el; }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            background: i % 2 === 0 ? "var(--accent-teal)" : "var(--accent-purple)",
                            boxShadow: `0 0 ${p.size * 4}px ${i % 2 === 0 ? "rgba(0,245,212,0.6)" : "rgba(123,47,255,0.6)"}`,
                            willChange: "transform",
                        }}
                    />
                ))}

                {/* Scroll-driven headline that fades out */}
                <div
                    ref={headlineRef}
                    className="absolute top-16 left-0 right-0 text-center z-10 pointer-events-none"
                    style={{ willChange: "transform, opacity" }}
                >
                    <p className="text-white/20 text-xs tracking-[0.5em] uppercase">Scroll to explore</p>
                    <h2
                        className="font-black tracking-wide text-white/90 mt-2"
                        style={{ fontSize: "clamp(1.5rem, 4vw, 4rem)" }}
                    >
                        The Future Drives Itself
                    </h2>
                </div>

                {/* Car container */}
                <div
                    ref={carRef}
                    className="relative z-10"
                    style={{
                        width: "min(85vw, 820px)",
                        willChange: "transform",
                    }}
                >
                    {/* Light reflection */}
                    <div
                        ref={lightRef}
                        className="absolute inset-y-0 w-[30%] pointer-events-none z-20 opacity-0"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                            willChange: "transform, opacity",
                        }}
                    />
                    <CarShape />
                </div>

                {/* Label that fades in mid-scroll */}
                <div
                    ref={labelRef}
                    className="absolute bottom-16 flex flex-col items-center gap-3 opacity-0 z-10"
                    style={{ willChange: "transform, opacity" }}
                >
                    <div className="flex items-center gap-6">
                        {["Zero Emissions", "0–100 in 2.8s", "800km Range"].map((txt) => (
                            <span
                                key={txt}
                                className="text-xs tracking-[0.3em] text-white/50 uppercase font-medium"
                            >
                                {txt}
                            </span>
                        ))}
                    </div>
                    <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
            </div>
        </div>
    );
}
