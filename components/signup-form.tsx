"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { CheckIcon, ChevronRightIcon, Mail, User, Phone } from "lucide-react";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { signupForUpdates } from "@/lib/signupForUpdates";

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");

    console.log("Form values:", { firstName, lastName, email, phone });

    try {
      const result = await signupForUpdates(formData);
      console.log("API insert result:", result);

      if (!result.success) {
        setError(result.error || "Something went wrong. Please try again.");
      } else {
        formRef.current?.reset(); // ✅ Clear the form
      }
    } catch (error) {
      console.error("Signup form submission failed:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:py-12 md:py-20 lg:py-28">
      <Card
        className="border-0 max-w-lg w-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px" }}
      >
        <CardHeader className="text-center pb-2">
          <CardDescription className="text-3xl text-gray-900 font-prestiregular uppercase">
            Stay in the Know
          </CardDescription>
          <CardDescription className="text-lg text-gray-800 font-prestiregular">
            Be the first to hear about updates and shop our launch collection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmit(formData);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <AnimatedSubscribeButton
              disabled={isLoading}
              className="w-full h-12 text-lg font-semibold bg-[#9FB8B0] hover:bg-[#9FB8B0] text-white border-0"
              type="submit"
            >
              <span className="group inline-flex items-center">
                {isLoading ? (
                  "Signing Up..."
                ) : (
                  <>
                    Join the List
                    <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <span className="group inline-flex items-center">
                Subscribed
                <CheckIcon className="ml-1 size-4 text-white" />
              </span>
            </AnimatedSubscribeButton>
          </form>

          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <p className="text-xs text-center text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
