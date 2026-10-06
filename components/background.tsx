"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* BACKGROUND MUSIC + HERO-ONLY CIRCULAR CURSOR
   - A gold-ringed circle follows the mouse with GSAP quickTo lag
   - Visible ONLY inside the hero (#home); fades/scales off elsewhere
   - Clicking the hero toggles music; ring text shows current state */

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const ring = ringRef.current;
    if (!audio || !ring) return;

    audio.volume = 0.4;

    const hero = document.getElementById("home");
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // --- cursor follow (desktop only) ---
    if (finePointer) {
      gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.6 });

      const moveX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
      const moveY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
      const onMove = (e: MouseEvent) => { moveX(e.clientX); moveY(e.clientY); };
      window.addEventListener("mousemove", onMove);

      // appear over hero, vanish elsewhere
      const show = () => {
        gsap.to(ring, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" });
        hero?.style.setProperty("cursor", "none"); // hide default cursor in hero
      };
      const hide = () => {
        gsap.to(ring, { opacity: 0, scale: 0.6, duration: 0.3, ease: "power2.in" });
        hero?.style.removeProperty("cursor");
      };
      hero?.addEventListener("mouseenter", show);
      hero?.addEventListener("mouseleave", hide);

      return () => {
        window.removeEventListener("mousemove", onMove);
        hero?.removeEventListener("mouseenter", show);
        hero?.removeEventListener("mouseleave", hide);
        hero?.style.removeProperty("cursor");
      };
    }
  }, []);

  // click on hero toggles music (works on mobile tap too)
  useEffect(() => {
    const audio = audioRef.current;
    const hero = document.getElementById("home");
    if (!audio || !hero) return;

    const toggle = () => {
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
    };
    const sync = () => setPlaying(!audio.paused);

    hero.addEventListener("click", toggle);
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);

    return () => {
      hero.removeEventListener("click", toggle);
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/backgroundsong.mpeg" type="audio/mpeg" />
      </audio>

      {/* circular cursor ring — visual only, never blocks clicks */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/60 bg-white/70 text-center backdrop-blur-sm"
      >
        <span className="px-2 text-[9px] font-medium uppercase leading-tight tracking-[0.2em] text-gold-600">
          {playing ? "Click to off" : "Click for music"}
        </span>
      </div>
    </>
  );
}