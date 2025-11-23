"use client";

import React, { useState, useEffect } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

async function getStrapiData(url: string) {
  const baseURL = "https://typescript-blog-backend.onrender.com";
  try {
    const response = await fetch(baseURL + url, { cache: "no-store" });
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function WorkwithUs() {
  const [logoURL, setLogoURL] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      /* Fetch Logo */
      const homeRes = await getStrapiData("/api/home-page?populate=*");

      // if (homeRes?.data?.attributes?.Logo?.data?.attributes?.url) {
      //   const logoUrl = homeRes.data.attributes.Logo.data.attributes.url;
      //   setLogoURL("https://typescript-blog-backend.onrender.com" + logoUrl);
      // }

      const rawLogo = homeRes?.data?.attributes?.Logo?.data?.attributes?.url;

// Check Cloudinary OR Strapi local
      const LogoURL = rawLogo
        ? rawLogo.startsWith("http")              // Cloudinary or external URL
          ? rawLogo
          : "https://typescript-blog-backend.onrender.com" + rawLogo // Strapi local
        : "/logo.png"; // fallback

      setLogoURL(LogoURL);

      /* Fetch Job Listings */
      const jobRes = await getStrapiData("/api/job-listings?populate=*");
      setJobs(jobRes?.data || []);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Nav/>

      <section className="w-full bg-white flex flex-col items-center">

    
                    {/* ===================== HERO SECTION ===================== */}
            <div
              className="relative w-full h-[380px] md:h-[540px] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/30307652/pexels-photo-30307652.jpeg')",
              }}
            >
              {/* Dark overlay for readability (optional but recommended) */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* CENTERED H1 */}
              <h1 className="relative z-10 text-white font-semibold text-[30px] md:text-21xl font-opensans text-center">
                Openings
              </h1>

              {/* BOTTOM-LEFT SPANS */}
              <div className="absolute bottom-8 left-20 md:left-8 space-y-3 z-10">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 md:px-6 py-2 md:py-2 rounded-full border border-lime-300 text-lime-300 text-base md:text-4xl font-light">
                    Join
                  </span>
                  <span className="px-4 md:px-6 py-2 md:py-2 rounded-full border border-lime-300 text-lime-300 text-base md:text-4xl font-light">
                    a
                  </span>
                  <span className="px-4 md:px-6 py-2 md:py-2 rounded-full border border-lime-300 text-lime-300 text-base md:text-4xl font-light">
                    Mission
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-4 md:px-6 py-2 md:py-2 rounded-full border border-lime-300 text-lime-300 text-base md:text-4xl font-light">
                    Make
                  </span>
                  <span className="px-4 md:px-6 py-2 md:py-2 rounded-full border border-lime-300 text-lime-300 text-base md:text-4xl font-light">
                    a
                  </span>
                  <span className="px-4 md:px-6 py-2 md:py-2 rounded-full border border-lime-300 text-lime-300 text-base md:text-4xl font-light">
                    Change
                  </span>
                </div>
              </div>
            </div>


        {/* ===================== JOB LISTINGS ===================== */}
        <div className="w-full py-10">
          <div className="w-full p-5 md:p-8 flex flex-col gap-6 items-center">
            <button
                className="px-7 py-3 rounded-full 
                          bg-gray-950 text-white font-light 
                          text-3xl md:text-lg font-dm-sans uppercase mb-5
                          transition-all duration-300
                          hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-400"
              >
                Latest Jobs Available Now
              </button>


            {jobs.map((job: any) => (
              <div
                key={job.id}
                className="w-full max-w-4xl md:max-w-5xl bg-gray-100 shadow-md border p-5 md:p-8 flex flex-col gap-6"
              >
                <div className="flex gap-4 w-full">
                  <img
                    src="/images/intellectia.png"
                    className="w-16 h-16 object-contain"
                    alt="Company Logo"
                  />

                  <div className="font-opensans flex flex-col">
                    <h2 className="text-lg font-semibold">
                      {job.attributes.role}
                    </h2>
                    <p className="text-gray-700">{job.attributes.company}</p>
                    <p className="text-gray-500">{job.attributes.location}</p>
                  </div>
                </div>

                {job.attributes.description?.length > 0 && (
                  <ul className="pl-5 text-gray-700 space-y-1">
                    {job.attributes.description.map((item: any) => (
                      <li key={item.id} className="flex gap-2">
                        <span>-</span>
                        <span>{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex justify-end items-end">
                  <Link
                    href="/ContactUs/Careers/#careers"
                    className="px-6 py-3 bg-gray-800 text-white text-base font-semibold hover:bg-opacity-95"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-700 text-lg font-dm-sans text-center">
                  Sadly, no roles are available at the moment — but keep
                  checking! Something interesting might swoop in soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
