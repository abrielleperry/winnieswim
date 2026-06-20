"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function MaskedText({
  children,
  innerRef,
  className,
}: {
  children: React.ReactNode;
  innerRef: React.RefObject<HTMLSpanElement | null>;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden py-2">
      <span ref={innerRef} className={`block ${className ?? ""}`}>
        {children}
      </span>
    </span>
  );
}

export default function EastVsWest() {
  const sectionRef = useRef<HTMLElement>(null);

  const headlineOneRef = useRef<HTMLSpanElement>(null);
  const headlineTwoRef = useRef<HTMLSpanElement>(null);
  const subheadlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const headlineOne = headlineOneRef.current;
    const headlineTwo = headlineTwoRef.current;
    const subheadline = subheadlineRef.current;

    if (!headlineOne || !headlineTwo || !subheadline) return;

    gsap.set([headlineOne, headlineTwo, subheadline], {
      yPercent: 110,
      autoAlpha: 0,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=700",
          scrub: 1.2,
          pin: true,
        },
      });

      tl.to(
        headlineOne,
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "power4.out",
        },
        0,
      )
        .to(
          headlineTwo,
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "power4.out",
          },
          0.28,
        )
        .to(
          subheadline,
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "power4.out",
          },
          0.56,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-white px-8 py-24"
    >
      <div className="mx-auto w-full flex  items-center gap-16 ">
        {/* Left text side */}
        <div className="z-10 flex flex justify-center">
          <div className="max-w-[560px] select-none">
            <MaskedText
              innerRef={headlineOneRef}
              className="font-prestiregular text-black text-lg leading-[0.9] sm:text-sm md:text-lg lg:text-lg"
            >
              Designed with Intention
            </MaskedText>

            <MaskedText
              innerRef={headlineTwoRef}
              className="font-prestiregular text-black text-[30px] leading-[0.9] sm:text-[78px] md:text-[92px] lg:text-[108px]"
            >
              Released Once
            </MaskedText>

            <MaskedText
              innerRef={subheadlineRef}
              className="m-10 font-hopeless-romantic block max-w-[480px] text-[17px] leading-[1.45] tracking-wide text-black sm:text-[19px] md:text-[21px]"
            >
              Limited-edition swimwear inspired by places, memories, and moments
              worth keeping.
            </MaskedText>
          </div>
        </div>

        {/* Right image side */}
        <div className="relative flex h-[460px] w-full items-center justify-center md:h-[580px] lg:h-[640px]">
          <Image
            src="/bikini-bottoms.png"
            alt="Bikini bottoms"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
