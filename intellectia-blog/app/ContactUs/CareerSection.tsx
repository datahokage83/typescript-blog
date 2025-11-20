"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EnquireForm from "@/app/ContactUs/EnquireForm"; // Adjust path
import type { NextPage } from "next";

export default function CareersSection() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const jobItems = [
    {
      title: "Get in Touch with HR",
      desc: "Our HR team is here to help with hiring and employee support.",
      btnText: "Connect",
      tags: ["Hiring Support", "Talent Engagement"],
      route: "/ContactUs/Careers",
    },
    {
      title: "Submit your Enquiry",
      desc: "Got a question? We're here to help with services, partnerships, and more.",
      btnText: "Enquire now",
      tags: ["Help Desk", "Feedback"],
      route: "modal", // we use this to detect modal open
    },
  ];

  return (
    <section className="py-12 px-7 font-dm-sans text-[#1a1a1a] relative">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-6">
          <button className="inline-flex text-sm border font-dm-sans border-black rounded-full px-10 py-3 font-bold hover:bg-black hover:text-white transition -ml-1">
            {`We're hiring!`}
          </button>


          <h1 className="text-20xl mt-6 font-semibold">Be part of our mission</h1>
          <p className="text-black mt-5 font-medium text-lg mb-5">
           {` We're looking for passionate people to join us on our mission.`}
          </p>
        </div>

        {/* Job Cards */}
        {jobItems.map((job, idx) => (
          <div key={idx}>
            <div className="border-t-2 py-6 flex justify-between items-start flex-wrap gap-4 mt-2">
              <div>
                <h2 className="text-lgx font-semibold mb-2">{job.title}</h2>
                <p className="text-md text-gray-600 mb-3">{job.desc}</p>
                <div className="flex gap-2 text-sm flex-wrap">
                  {/* {job.tags.map((tag, tagIdx) => (
                    <button
                      key={tagIdx}
                      className="border border-black cursor-pointer rounded-full px-5 py-3 font-semibold font-dm-sans hover:bg-gray-100 transition"
                    >
                      {tag}
                    </button>
                  ))} */}
                </div>
              </div>

              {/* Redirect or modal button */}
              <button
                onClick={() => {
                  if (job.route === "modal") {
                    setShowModal(true);
                  } else {
                    router.push(job.route);
                  }
                }}
                className="font-dm-sans font-medium text-base no-underline bg-black text-white mt-1 px-5 py-3 rounded-full cursor-pointer flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                {job.btnText}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            {/* Divider */}
            {idx < jobItems.length - 1 && (
              <div className="mt-4 mb-4">
                {/* <div className="w-full h-px sm:h-0.5 bg-black" /> */}
              </div>
            )}
          </div>
        ))}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <EnquireForm onClose={() => setShowModal(false)} />
          </div>
        )}
      </div>
    </section>
  );
}
