
'use client';
import { useState, useEffect } from "react";

interface VideoCarouselProps {
  videos: string[];
  onVideoChange?: (index: number) => void; // ✅ new prop
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, onVideoChange }) => {
  const [current, setCurrent] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});

  const preloadNextVideo = (index: number) => {
    const nextIndex = (index + 1) % videos.length;
    if (!loadedVideos[nextIndex]) {
      const video = document.createElement("video");
      video.src = videos[nextIndex];
      video.preload = "auto";
      video.oncanplaythrough = () => {
        setLoadedVideos((prev) => ({ ...prev, [nextIndex]: true }));
      };
    }
  };

  useEffect(() => {
    if (videos.length === 0) return;

    setLoadedVideos({ 0: true });
    preloadNextVideo(0);

    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % videos.length;
        preloadNextVideo(next);
        onVideoChange?.(next); // ✅ notify parent
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [videos]);

  useEffect(() => {
    onVideoChange?.(current);
  }, [current]);

  if (videos.length === 0) return null;

  return (
    <div className="relative flex-1 h-[550px] clip-right-diagonal overflow-hidden">
      <video
        key={videos[current]}
        src={videos[current]}
        autoPlay
        loop
        muted
        playsInline
        preload={loadedVideos[current] ? "auto" : "metadata"}
        className="w-full h-full object-cover scale-150 transition-opacity duration-500"
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
      />
    </div>
  );
};

export default VideoCarousel;

