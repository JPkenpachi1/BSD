import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const milestones = [
  {
    year: "2019",
    title: "First Meeting",
    text: "A rainy evening in Chennai, one shared umbrella, and a conversation that refused to end.",
  },
  {
    year: "2022",
    title: "The Proposal",
    text: "Under a sky full of fireworks, on one knee, with a ring hidden in a box of her favourite mithai.",
  },
  {
    year: "2026",
    title: "The Wedding",
    text: "Two families, one temple, and a promise made in front of everyone we love.",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <SectionHeading eyebrow="Our Journey" title="Our Story" />
        </Reveal>
        <ol className="relative border-l-2 border-gold-400/40 pl-8">
          {milestones.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-gold-500 bg-cream-50" />
              <p className="text-xs uppercase tracking-[0.3em] text-gold-600">{m.year}</p>
              <h3 className="font-wedding mt-1 text-3xl text-maroon-800">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{m.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
