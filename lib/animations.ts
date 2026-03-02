import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate letters with staggered reveal: fade in + y offset + blur
 */
export function letterReveal(
    letters: HTMLElement[],
    tl: gsap.core.Timeline,
    delay = 0
) {
    tl.fromTo(
        letters,
        {
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
        },
        {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.05,
            delay,
        }
    );
}

/**
 * Highlight sweep across text using background-clip
 */
export function sweepHighlight(element: HTMLElement, tl: gsap.core.Timeline) {
    tl.fromTo(
        element,
        { backgroundSize: "0% 100%" },
        {
            backgroundSize: "100% 100%",
            duration: 1.2,
            ease: "power2.inOut",
        }
    );
}

/**
 * Create a parallax layer tied to scroll
 */
export function createParallaxLayer(
    el: HTMLElement,
    speed: number,
    trigger: string | HTMLElement = "body"
) {
    gsap.to(el, {
        y: () => el.offsetHeight * speed,
        ease: "none",
        scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        },
    });
}

/**
 * 3D card tilt on mousemove (lerped)
 */
export function setupCardTilt(card: HTMLElement) {
    let rX = 0;
    let rY = 0;
    let targetX = 0;
    let targetY = 0;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetX = (e.clientY - cy) / (rect.height / 2);
        targetY = -(e.clientX - cx) / (rect.width / 2);
    };

    const animate = () => {
        rX = lerp(rX, targetX, 0.1);
        rY = lerp(rY, targetY, 0.1);
        card.style.transform = `perspective(800px) rotateX(${rX * 8}deg) rotateY(${rY * 8}deg) scale3d(1.02,1.02,1.02)`;
        raf = requestAnimationFrame(animate);
    };

    const onEnter = () => { raf = requestAnimationFrame(animate); };
    const onLeave = () => {
        cancelAnimationFrame(raf);
        targetX = 0;
        targetY = 0;
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(raf);
    };
}
