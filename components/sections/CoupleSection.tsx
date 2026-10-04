import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Placeholder from "@/components/ui/Placeholder";

export default function CoupleSection() {
  return (
    <section id="couple" className="relative overflow-hidden px-6 py-24">

      {/* 1. BACKGROUND IMAGE */}
      {/* <img
        src="/images/couple-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full  object-cover scale-[1]  "
      /> */}
      {/* 2. readability wash */}
      <div className="absolute inset-0 " />

      {/* 3. CONTENT — lifted above the image */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow="The Wedding Of" title="He knelt to the ground and  pulled out a ring and said" />
        </Reveal>
        <div className="grid gap-14 sm:grid-cols-">
          <Reveal className="text-center">
            {/* <Placeholder
              label="Groom photo"
              className="mx-auto aspect-[3/4] w-full max-w-xs rounded-2xl shadow-lg"
              gradient="from-amber-200 via-orange-200 to-amber-300"
            /> */}
            <img
            src="/images/couples.jpeg"
            style={{borderRadius:'50%'}}
              className="mx-auto aspect-[3/4] w-full max-w-xs object-contain rounded shadow-lg "
            
            />
            {/* <h3 className="font-wedding mt-6 text-4xl text-maroon-800">With Jp's Blessing's</h3> */}
            {/* <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Son of Mr. Sivan &amp; Mrs. Vanmathi
            </p> */}
          </Reveal>
          {/* <Reveal className="text-center" delay={0.15}>
            <Placeholder
              label="Bride photo"
              className="mx-auto aspect-[3/4] w-full max-w-xs rounded-2xl shadow-lg"
              gradient="from-rose-200 via-pink-200 to-rose-300"
            />
             <img
            src="/images/bride.jpeg"
              className="mx-auto aspect-[3/4] w-full max-w-xs object-contain "
            
            />
            <h3 className="font-wedding mt-6 text-4xl text-maroon-800">Divyashree</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Daughter of Mr. Dayanidhi &amp; Mrs. Powan Jyothi
            </p>
          </Reveal> */}
        </div>
      </div>
    </section>
  );
}