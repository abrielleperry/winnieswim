"use client";

import { useEffect, useState } from "react";

export default function SizeGuideModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-size-guide-trigger]")) {
        setOpen(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 hover:text-gray-900 transition-colors text-lg leading-none"
          aria-label="Close size guide"
        >
          ×
        </button>
        <img
          src="/size-guide.jpeg"
          alt="Size guide"
          className="w-full rounded-xl object-contain"
        />
      </div>
    </div>
  );
}
