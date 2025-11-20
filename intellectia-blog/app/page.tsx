import type { NextPage } from "next";
import Nav from "../components/nav";
import AboutContainer from "../components/about-container";
import Blogs from "../components/blogs";
import Mission from "@/components/mission";
import Divider from "@/components/divider";
import { LocateFixed } from "lucide-react";
import Footer from "@/components/Footer/Footer";
import DisclaimerModal from "@/components/Disclaimer";
import PracticeCarousel from "@/components/PracticeCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CarouselNew from "@/components/CarouselNew";
import ServicesSection from "@/components/ServicesSection";
import ConsultationCTA from "@/components/ConsultationCTA";
import Testimonials from "@/components/Testimonials";

// ✅ Improved fetch wrapper
async function getStrapiData(url: string) {
  const baseURL = "https://typescript-blog-backend.onrender.com";
  try {
    const response = await fetch(baseURL + url, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Strapi fetch error:", error);
    return null;
  }
}

const Home: NextPage = async () => {
  const baseURL = "https://typescript-blog-backend.onrender.com";

  // ✅ Fetch data
  const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
  const strapiBlogData = await getStrapiData("/api/posts?populate=*");
  const strapiBlogData1 = await getStrapiData("/api/posts/1?populate=*");
  const strapiBlogData2 = await getStrapiData("/api/posts/2?populate=*");

  // ✅ Handle both single type & collection type
  const homeAttributes =
    strapiHomeData?.data?.attributes || strapiHomeData?.data?.[0]?.attributes;

  if (!homeAttributes) {
    return <div>Error: Home page data not found from Strapi</div>;
  }

  const {
    Title,
    description,
    MissionLine,
    Disclaimer,
    HomePageCarousel,
    Logo,
  } = homeAttributes;

  // ✅ Blog data safe check
  const blog2Attributes = strapiBlogData2?.data?.attributes;
  const imageUrl = blog2Attributes?.cover?.data?.attributes?.url
    ? baseURL + blog2Attributes.cover.data.attributes.url
    : "";

  // ✅ Safe Logo URL
  const logoURL = Logo?.data?.attributes?.url
    ? baseURL + Logo.data.attributes.url
    : "";

  return (
    <>
      <DisclaimerModal disclaimer={Disclaimer} />
      <Nav logoURL={logoURL} />

      <PracticeCarousel
        HomePageCarousel={HomePageCarousel?.data || []}
        missionLine={MissionLine}
      />

      {/* Enhanced Show in Map Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
        <Link
          href="https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5925548,17z"
          target="_blank"
        >
          <div className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2  no-underline sm:px-5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center space-x-1.5 sm:space-x-2.5 min-w-[120px] sm:min-w-[160px]">
            <div className="bg-white/20 p-1 sm:p-1.5 rounded-full  group-hover:bg-white/30 transition-colors duration-300">
              {/* <FontAwesomeIcon
                icon={faLocation}
                className="text-white text-sm sm:text-base group-hover:animate-pulse"
              /> */}
              <LocateFixed
                className="text-white text-sm sm:text-base group-hover:animate-pulse"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-dm-sans font-semibold no-underline text-xs sm:text-sm uppercase  tracking-wide">
                Find Us
              </span>
              <span className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                View on Map
              </span>
            </div>
            <div className="ml-auto opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* <Mission missionLine={description} />

      <Divider /> */}

       <ServicesSection/>
       <Testimonials/>
       <ConsultationCTA/>


      {/* <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        {strapiBlogData?.data ? (
          <CarouselNew BlogPosts={strapiBlogData.data} />
        ) : (
          <p>No blog posts found.</p>
        )}
      </div> */}

      


      <Footer />
    </>
  );
};

export default Home;
