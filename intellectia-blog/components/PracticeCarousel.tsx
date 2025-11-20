
'use client'
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NextPage } from "next";
import Link from "next/link";
import CustomCarousel from "./CustomCarousel";

export type PracticeCarouselProps = {
  className?: string;
  HomePageCarousel?: any[];
  missionLine?: any;
};

const PracticeCarousel: NextPage<PracticeCarouselProps> = ({ className = "", HomePageCarousel = [], missionLine }) => {
  return (
    <div className={`dark:bg-zinc-100 flex-1 flex flex-col lg:flex-row justify-start py-4 sm:py-6 lg:py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mdHome ${className}`}>
      
      <Carousel className="mdHomeImg" showThumbs={false} autoPlay>
        {HomePageCarousel.map((item: any) => (
          <CustomCarousel key={item.id} id={item} />
        ))}
      </Carousel>

      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-119xlhome font-dm-serif-display px-4 sm:px-6 lg:px-8 xl:px-30 py-4 sm:py-6 lg:py-8 mt-0 lg:-mt-6">
        <div className="relative mb-6 sm:mb-8">
          {missionLine}
        </div>
        
        <Link href="/ContactUs" className="li-a" legacyBehavior passHref>
          <button className="font-semibold text-gray-300 transition-colors duration-200 transform GetInTouch cursor-pointer rounded-md hover:bg-white-200 bg-gray-800 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base">
            Get In Touch
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PracticeCarousel;
