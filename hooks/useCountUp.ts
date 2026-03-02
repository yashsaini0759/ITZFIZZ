"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
    target: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
}

export function useCountUp({ target, duration = 2000, decimals = 0, suffix = "" }: UseCountUpOptions) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLElement | null>(null);
    const rafRef = useRef<number>(0);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();

                    const tick = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        // Ease-out quad
                        const eased = 1 - (1 - progress) * (1 - progress);
                        setValue(parseFloat((eased * target).toFixed(decimals)));

                        if (progress < 1) {
                            rafRef.current = requestAnimationFrame(tick);
                        } else {
                            setValue(target);
                        }
                    };

                    rafRef.current = requestAnimationFrame(tick);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration, decimals]);

    return { value: `${value}${suffix}`, ref };
}
