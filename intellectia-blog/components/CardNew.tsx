
'use client'
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";


const CardNew = ({ BlogPosts }: any) => {
  // const imageUrl =
  //   BlogPosts.attributes.PracticeAreaImage?.data?.attributes?.url
  //     ? "https://typescript-blog-backend.onrender.com" + BlogPosts.attributes.PracticeAreaImage.data.attributes.url
  //     : "/placeholder.jpg"; // fallback image
  const rawUrl = BlogPosts?.attributes?.PracticeAreaImage?.data?.attributes?.url;

    const imageUrl = rawUrl
      ? rawUrl.startsWith("http")
        ? rawUrl
        : "https://typescript-blog-backend.onrender.com" + rawUrl
      : "/placeholder.jpg";

  const title = BlogPosts.attributes.title || "No Title";
  const slug = BlogPosts.attributes.slug || "#";

  return (

    
    <Link href={`/Practices/services/${slug}`}>
      <div className="relative h-40 md:h-64 w-40 md:w-68 overflow-hidden group cursor-pointer">
        {/* Image */}
        {/* <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          // sizes="(max-width: 768px) 100vw, 40vw"
          loading="lazy"
        /> */}
        <Image
          src={imageUrl}
          alt={title}
          width={400}     // required
          height={300}    // required
          className="w-full h-full object-cover"
          loading="lazy"
        />
         <div className="absolute bottom-0 left-0 h-12 md:h-16 w-full bg-black/40 px-3 md:px-4 flex items-center">
                <p className="text-white font-medium md:font-medium text-[15px] md:text-[20px] font-dm-sans">
                  {title}
                </p>
              </div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gray-800 flex justify-between items-start p-4 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
        >
          {/* Title at bottom-left */}
          <h2 className="absolute bottom-4 left-3 text-white font-dm-sans font-bold text-5xl">{title}</h2>

          {/* North-east arrow */}
          <FiArrowUpRight className="absolute text-white w-6 h-6 right-2 top-2" />
        </motion.div>
      </div>
    </Link>
  );
};

export default CardNew;
