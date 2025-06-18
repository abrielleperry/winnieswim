import { VideoHero } from "@/components/video-hero";
import { SignupForm } from "@/components/signup-form";
import { Navbar } from "@/components/navbar";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { AboutSection } from "@/components/about";

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen ">
        <VideoHero />

        {/* Two-column layout for cards and form */}
        <section className="min-h-screen ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 px-4 py-12 sm:py-16 lg:py-24">
            {/* Left side - Draggable Cards */}
            <div className="flex items-center justify-center">
              <AboutSection />
            </div>

            {/* Right side - Signup Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                <SignupForm />
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
