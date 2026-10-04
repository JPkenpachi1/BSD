# Wedding Invitation 

Complete Next.js 16 + TypeScript + Tailwind CSS v4 wedding invitation
with GSAP animations: layered cloud-reveal intro, scroll-triggered
section reveals, live countdown, events, gallery and RSVP.

Everything visual is a colored placeholder — swap in real photos anytime.

## Quick start

    npm install

    # add your font file:
    #   public/fonts/WeddingdayPersonalUseRegular-1Gvo0.ttf

    npm run dev          # http://localhost:3000

## Test on your phone (same Wi-Fi)

    npm run dev:lan      # listens on 0.0.0.0

Then open http://192.168.1.48:3000 on your phone.

- Update the IP in next.config.ts (allowedDevOrigins) if yours differs.
- If it still won't load: sudo ufw allow 3000/tcp
- Instant tunnel alternative: npx ngrok http 3000

## Folder structure

    app/
      layout.tsx          root layout + metadata
      page.tsx            composes all sections
      globals.css         Tailwind v4 theme + @font-face (WeddingDay)
    components/
      intro/
        CloudReveal.tsx   hero: layered clouds part L/R, names right-aligned
      sections/
        CoupleSection.tsx photos + parents
        StorySection.tsx  timeline
        EventsSection.tsx cards + live Countdown
        GallerySection.tsx photo grid (placeholders)
        RsvpSection.tsx   form with success state
      ui/
        Reveal.tsx        scroll-trigger fade/rise wrapper (GSAP ScrollTrigger)
        SectionHeading.tsx eyebrow + script title + divider
        Placeholder.tsx   colored gradient stand-in for photos
        Countdown.tsx     live countdown (edit TARGET date inside)
    public/
      fonts/              -> put the .ttf here
      images/             -> optional real photos

## Customising

- Names / date text : components/intro/CloudReveal.tsx
- Countdown date    : TARGET in components/ui/Countdown.tsx
- Cloud speed/depth : the `layers` array in CloudReveal.tsx
  (dur = seconds, front layer should be fastest)
- Colors            : @theme block in app/globals.css
- Real photos       : see public/images/PUT_IMAGES_HERE.txt

## Animation timeline (intro)

    0.0s  clouds sweep inward from left & right (3 layers, parallax)
    1.5s  hold — screen fully covered
    2.0s  clouds part outward, image slides in from left
    2.5s  names rise (right-aligned), then date, then scroll cue
    5.0s+ names float gently, image breathes (infinite idle)
