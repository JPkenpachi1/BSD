"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.4;

    const playMusic = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", playMusic);
    };

    document.addEventListener("click", playMusic);

    return () => {
      document.removeEventListener("click", playMusic);
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/backgroundsong.mpeg" type="audio/mpeg" />
    </audio>
  );
}