"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const inputCls =
  "w-full rounded-xl border border-gold-400/40 bg-white/80 px-4 py-3 text-sm " +
  "placeholder:text-stone-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/30";

export default function RsvpSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true); // hook this to your backend / Google Form later
  }

  return (
    <section id="rsvp" className="bg-white/60 px-6 py-24">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <SectionHeading eyebrow="Will You Join Us?" title="RSVP" />
        </Reveal>
        <Reveal>
          {sent ? (
            <div className="rounded-2xl border border-gold-400/40 bg-cream-50 p-10 text-center shadow-sm">
              <h3 className="font-wedding text-4xl text-maroon-800">Thank you!</h3>
              <p className="mt-3 text-sm text-stone-600">
                Your response has been noted. We can&apos;t wait to celebrate with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.25em] text-gold-600">Your name</label>
                <input required type="text" placeholder="Full name" className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.25em] text-gold-600">Attending?</label>
                <select required defaultValue="" className={inputCls}>
                  <option value="" disabled>Select</option>
                  <option value="yes">Joyfully accepting</option>
                  <option value="no">Regretfully declining</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.25em] text-gold-600">Number of guests</label>
                <select required defaultValue="1" className={inputCls}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.25em] text-gold-600">Message for the couple</label>
                <textarea rows={4} placeholder="Wishes, song requests, dietary needs..." className={inputCls} />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gold-500 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-gold-600"
              >
                Send RSVP
              </button>
            </form>
          )}
        </Reveal>
        <Reveal className="mt-16 text-center">
          <p className="font-wedding text-3xl text-maroon-800">Aarav &amp; Meera</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-stone-400">
            15 . 11 . 2026 · Chennai
          </p>
        </Reveal>
      </div>
    </section>
  );
}
