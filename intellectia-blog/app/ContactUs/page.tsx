"use client";

import Nav from "@/components/nav";
import Footer from "@/components/Footer/Footer";
import type { NextPage } from "next";
import { MapPin, Phone, Mail, X, CheckCircle, XCircle } from "lucide-react";
import CareerSection from "@/app/ContactUs/CareerSection";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner"; 
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./ContactMap"), { ssr: false });

export type ContactContainerType = {
  className?: string;
};

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

const ContactUs = (): JSX.Element => {
  const [logoURL, setLogoURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false); // ✅ new state

  useEffect(() => {
    const fetchData = async () => {
      const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
      const { Logo } = strapiHomeData.data.attributes;
      setLogoURL("https://typescript-blog-backend.onrender.com" + Logo.data.attributes.url);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

    useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // ✅ show loader

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setModalType("success");
        setIsError(false);
        setModalMessage("Thanks! We've received your message.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setModalType("error");
        setIsError(true);
        setModalMessage("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setModalType("error");
      console.error("Submission error:", err);
      setIsError(true);
      setModalMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // ✅ hide loader
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Nav logoURL={logoURL} />

    
     {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm overflow-hidden">
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

     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm overflow-hidden">
          <div className="relative w-11/12 max-w-lg bg-white rounded-sm shadow-lg font-dm-sans animate-modalFadeIn">
            {/* Top Border Color */}
            <div
              className={`w-full h-1 ${
                modalType === "success" ? "bg-gray-800" : "bg-[#b43a2f]"
              }`}
            />

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 rounded-full py-1 hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="px-6 py-4 text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                {modalType === "success" ? (
                  <>
                    <CheckCircle className="text-gray-800 w-6 h-6" />
                    <h3 className="text-lg font-semibold text-blue-950">
                      WooHoo!
                    </h3>
                  </>
                ) : (
                  <>
                    <XCircle className="text-[#b43a2f] w-6 h-6" />
                    <h3 className="text-lg font-semibold text-[#b43a2f]">
                      Oops!
                    </h3>
                  </>
                )}
              </div>

              <p className="text-gray-700 mb-4">{modalMessage}</p>

              {modalType === "error" && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 text-white px-4 py-2 font-dm-sans font-medium cursor-pointer rounded-md hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      
      <div className="relative mb-108">
        <div className="bg-gray-800 text-black py-28 px-7 md:px-5">
          <div className="md:px-20 font-dm-sans">
            <p className="text-3xl md:text-17xl font-semibold text-white pt-10 mb-3">
              {`We're Here to Help`}
            </p>
            <p className="text-base md:text-xl font-normal text-white">
              {`Looking for a legal Partner? You Found.`}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info + Form */}
      <div className="relative flex flex-col md:flex-col lg:flex-row bg-white rounded-sm p-6 md:p-12 font-dm-sans z-10 gap-8">
        {/* Contact Info */}
        <div className="lg:w-2/5 bg-white ml-1 p-6">
          <div className="px-0 md:px-5">
            <h2 className="text-xl font-semibold mb-4 text-[#b43a2f]">
              Contact Info
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5951297,17z/data=!4m8!3m7!1s0x3bae15d13a793489:0xe5f93f75c0c87a66!8m2!3d12.961518!4d77.5951297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 no-underline"
              >
                <MapPin className="w-8 h-8 no-underline" />
                <p className="no-underline text-base md:text-lg">
                  #35/6, Krishna Residency, Langford Road Cross, Bengaluru
                  560025
                </p>
              </a>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="tel:+919845097323"
                className="flex items-center gap-3 text-gray-700 no-underline"
              >
                <Phone className="w-6 h-6" />
                <p className="text-base md:text-lg">+91-9845097323</p>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@intelectia.net"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 no-underline"
              >
                <Mail className="w-6 h-6" />
                <p className="text-base md:text-lg">info@intelectia.net</p>
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="ml-3 md:ml-20 mt-0 md:-mt-56 md:w-2.5/5 bg-gray-50 font-dm-sans p-6 md:p-14 rounded-sm shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-xl font-semibold text-[#0a4d6e] mb-2">
              {`Your Goals, Our Mission – Let's Connect`}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Experience top-tier legal guidance for every stage of your
              journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7 mt-3 ml-3">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-md font-medium mb-2 -ml-2">
                  Enter your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-[100%] border font-dm-sans border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#b43a2f] -ml-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-md font-medium mb-2 -ml-2">
                  Enter your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-[100%] border font-dm-sans border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#b43a2f] -ml-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-md font-medium mb-2 -ml-2">
                Enter your message
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-[100%] border font-dm-sans border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#b43a2f] -ml-2"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="-mx-3">
              <button
                type="submit"
                className="w-[96%] bg-[#b43a2f] text-white cursor-pointer font-dm-sans font-semibold py-3 ml-1 rounded-sm hover:bg-[#a13328] transition"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="relative mt-16 mb-16 flex justify-center z-0">
        <Map />
      </div>

        


      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto">
          <CareerSection />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
