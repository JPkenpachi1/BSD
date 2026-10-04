import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Countdown from "@/components/ui/Countdown";

const events = [
  { name: "Reception",     date: "24 Oct 2026", time: "7:30 PM", venue: "S.S Mahal, KGF", img: "/images/reception.jpg" },
  { name: "The Ceremony",  date: "25 Oct 2026", time: "7:00 PM", venue: "S.S Mahal, KGF", img: "/images/ceremony.jpg" },
];

export default function EventsSection() {
  return (
    <section id="events" className="relative overflow-hidden px-6 py-24">

      {/* SECTION BACKGROUND IMAGE */}
      <img
        src="/images/events-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-fit "
      />
      <div className="absolute inset-0 " />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow="Festivities" title="Wedding Events" />
        </Reveal>
        <Reveal>
          <Countdown />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.12}>
              {/* CARD with its own background image */}
              <div className="relative h-full overflow-hidden rounded-2xl border border-gold-400/30 shadow-sm">
                {/* card bg image */}
                <img
                  src={e.img}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-contain opacity-25"
                />
                {/* wash so text stays readable */}
                <div className="absolute inset-0 " />

                {/* card content */}
                <div className="relative z-10 p-8 text-center">
                  <h3 className="font-wedding text-4xl text-maroon-800">{e.name}</h3>
                  <div className="mx-auto mt-4 h-px w-12 bg-gold-400" />
                  <p className="mt-4 text-sm font-medium tracking-wide text-stone-700">{e.date}</p>
                  <p className="mt-1 text-sm text-stone-500">{e.time}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold-600">{e.venue}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}