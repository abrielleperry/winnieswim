"use client";

import * as React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-10 sm:h-13">
          {/* Logo - Far Left */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center text-center font-prestiregular text-base md:text-xl text-gray-900"
            >
              WINNIESWIM
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
