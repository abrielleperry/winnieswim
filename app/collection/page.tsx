import Link from "next/link";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function CollectionPage() {
  return (
    <>
      <main className="min-h-screen">
        <section className="min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 px-4 py-12 sm:py-16 lg:py-24">
            {/* Left side - East x West lockup */}
            {/* Left side - East x West lockup */}
            <div className="flex items-center justify-center px-4 sm:px-0">
              <div className="flex w-full max-w-md flex-col gap-8">
                <p className="font-prestibook text-[20px] uppercase tracking-[0.25em] text-[#aaa] sm:text-[20px] md:text-md">
                  SS 2026 Collection
                </p>

                <div className="flex flex-col ">
                  <p className="font-prestibold text-5xl  text-[#1a1a1a] sm:text-6xl md:text-7xl lg:text-8xl">
                    East
                  </p>

                  <p className="font-prestiregular py-1 text-xl italic tracking-[0.3em] text-[#797979] sm:text-2xl md:text-3xl lg:text-4xl">
                    x
                  </p>

                  <p className="font-prestibold text-5xl  text-[#1a1a1a] sm:text-6xl md:text-7xl lg:text-8xl">
                    West
                  </p>
                </div>

                <p className="font-prestisemibold text-base italic leading-relaxed text-[#424242] sm:text-[17px] md:text-lg">
                  Designed with Intention. Released Once. <br /> Limited-edition
                  swimwear inspired by places, memories, and moments worth
                  keeping.
                </p>

                <Link
                  href="/products"
                  className="self-start border border-[#1a1a1a] px-9 py-3 text-xs uppercase tracking-[0.18em] text-[#1a1a1a] transition-colors duration-200 hover:bg-[#1a1a1a] hover:text-[#faf9f7] sm:text-[13px]"
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

          <VelocityScroll className="py-2 font-hopeless-romantic text-black">
            More Sun + Less Clothes
          </VelocityScroll>
        </section>
      </main>
    </>
  );
}
