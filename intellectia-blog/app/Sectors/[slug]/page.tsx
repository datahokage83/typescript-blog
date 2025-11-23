import Nav from "@/components/nav";
import Footer from "@/components/Footer/Footer";
import { FaLinkedinIn, FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

async function getStrapiData(url: string) {
  const res = await fetch("https://typescript-blog-backend.onrender.com" + url, { cache: "no-cache" });
  return res.json();
}

export default async function SectorPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Logo
  const homeData = await getStrapiData("/api/home-page?populate=*");
  const logoURL =
    "https://typescript-blog-backend.onrender.com" + homeData?.data?.attributes?.Logo?.data?.attributes?.url;

  // Current sector
  const sectorRes = await getStrapiData(
    `/api/sectors?filters[sectorslug][$eq]=${slug}&populate=*`
  );
  const sector = sectorRes?.data?.[0]?.attributes;

  if (!sector) {
    return <div className="text-center text-gray-500 py-20">Sector not found.</div>;
  }

  // const imageUrl = sector?.SectorImg?.data
  //   ? "https://typescript-blog-backend.onrender.com" + sector.SectorImg.data.attributes.url
  //   : "/images/default.jpg";

    const rawUrl = sector?.SectorImg?.data?.attributes?.url;

    const imageUrl = rawUrl
      ? rawUrl.startsWith("http")
        ? rawUrl
        : "https://typescript-blog-backend.onrender.com" + rawUrl
      : "/images/default.jpg";


  // Fetch all sectors (future-safe)
  const allSectorsRes = await getStrapiData("/api/sectors?populate=*");
  const sectors = allSectorsRes?.data || [];

  return (
    <>
      {/* <Nav logoURL={logoURL} /> */}
        <Nav/>

      <div className="w-full flex justify-between">
        {/* LEFT SECTION */}
        <section className="max-w-5xl px-6 py-14 font-opensans">
          <h1 className="text-xl md:text-18xl font-semibold text-gray-800 mb-6 tracking-wide">
            {sector?.SectorTitle || "Sector"}
          </h1>

          {/* <img
            src={imageUrl}
            alt={sector?.SectorTitle}
            className="w-full h-96 object-cover"
          /> */}

          <Image
            src={imageUrl}
            alt={sector?.SectorTitle || "Sector image"}
            width={1600}
            height={900}
            className="w-full h-96 object-cover"
          />


          {/* SHARE ICONS */}
          <div className="flex flex-col mt-4 md:mt-6 mb-6 text-gray-500">
            <p className="text-gray-500 text-[17px] ml-1 mb-3"> Share to :</p>

            <div className="flex flex-row gap-4 ml-1">
              <a
                href="https://wa.me/?text=Check%20out%20this%20sector!"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border text-gray-800 border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
              >
                <FaWhatsapp size={20} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border text-gray-800 border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://www.facebook.com/sharer/sharer.php"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border text-gray-800 border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
              >
                <FaFacebookSquare size={20} />
              </a>

              <a
                href="https://twitter.com/intent/tweet"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border text-gray-800 border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
              >
                <FaXTwitter size={20} />
              </a>

              <a
                href="https://www.linkedin.com/shareArticle"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border text-gray-800 border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="text-gray-600 font-opensans text-lg leading-relaxed mt-10 mb-10 space-y-6">
            {sector?.SectorDesc
              ? sector.SectorDesc.split(/\n\s*\n/).map((para: string, i: number) => (
                  <p key={i}>{para.trim()}</p>
                ))
              : "We’re currently preparing detailed insights for this sector — please check back soon."}
          </div>

          {/* CAREERS CTA */}
          <div className="max-w-5xl mx-auto mt-16 mb-8 border border-yellow-500 rounded-sm bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col md:flex-row justify-between items-center px-8 py-6 shadow-sm">
            <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="text-xl md:text-5xl font-semibold text-gray-800 font-dm-sans">
                Intellectia<sup>®</sup>
              </h1>

              <p className="mt-3 text-sm text-gray-600 max-w-md leading-relaxed font-opensans">
                Your next chapter starts with a single click. Begin your journey with us today.
              </p>

              <Link href="/ContactUs/Careers#careers">
                <button className="bg-black px-6 py-3 text-sm mt-4 text-white hover:opacity-80">
                  Explore Careers
                </button>
              </Link>
            </div>

            <div className="w-48 h-32 md:w-36 md:h-36 bg-black rounded-sm shadow-md mt-6 md:mt-0">
              {/* <img src="/images/bird.jpg" className="w-full h-full object-cover" /> */}
              <Image
                  src="/images/bird.jpg"
                  alt="Career Inspiration Image"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover"
                />

            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <section className="min-h-screen bg-gray-50 border-l border-gray-400 px-10 py-14 hidden md:block">
          <h2 className="text-18xl font-semibold font-opensans text-gray-800 mb-4">
            Other Sectors
          </h2>

          <div className="flex flex-col gap-3 text-gray-700 font-opensans">
            {/* {sectors
              .filter((sec: any) => sec.attributes.sectorslug !== slug)
              .map((sec: any) => ( */}
              {sectors
              .filter((sec: any) => sec.attributes.sectorslug !== slug)
              .sort((a: any, b: any) => a.id - b.id)   // ✅ Sort by ID ascending
              .map((sec: any) => (

                <Link
                  key={sec.id}
                  href={`/Sectors/${sec.attributes.sectorslug}`}
                  className="hover:text-black"
                >
                  {sec.attributes.SectorTag}
                </Link>
              ))}
          </div>

          {/* CTA BOX */}
          <div className="mt-10 p-5 border rounded bg-gradient-to-b from-gray-100 to-white shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Need Expert Advice?</h3>
            <p className="text-sm text-gray-600 mt-2">
              Our team provides tailored strategies for your industry challenges.
            </p>
            <Link href="/ContactUs">
              <button className="bg-gray-800 text-white px-4 py-2 mt-4 text-sm hover:opacity-80">
                Contact Us
              </button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
