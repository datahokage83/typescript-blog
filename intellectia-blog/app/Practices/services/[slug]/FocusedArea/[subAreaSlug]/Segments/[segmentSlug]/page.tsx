'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav from '@/components/nav';
import Footer from '@/components/Footer/Footer';

const SegmentPage = () => {
  const { segmentSlug } = useParams();
  const slug = Array.isArray(segmentSlug) ? segmentSlug[0] : segmentSlug;

  const [segment, setSegment] = useState<any>(null);
  const [logoURL, setLogoURL] = useState<string | null>(null);
  const [randomRightImage, setRandomRightImage] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // -------------------------------------
        // 1️⃣ FETCH HEADER LOGO
        // -------------------------------------
        const homeRes = await fetch("https://typescript-blog-backend.onrender.com/api/home-page?populate=*");
        const homeData = await homeRes.json();
        const logo = homeData.data?.attributes?.Logo?.data?.attributes?.url;
        if (logo) setLogoURL("https://typescript-blog-backend.onrender.com" + logo);


        // -------------------------------------
        // 2️⃣ FETCH SEGMENT PAGE CONTENT
        // -------------------------------------
        if (!slug) {
          setNotFound(true);
          return;
        }

        const segRes = await fetch(
          `https://typescript-blog-backend.onrender.com/api/segments?filters[SegmentSlug][$eq]=${encodeURIComponent(
            slug
          )}&populate=*`
        );
        const segData = await segRes.json();

        if (!segData.data || segData.data.length === 0) {
          setNotFound(true);
          return;
        }

        setSegment(segData.data[0]);


        // -------------------------------------
        // 3️⃣ FETCH MULTIPLE CTA IMAGES (RANDOM IMAGE)
        // -------------------------------------
        const imgRes = await fetch("https://typescript-blog-backend.onrender.com/api/segment-image?populate=*");
        const imgData = await imgRes.json();

        const images = imgData.data?.attributes?.SegCTAImg?.data?.map((img: any) => {
              const raw = img.attributes.url;

              return raw.startsWith("http")
                ? raw
                : "https://typescript-blog-backend.onrender.com" + raw;
            });


          // imgData.data?.attributes?.SegCTAImg?.data?.map((img: any) =>
          //   "https://typescript-blog-backend.onrender.com" + img.attributes.url
          // ) || [];

        if (images.length > 0) {
          const randomImg = images[Math.floor(Math.random() * images.length)];
          setRandomRightImage(randomImg);
        }

      } catch (err) {
        console.error("Error fetching segment:", err);
        setNotFound(true);
      }
    };

    fetchData();
  }, [slug]);

  // -------------------------------------
  // ERROR STATES
  // -------------------------------------
  if (notFound)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Segment Not Found</h2>
        <p className="text-gray-600">We couldn’t find this segment.</p>
        <a
          href="/Practices/services/disputes/FocusedArea/litigation"
          className="text-blue-600 underline mt-4 inline-block"
        >
          ← Back to Focused Area
        </a>
      </div>
    );

  if (!segment) return <p className="text-center py-20">Loading...</p>;

  // -------------------------------------
  // SEGMENT MAIN IMAGE HANDLING
  // -------------------------------------
  const imgData = segment.attributes.SegmentImage?.data;
  // const imageUrl = imgData
  //   ? Array.isArray(imgData)
  //     ? `https://typescript-blog-backend.onrender.com${imgData[0]?.attributes?.url}`
  //     : `https://typescript-blog-backend.onrender.com${imgData.attributes.url}`
  //   : "https://via.placeholder.com/400x250?text=No+Image";

         let imageUrl = "/placeholder.jpg";

          if (imgData) {
            const raw = Array.isArray(imgData)
              ? imgData[0]?.attributes?.url
              : imgData.attributes.url;

            imageUrl = raw
              ? raw.startsWith("http")
                ? raw
                : "https://typescript-blog-backend.onrender.com" + raw
              : "/placeholder.jpg";
          }


  return (
    <>
      {logoURL && <Nav logoURL={logoURL} />}

      {/* --- HERO SECTION --- */}
      <section className="bg-cyan-700 relative w-full h-[85vh] font-dm-sans flex flex-col md:flex-row items-stretch overflow-hidden">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 bg-cyan-700 text-white flex flex-col justify-center px-8 md:px-16 py-12 z-10">
          <h1 className="text-5xl md:text-20xl font-semibold mb-6">
            {segment.attributes.SegmentName}
          </h1>

          <div className="h-[2px] bg-white w-24 mb-8"></div>

          <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            {segment.attributes.SegmentShortDesc ||
              "We provide comprehensive legal and strategic solutions tailored to meet client needs with precision and integrity."}
          </p>

          <div className="flex gap-4">
            <button className="border border-white px-5 py-3 text-base font-medium hover:bg-white hover:text-[#265D53] transition">
              Download PDF
            </button>

            <a
              href="/contact"
              className="border border-white px-5 py-3 text-base font-medium hover:bg-white hover:text-[#265D53] transition"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div
          className="w-full md:w-1/2 h-[40vh] md:h-full bg-cover bg-center clip-right-diagonal"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </section>

      {/* --- BODY SECTION WITH RIGHT IMAGE --- */}
      <div className="w-full flex justify-between">

        {/* LEFT TEXT CONTENT */}
        <section className="max-w-5xl py-12 px-10 font-opensans">
          {segment.attributes.SegmentDesc
            ?.split(/\s{2,}|\n+/)
            .filter((para: string) => para.trim().length > 0)
            .map((para: string, index: number) => (
              <p
                key={index}
                className="text-3xl tracking-wide font-normal leading-relaxed mb-8"
              >
                {para.trim()}
              </p>
            ))}
        </section>

        {/* RIGHT RANDOM IMAGE SECTION */}
        <section className="bg-gray-200 min-h-screen border-l border-gray-400 py-12 px-10 relative">

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 text-left uppercase mb-8 font-dm-sans underline decoration-amber-300">
              Discover More
            </h1>

          
              <div className=" flex justify-center relative">

                
                {randomRightImage ? (
                  <div className="relative w-72 h-80">
                    {/* CTA Image */}
                    <img
                      src={randomRightImage}
                      className="w-full h-full object-cover shadow-md"
                      alt="CTA Image"
                    />

                    {/* CTA Overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-md flex flex-col justify-center items-center text-white px-4">
                      <h3 className="text-xl font-semibold mb-3 text-center">
                        Need a New Opportunity?
                      </h3>
                      <p className="text-sm text-center mb-4">
                        We’re always looking for talented individuals. Share your CV today.
                      </p>

                      <a
                        href="/ContactUs/Careers#careers"
                        className="bg-gray-50 text-gray-900 py-2 px-4 font-medium shadow hover:bg-gray-900 hover:text-gray-100 transition"
                      >
                         Apply Now
                      </a>
                    </div>
                  </div>
                ) : (
                  <p>No image uploaded</p>
                )}
                

              </div>

              
            </section>

      </div>

      <Footer />
    </>
  );
};

export default SegmentPage;
