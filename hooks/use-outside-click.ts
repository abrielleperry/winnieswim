"use client";

import { useEffect, RefObject } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  callback: (event: Event) => void,
): void => {
  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as Node | null;

      if (!ref.current || (target && ref.current.contains(target))) {
        return;
      }

      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
