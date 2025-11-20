'use client';
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from "react";

interface BlogThumbnailProps {
  BlogData: {
    id: number;
    attributes: {
      title: string;
      ShortDesc: string;
      cover?: {
        data?: {
          attributes?: {
            url?: string;
            alternativeText?: string;
          };
        };
      };
    };
  };
}

const BlogThumbnail: React.FC<BlogThumbnailProps> = ({ BlogData }) => {
  if (!BlogData || !BlogData.attributes) {
    console.error("Invalid BlogData passed to BlogThumbnail:", BlogData);
    return null;
  }

  const { id, attributes } = BlogData;
  const { title, cover } = attributes;

  const imageUrl = cover?.data?.attributes?.url
    ? `https://typescript-blog-backend.onrender.com${cover.data.attributes.url}`
    : "/images/placeholder.jpg";

  const imageAlt = cover?.data?.attributes?.alternativeText || title || "Blog Image";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative shadow-md border  hover:shadow-xl 
                 transition-all duration-300 overflow-hidden  group 
                 w-full max-w-xl"
    >
      <Link href={`/Blogs/${id}`} className="block h-full">
        {/* Image Section */}
        <div className="relative w-full h-60 sm:h-72 overflow-hidden ">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-2">
            <h3 className="text-white text-lg sm:text-xl font-semibold font-opensans line-clamp-2 drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogThumbnail;
