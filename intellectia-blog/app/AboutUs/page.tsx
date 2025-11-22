
"use client"; // 🔹 Must be at the very top
import Nav from "@/components/nav";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import TeamList from "@/components/TeamList";
import TeamFilterBar from "@/components/TeamFilterBar";
import Vision from "@/components/Vision";
import Image from "next/image";

async function getStrapiData(url: string) {
  const baseURL = "https://typescript-blog-backend.onrender.com";
  try {
    const response = await fetch(baseURL + url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

const AboutUs = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    practice: "",
    sector: "",
    position: "",
  });

  const [logoURL, setLogoURL] = useState("");
  const [desc, setDesc] = useState("");

  // 🔹 Fetch initial data
  useEffect(() => {
    async function fetchData() {
      const homeData = await getStrapiData("/api/home-page?populate=*");
      const teamData = await getStrapiData("/api/team-members?populate=Teampracticeareas,TeamMemberPhoto,sectors");

      // setLogoURL("https://typescript-blog-backend.onrender.com" + homeData.data.attributes.Logo.data.attributes.url);

      const rawLogo = homeData?.data?.attributes?.Logo?.data?.attributes?.url;

      const logoURL = rawLogo
        ? rawLogo.startsWith("http")
          ? rawLogo
          : "https://typescript-blog-backend.onrender.com" + rawLogo
        : "/logo.png"; // fallback

      setLogoURL(logoURL);



      setDesc(homeData.data.attributes.desc);

      setTeamMembers(teamData.data || []);
      setFilteredMembers(teamData.data || []);
    }

    fetchData();
  }, []);

  const handleFilterChange = (updatedFilters: typeof filters) => {
  setFilters(updatedFilters);

  const filtered = teamMembers.filter((member) => {
    const attrs = member.attributes;

    // ✅ Name search
    if (updatedFilters.search.trim()) {
      const nameMatch = attrs.TeamMemberName?.toLowerCase().includes(
        updatedFilters.search.toLowerCase()
      );
      if (!nameMatch) return false;
    }

    // ✅ Practice areas
    if (updatedFilters.practice) {
      const practiceMatch = attrs.Teampracticeareas?.data?.some(
        (area: any) =>
          area?.attributes?.title?.toLowerCase() ===
          updatedFilters.practice.toLowerCase()
      );
      if (!practiceMatch) return false;
    }

    // ✅ Sector filter
          if (updatedFilters.sector) {
          const sectorMatch = attrs.sectors?.data?.some(
            (sector: any) =>
              sector?.attributes?.SectorTag?.toLowerCase() ===
              updatedFilters.sector.toLowerCase()
          );
          if (!sectorMatch) return false;
        }


    // ✅ Position filter
    if (updatedFilters.position) {
      const positionMatch =
        attrs.TeamMemberDesignation?.toLowerCase() ===
        updatedFilters.position.toLowerCase();
      if (!positionMatch) return false;
    }

    return true; // All checks passed
  });

  setFilteredMembers(filtered);
};


  return (
    <>
      <Nav logoURL={logoURL} />

      <div className="dark:bg-gray-800 flex flex-col lg:flex-row py-8 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-20 mdAboutUsBack">
        <div className="flex items-center justify-center w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 mb-6 lg:mb-0 lg:pr-8">
          {/* <img
            className="object-cover w-full h-full max-w-2xl rounded-lg shadow-lg mdAboutUs"
            src="/images/why-us.jpeg"
            alt="Intellectia"
          /> */}

          <Image
            src="/images/why-us.jpeg"
            alt="Intellectia"
            width={1200}          
            height={800}          
            className="object-cover w-full h-full max-w-2xl rounded-sm shadow-sm mdAboutUs"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <div className="max-w-lg mx-auto lg:mx-0 mt-0">
            <h2 className="text-2xl sm:text-3xl lg:text-xl text-white font-dm-sans font-medium text-center lg:text-left">
              Who We <span className="text-indigo-400 font-dm-sans">Are</span>
            </h2>
            <pre className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify whitespace-pre-wrap">
              {desc}
            </pre>

            <div className="mt-6 text-center lg:text-left">
              <Link href="/ContactUs" legacyBehavior passHref>
                <button className="font-semibold text-gray-300 transition-colors duration-200 transform GetInTouch cursor-pointer rounded-md hover:bg-gray-700 bg-gray-800 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base">
                  Get In Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Vision />
               <div className="mt-4 ">
                 <div className="w-full h-px sm:h-0.5 bg-black" />
               </div>


            {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-8 sm:py-10 lg:py-16"> */}
    <div className="bg-[#F5F5F5]  mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-8 sm:py-10 md:py-24">
        <div className='text-center'>
        
             <h2 className="text-5xl px-6 dark:text-black font-inter font-semibold md:text-20xl">
                  Our Values   
            </h2>
          <div className='max-w-4xl mx-auto text-center  px-6 md:px-6 mdN'>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
              {`Driven by hunger for intellectual stimulation, we are constantly involved in researching ideas, conducting
              qualitative and quantitative analysis and applying complex frameworks to solve knotty problems. Our primary
              goal is to help people and their businesses. We built trust because of our will to help our clients accomplish
              their goals. Our role is to assist organization in critical areas of their inclusiveness work. We act as an 
              educator, a catalyst for deeper change, a resource or a facilitator, the leadership of the process remains 
              within your organization. We act as an extension of in-house legal cell or as independent legal consultants.
              Our efforts are towards being strategic partners for our clients growth and not just be a consulting firm.`}
                </p>

            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
              Our Associates have a successful track record of representing companies and individuals before domestic courts
              and arbitration tribunals. Although, our Associates have been collaborating on various matters since a fairly
               long time, the firm was formed recently in order to serve a larger platform for new clients and associates.

                </p>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
              {`We focus on addressing industry wise Management & Legal Consultancy services. Our priority is to safeguard 
              our client's interests and ensure that personal or professional association of any Associate does not involve
               a conflict of interest.`}
                </p>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
              We are a socially responsible firm and undertake pro-bono work to support several philanthropic organizations,
              NGOs and government initiatives related to social justice, child-care and education.
                </p>
          </div>
        </div>
      </div>


      <div id="our-team" className="bg-gray-100 px-20 py-16 mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-5xl text-gray-800 px-6 font-dm-sans font-semibold md:text-20xl mb-10 mt-5">
            Our Team
          </h2>
          <div className="px-4 md:px-10 lg:px-20">
            <TeamFilterBar onFilterChange={handleFilterChange} />
            <TeamList teamMembers={filteredMembers} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
