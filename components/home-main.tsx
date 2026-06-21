"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomeMain() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
        {/* Text — first in JSX = top on mobile, left on desktop */}
        <div className="flex flex-shrink-0 flex-col select-none px-8 py-12 md:w-[360px] md:px-0 md:py-20 lg:w-[420px]">
          <p className="mb-3 font-prestiregular text-[11px] uppercase tracking-[0.28em] text-black/50 sm:text-[12px]">
            Designed with Intention
          </p>
          <h2 className="font-prestiregular text-[56px] leading-[0.88] text-black sm:text-[72px] md:text-[86px] lg:text-[100px]">
            Released
            <br />
            Once
          </h2>
          <div className="my-6 h-px w-16 bg-black/20 sm:my-7" />
          <p className="font-hopeless-romantic text-[20px] pb-6 leading-[1.4] tracking-wide text-black/70 sm:text-[23px] md:text-[26px]">
            Limited-edition swimwear inspired by places, memories, and moments
            worth keeping.
          </p>
          <Link
            href="/collection"
            className="mt-8 inline-block w-fit border border-black px-7 py-3 font-prestiregular text-[12px] uppercase tracking-[0.22em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Shop the Collection
          </Link>
        </div>

        {/* Image — second in JSX = below text on mobile, right on desktop */}
        <div className="relative w-full md:flex-1 h-[320px] sm:h-[420px] md:h-[520px]">
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
