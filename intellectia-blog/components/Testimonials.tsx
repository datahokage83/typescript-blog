'use client';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // ✅ Fetch data from Strapi
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('https://typescript-blog-backend.onrender.com/api/testimonials?populate=image');
        const data = await res.json();
        // setTestimonials(data.data || []);
        setTestimonials((data.data || []).sort((a: any, b: any) => a.id - b.id));

      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };
    fetchTestimonials();
  }, []);

  // ✅ Scroll handler
  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.9;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-gray-200 py-14 px-6 sm:px-12">
      <h1 className='mb-10 text-5xl md:text-20xl text-[#2b1d14] uppercase font-dm-sans font-medium'>
        The People We Work For
      </h1>

      <div className="max-w-10xl mx-auto">
        <motion.div
          ref={sliderRef}
          className="cursor-grab overflow-x-auto no-scrollbar flex space-x-4 snap-x snap-mandatory scroll-smooth"
          whileTap={{ cursor: 'grabbing' }}
        >
          {testimonials.map((item: any) => {
            const imageUrl =
              item.attributes?.image?.data?.[0]?.attributes?.url
                ? `https://typescript-blog-backend.onrender.com${item.attributes.image.data[0].attributes.url}`
                : '/images/default.jpg';

            return (
              <motion.div
                key={item.id}
                className="bg-[#2b1d14] py-10 px-10 md:px-10 min-w-[350px] sm:min-w-[420px] md:min-w-[85%] h-[580px] shadow-lg flex flex-col justify-between snap-center"
              >
                <div className="flex text-gray-400 font-normal  uppercase tracking-wider">
                  <span className="font-mono mt-1 text-[16.5px]">{item.attributes.num}</span>
                  <span className="ml-2 mt-[1px] text-[17px]">Client Review</span>
                </div>

                <p className="text-lg md:text-17xl leading-relaxed text-gray-100 mb-8">
                  {item.attributes.text}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-4 ">
                    <div className="w-14 md:w-14 h-14 md:h-14 overflow-hidden">
                      {/* <img
                        src={imageUrl}
                        alt={item.attributes.name}
                        className="object-cover w-full h-full"
                      /> */}
                           <Image
                                src={imageUrl}
                                alt={item.attributes.name}
                                width={56}
                                height={56}
                                className="object-cover  w-full h-full"
                               
                              />

                    </div>
                    <div className='font-opensans'>
                      <h4 className="font-semibold text-gray-50 text-sm md:text-3xl">
                        {item.attributes.name}
                      </h4>
                      <div className='flex flex-col md:flex-row'>
                        <p className="text-large md:text-base text-gray-400">
                          {item.attributes.role},
                        </p>
                        <p className='text-large md:text-base text-gray-400'>
                          {item.attributes.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Controls */}
                  <div className="flex items-center gap-4 text-gray-50 text-sm sm:flex mt-6 ml-5 md:ml-0">
                    <button
                      onClick={() => scroll('left')}
                      className="hover:text-gray-300 transition-colors"
                    >
                      <FaArrowLeft className='w-3 md:w-4 h-3 md:h-6' />
                    </button>
                    <button
                      onClick={() => scroll('right')}
                      className="hover:text-gray-300 transition-colors"
                    >
                      <FaArrowRight className='w-3 md:w-4 h-3 md:h-6' />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
