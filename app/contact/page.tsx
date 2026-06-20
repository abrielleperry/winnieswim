import { ContactForm } from "@/components/contact-form";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-white px-6 pt-32 pb-16">
      <section className="mx-auto flex w-full max-w-5xl justify-center">
        <ContactForm />
        <VelocityScroll />
      </section>
    </main>
  );
}
