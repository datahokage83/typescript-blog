
'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

const BlogSlider = ({ blogs }: any) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const progress =
        (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
      setScrollProgress(progress);
    };

    // ✅ New: Handle mouse wheel for horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      if (!slider) return;
      e.preventDefault();
      slider.scrollBy({
        left: e.deltaY < 0 ? -300 : 300,
        behavior: "smooth",
      });
    };

    slider.addEventListener("scroll", handleScroll);
    slider.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setScrollProgress(newValue);

    if (sliderRef.current) {
      const newScrollLeft =
        (newValue / 100) *
        (sliderRef.current.scrollWidth - sliderRef.current.clientWidth);
      sliderRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  if (!blogs || blogs.length === 0) {
    return (
      <div className="bg-gray-100 py-10 sm:py-14 lg:py-20 text-center text-white">
        <p>No blogs available right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10 sm:py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-gray-800 font-dm-sans uppercase tracking-wider text-5xl  md:text-18xl font-normal mb-16">
          Latest Blogs
        </h2>

        {/* Horizontal Blog Slider */}
        <motion.div
          ref={sliderRef}
          className="cursor-grab overflow-x-auto no-scrollbar flex space-x-6 snap-x snap-mandatory scroll-smooth"
          whileTap={{ cursor: "grabbing" }}
        >
          {blogs.map((blog: any) => (
            <motion.div
              key={blog.id}
              className="ml-8 min-w-[300px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[400px] snap-center"
              whileHover={{ scale: 1.02 }}
            >
              <BlogCard BlogData={blog} />
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Slider Bar */}
        <div className="mt-8 px-2">
          <input
            type="range"
            min="0"
            max="100"
            value={scrollProgress}
            onChange={handleSliderChange}
            className="w-full h-2 ml-6 bg-gray-400 appearance-none cursor-pointer accent-white custom-range"
            style={{
              background: `linear-gradient(to right, #1f2937 ${scrollProgress}%, #d1d5db ${scrollProgress}%)`,
            }}
          />
        </div>

        <style jsx>{`
          .custom-range {
            appearance: none;
            width: 100%;
            height: 8px;
            outline: none;
          }

          .custom-range::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 8px;
            background: #1f2937;
            cursor: pointer;
          }

          .custom-range::-moz-range-thumb {
            width: 16px;
            height: 8px;
            background: #1f2937;
          }

          .custom-range::-ms-thumb {
            width: 16px;
            height: 8px;
            background: #1f2937;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BlogSlider;
