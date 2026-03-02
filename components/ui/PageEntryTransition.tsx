"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageEntryTransition() {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        gsap.to(overlay, {
            scaleY: 0,
            duration: 1.2,
            ease: "power4.inOut",
            transformOrigin: "top center",
            delay: 0.2,
            onComplete: () => {
                overlay.style.display = "none";
            },
        });
    }, []);

    return (
        <div
            ref={overlayRef}
            id="page-entry-overlay"
            style={{
                position: "fixed",
                inset: 0,
                background: "#030303",
                zIndex: 10000,
                transformOrigin: "top center",
            }}
            aria-hidden
        />
    );
}
