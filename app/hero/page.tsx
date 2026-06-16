import { VideoHero } from "@/components/video-hero";
import { Navbar } from "@/components/navbar";

export default function HeroPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen ">
        <VideoHero />
      </main>
    </>
  );
}
