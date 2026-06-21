"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface VelocityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultVelocity?: number;
  className?: string;
  numRows?: number;
  fontFamily?: string;
}

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity: number;
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;

  if (rangeSize === 0 || !Number.isFinite(rangeSize)) {
    return min;
  }

  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({
  children,
  baseVelocity = 100,
  ...props
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const textWidth = textRef.current?.offsetWidth ?? 0;

      if (containerWidth <= 0 || textWidth <= 0) {
        setRepetitions(1);
        return;
      }

      const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;

      setRepetitions(
        Number.isSafeInteger(newRepetitions) && newRepetitions > 0
          ? newRepetitions
          : 1,
      );
    };

    calculateRepetitions();

    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  const safeRepetitions =
    Number.isSafeInteger(repetitions) && repetitions > 0 ? repetitions : 1;

  const x = useTransform(
    baseX,
    (v) => `${wrap(-100 / safeRepetitions, 0, v)}%`,
  );

  const directionFactor = React.useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden whitespace-nowrap"
      {...props}
    >
      <motion.div className="inline-block" style={{ x }}>
        {Array.from({ length: safeRepetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : null}>
            {children}{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityScroll({
  defaultVelocity = 2,
  numRows = 2,
  children,
  className,
  fontFamily,
  ...props
}: VelocityScrollProps) {
  const fontClass = fontFamily ? `font-${fontFamily}` : "";

  const safeNumRows =
    Number.isSafeInteger(numRows) && numRows > 0 ? numRows : 1;

  return (
    <div
      className={cn(
        "relative w-full flex flex-col gap-2",
        "text-xl sm:text-2xl md:text-4xl",
        "leading-[2.5rem] sm:leading-[5rem] md:leading-[5rem] lg:leading-[5rem]",
        "tracking-[-0.02em] font-bold",
        fontClass,
        className,
      )}
      {...props}
    >
      {Array.from({ length: safeNumRows }).map((_, i) => (
        <ParallaxText
          key={i}
          baseVelocity={defaultVelocity * (i % 2 === 0 ? 1 : -1)}
        >
          {children}
        </ParallaxText>
      ))}
    </div>
  );
}
