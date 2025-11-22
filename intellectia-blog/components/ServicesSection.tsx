'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ✅ Fetch Services (with related Practice Area)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services?populate=practice_area,serviceImg`,
          { cache: 'no-store' }
        );
        const servicesData = await servicesRes.json();

          const sortedServices = (servicesData.data || []).sort(
          (a: any, b: any) => a.id - b.id
        );

        setServices(sortedServices);
        // setServices(servicesData.data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <p className="text-5xl md:text-17xl font-semibold font-dm-sans underline text-red-900  uppercase tracking-wide">
              Our Services
            </p>
            <ArrowUpRight className="text-red-900  w-8 h-8" />
          </div>

          <h2 className="text-3xl md:text-20xl font-medium font-dm-sans text-gray-900 leading-snug">
            Practical legal support <br /> for individuals and businesses.
          </h2>
        </div>

        {/* Services List */}
        <div className="divide-y divide-gray-200 border-t">
          {services.map((service, index) => {
            const { serviceTitle, serviceDesc, serviceImg, practice_area } = service.attributes;
            // const imageUrl =
            //   serviceImg?.data?.[0]?.attributes?.url
            //     ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${serviceImg.data[0].attributes.url}`
            //     : '/images/placeholder.jpg';

            const rawUrl = serviceImg?.data?.[0]?.attributes?.url;

            const imageUrl = rawUrl?.startsWith("http")
              ? rawUrl
              : rawUrl
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`
              : "/images/placeholder.jpg";


            const slug = practice_area?.data?.attributes?.slug;

            return (
              <Link
                key={service.id}
                href={slug ? `/Practices/services/${slug}` : '#'}
                className="block"
              >
                <div
                  className="grid md:grid-cols-[250px_1fr] gap-8 h-[240px] items-center py-10 transition-all duration-500 group cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  

                  <div className="overflow-hidden group">

                     <Image
                        src={imageUrl}
                        alt={serviceTitle}
                        width={800}        // required
                        height={400}       // required
                        loading="lazy"
                        className="w-full h-36 md:h-32 object-cover transition-all duration-500 ease-in-out mt-2 md:mt-0 group-hover:h-52 md:group-hover:h-56"
                      />

                    {/* <img
                      src={imageUrl}
                      alt={serviceTitle}
                      loading="lazy"
                      className="w-full h-36 md:h-32 object-cover transition-all duration-500 ease-in-out mt-2 md:mt-0 group-hover:h-52 md:group-hover:h-56"
                    /> */}
                  </div>


                  {/* Text Section */}
                  <div className="relative transition-all duration-500">
                    <div className="max-w-6xl flex">
                      <div className="flex flex-row gap-24 md:gap-[250px] lg:gap-[500px] mt-4 md:-mt-6">
                        <p className="text-gray-400 font-inter text-lg mb-2">
                          {String(index + 1).padStart(2, '0')}.
                        </p>
                        <h3 className="text-lg md:text-xl font-dm-sans font-medium text-gray-900">
                          {serviceTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Expanded Details on Hover */}
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-sm text-gray-600 font-dm-sans space-y-2"
                        >
                          <p>{serviceDesc}</p>
                          <button className="mt-5 bg-gray-800 text-white px-4 py-2 text-sm  hover:bg-opacity-95 transition">
                            Get a Quote
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

