import Reveal from "@/components/ui/Reveal";
import { MapPin } from "lucide-react";

/* FINALE — full-width "Save the Date" jumbotron.
   Render this LAST in app/page.tsx (after <RsvpSection />).
   Background image: public/images/save-the-date-bg.jpg
   Requires: npm install lucide-react */

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=S.S+Mahal+KGF+Robertsonpet+Parandahalli";

export default function SaveTheDateSection() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      {/* BACKGROUND IMAGE */}
      <img
        src="/images/save-the-date-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      {/* warm wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-50/85 to-cream-50" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold-600">The countdown to forever starts now!! </p>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3 text-gold-400">
            <span className="h-px w-12 bg-gold-400/60" />
            <span className="text-lg leading-none">❦</span>
            <span className="h-px w-12 bg-gold-400/60" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-wedding mt-6 text-[13vw] leading-[1.05] text-maroon-800 sm:text-7xl">
            Divyashree
            <span className="my-1 block text-[7vw] text-gold-500 sm:text-4xl">&amp;</span>
            Balasubramani
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.4em] text-stone-700">
            25 . 10 . 2026
          </p>
          {/* VENUE — clickable, opens Google Maps, with location pin icon */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-gold-600 underline decoration-gold-400/50 underline-offset-4 transition-colors hover:text-gold-500"
          >
            <MapPin size={14} strokeWidth={2} className="shrink-0" />
            S.S Mahal, KGF Robertsonpet Parandahalli
          </a>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
            With joyful hearts, we warmly welcome you and your family to celebrate
            the beginning of our forever. Your presence and blessings are the
            greatest gifts we could ask for — come, make our day complete.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="font-wedding mt-12 text-3xl text-maroon-800">With love,</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-stone-400">
            Divyashree &amp; Balasubramani
          </p>
        </Reveal>
      </div>
    </section>
  );
}