"use client";
import { useRef, useEffect, useState } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      setFade(true); // Start fade-out
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play();
          setFade(false); // Start fade-in
        }
      }, 1000); // Delay for fade-out effect
    };

    video?.addEventListener("ended", handleEnded);
    return () => video?.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`w-full min-h-dvh object-cover transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        <source src="/videos/boxes.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
