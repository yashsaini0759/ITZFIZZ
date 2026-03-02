export default function Footer() {
    return (
        <footer
            className="relative border-t py-16 px-6 text-center overflow-hidden"
            style={{
                background: "#030303",
                borderColor: "rgba(255,255,255,0.06)",
            }}
        >
            {/* Glow */}
            <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, var(--accent-teal), var(--accent-purple), transparent)",
                }}
            />

            <p
                className="font-black text-4xl md:text-6xl tracking-[0.15em] mb-4"
                style={{
                    background: "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                ITZFIZZ
            </p>

            <p className="text-white/30 text-sm tracking-widest uppercase">
                Premium Digital Experiences • 2025
            </p>

            <div className="mt-8 flex justify-center gap-6">
                {["Twitter", "GitHub", "LinkedIn", "Dribbble"].map((s) => (
                    <a
                        key={s}
                        href="#"
                        className="text-xs text-white/30 hover:text-white/70 transition-colors tracking-wider"
                        data-cursor
                    >
                        {s}
                    </a>
                ))}
            </div>
        </footer>
    );
}
