"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";

export function VideoHero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl =
    "https://w999nnfdoudixwpn.public.blob.vercel-storage.com/WinnieSwimAd-hVZjq6OlXEKfBENJM9YC9bEzTf1gG2.mp4";

  useEffect(() => {
    // Test if the video URL is accessible
    console.log("Testing video URL:", videoUrl);
    fetch(videoUrl, { method: "HEAD" })
      .then((response) => {
        console.log("Video URL response:", response.status, response.ok);
        console.log("Content-Type:", response.headers.get("content-type"));
        console.log("Content-Length:", response.headers.get("content-length"));
        if (!response.ok) {
          setVideoError(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Video URL test failed:", error);
        setVideoError(true);
        setIsLoading(false);
      });
  }, [videoUrl]);

  const handleVideoLoad = () => {
    console.log("✅ Video loaded successfully");
    setVideoLoaded(true);
    setIsLoading(false);
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("❌ Video failed to load:", e);
    console.error("Video error details:", e.currentTarget.error);
    setVideoError(true);
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    console.log("🎬 Video can start playing");
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    console.log("📥 Video load started");
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const buffered = videoRef.current.buffered;
      if (buffered.length > 0) {
        const loadedPercentage =
          (buffered.end(0) / videoRef.current.duration) * 100;
        console.log(
          `📊 Video loading progress: ${loadedPercentage.toFixed(1)}%`
        );
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Debug info - remove this in production */}

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded && !videoError ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleCanPlay}
        onError={handleVideoError}
        onLoadStart={handleLoadStart}
        onProgress={handleProgress}
        onLoadedMetadata={() => console.log("📋 Video metadata loaded")}
        onWaiting={() => console.log("⏳ Video waiting for data")}
        onPlaying={() => console.log("▶️ Video started playing")}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Error message */}
      {videoError && (
        <div className="absolute top-16 left-4 z-30 bg-red-500 text-white p-3 rounded max-w-sm">
          <div className="font-bold">Video Error</div>
          <div className="text-sm">Check browser console for details</div>
          <button
            onClick={() => {
              setVideoError(false);
              setIsLoading(true);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
            className="mt-2 bg-red-700 px-2 py-1 rounded text-xs"
          >
            Retry
          </button>
        </div>
      )}

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
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
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
