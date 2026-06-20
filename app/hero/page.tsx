import { VideoHero } from "@/components/video-hero";
import HomeMain from "@/components/home-main";

export default function HeroPage() {
  return (
    <main className="w-full min-h-screen">
      <VideoHero />
      <HomeMain />
    </main>
  );
}
