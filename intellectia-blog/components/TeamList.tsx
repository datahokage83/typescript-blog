
"use client";

import { FC, useState,useEffect  } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { Oval } from "react-loader-spinner";

interface TeamMember {
  id: number;
  attributes: {
    TeamMemberName: string;
    TeamMemberDesignation: string;
    TeamMemberSlug: string;
    TeamMemberPhoto?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface TeamListProps {
  teamMembers?: TeamMember[];
}

const TeamList: FC<TeamListProps> = ({ teamMembers = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const membersPerPage = 12;

  // Pagination calculations
  // const totalPages = Math.ceil(teamMembers.length / membersPerPage);
  // const startIndex = (currentPage - 1) * membersPerPage;
  // const currentMembers = teamMembers.slice(startIndex, startIndex + membersPerPage);

  // Sort members by ID first
        const sortedMembers = [...teamMembers].sort((a, b) => a.id - b.id);

        // Pagination calculations
        const totalPages = Math.ceil(sortedMembers.length / membersPerPage);
        const startIndex = (currentPage - 1) * membersPerPage;
        const currentMembers = sortedMembers.slice(startIndex, startIndex + membersPerPage);

         useEffect(() => {
          setLoading(true);
        }, [teamMembers, currentPage]);


        if (!sortedMembers.length) return <p>No team members found.</p>;


  if (!teamMembers.length) return <p className="text-center py-10">No team members found.</p>;

  return (
    <>
       
         {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <Oval
            height={60}
            width={60}
            color="#ffffff"
            secondaryColor="#e0e0e0"
            strokeWidth={4}
            strokeWidthSecondary={4}
            ariaLabel="loading"
          />
        </div>
      )}


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 p-1 md:p-6">
        {currentMembers.map((member) => {
          // const imageUrl =
          //   member.attributes.TeamMemberPhoto?.data?.attributes?.url
          //     ? "https://typescript-blog-backend.onrender.com" + member.attributes.TeamMemberPhoto.data.attributes.url
          //     : "/placeholder.jpg"; // fallback

          const rawUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url;

            const imageUrl = rawUrl?.startsWith("http")
              ? rawUrl
              : rawUrl
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`
              : "/placeholder.jpg";


          return (
            <Link
              key={member.id}
              href={`/AboutUs/our-team/${member.attributes.TeamMemberSlug}`}
              className="rounded-sm shadow-md overflow-hidden no-underline hover:shadow-lg transition-transform duration-300 cursor-pointer hover:scale-105"
            >
              <div className="relative w-full h-[200px] md:h-[430px]">
                <Image
                  src={imageUrl}
                  alt={`${member.attributes.TeamMemberName}'s photo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[center_15%]"
                  priority
                />
              </div>
              <div className="p-5 text-center">
                <h2 className="font-semibold text-[16px] md:text-lg font-dm-sans text-gray-800 mb-1">
                  {member.attributes.TeamMemberName}
                </h2>
                <p className="text-gray-500 font-opensans text-[13px] md:text-base mt-1">
                  {member.attributes.TeamMemberDesignation}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-10 font-dm-sans">
          {/* Prev button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 md:px-7 py-2 md:py-4 font-dm-sans mr-5 text-2xl flex items-center gap-2 ${
              currentPage === 1
                ? "hidden"
                : "bg-gray-800 text-white hover:bg-gray-600 cursor-pointer"
            }`}
          >
            <LuMoveLeft size={18} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 md:px-5 py-2 md:py-4 font-dm-sans font-semibold text-2xl ${
                currentPage === index + 1
                  ? "bg-transparent border-2 border-gray-800 text-gray-800"
                  : "cursor-pointer hover:bg-gray-800 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 md:px-7 py-2 md:py-4 font-dm-sans ml-5 text-2xl flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-600"
          >
            <span className="hidden sm:inline">Next</span>
            <LuMoveRight size={18} />
          </button>
        </div>
      )}
    </>
  );
};

export default TeamList;
