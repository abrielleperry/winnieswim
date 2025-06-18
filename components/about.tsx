// components/AboutSection.tsx
"use client";

import Image from "next/image";

export function AboutSection() {
  return (
    <section className="w-full px-4 sm:mt-16  sm:px-6 lg:px-16 bg-white">
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto flex flex-col items-center text-center lg:text-left px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-prestiregular mb-6 text-gray-900 uppercase">
          About Us
        </h2>
        <p className="text-md text-center sm:text-xl text-black mb-6 font-prestiregular ">
          WinnieSwim was born out of friendship, creativity, and love for
          sunshine. Founded by longtime friends Anna and Maddie, our brand
          reflects our energy that brought us together and that we hope to pass
          on through every suit we design.
        </p>
        <p className="text-md text-center sm:text-xl text-black mb-6 font-prestiregular ">
          We care about the details, from custom prints to flattering fits,
          because we know how much a good swimsuit can impact how you show up,
          feel, and have fun.
        </p>
        <p className="text-md  text-center sm:text-xl text-black mb-6 font-prestiregular ">
          Our hope is that WinnieSwim becomes part of your favorite memories,
          just like building this brand has become part of ours.
        </p>
      </div>
      <Image
        src="/sign-combined.png"
        alt="Winnie Swim Logo"
        width={160}
        height={160}
        className="mx-auto w-24 sm:w-32 md:w-40 lg:w-48"
      />

      {/* } <Image
        src="/winnie-sign.png"
        alt="Winnie Swim Logo"
        width={100}
        height={100}
        className="mx-auto   w-32 sm:w-20 md:w-28 lg:w-32 "
        priority
      /> */}
    </section>
  );
}

//  <span className="font-prestisemibold"> more sun + less clothes</span>,
