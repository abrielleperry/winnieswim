import Link from "next/link";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function CollectionPage() {
  return (
    <>
      <main className="min-h-screen">
        <section className="min-h-screen">
          <div className="grid grid-cols-1 pb-10 lg:grid-cols-2 gap-12 lg:gap-0 px-4 pt-24 sm:pt-16 lg:pt-24">
            {/* Left side - East x West lockup */}
            <div className="flex items-center justify-center px-4 sm:px-0">
              <div className="flex w-full max-w-md flex-col gap-4">
                <div className="flex flex-col">
                  <p className="font-prestiregular text-7xl text-[#1a1a1a] sm:text-6xl md:text-7xl lg:text-8xl">
                    East
                  </p>
                  <p className="font-prestiregular py-1 text-2xl italic tracking-[0.3em] text-[#797979] sm:text-2xl md:text-3xl lg:text-4xl">
                    x
                  </p>
                  <p className="font-prestiregular text-7xl text-[#1a1a1a] sm:text-6xl md:text-7xl lg:text-8xl">
                    West
                  </p>
                </div>
                <p className="font-prestiregular text-base leading-relaxed text-[#424242] sm:text-[14px] md:text-md">
                  East x West was inspired by a friendship that began in the
                  middle of the country and grew across two coasts.
                </p>
                <p className="font-prestiregular text-base leading-relaxed text-[#424242] sm:text-[14px] md:text-md">
                  Through numerous flights and visits, we experienced two
                  completely different worlds while creating some of our
                  favorite memories together. From busy city streets to coastal
                  sunsets, each print in this collection reflects the places,
                  moments, and experiences that shaped our journey.
                </p>
                <p className="font-prestiregular text-base leading-relaxed text-[#424242] sm:text-[14px] md:text-md">
                  East x West is a celebration of friendship, distance, and the
                  memories that make any place feel like home. Designed in
                  limited quantities and released only once, each piece tells a
                  story you'll never see repeated.
                </p>
                <Link
                  href="/products"
                  className="inline-block w-fit border border-black px-7 py-3 font-prestiregular text-[12px] uppercase tracking-[0.22em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  Shop the Collection
                </Link>
              </div>
            </div>

            {/* Right side - Responsive Image */}
            <div className="flex items-center justify-center px-4 sm:px-0">
              <div className="w-full max-w-md md:max-w-lg lg:max-w-md xl:max-w-sm">
                <img
                  src="/girls-in-pool.png"
                  alt="Girls in WinnieSwim bikinis at the pool"
                  className="w-full h-auto object-cover"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px" }}
                />
              </div>
            </div>
          </div>

          <VelocityScroll className="font-hopeless-romantic text-black pb-4">
            More Sun + Less Clothes
          </VelocityScroll>
        </section>
      </main>
    </>
  );
}
