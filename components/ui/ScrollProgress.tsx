"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        gsap.to(bar, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });
    }, []);

    return (
        <div
            className="fixed right-4 top-[10%] h-[80%] w-[2px] z-[9997] rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            aria-hidden
        >
            <div
                ref={barRef}
                className="w-full h-full rounded-full origin-top"
                style={{
                    background:
                        "linear-gradient(to bottom, var(--accent-teal), var(--accent-purple))",
                    transform: "scaleY(0)",
                    boxShadow: "0 0 8px rgba(0,245,212,0.5)",
                }}
            />
        </div>
    );
}
