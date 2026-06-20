"use client";

import { cn } from "@/lib/utils";
import { NoiseBackground } from "@/components/ui/noise-background";

export function FocusNoiseWrapper({
  children,
  className,
  rounded = "rounded-full",
}: {
  children: React.ReactNode;
  className?: string;
  rounded?: string;
}) {
  return (
    <div className={cn("group relative w-full", rounded, className)}>
      <div
        className={cn(
          "pointer-events-none absolute -inset-[3px] z-0 overflow-hidden opacity-0 transition-opacity duration-200 group-focus-within:opacity-100",
          rounded,
        )}
      >
        {/* This guarantees the color reaches around the whole input */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-[#FCF2CD] via-[#FFC8D6] to-[#FFDCA0]",
            rounded,
          )}
        />

        {/* This adds the animated noise/movement on top */}
        <NoiseBackground
          animating
          containerClassName={cn(
            "h-full w-full !bg-transparent !p-0 !shadow-none",
            rounded,
          )}
          className={cn("h-full w-full", rounded)}
        />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
