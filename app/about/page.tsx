import { AboutSection } from "@/components/about";
import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <AboutSection />
      </main>
    </>
  );
}
