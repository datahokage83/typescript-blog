'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav from '@/components/nav';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from "lucide-react";

interface TeamMember {
  id: number;
  attributes: {
    TeamMemberName: string;
    TeamMemberDesignation: string;
    TeamMemberEmail: string;
    TeamMemberSlug: string;
    TeamMemberPhoto?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface SubArea {
  id: number;
  attributes: {
    SubAreaName: string;
    SubAreaDesc: string;
    SubAreaSlug: string;
    SubAreaImg?: {
      data?: { attributes: { url: string } }[] | { attributes: { url: string } };
    };
    sub_area_key_contacts?: { data: TeamMember[] };
  };
}

// Helper function to fetch data from Strapi
async function getStrapiData(url: string) {
  const baseURL = 'https://typescript-blog-backend.onrender.com';
  const res = await fetch(baseURL + url);
  const data = await res.json();
  return data;
}

const FocusedAreaPage = () => {
  const { slug: practiceSlug, subAreaSlug: rawSubAreaSlug } = useParams();
  const subAreaSlug = Array.isArray(rawSubAreaSlug) ? rawSubAreaSlug[0] : rawSubAreaSlug;

  const [SubArea, setSubArea] = useState<SubArea | null>(null);
  const [keyContacts, setKeyContacts] = useState<TeamMember[]>([]);
  const [Segments, setSegments] = useState<any[]>([]);
  const [logoURL, setLogoURL] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site logo
        const homeRes = await getStrapiData('/api/home-page?populate=*');
        const logo = homeRes.data?.attributes?.Logo?.data?.attributes?.url;
        if (logo) setLogoURL('https://typescript-blog-backend.onrender.com' + logo);

        if (!subAreaSlug) {
          setNotFound(true);
          return;
        }

        // Fetch SubArea including related key contacts
        const subAreaRes = await getStrapiData(
          `/api/sub-areas?filters[SubAreaSlug][$eq]=${encodeURIComponent(
            subAreaSlug
          )}&populate=SubAreaImg,sub_area_key_contacts.TeamMemberPhoto`
        );

        console.log('SubArea API Response:', subAreaRes);

        const subArea = subAreaRes.data?.[0];
        if (!subArea) {
          setNotFound(true);
          return;
        }

        setSubArea(subArea);

        // Extract key contacts array
        const contacts = subArea.attributes.sub_area_key_contacts?.data || [];
        console.log('Key Contacts Array:', contacts);
        setKeyContacts(contacts);

        // Fetch segments for this SubArea
        const segmentRes = await getStrapiData(
          `/api/segments?filters[SegmentCategory][$eq]=${encodeURIComponent(
            subArea.attributes.SubAreaSlug
          )}&populate=*`
        );
        setSegments(segmentRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setNotFound(true);
      }
    };

    fetchData();
  }, [subAreaSlug]);

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Focus Area Not Found</h2>
        <p className="text-gray-600">{`We couldn’t find details for this focus area.`}</p>
        <a href="/Practices/services/[slug]" className="text-blue-600 underline mt-4 inline-block">
          {`← Back to services`}
        </a>
      </div>
    );
  }

  if (!SubArea) return <p className="text-center py-20">Loading...</p>;

  const imgData = SubArea.attributes.SubAreaImg?.data;
  const imageUrl = imgData
    ? Array.isArray(imgData)
      ? `https://typescript-blog-backend.onrender.com${imgData[0].attributes.url}`
      : `https://typescript-blog-backend.onrender.com${imgData.attributes.url}`
    : 'https://via.placeholder.com/800x600?text=No+Image';

  return (
    <>
      {logoURL && <Nav logoURL={logoURL} />}

      {/* Hero Section */}
      <section className="bg-sky-500 md:h-[35pc] flex flex-col md:flex-row items-stretch">
        <div className="md:w-1/2 h-[20pc] md:h-[30pc] bg-sky-500 text-white flex flex-col justify-center p-7 md:p-20 font-dm-sans">
          <h1 className="text-xl md:text-20xl font-bold mb-4">{SubArea.attributes.SubAreaName}</h1>
          <div className="h-0.5 w-16 bg-white mb-8 md:mb-6"></div>
          <div className="flex gap-4">
            <button className="border border-white text-white px-6 py-2 hover:bg-white hover:text-gray-800 transition">
              Download PDF
            </button>
            <Link
              href="/ContactUs"
              className="border border-white text-white px-6 py-2 hover:bg-white hover:text-gray-800 transition"
            >
              Contact us
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative h-72 md:h-auto clip-right-diagonal">
          <Image
            src={imageUrl}
            alt={SubArea.attributes.SubAreaName}
            fill
            className="object-cover select-none pointer-events-none"
            priority
            draggable={false}
          />
        </div>
      </section>

      {/* Description + Key Contacts */}
      <section className=" max-w-full flex flex-col md:flex-row gap-10">
        <div className="max-w-6xl py-12 px-12">
          {SubArea.attributes.SubAreaDesc
            ?.split(/\s{2,}|\n+/)
            .filter((para: string) => para.trim().length > 0)
            .map((para: string, index: number) => (
              <p key={index} className="text-lg leading-relaxed mb-8 text-gray-800">
                {para.trim()}
              </p>
            ))}
        </div>

        

        {/* <aside className="hidden lg:flex flex-col bg-[#e5e7eb] px-6 py-12 w-[28%] absolute top-0 right-0 bottom-0 z-20 ">
                <h2 className="text-5xl font-opensans font-medium mb-8 text-center">Key Contacts</h2>

                {keyContacts.map((contact) => {
                  const slug = contact.attributes.TeamMemberSlug; // Make sure slug exists in Strapi
                  return (
                    <Link
                      key={contact.id}
                      href={`/AboutUs/our-team/${slug}`}  // YOUR TEAM MEMBER PAGE ROUTE
                      className="flex flex-col items-center mb-8 "
                    >
                      {contact.attributes.TeamMemberPhoto?.data?.attributes?.url && (
                        <img
                          src={`https://typescript-blog-backend.onrender.com${contact.attributes.TeamMemberPhoto.data.attributes.url}`}
                          alt={contact.attributes.TeamMemberName}
                          className="w-24 h-24 object-cover rounded-full mb-3 hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <h3 className="text-lg text-lime-400 font-opensans font-semibold">
                        {contact.attributes.TeamMemberName}
                      </h3>
                      <p className="text-gray-700 font-opensans text-sm mt-1">
                        {contact.attributes.TeamMemberDesignation}
                      </p>
                      {contact.attributes.TeamMemberEmail && (
                        <p className="text-gray-600 font-opensans text-sm mt-1">
                          {contact.attributes.TeamMemberEmail}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </aside> */}

          {/* Desktop Key Contacts */}
              <aside
                  className=" w-[30%]
                    hidden lg:flex lg:flex-col bg-[#e5e7eb] text-white px-3 py-12 
                    z-20 h-auto
                  "
                >
                  <h2 className="text-xl text-gray-800 text-center font-opensans font-bold mb-8">
                    Key Contacts
                  </h2>

                  {keyContacts.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 gap-10 px-0">
                        {keyContacts.slice(0, 4).map((contact: any) => {
                          const photoUrl = contact.attributes.TeamMemberPhoto?.data?.attributes?.url
                            ? `https://typescript-blog-backend.onrender.com${contact.attributes.TeamMemberPhoto.data.attributes.url}`
                            : "/placeholder.jpg";

                          return (
                            <div
                              key={contact.id}
                              className="flex flex-col items-center text-center bg-transparent hover:scale-105 transition-transform duration-300"
                            >
                              <Link
                                href={`/AboutUs/our-team/${contact.attributes.TeamMemberSlug}`}
                                className="flex flex-col items-center text-center"
                              >
                                <img
                                  src={photoUrl}
                                  alt={contact.attributes.TeamMemberName}
                                  loading="lazy"
                                  className="w-24 h-24 object-cover rounded-full mb-4"
                                />
                                <p className="font-opensans text-md font-semibold text-lime-500 mb-1">
                                  {contact.attributes.TeamMemberName}
                                </p>
                                <p className="font-opensans text-sm text-gray-700">
                                  {contact.attributes.TeamMemberDesignation}
                                </p>
                              </Link>

                              {contact.attributes.TeamMemberEmail && (
                                <a
                                  href={`mailto:${contact.attributes.TeamMemberEmail}`}
                                  className="font-opensans text-sm text-gray-500 hover:text-gray-700 transition-colors mt-1"
                                >
                                  {contact.attributes.TeamMemberEmail}
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* View More Button */}
                      {keyContacts.length > 4 && (
                        <div className="mt-10 flex justify-center w-full">
                          <Link
                            href="/AboutUs#our-team"
                            className="z-[60] relative inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 text-sm font-semibold hover:bg-opacity-95 transition"
                          >
                            Discover More Experts
                            <ArrowUpRight className="w-4 h-4 mt-1" />
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-center text-gray-600 mt-6">
                      No team members found for this area.
                    </p>
                  )}
                </aside>

                  


        {/* Mobile Key Contacts */}
        
      </section>

      {/* Segments Section */}
      {Segments.length > 0 && (
        <section className="bg-gray-100 py-28">
          <div className="max-w-2xl font-dm-sans px-6">
            <h2 className="text-xl md:text-18xl font-normal uppercase text-gray-800 mb-10 text-start tracking-widest">
              Area of Specialization
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Segments.map((segment: any) => {
                const imgData = segment.attributes.SegmentImage;
                const imageUrl = imgData?.data?.length
                  ? `https://typescript-blog-backend.onrender.com${imgData.data[0].attributes.url}`
                  : 'https://via.placeholder.com/400x250?text=No+Image';

                return (
                  <Link
                    key={segment.id}
                    href={`/Practices/services/${practiceSlug}/FocusedArea/${subAreaSlug}/Segments/${segment.attributes.SegmentSlug}`}
                  >
                    <div className="group relative h-36 md:h-52 w-36 md:w-52 cursor-pointer overflow-hidden transition-shadow duration-300 ">
                      <img
                        src={imageUrl}
                        alt={segment.attributes.SegmentName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 h-16 w-full bg-black/30 pb-2 px-4 flex items-end clip-diagonal">
                        <p className="text-gray-100 font-dm-sans text-xl font-semibold">
                          {segment.attributes.SegmentName}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section>
        {keyContacts.length > 0 && (
          <section className="py-12 bg-gray-200 block md:hidden mt-12">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-xl md:text-5xl font-semibold mb-8 text-center text-gray-800 font-opensans">
                Key Contacts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {keyContacts.map((contact) => (
                  <div key={contact.id} className="flex flex-col items-center  p-4 ">
                    {contact.attributes.TeamMemberPhoto?.data?.attributes?.url && (
                      <img
                        src={`https://typescript-blog-backend.onrender.com${contact.attributes.TeamMemberPhoto.data.attributes.url}`}
                        alt={contact.attributes.TeamMemberName}
                        className="w-24 h-24 object-cover rounded-full mb-3"
                      />
                    )}
                    <h3 className="text-lg text-lime-400 font-semibold">{contact.attributes.TeamMemberName}</h3>
                    <p className="text-gray-600 text-sm mt-1">{contact.attributes.TeamMemberDesignation}</p>
                    {contact.attributes.TeamMemberEmail && (
                      <a
                        href={`mailto:${contact.attributes.TeamMemberEmail}`}
                        className="text-gray-600 text-sm mt-1"
                      >
                        {contact.attributes.TeamMemberEmail}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>

      <Footer />
    </>
  );
};

export default FocusedAreaPage;
