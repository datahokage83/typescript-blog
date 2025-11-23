import AccordionSection from "@/components/AccordionSection";
import BlogSlider from "@/components/BlogSlider";
import EmailSection from "@/components/EmailSection";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/nav";
import type { NextPage } from "next";
import Image from "next/image";


export type BlogsType = {
  className?: string;
};

async function getStrapiData(url: string) {
  const baseURL = "https://typescript-blog-backend.onrender.com";
  try {
    const response = await fetch(baseURL + url, { cache: "no-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Strapi data:", error);
  }
}

export default async function Blogs() {
  const homeData = await getStrapiData("/api/home-page?populate=*");
  const blogData = await getStrapiData("/api/posts?populate=*");

  const { Title, MissionLine, Logo } = homeData.data.attributes;
      const rawLogo = Logo?.data?.attributes?.url || "";

    const logoURL = rawLogo.startsWith("http")
      ? rawLogo
      : `https://typescript-blog-backend.onrender.com${rawLogo}`;

  return (
    <>
      <Nav />

      {/* HERO SECTION */}
      <div className="bg-gray-800 py-8 sm:py-12 lg:py-16">
        <p className="font-dm-sans font-medium text-17xl md:text-21xl px-10  md:px-12 mb-10 md:mb-0 max-w-4xl text-white">
          Explore our collection of articles, guides, and insights designed to
          help you navigate complex legal matters with confidence.
        </p>

        {/* Law images */}
        <div className="max-w-7xl mx-5 md:mx-auto flex flex-row justify-end items-center gap-4 md:gap-6">
          {/* <img
            src="/images/book.jpg"
            alt="Law books and gavel"
            className="w-24 md:w-40 cursor-pointer shadow-lg object-cover"
            loading="lazy"
          />
          <img
            src="/images/lawandorder.jpg"
            alt="Law and Order"
            className="w-28 md:w-44 cursor-pointer shadow-lg object-cover"
            loading="lazy"
          />
          <img
            src="/images/read.jpg"
            alt="Reading Law"
            className="w-24 md:w-40 cursor-pointer shadow-lg object-cover"
            loading="lazy"
          /> */}
          <Image
              src="/images/book.jpg"
              alt="Law books and gavel"
              width={200}
              height={200}
              className="w-24 md:w-40 cursor-pointer shadow-lg object-cover"
              loading="lazy"
            />

            <Image
              src="/images/lawandorder.jpg"
              alt="Law and Order"
              width={250}
              height={250}
              className="w-28 md:w-44 cursor-pointer shadow-lg object-cover"
              loading="lazy"
            />

            <Image
              src="/images/read.jpg"
              alt="Reading Law"
              width={200}
              height={200}
              className="w-24 md:w-40 cursor-pointer shadow-lg object-cover"
              loading="lazy"
            />

        </div>

        <p className="relative hidden lg:flex font-dm-sans font-semibold text-17xl px-12 text-white">
          Stay informed, Stay protected.
        </p>
      </div>

      {/* BLOG FRONTEND (passes Strapi blog data) */}
      <BlogSlider blogs={blogData.data} />

      <section className="flex flex-col lg:flex-row  w-full h-[110vh] overflow-hidden">
      {/* <section className="flex flex-col lg:flex-row w-full min-h-[80vh]"> */}
        {/* Left side - text */}
        <div className="bg-gray-800 text-white flex flex-col justify-center px-10 lg:px-20 py-16 lg:w-1/2">
        <div className="flex flex-row gap-4">
          <h3 className="font-dm-sans border border-white/40 rounded-full px-6 md:px-4 py-2 md:py-2 text-lg w-fit mb-8 cursor-pointer">
            Law&Society
          </h3>

          <h3 className="font-dm-sans border border-white/40 rounded-full px-6 md:px-4 py-2 md:py-2 text-lg w-fit mb-8 cursor-pointer">
           FAQS
          </h3>
          </div>
          <h1 className="font-dm-sans text-3xl sm:text-5xl font-semibold leading-tight mb-8">
            For your rights.<br />For your business.<br />For the people.
          </h1>
          <div className="flex gap-4 mb-8">
            <span className="relative hidden lg:flex border border-white/40 rounded-full px-6 md:px-4 py-2 md:py-2 text-sm cursor-pointer">Intellectual Property</span>
            <span className="border border-white/40 rounded-full px-4 md:px-4 py-2 md:py-2 text-sm cursor-pointer">POSH</span>
            <span className="border border-white/40 rounded-full px-4 md:px-4 py-2 md:py-2 text-sm cursor-pointer">Trademark</span>
          </div>
         
          <AccordionSection/>
        </div>

        <div className="relative hidden lg:flex w-1/2">

        {/* <div className="relative hidden lg:flex w-1/2 h-[45pc] items-end justify-center"> */}
            {/* <img
              src="/images/lady.jpg"
              alt="Agriculture background"
              className="w-full h-full object-cover"
              loading="lazy"
            /> */}
            <Image
              src="/images/lady.jpg"
              alt="Agriculture background"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-end text-white pb-8">
              <div className="text-lg font-light italic">Intellectia</div>
              <p className="text-xs font-light opacity-80 mt-2">Precision. Integrity. Law.</p>
            </div>
          </div>

      </section>

      

      <section className="bg-gray-100 text-white py-20 px-6 flex flex-col items-center ">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-18xl text-gray-700 font-inter font-semibold mb-4">Join Our Journey</h2>
            <p className="text-gray-900 max-w-2xl mx-auto">
              Discover how we’re shaping the future of legal excellence through talent, innovation, and collaboration.
            </p>
          </div>

          {/* News Card  bg-[#1E1E1E]*/}
          <div className="bg-gray-800  overflow-hidden flex flex-col md:flex-row max-w-5xl w-full ">
            {/* Left Content */}
            <div className="p-8 md:p-10 flex flex-col justify-between md:w-1/2 ">
              <div>
                <p className="text-lg text-gray-400 mb-2">Insight</p>
                <h3 className="text-2xl font-semibold mb-4 leading-snug">
                  Empowering people to make meaningful impact
                </h3>
                <p className="text-gray-400 text-sm">
                  At our firm, every voice matters. We believe in nurturing growth, 
                  encouraging curiosity, and building a culture where purpose meets opportunity.
                </p>
                <a href="/ContactUs/Careers">
                <button className="mt-40 border px-7 py-2 hover:bg-white hover:text-black">
                    Discover
                </button>
                </a>
              </div>

              <p className="text-gray-500 text-sm mt-4">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              

            </div>

            {/* Right Image */}
            <div className="hidden relative md:flex md:w-1/2 h-64 md:h-[450px]">
              {/* <img
                src="/images/plane.jpg"
                alt="Newsroom Insight"
                className="w-full h-full object-cover"
              /> */}
              <Image
                  src="/images/plane.jpg"
                  alt="Newsroom Insight"
                  fill
                  className="w-full h-full object-cover"
                />
            </div>
          </div>
        </section>

      <Footer />
    </>
  );
};

