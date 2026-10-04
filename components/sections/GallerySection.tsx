import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Placeholder from "@/components/ui/Placeholder";

const shots = [
  { label: "Engagement", gradient: "from-rose-300 via-amber-200 to-rose-400" },
  { label: "Pre-wedding", gradient: "from-amber-200 via-yellow-200 to-orange-300" },
  { label: "Haldi", gradient: "from-yellow-200 via-amber-300 to-yellow-400" },
  { label: "Mehendi", gradient: "from-emerald-200 via-teal-200 to-emerald-300" },
  { label: "Sangeet", gradient: "from-purple-200 via-fuchsia-200 to-purple-300" },
  { label: "The Day", gradient: "from-rose-200 via-pink-300 to-rose-400" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow="Moments" title="Gallery" />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {shots.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 0.1}>
              <Placeholder
                label={s.label}
                gradient={s.gradient}
                className="aspect-square w-full rounded-2xl shadow-sm"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
