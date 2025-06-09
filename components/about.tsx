// components/AboutSection.tsx
"use client";

export function AboutSection() {
  return (
    <section className="w-full px-4 py-12 sm:px-6 lg:px-16 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-prestiregular mb-4 text-gray-900">
          About Us
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 font-prestiregular">
          Winnie Swim is a modern swimwear brand designed for those who live for
          sunshine, salty air, and statement pieces. Our slogan,
          <span className="font-prestisemibold"> more sun + less clothes</span>,
          says it all. We believe in confidence, comfort, and sustainable style
          that turns heads and fits just right.
        </p>
        <p className="text-md text-gray-500 font-prestiregular">
          Whether you are poolside, on the coast, or chasing sunsets, we are
          here to make sure you feel your best in every moment.
        </p>
      </div>
    </section>
  );
}
