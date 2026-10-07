"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMusic } from "@/components/background";
import { Music, VolumeX } from "lucide-react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const cloudBumps = [90, 130, 100, 150, 110, 140, 95, 120];

const layers = [
  { w: "72%", tint: "bg-white",    dur: 0.85 },
  { w: "64%", tint: "bg-white/90", dur: 1.05 },
  { w: "56%", tint: "bg-white/70", dur: 1.25 },
];

export default function CloudReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const leftCloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightCloudRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ── EDIT 1: LOCK scroll while the intro plays ──
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // guard for the auto-glide: if the user scrolls manually, don't yank them
    let userScrolled = false;
    const markScrolled = () => { userScrolled = true; };
    window.addEventListener("wheel", markScrolled, { passive: true });
    window.addEventListener("touchmove", markScrolled, { passive: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // initial states
      gsap.set(imgRef.current, { opacity: 0, scale: 1.15 });
      gsap.set([namesRef.current, dateRef.current, scrollRef.current], { opacity: 0, x: -80 });
      gsap.set(barRef.current, { scaleX: 0 });
      leftCloudRefs.current.forEach((el) => { if (el) gsap.set(el, { xPercent: -115 }); });
      rightCloudRefs.current.forEach((el) => { if (el) gsap.set(el, { xPercent: 115 }); });

      // PERCENTAGE — 0 → 100, synced with the intro
      const counter = { value: 0 };
      tl.to(counter, {
        value: 100,
        duration: 2.3,
        ease: "power1.inOut",
        onUpdate: () => {
          if (percentRef.current) percentRef.current.textContent = String(Math.round(counter.value));
          if (barRef.current) gsap.set(barRef.current, { scaleX: counter.value / 100 });
        },
      }, 0);

      // 1. clouds travel INWARD — layered
      tl.to(leftCloudRefs.current, {
          xPercent: 0,
          duration: (i: number) => layers[i].dur,
          stagger: 0.08,
          ease: "power3.out",
        }, 0.1)
        .to(rightCloudRefs.current, {
          xPercent: 0,
          duration: (i: number) => layers[i].dur,
          stagger: 0.08,
          ease: "power3.out",
        }, 0.2)
        .to({}, { duration: 0.5 })

        // 2. REVEAL
        .to(imgRef.current, { opacity: 1, scale: 1, duration: 2, ease: "power1.out" }, "reveal")
        .to(loaderRef.current, { opacity: 0, y: 12, duration: 0.8, ease: "power2.in" }, "reveal+=1")
        .to(namesRef.current, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "reveal+=0.5")
        .to(dateRef.current, { opacity: 1, x: 0, duration: 0.8 }, "reveal+=0.9")
        .to(scrollRef.current, { opacity: 1, x: 0, duration: 0.8 }, "reveal+=1.6")
        .to(leftCloudRefs.current, {
          xPercent: -115,
          duration: (i: number) => layers[i].dur * 1.9,
          stagger: 0.06,
          ease: "power3.inOut",
        }, "reveal+=0.15")
        .to(rightCloudRefs.current, {
          xPercent: 115,
          duration: (i: number) => layers[i].dur * 1.9,
          stagger: 0.06,
          ease: "power3.inOut",
        }, "reveal+=0.25");

      // idle motion after entrance
      gsap.to(namesRef.current, { y: "-=8", duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 5 });
      gsap.to(imgRef.current, { scale: 1.05, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 5 });

      // ── EDIT 2: intro finished → UNLOCK scroll, then glide to #couple ──
      tl.call(() => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      });
      tl.call(() => {
        if (!userScrolled && window.scrollY < 8) {
          gsap.to(window, {
            scrollTo: { y: "#couple", offsetY: 0 },
            duration: 1.4,
            ease: "power2.inOut",
          });
        }
      });
    }, sectionRef);

    // ── EDIT 3: cleanup restores scroll + listeners ──
    return () => {
      window.removeEventListener("wheel", markScrolled);
      window.removeEventListener("touchmove", markScrolled);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  const { playing, toggle } = useMusic();
  return (
    <section id="home" ref={sectionRef} className="relative h-dvh w-full overflow-hidden bg-cream-50">

      {/* FULL-BACKGROUND photo */}
      <img
        ref={imgRef}
        src="/images/couple-bg.png"
        alt="Wedding venue"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent sm:bg-gradient-to-r sm:from-black/55 sm:via-black/15 sm:to-transparent" />

      <button
        onClick={toggle}
        aria-label={playing ? "Turn music off" : "Play music"}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/60 bg-white/80 text-gold-600 shadow-lg backdrop-blur-sm transition-transform active:scale-90 md:hidden"
      >
        {playing ? <VolumeX  size={20} /> : <Music className="animate-music-bounce" size={20} />}
      </button>

      {/* LEFT-aligned names */}
      <div className="absolute bottom-0 left-0 flex h-[58%] w-full items-end pb-14 pl-6 sm:top-0 sm:h-full sm:items-center sm:pl-16">
        <div className="text-left">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-amber-100/90">
            Together with their families
          </p>
          <div ref={namesRef} className="font-wedding leading-tight">
            <h1 className="text-[14vw] leading-[0.95] text-amber-50 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-[8vw]">Divyashree</h1>
            <span className="block text-[7vw] text-amber-200 sm:text-[4vw]">&amp;</span>
            <h1 className="text-[14vw] leading-[0.95] text-amber-50 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-[8vw]">Balasubramani</h1>
          </div>
          <p ref={dateRef} className="mt-6 text-xs uppercase tracking-[0.3em] text-amber-100/90">
            25 . 10 . 2026
          </p>
          <a
            ref={scrollRef}
            href="#couple"
            className="mt-10 inline-flex flex-col items-start gap-2 text-amber-100/70"
          >
            <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="7" cy="7" r="2" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      {/* LOADER — bottom left, fades out after reveal */}
      <div ref={loaderRef} className="pointer-events-none absolute bottom-6 left-6 z-30 sm:bottom-10 sm:left-10">
        <div className="flex items-end gap-1 leading-none text-amber-900">
          <span ref={percentRef} className="text-5xl font-semibold tabular-nums sm:text-6xl">0</span>
          <span className="text-xl sm:text-2xl">%</span>
        </div>
        <div className="mt-2 h-0.5 w-28 bg-amber-900/15 sm:w-36">
          <div ref={barRef} className="h-full w-full origin-left bg-amber-900/70" />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-amber-900/60">
          Opening invitation
        </p>
      </div>

      {/* CLOUD LAYERS from LEFT */}
      {layers.map((L, i) => (
        <div
          key={"L" + i}
          ref={(el: HTMLDivElement | null) => { leftCloudRefs.current[i] = el; }}
          className={"pointer-events-none absolute inset-y-0 left-0 " + L.tint}
          style={{ width: L.w, zIndex: 20 + i }}
        >
          <div className="absolute inset-y-0 -right-12 flex flex-col justify-between py-8">
            {cloudBumps.map((s, j) => (
              <div key={j} className={"shrink-0 rounded-full " + L.tint}
                   style={{ width: s, height: s * 0.7, filter: "blur(16px)" }} />
            ))}
          </div>
        </div>
      ))}

      {/* CLOUD LAYERS from RIGHT */}
      {layers.map((L, i) => (
        <div
          key={"R" + i}
          ref={(el: HTMLDivElement | null) => { rightCloudRefs.current[i] = el; }}
          className={"pointer-events-none absolute inset-y-0 right-0 " + L.tint}
          style={{ width: L.w, zIndex: 20 + i }}
        >
          <div className="absolute inset-y-0 -left-12 flex flex-col justify-between py-8">
            {cloudBumps.map((s, j) => (
              <div key={j} className={"shrink-0 rounded-full " + L.tint}
                   style={{ width: s, height: s * 0.7, filter: "blur(16px)" }} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}