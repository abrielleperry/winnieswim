"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Send } from "lucide-react";
import { FocusNoiseWrapper } from "@/components/ui/focus-noise-wrapper";

import { submitContact, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from "@/components/ui/animated-modal";

const initialState: ContactState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="mt-2 h-12 w-full rounded-full bg-black text-white transition-all duration-200 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        "Sending..."
      ) : (
        <>
          <Send className="mr-2 size-4" />
          Send message
        </>
      )}
    </Button>
  );
}

function SuccessModal({
  state,
  formRef,
}: {
  state: ContactState;
  formRef: React.RefObject<HTMLFormElement | null>;
}) {
  const { setOpen } = useModal();

  useEffect(() => {
    if (state.status === "success") {
      setOpen(true);
      formRef.current?.reset();
    }
  }, [state.status, setOpen, formRef]);

  return (
    <ModalBody className="min-h-fit w-[90%] max-w-md rounded-3xl border border-black/10 bg-white shadow-2xl">
      <ModalContent className="items-center justify-center gap-5 px-8 py-12 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-black text-white">
          <CheckCircle2 className="size-8" />
        </span>

        <div className="flex flex-col gap-2">
          <h2 className="font-prestiregular text-4xl !font-normal">
            Message sent
          </h2>

          <p className="mx-auto max-w-xs text-sm leading-6 text-muted-foreground">
            {state.message ||
              "Thank you for reaching out. We will get back to you soon."}
          </p>
        </div>
      </ModalContent>

      <ModalFooter className="justify-center bg-white px-8 pb-8 pt-0">
        <Button
          type="button"
          onClick={() => setOpen(false)}
          className="h-11 w-full rounded-full bg-black text-white hover:bg-black/80"
        >
          Close
        </Button>
      </ModalFooter>
    </ModalBody>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Modal>
      <Card className="w-full max-w-xl rounded-3xl border border-black/10 bg-white shadow-lg">
        <CardHeader className="space-y-3 px-8 pt-8 text-center">
          <CardTitle className="font-prestiregular text-4xl !font-normal">
            Get in touch
          </CardTitle>

          <CardDescription className="mx-auto max-w-sm text-sm font-prestiregular">
            Questions about sizing, orders, or WinnieSwim?
            <br /> Send us a message and we&apos;ll respond as soon as we can.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form
            ref={formRef}
            action={formAction}
            className="flex flex-col gap-5"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <FocusNoiseWrapper rounded="rounded-full">
                <Input
                  id="name"
                  name="name"
                  placeholder="Winnie Swim"
                  autoComplete="name"
                  aria-invalid={Boolean(state.errors?.name)}
                  className="relative z-10 h-12 w-full rounded-full border border-black/10 bg-white px-5 focus-visible:border-transparent focus-visible:ring-0 focus-visible:shadow-none"
                />
              </FocusNoiseWrapper>
              {state.errors?.name && (
                <p className="text-sm text-destructive">{state.errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <FocusNoiseWrapper rounded="rounded-full">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="winnieswim@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(state.errors?.email)}
                  className="relative z-10 h-12 w-full rounded-full border border-black/10 bg-white px-5 focus-visible:border-transparent focus-visible:ring-0 focus-visible:shadow-none"
                />
              </FocusNoiseWrapper>
              {state.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <FocusNoiseWrapper rounded="rounded-2xl">
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  aria-invalid={Boolean(state.errors?.message)}
                  className="relative z-10 min-h-32 w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 focus-visible:border-transparent focus-visible:ring-0 focus-visible:shadow-none"
                />
              </FocusNoiseWrapper>
              {state.errors?.message && (
                <p className="text-sm text-destructive">
                  {state.errors.message}
                </p>
              )}
            </div>

            {state.status === "error" && !state.errors && (
              <p className="text-center text-sm text-destructive">
                {state.message}
              </p>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <SuccessModal state={state} formRef={formRef} />
    </Modal>
  );
}

export default ContactForm;
