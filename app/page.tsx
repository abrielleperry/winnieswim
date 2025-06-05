import { VideoHero } from "@/components/video-hero";
import { DraggableCardsSection } from "@/components/draggable-cards-section";
import { SignupForm } from "@/components/signup-form";
import { Navbar } from "@/components/navbar";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen ">
        <VideoHero />

        {/* Two-column layout for cards and form */}
        <section className="min-h-screen ">
          <div className="grid lg:grid-cols-2 min-h-screen">
            {/* Left side - Draggable Cards */}
            <div className="relative overflow-hidden">
              <DraggableCardsSection />
            </div>

            {/* Right side - Signup Form */}
            <div className="flex items-center justify-center p-8 ">
              <div className="w-full max-w-md">
                <SignupForm />
              </div>
            </div>
          </div>
          <VelocityScroll className="py-4 font-hopeless-romantic text-black">
            More Sun + Less Clothes
          </VelocityScroll>
        </section>
      </main>
    </>
  );
}
