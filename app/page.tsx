import CloudReveal from "@/components/intro/CloudReveal";
import CoupleSection from "@/components/sections/CoupleSection";
import StorySection from "@/components/sections/StorySection";
import EventsSection from "@/components/sections/EventsSection";
import GallerySection from "@/components/sections/GallerySection";
import RsvpSection from "@/components/sections/RsvpSection";
import SaveTheDateSection from "@/components/sections/jumbotronsection";

export default function Home() {
  return (
    <main>
      <CloudReveal />
      <CoupleSection />
      {/* <StorySection /> */}
      <EventsSection />
      {/* <GallerySection /> */}
      {/* <RsvpSection /> */}
      <SaveTheDateSection/>
    </main>
  );
}
