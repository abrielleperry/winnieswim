"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";

export function VideoHero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Replace with your GitHub LFS URL
  // Format: https://github.com/USERNAME/REPOSITORY/raw/main/public/videos/hero-video.mp4
  // const videoUrl =
  //   "https://github.com/YOUR_USERNAME/YOUR_REPO/raw/main/public/videos/hero-video.mp4";

  //  Alternative GitHub media URL (often faster)
  const videoUrl =
    "https://media.githubusercontent.com/media/abrielleperry/winnieswim/raw/main/public/WinnieSwimAd.mp4";

  useEffect(() => {
    setVideoError(false);
    setVideoLoaded(false);
    setIsLoading(true);
  }, [retryCount]);

  const handleVideoLoad = () => {
    console.log("✅ Video loaded successfully from GitHub LFS");
    setVideoLoaded(true);
    setIsLoading(false);
    setVideoError(false);
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const video = e.currentTarget;
    const error = video.error;

    console.error("❌ Video failed to load from GitHub LFS");

    if (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      switch (error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          console.error("Video loading was aborted");
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          console.error("Network error occurred - check GitHub LFS URL");
          break;
        case MediaError.MEDIA_ERR_DECODE:
          console.error("Video decoding error");
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          console.error("Video format not supported");
          break;
        default:
          console.error("Unknown video error");
      }
    } else {
      console.error(
        "No error details available - check if GitHub LFS URL is correct"
      );
    }

    setVideoError(true);
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    console.log("🎬 Video can start playing");
    setIsLoading(false);
  };

  const retryVideoLoad = () => {
    setRetryCount((prev) => prev + 1);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Loading indicator */}
      {isLoading && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg drop-shadow-lg">
              Loading video from GitHub...
            </p>
          </div>
        </div>
      )}

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded && !videoError ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleCanPlay}
        onError={handleVideoError}
        onLoadStart={() => console.log("📥 Video load started from GitHub LFS")}
        onLoadedMetadata={() =>
          console.log("📋 Video metadata loaded from GitHub LFS")
        }
        onWaiting={() => console.log("⏳ Video waiting for data")}
        onPlaying={() => console.log("▶️ Video started playing")}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Error message */}
      {videoError && (
        <div className="absolute top-4 right-4 z-30 bg-red-500/90 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm">
          <div className="flex items-start gap-3">
            <svg
              className="h-5 w-5 text-red-200 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div className="font-semibold text-sm">
                GitHub LFS Video Failed
              </div>
              <div className="text-xs text-red-200 mt-1">
                Check GitHub LFS URL. Retry: {retryCount}
              </div>
              <button
                onClick={retryVideoLoad}
                className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-medium transition-colors"
              >
                Retry Loading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center text-white">
          <h1
            className="mb-6 text-4xl tracking-tight sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-gloria)" }}
          >
            East Coast Energy + West Coast Cool
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9FB8B0] to-[#F28125]">
              COMING SOON
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl lg:text-2xl text-gray-200">
            Sign up for your new favorite swimwear reveal.
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
