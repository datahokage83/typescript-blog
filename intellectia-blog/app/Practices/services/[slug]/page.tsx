'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/nav";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Oval } from "react-loader-spinner";



async function getStrapiData(url: string) {
  const res = await fetch("https://typescript-blog-backend.onrender.com" + url);
  return await res.json();
}

function buildURL(rawUrl?: string) {
  if (!rawUrl) return "/placeholder.jpg";
  return rawUrl.startsWith("http")
    ? rawUrl
    : "https://typescript-blog-backend.onrender.com" + rawUrl;
}


const PracticeDetailPage = () => {
  const { slug } = useParams();
  const practiceSlug = Array.isArray(slug) ? slug[0] : slug;
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [practice, setPractice] = useState<any>(null);
  const [subAreas, setSubAreas] = useState<any[]>([]);
  const [logoURL, setLogoURL] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!practiceSlug) return setNotFound(true);

        // Fetch Logo
        // const homeData = await getStrapiData("/api/home-page?populate=*");
        // const logo = homeData.data?.attributes?.Logo?.data?.attributes?.url;
        // if (logo) setLogoURL("https://typescript-blog-backend.onrender.com" + logo);
        // Fetch Logo
          const homeData = await getStrapiData("/api/home-page?populate=*");
          const logoURL = homeData.data?.attributes?.Logo?.data?.attributes?.url;
          setLogoURL(buildURL(logoURL));


        // Fetch Practice
        const practiceData = await getStrapiData(
          `/api/practice-areas?filters[slug][$eq]=${encodeURIComponent(practiceSlug)}&populate=*`
        );

        if (!practiceData.data || practiceData.data.length === 0) return setNotFound(true);
        const selectedPractice = practiceData.data[0];
        setPractice(selectedPractice);

        // Fetch SubAreas filtered by SubAreaCategory string
        const subAreaData = await getStrapiData(
          `/api/sub-areas?filters[SubAreaCategory][$eq]=${encodeURIComponent(selectedPractice.attributes.slug)}&populate=*`
        );

        setSubAreas(subAreaData.data || []);

          const teamData = await getStrapiData(
          `/api/team-members?populate=Teampracticeareas,TeamMemberPhoto&filters[Teampracticeareas][slug][$eq]=${encodeURIComponent(selectedPractice.attributes.slug)}`
        );
        setTeamMembers(teamData.data || []);

      } catch (err) {
        console.error(err);
        setNotFound(true);
      }
    };

    fetchData();
  }, [practiceSlug]);

  if (notFound) return <p className="text-center py-20">Practice not found</p>;
  // if (!practice) return <p className="text-center py-20">Loading...</p>;

  if (!practice) {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Oval
        height={60}
        width={60}
        color="#255B4E"
        secondaryColor="#d1d5db"
        strokeWidth={4}
        strokeWidthSecondary={4}
        ariaLabel="loading"
      />
    </div>
  );
}


  //  const practiceImage = practice.attributes.PracticeAreaImage?.data?.attributes?.url
  //   ? `https://typescript-blog-backend.onrender.com${practice.attributes.PracticeAreaImage.data.attributes.url}`
  //   : "/placeholder.jpg";

   const practiceImage = buildURL(
      practice.attributes.PracticeAreaImage?.data?.attributes?.url
    );


    const quote = practice.attributes.quote;

  return (
    <>
      {/* {logoURL && <Nav logoURL={logoURL} />} */}
       <Nav/>

      {/* Practice Header */}
      {/* Practice Header Section */}
          <section className="bg-teal-600 flex flex-col lg:flex-row w-full h-auto lg:h-[500px]">
          {/* Left Side (Green background + text) */}
          <div className="bg-teal-600 text-white  font-dm-sans flex flex-col justify-center px-8 md:px-16 py-16 lg:w-1/2 relative">
            <div className="max-w-xl">
              <h1 className="text-xl md:text-17xl font-semibold mb-6 font-dm-sans">
                {practice.attributes.title}
              </h1>
              <hr className="border-white w-14 mb-6" />

              {quote && (
                <p className="text-lg mt-10 text-gray-100 italic mb-4">
                  {`"${quote}"`}
                </p>
              )}

              

              <div className="flex gap-4">
                <a
                  href="/sample.pdf"
                  target="_blank"
                  className="border border-white text-white px-5 py-2 text-sm md:text-base hover:bg-white hover:text-[#255B4E] transition-all duration-300"
                >
                  Download PDF
                </a>
                <a
                  href="/contact"
                  className="border border-white text-white px-5 py-2 text-sm md:text-base hover:bg-white hover:text-[#255B4E] transition-all duration-300"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>

          {/* Right Side (Image) */}
          <div className="lg:w-1/2 h-[300px] lg:h-auto clip-right-diagonal">
            <img
                src={practiceImage}
                alt={practice.attributes.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                fetchPriority="high"
                style={{ imageRendering: "auto" }}
              />

          </div>
          </section>

        {/* Description + Key Contacts (Overflow Effect) */}
        <section className="relative max-w-full grid grid-cols-1 lg:grid-cols-1 gap-10">
          {/* Left/Main Content */}
          <div className="lg:col-span-2 max-w-5xl py-12 px-12">
            {practice.attributes.Description
              ?.split(/\s{2,}|\n+/)
              .filter((para: string) => para.trim().length > 0)
              .map((para: string, index: number) => (
                <p key={index} className="text-lg leading-relaxed mb-8 text-gray-800">
                  {para.trim()}
                </p>
              ))}
          </div>


           <aside
              className="
                 hidden lg:flex lg:flex-col bg-[#e5e7eb] text-white px-3 py-12 absolute top-0 right-8 bottom-0 lg:right-0 w-[90%] lg:w-[28%] z-20 h-auto 
              "
            >
              <h2 className="text-xl text-gray-800 text-center font-opensans font-bold mb-8">
                Key Contacts
              </h2>

              {teamMembers.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-10 px-0">
                    {teamMembers.slice(0, 4).map((member: any) => {
                      // const photoUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url
                      //   ? `https://typescript-blog-backend.onrender.com${member.attributes.TeamMemberPhoto.data.attributes.url}`
                      //   : "/placeholder.jpg";
                      const photoUrl = buildURL(
                            member.attributes.TeamMemberPhoto?.data?.attributes?.url
                          );

                      return (
                        <div
                          key={member.id}
                          className="flex flex-col items-center text-center bg-transparent hover:scale-105 transition-transform duration-300"
                        >
                          <Link
                            href={`/AboutUs/our-team/${member.attributes.TeamMemberSlug}`}
                            className="flex flex-col items-center text-center"
                          >
                            <img
                              src={photoUrl}
                              alt={member.attributes.TeamMemberName}
                              loading="lazy"
                              className="w-24 h-24 object-cover rounded-full mb-4"
                            />
                            <p className="font-opensans text-md font-semibold text-lime-500 mb-1">
                              {member.attributes.TeamMemberName}
                            </p>
                            <p className="font-opensans text-sm text-gray-700">
                              {member.attributes.TeamMemberDesignation}
                            </p>
                          </Link>

                          {member.attributes.TeamMemberEmail && (
                            <a
                              href={`mailto:${member.attributes.TeamMemberEmail}`}
                              className="font-opensans text-sm text-gray-500 hover:text-gray-700 transition-colors mt-1"
                            >
                              {member.attributes.TeamMemberEmail}
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  
                 {teamMembers.length > 4 && (
                      <div className="mt-10 flex justify-center w-full">
                        <Link
                          href="/AboutUs#our-team"
                          className="z-[60] relative inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 text-sm font-semibold hover:bg-opacity-95 transition group"
                        >
                          Discover More Experts
                          <ArrowUpRight
                            className="w-4 h-4 mt-1 transform transition-transform duration-300 group-hover:rotate-45"
                          />
                        </Link>
                      </div>
                    )}
                </>
              ) : (
                <p className="text-center text-gray-600 mt-6">
                  No team members found for this practice area.
                </p>
              )}
            </aside>


        <section className="py-12 bg-gray-200 block md:hidden -mb-10">
                <div className="max-w-6xl mx-auto px-6">
                  <h2 className="text-17xl font-semibold mb-8 text-center text-gray-800 font-opensans">
                    Key Contacts
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {teamMembers.length > 0 ? (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-10">
                          {teamMembers.slice(0, 4).map((member: any) => {
                            // const photoUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url
                            //   ? `https://typescript-blog-backend.onrender.com${member.attributes.TeamMemberPhoto.data.attributes.url}`
                            //   : "/placeholder.jpg";
                             const photoUrl = buildURL(
                            member.attributes.TeamMemberPhoto?.data?.attributes?.url
                          );
                            return (
                              <div
                                key={member.id}
                                className="flex flex-col items-center text-center bg-transparent hover:scale-105 transition-transform duration-300"
                              >
                                <Link
                                  href={`/AboutUs/our-team/${member.attributes.TeamMemberSlug}`}
                                  className="flex flex-col items-center text-center"
                                >
                                  <img
                                    src={photoUrl}
                                    alt={member.attributes.TeamMemberName}
                                    className="w-28 h-28 object-cover rounded-full mb-4 shadow"
                                    loading="lazy"
                                  />
                                  {/* <p className="font-opensans text-[17px] font-semibold text-lime-500 mb-1">
                                    {member.attributes.TeamMemberName}
                                  </p> */}

                                  <p className="font-opensans text-[18px] font-bold text-lime-500 mb-1">
                                      {member.attributes.TeamMemberName.split(" ").map((word: string, index: number) => (
                                        <React.Fragment key={index}>
                                          {word}
                                          <br />
                                        </React.Fragment>
                                      ))}
                                    </p>
                                  <p className="font-opensans text-sm text-gray-700">
                                    {member.attributes.TeamMemberDesignation}
                                  </p>
                                </Link>

                                {/* Email placed outside Link */}
                                {member.attributes.TeamMemberEmail && (
                                  <a
                                    href={`mailto:${member.attributes.TeamMemberEmail}`}
                                    className="font-opensans text-[15px] text-gray-500 hover:text-gray-700 transition-colors mt-1"
                                  >
                                    {member.attributes.TeamMemberEmail}
                                  </a>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* View More Button */}
                        {teamMembers.length > 4 && (
                          <div className="mt-8 flex justify-center w-full">
                            <Link
                              href="/AboutUs#our-team"
                              className="relative inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-3 text-sm font-semibold hover:bg-opacity-90 transition group"
                            >
                              Discover More Experts
                                <ArrowUpRight className='h-4 w-4 mt-1'/>
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-center text-gray-600 mt-6">
                        No team members found for this practice area.
                      </p>
                    )}
                  </div>
                </div>
              </section>



{/* Focused Areas Section (pulled upward under Key Contacts) */}
<section className="relative bg-gray-100 py-12 ">
        <div className="max-w-[20rem] md:max-w-2xl px-6 ml-6">
    <h2 className="text-xl md:text-18xl font-medium mb-10 font-dm-sans text-gray-800 uppercase tracking-wider">
      Areas of Practice
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
      {subAreas.map((sub) => {
         const imgData = sub.attributes.SubAreaImg;
        // const imageUrl =
        //   imgData?.data
        //     ? Array.isArray(imgData.data)
        //       ? `https://typescript-blog-backend.onrender.com${imgData.data[0]?.attributes?.url}`
        //       : `https://typescript-blog-backend.onrender.com${imgData.data?.attributes?.url}`
        //     : "https://via.placeholder.com/400x250?text=No+Image";

        const rawImg = Array.isArray(imgData?.data)
            ? imgData.data[0]?.attributes?.url
            : imgData?.data?.attributes?.url;

          const imageUrl = buildURL(rawImg);


        return (
          <Link
            key={sub.id}
            href={`/Practices/services/${practice.attributes.slug}/FocusedArea/${sub.attributes.SubAreaSlug}`}
          >
            <div className="group relative h-32 md:h-52 w-32 md:w-52 cursor-pointer overflow-hidden  hover:shadow-lg transition-shadow duration-300">
              <img
                src={imageUrl}
                alt={sub.attributes.SubAreaName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* <div className="absolute bottom-0 left-0 h-16 w-full bg-black/15 px-4 flex items-center clip-diagonal">
                <p className="text-white font-semibold text-lgx font-dm-sans">
                  {sub.attributes.SubAreaName}
                </p>
              </div> */}

              <div className="absolute bottom-0 left-0 h-16 w-full bg-black/15 px-4 flex items-center clip-diagonal">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 h-7 w-[3px] bg-lime-300 rounded-full"></span>

                  <p className="text-white font-semibold text-lgx font-dm-sans ml-3">
                    {sub.attributes.SubAreaName}
                  </p>
                </div>

            </div>
          </Link>
        );
      })}
    </div>
  </div>
</section>

</section>


      <Footer />
    </>
  );
};

export default PracticeDetailPage;

