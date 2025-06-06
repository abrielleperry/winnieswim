"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function VideoHero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Multiple URL formats to try
  const videoUrls = [
    "https://github.com/abrielleperry/winnieswim/raw/main/public/videos/WinnieSwimAdNoLogo.mp4",
    "https://media.githubusercontent.com/media/abrielleperry/winnieswim/main/public/videos/WinnieSwimAdNoLogo.mp4",
    "https://raw.githubusercontent.com/abrielleperry/winnieswim/main/public/videos/WinnieSwimAdNoLogo.mp4",
  ];

  const currentVideoUrl = videoUrls[currentUrlIndex];

  useEffect(() => {
    // Test URL accessibility
    const testUrl = async () => {
      console.log(
        `Testing URL ${currentUrlIndex + 1}/${videoUrls.length}:`,
        currentVideoUrl
      );

      try {
        const response = await fetch(currentVideoUrl, {
          method: "HEAD",
          mode: "no-cors", // Avoid CORS issues for testing
        });
        console.log("URL test response:", response);
      } catch (error) {
        console.error("URL test failed:", error);
      }
    };

    testUrl();
    setVideoError(false);
    setVideoLoaded(false);
    setIsLoading(true);
  }, [currentUrlIndex, retryCount, currentVideoUrl]);

  const handleVideoLoad = () => {
    console.log("✅ Video loaded successfully from:", currentVideoUrl);
    setVideoLoaded(true);
    setIsLoading(false);
    setVideoError(false);
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const video = e.currentTarget;
    const error = video.error;

    console.error(
      `❌ Video failed to load from URL ${currentUrlIndex + 1}:`,
      currentVideoUrl
    );

    if (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      switch (error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          console.error("Video loading was aborted");
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          console.error("Network error - URL might be inaccessible");
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
      console.error("No error details - likely CORS or 404 error");
    }

    // Try next URL if available
    if (currentUrlIndex < videoUrls.length - 1) {
      console.log("Trying next URL...");
      setCurrentUrlIndex((prev) => prev + 1);
    } else {
      console.error("All URLs failed");
      setVideoError(true);
      setIsLoading(false);
    }
  };

  const handleCanPlay = () => {
    console.log("🎬 Video can start playing");
    setIsLoading(false);
  };

  const retryVideoLoad = () => {
    setRetryCount((prev) => prev + 1);
    setCurrentUrlIndex(0); // Reset to first URL
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <section className="relative h-96 md:h-[500px] lg:h-[600px] w-full overflow-hidden">
      {/* Loading indicator */}
      {isLoading && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg drop-shadow-lg">
              {"Loading video from GitHub... (URL "}
              {currentUrlIndex + 1}/{videoUrls.length})
            </p>
          </div>
        </div>
      )}

      {/* Centered Video Container */}
      <div className="absolute inset-0 flex items-center justify-center z-5 pt-30 pb-20">
        <div className="relative w-full max-w-4xl mx-auto px-4">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              autoPlay
              muted={true}
              loop
              playsInline
              preload="metadata"
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded && !videoError ? "opacity-100" : "opacity-0"
              }`}
              onLoadedData={handleVideoLoad}
              onCanPlay={handleCanPlay}
              onError={handleVideoError}
              onLoadStart={() =>
                console.log("📥 Video load started from:", currentVideoUrl)
              }
              onLoadedMetadata={() => console.log("📋 Video metadata loaded")}
              onWaiting={() => console.log("⏳ Video waiting for data")}
              onPlaying={() => console.log("▶️ Video started playing")}
            >
              <source src={currentVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Error message */}
      {videoError && (
        <div className="absolute top-4 right-4 z-30 bg-red-500/90 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm">
          <div className="flex items-start gap-3">
            <svg
              className="h-5 w-5 text-red-200 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div className="font-semibold text-sm">
                All GitHub URLs Failed
              </div>
              <div className="text-xs text-red-200 mt-1">
                Check if file exists and repo is public. Retry: {retryCount}
              </div>
              <button
                onClick={retryVideoLoad}
                className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-medium transition-colors"
              >
                Retry All URLs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Overlay - Centered in the viewport */}
      <div className="relative z-10 w-full h-full pt-16 flex flex-col items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto">
            <Image
              src="/WSLogo-White.png"
              alt="Winnie Swim Logo"
              width={200}
              height={200}
              className="mx-auto mb-2 sm:mb-8 w-32 sm:w-40 md:w-48 lg:w-52 "
              priority
            />
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-prestiregular tracking-tight text-white">
              COMING SOON
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
