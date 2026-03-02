"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-[9990] transition-all duration-500"
            style={{
                background: scrolled
                    ? "rgba(3,3,3,0.85)"
                    : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2" data-cursor>
                    <span
                        className="font-black text-xl tracking-[0.15em] text-white"
                        style={{
                            background: "linear-gradient(90deg, #fff 40%, var(--accent-teal))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        ITZFIZZ
                    </span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Work", "About", "Services", "Contact"].map((link) => (
                        <Link
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-sm text-white/50 hover:text-white transition-colors duration-200 tracking-wide font-medium"
                            data-cursor
                        >
                            {link}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <button
                    className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-black transition-all duration-300 hover:scale-105"
                    style={{
                        background: "linear-gradient(90deg, var(--accent-teal), var(--accent-purple))",
                        boxShadow: "0 0 20px rgba(0,245,212,0.2)",
                    }}
                    data-cursor
                >
                    Get Started
                </button>
            </div>
        </nav>
    );
}
