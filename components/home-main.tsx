"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomeMain() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-8 py-20 sm:px-12 md:px-16 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-row items-center gap-12 lg:gap-16">
        {/* Left: Editorial text */}
        <div className="flex flex-shrink-0 flex-col select-none w-[320px] sm:w-[360px] md:w-[400px]">
          {/* Eyebrow */}
          <p className="mb-3 font-prestiregular text-[11px] uppercase tracking-[0.28em] text-black/50 sm:text-[12px]">
            Designed with Intention
          </p>

          {/* Display headline */}
          <h2 className="font-prestiregular text-[56px] leading-[0.88] text-black sm:text-[72px] md:text-[86px] lg:text-[100px]">
            Released
            <br />
            Once
          </h2>

          {/* Divider */}
          <div className="my-6 h-px w-16 bg-black/20 sm:my-7" />

          {/* Script tagline */}
          <p className="font-hopeless-romantic text-[20px] pb-6 leading-[1.4] tracking-wide text-black/70 sm:text-[23px] md:text-[26px]">
            Limited-edition swimwear inspired by places, memories, and moments
            worth keeping.
          </p>

          {/* CTA Button */}
          <Link
            href="/collection"
            className="mt-8 inline-block w-fit border border-black px-7 py-3 font-prestiregular text-[12px] uppercase tracking-[0.22em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Shop the Collection
          </Link>
        </div>

        {/* Right: Image */}
        <div className="relative flex-1 min-w-0" style={{ height: "620px" }}>
          <Image
            src="/bikini-bottoms.png"
            alt="Bikini bottoms"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 700px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
