"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface MusicContextValue {
  playing: boolean;
  toggle: () => void;
}

const MusicContext = createContext<MusicContextValue>({
  playing: false,
  toggle: () => {},
});

/** Import this in ANY component (e.g. the hero) to build your own music button */
export function useMusic() {
  return useContext(MusicContext);
}

export default function BackgroundMusic({ children }: { children?: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  useEffect(() => {
    const audio = audioRef.current;
    const ring = ringRef.current;
    if (!audio || !ring) return;

    audio.volume = 0.4;
    const sync = () => setPlaying(!audio.paused);
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);

    const hero = document.getElementById("home");
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let cleanupCursor: (() => void) | undefined;

    if (finePointer) {
      gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.6 });

      const moveX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
      const moveY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
      const onMove = (e: MouseEvent) => { moveX(e.clientX); moveY(e.clientY); };
      window.addEventListener("mousemove", onMove);

      const show = () => {
        gsap.to(ring, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" });
        hero?.style.setProperty("cursor", "none");
      };
      const hide = () => {
        gsap.to(ring, { opacity: 0, scale: 0.6, duration: 0.3, ease: "power2.in" });
        hero?.style.removeProperty("cursor");
      };
      hero?.addEventListener("mouseenter", show);
      hero?.addEventListener("mouseleave", hide);

      const onHeroClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a,button")) return;
        toggle();
      };
      hero?.addEventListener("click", onHeroClick);

      cleanupCursor = () => {
        window.removeEventListener("mousemove", onMove);
        hero?.removeEventListener("mouseenter", show);
        hero?.removeEventListener("mouseleave", hide);
        hero?.removeEventListener("click", onHeroClick);
        hero?.style.removeProperty("cursor");
      };
    }

    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      cleanupCursor?.();
    };
  }, []);

  return (
    <MusicContext.Provider value={{ playing, toggle }}>
      <audio ref={audioRef} loop>
        <source src="/backgroundsong.mpeg" type="audio/mpeg" />
      </audio>

      {/* ring: hidden on mobile via CSS, only animated on fine pointers */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-24 w-24 items-center justify-center rounded-full border border-gold-500/60 bg-white/70 text-center backdrop-blur-sm md:flex"
      >
        <span className="px-2 text-[9px] font-medium uppercase leading-tight tracking-[0.2em] text-gold-600">
          {playing ? "Click to off" : "Click for music"}
        </span>
      </div>

      {children}
    </MusicContext.Provider>
  );
}