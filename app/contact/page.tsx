import ContactForm from "@/components/contact-form";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="">
        <section className="mx-auto flex pt-26 pb-6 flex-col items-center w-full max-w-5xl px-4">
          <ContactForm />
        </section>
      </div>
      <VelocityScroll className="font-hopeless-romantic text-black">
        More Sun + Less Clothes
      </VelocityScroll>
    </main>
  );
}
