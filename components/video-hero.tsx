"use client";

export function VideoHero() {
  // Replace this with your actual blob URL after upload
  const videoUrl =
    "https://your-blob-url-here.vercel-storage.com/hero-videos/your-video.mp4";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          console.error("Video failed to load:", e);
          // Hide video element if it fails to load
          e.currentTarget.style.display = "none";
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background (shows when video is loading or fails) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center text-white">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Something Amazing
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Is Coming
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl lg:text-2xl text-gray-200">
            We're working hard to bring you an incredible experience. Be the
            first to know when we launch.
          </p>
          <div className="mt-8">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/80">
          <span className="text-sm mb-2">Get Notified</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
