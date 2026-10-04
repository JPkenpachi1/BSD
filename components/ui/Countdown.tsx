"use client";

import { useEffect, useState } from "react";

/* Live countdown to the ceremony. Change TARGET to your date. */
const TARGET = new Date("2026-10-25T09:00:00+05:30").getTime();

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calc(): Parts {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export default function Countdown() {
  // null on server AND first client render -> identical HTML -> no mismatch
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    setT(calc());                      // first tick right after mount
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Days",    value: t ? String(t.days) : "--" },
    { label: "Hours",   value: t ? String(t.hours).padStart(2, "0") : "--" },
    { label: "Minutes", value: t ? String(t.minutes).padStart(2, "0") : "--" },
    { label: "Seconds", value: t ? String(t.seconds).padStart(2, "0") : "--" },
  ];

  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-3 text-center">
      {cells.map((c) => (
        <div key={c.label} className="rounded-xl border border-gold-400/40 bg-white/70 px-2 py-4 shadow-sm">
          <div className="text-2xl font-semibold tabular-nums text-maroon-800">{c.value}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold-600">{c.label}</div>
        </div>
      ))}
    </div>
  );
}