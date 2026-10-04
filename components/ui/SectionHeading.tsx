interface Props {
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ eyebrow, title }: Props) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-2 text-[11px] uppercase tracking-[0.4em] text-gold-600">{eyebrow}</p>
      <h2 className="font-wedding text-5xl text-maroon-800 sm:text-6xl">{title}</h2>
      <div className="mx-auto mt-4 h-px w-16 bg-gold-400" />
    </div>
  );
}
