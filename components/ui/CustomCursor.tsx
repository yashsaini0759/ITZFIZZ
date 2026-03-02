"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Only activate on true mouse/pointer devices (desktop)
        // `(pointer: fine)` = mouse; `(pointer: coarse)` = touch/mobile
        const isMouse = window.matchMedia("(pointer: fine)").matches;
        if (!isMouse) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let raf: number;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            }

            // Only reveal elements after the first actual mouse move
            // This prevents the ring from appearing at (0,0) on load
            setShow(true);
        };

        const animate = () => {
            ringX = lerp(ringX, mouseX, 0.1);
            ringY = lerp(ringY, mouseY, 0.1);

            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            }
            raf = requestAnimationFrame(animate);
        };

        const onEnter = () => {
            if (dotRef.current) dotRef.current.style.opacity = "0";
            if (ringRef.current) {
                ringRef.current.style.width = "48px";
                ringRef.current.style.height = "48px";
                ringRef.current.style.borderColor = "var(--accent-teal)";
                ringRef.current.style.backgroundColor = "rgba(0,245,212,0.08)";
            }
        };

        const onLeave = () => {
            if (dotRef.current) dotRef.current.style.opacity = "1";
            if (ringRef.current) {
                ringRef.current.style.width = "40px";
                ringRef.current.style.height = "40px";
                ringRef.current.style.borderColor = "rgba(255,255,255,0.6)";
                ringRef.current.style.backgroundColor = "transparent";
            }
        };

        document.addEventListener("mousemove", onMouseMove);
        raf = requestAnimationFrame(animate);

        const interactives = document.querySelectorAll("a, button, [data-cursor]");
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    // Render nothing on mobile/touch OR before mouse has moved
    if (!show) return null;

    return (
        <>
            {/* Dot */}
            <div
                id="custom-cursor-dot"
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] transition-opacity duration-200"
                style={{ backgroundColor: "var(--accent-teal)" }}
                aria-hidden
            />
            {/* Ring */}
            <div
                id="custom-cursor-ring"
                ref={ringRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[99998] border border-white/60 transition-[width,height,border-color,background-color] duration-200"
                aria-hidden
            />
        </>
    );
}
