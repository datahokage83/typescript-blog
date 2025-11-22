"use client";

import { useState, useEffect, useRef } from "react";
import Nav from "@/components/nav";
import type { NextPage } from "next";
import Footer from "@/components/Footer/Footer";
import { FaLinkedinIn, FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import InternshipForm from "@/app/ContactUs/Careers/IntershipForm";
import ApplicationForm from "@/app/ContactUs/ApplicationForm";
import SlidingToggleButtons from "@/app/ContactUs/Careers/SlideToggleButtons";
import Link from 'next/link';
import Image from "next/image";



async function getStrapiData(url: string) {
  const baseURL = "https://typescript-blog-backend.onrender.com";
  try {
    const response = await fetch(baseURL + url, { cache: "no-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default function CareersHero() {
  const [logoURL, setLogoURL] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const firstSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [activeForm, setActiveForm] = useState<"internship" | "jobs" | null>(null);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
  //     const { Logo } = strapiHomeData.data.attributes;
  //     setLogoURL("https://typescript-blog-backend.onrender.com" + Logo.data.attributes.url);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
  const fetchData = async () => {
    const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
    const { Logo } = strapiHomeData.data.attributes;
    // const logo = "https://typescript-blog-backend.onrender.com" + Logo.data.attributes.url;
    const rawLogo = strapiHomeData?.data?.attributes?.Logo?.data?.attributes?.url;

        const logoURL = rawLogo
          ? rawLogo.startsWith("http")
            ? rawLogo
            : "https://typescript-blog-backend.onrender.com" + rawLogo
          : "/logo.png"; // fallback

        setLogoURL(logoURL);


    // const img = new Image();
    // const img = new window.Image();
    // img.src = logo;
    // img.onload = () => setLogoURL(logo);
  };
  fetchData();
}, []);


  useEffect(() => {
    const handleScroll = () => {
      if (!firstSectionRef.current || !footerRef.current) return;

      const scrollTop = window.scrollY;

      // Bottom of first section relative to document top
      const firstSectionRect = firstSectionRef.current.getBoundingClientRect();
      const firstSectionBottom = scrollTop + firstSectionRect.bottom;

      // Top of footer relative to document top
      const footerRect = footerRef.current.getBoundingClientRect();
      const footerTop = scrollTop + footerRect.top;

      // Scrollable distance from bottom of first section to top of footer
      const scrollableDistance = footerTop - firstSectionBottom;

      if (scrollTop <= firstSectionBottom) {
        setScrollProgress(0);
      } else if (scrollTop >= footerTop) {
        setScrollProgress(130);
      } else {
        const scrolledPastFirstSection = scrollTop - firstSectionBottom;
        const progress = (scrolledPastFirstSection / scrollableDistance) * 130;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

    
    <div>

       <section>
        <Nav logoURL={logoURL} />
       </section>
      
      <section ref={firstSectionRef} className="bg-gray-800 relative w-full h-[76vh] md:h-[70vh] lg:h-[75vh]">
              
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-5">
          <h1 className="text-white text-24xl md:text-90xl  font-bold font-dm-sans tracking-wide">
            Careers
          </h1>

        
          <p className="flex-1 text-white text-base md:text-lg font-normal md:font-medium
           font-dm-sans mt-3 md:mt-6  md:ml-0 px-3 text-center tracking-wide">Be part of a firm where
           legal excellence, professional growth, and integrity come together to shape meaningful careers.</p>
       
      </div>
        
        <div className="absolute bottom-6 left-3 md:left-8 flex flex-row md:flex-col items-center gap-4 z-10">
          {[
            { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/company/intelectia-legal-firm---india/" },
            { icon: <FaFacebookSquare />, link: "https://www.facebook.com" },
            { icon: <FaXTwitter />, link: "https://twitter.com" },
            { icon: <FaInstagram />, link: "https://www.instagram.com" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full  bg-white/10 text-white hover:bg-white hover:text-gray-700 transition-colors duration-300"
            >
              {item.icon}
            </a>
          ))}
        </div>

         <div className="absolute bottom-8 md:bottom-10 right-2 md:right-5 z-10">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-black text-white no-underline font-dm-sans font-semibold rounded-full shadow-lg hover:bg-white hover:text-gray-800 transition-colors duration-300"
              >
                Apply Now
              </a>
            </div>

        {/* Transparent progress bar track at bottom of first section */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20" />
      </section>

      {/* Scroll Progress Bar fixed at top */}
      <div className="fixed top-0 left-0 w-full h-2 bg-transparent z-50">
        <div
          className="h-2 bg-[#a2c60f] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-20 text-center">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="-mt-5 md:mt-0 text-xl md:text-20xl font-light font-dm-sans text-black tracking-wide leading-snug">
            {/* Creating groundbreaking legal solutions starts with you. We need your insight and expertise
            to help shape the future of the legal industry and beyond. */}
           {` Creating groundbreaking legal solutions starts with the right team.
            We invite you to discover why working with us means joining a culture of 
            excellence, collaboration, and innovation.`}
          </h2>
 
          <div className="max-w-4xl md:max-w-5xl mx-auto">
          <p className="mt-8  text-sm md:text-lg text-black font-dm-sans leading-relaxed">
            {`We aim to achieve excellence—not just for our firm, but for our clients and the
            communities we serve, near and far. We do this by honoring diverse perspectives
            and reimagining what’s possible in the practice of law. We bring together 
            experienced attorneys, legal researchers, strategists, and industry specialists
            to craft innovative, practical solutions for today’s—and tomorrow’s—most complex
            legal challenges. Ready to turn legal insight into meaningful impact?`}
          </p>
           </div>
          {/* Button */}
          <div className="mt-10">
            <Link  href="/ContactUs/Careers/inside-intellectia"
              className="inline-flex items-center justify-center px-10 md:px-12 py-4 md:py-4  bg-black uppercase no-underline text-white text-sm md:text-lg font-medium font-dm-sans tracking-widest rounded-full hover:bg-[#a2c60f] hover:text-white transition"
            >
             Browse our latest vacancies
            </Link>
          </div>
        </div>
      </section>

 
          <section id="careers" className="relative w-[100%]  md:w-[65%] lg:w-[100%]  bg-gray-50 py-6 md:py-14 px-2 md:px-28 lg:px-36 text-center">
          <div>
            {/* Heading & description */}
            <div className="flex flex-col justify-start items-center">
              <h3 className="text-18xl md:text-20xl font-bold font-dm-sans text-gray-900 mb-24 md:mb-10 underline decoration-yellow-300 decoration-4">
                Career path with Us
              </h3>

              {/* Image under heading */}
              {/* <img
                src="/images/lady-pose.jpg" // Replace with your actual image path
                alt="Career Icon"
                className="w-[80%]  h-[300px] md:h-[460px] object-cover mb-14 md:mb-4 -mt-14 md:mt-0"
                loading="lazy"
              /> */}

              <Image
                  src="/images/lady-pose.jpg"
                  alt="Career Icon"
                  width={1200}
                  height={800}
                  className="w-[80%] h-[300px] md:h-[460px] object-cover mb-14 md:mb-4 -mt-14 md:mt-0"
                />


              <p className="text-gray-600  md:max-w-5xl text-base md:text-17xl font-snormal font-dm-sans -mt-6 md:mt-4 mb-10">
               {` Discover roles that challenge and inspire. Whether you're starting your journey or 
                taking the next big step, grow with a team that values innovation and impact.`}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div>
              <SlidingToggleButtons active={activeForm} setActive={setActiveForm} />

              {/* Conditional Content */}
              <div className="mt-8 w-full">
                {activeForm === "internship" && (
                  <InternshipForm onClose={() => setActiveForm(null)} />
                )}
                {activeForm === "jobs" && (
                  <ApplicationForm onClose={() => setActiveForm(null)} />
                )}
              </div>
            </div>
          </div>
        </section>



      {/* Another Content Section */}
      <section className="relative w-full h-[80vh]">
        {/* Background Image */}
        {/* <img
          src="/images/call-girl.jpg"
          alt="Our Team"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          loading="lazy"
        /> */}

        <Image
            src="/images/call-girl.jpg"
            alt="Our Team"
            fill
            className="absolute inset-0 w-full h-full  object-cover grayscale"
            priority={false}
          />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <div className="absolute z-10 flex flex-col items-start justify-center top-0 md:top-0 left-5 md:left-10 h-full">
          <h2 className="text-4xl md:text-19xl font-semibold font-opensans text-gray-100 mb-6">
            Have Questions?
          </h2>

          <p className="text-gray-100  text-sm md:text-17xl font-dm-sans font-normal mb-6">
            {`Discover what it’s like to work here.`}
          </p>

          <button
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=contacthr@example.com",
                "_blank"
              )
            }
            className="px-6 md:px-16 py-3 md:py-4 -ml-2 mt-0 md:mt-2 bg-black text-gray-100 text-sm md:text-lg cursor-pointer uppercase font-normal font-dm-sans rounded-full hover:bg-[#a2c60f] transition"
          >
            Connect with our Talent team
          </button>
        </div>
      </section>

      {/* Footer wrapped with footerRef */}
      <footer ref={footerRef}>
        <Footer />
      </footer>
    </div>
    </>
  );
}
