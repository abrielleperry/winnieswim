import { SignupForm } from "@/components/signup-form";
import { Navbar } from "@/components/navbar";

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <SignupForm />
      </main>
    </>
  );
}
