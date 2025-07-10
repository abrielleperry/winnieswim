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

  const videoUrls = [
    "https://github.com/abrielleperry/winnieswim/raw/main/public/videos/WinnieSwimAdNoLogo.mp4",
    "https://media.githubusercontent.com/media/abrielleperry/winnieswim/main/public/videos/WinnieSwimAdNoLogo.mp4",
    "https://raw.githubusercontent.com/abrielleperry/winnieswim/main/public/videos/WinnieSwimAdNoLogo.mp4",
  ];

  const currentVideoUrl = videoUrls[currentUrlIndex];

  useEffect(() => {
    const testUrl = async () => {
      try {
        await fetch(currentVideoUrl, {
          method: "HEAD",
          mode: "no-cors",
        });
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
    setVideoLoaded(true);
    setIsLoading(false);
    setVideoError(false);
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const video = e.currentTarget;
    const error = video.error;

    if (error) {
      console.error("Video error code:", error.code);
    } else {
      console.error("Unknown video error");
    }

    if (currentUrlIndex < videoUrls.length - 1) {
      setCurrentUrlIndex((prev) => prev + 1);
    } else {
      setVideoError(true);
      setIsLoading(false);
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const retryVideoLoad = () => {
    setRetryCount((prev) => prev + 1);
    setCurrentUrlIndex(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <section className="relative w-full aspect-video max-h-[600px] overflow-hidden bg-white">
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

      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="relative w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded && !videoError ? "opacity-100" : "opacity-0"
              }`}
              onLoadedData={handleVideoLoad}
              onCanPlay={handleCanPlay}
              onError={handleVideoError}
            >
              <source src={currentVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Error Message */}
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

      {/* Centered Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 sm:pt-0">
        <div className="text-center mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <Image
            src="/WSLogo-White.png"
            alt="Winnie Swim Logo"
            width={200}
            height={200}
            className="mx-auto mb-2 sm:mb-4 w-25 sm:w-40 md:w-48 lg:w-52"
            priority
          />
          <h1 className="text-2xl pb-4 sm:text-5xl md:text-6xl lg:text-7xl font-prestiregular tracking-tight text-white">
            COMING SOON
          </h1>
        </div>
      </div>
      <p className="sr-only">
        Winnie Swim is a swimwear brand founded by friends who believe in more
        sun, less clothes, and meaningful memories. Whether you are lounging
        poolside or chasing waves, our custom prints and flattering fits are
        designed to help you feel confident and carefree. Discover why so many
        love Winnie Swim.
      </p>
    </section>
  );
}
