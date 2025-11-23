import Nav from "@/components/nav";
import Footer from "@/components/Footer/Footer";
import VideoCarousel from "@/components/VideoCarousel"; // Client Component
import DotIndicator from "@/components/DotIndicator"; // 👈 add this
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

// Helper to fetch sectors and homepage data (Server Component)
async function getStrapiData(url: string) {
  const res = await fetch("https://typescript-blog-backend.onrender.com" + url, { cache: "no-cache" });
  return res.json();
}

const Sectors: NextPage = async () => {
  const homeData = await getStrapiData("/api/home-page?populate=*");
  // const logoURL =
  //   "https://typescript-blog-backend.onrender.com" + homeData.data.attributes.Logo.data.attributes.url;

  const rawLogo = homeData.data.attributes.Logo?.data?.attributes?.url;
  const logoURL = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : "https://typescript-blog-backend.onrender.com" + rawLogo
    : "/logo.png";


  const sectorData = await getStrapiData("/api/sectors?populate=SectorImg");
  // const sectors =
  //   // sectorData?.data?.map((item: any) => ({
  //     sectorData?.data
  //     ?.sort((a: any, b: any) => a.id - b.id)   // <-- SORT BY ID ASC
  //     .map((item: any) => ({
  //     tag: item.attributes.SectorTag,
  //     title: item.attributes.SectorTitle,
  //     slug: item.attributes.sectorslug,
  //     image: item.attributes.SectorImg?.data?.attributes?.url
  //       ? "https://typescript-blog-backend.onrender.com" +
  //         item.attributes.SectorImg.data.attributes.url
  //       : "/images/default.jpg",
  //   })) || [];

  const sectors =
  sectorData?.data
    ?.sort((a: any, b: any) => a.id - b.id)
    .map((item: any) => {
      const rawUrl = item.attributes.SectorImg?.data?.attributes?.url;

      return {
        tag: item.attributes.SectorTag,
        title: item.attributes.SectorTitle,
        slug: item.attributes.sectorslug,
        image: rawUrl
          ? rawUrl.startsWith("http")
            ? rawUrl
            : "https://typescript-blog-backend.onrender.com" + rawUrl
          : "/images/default.jpg"
      };
    }) || [];


  const videoData = await getStrapiData("/api/sectors-video?populate=SecVideos");
  // const videos =
  //   videoData?.data?.attributes?.SecVideos?.data?.map(
  //     (vid: any) => "https://typescript-blog-backend.onrender.com" + vid.attributes.url
  //   ) || [];

  const videos =
  videoData?.data?.attributes?.SecVideos?.data?.map((vid: any) => {
    const rawUrl = vid.attributes.url;

    return rawUrl.startsWith("http")
      ? rawUrl
      : "https://typescript-blog-backend.onrender.com" + rawUrl;
  }) || [];


  return (
    <>
      {/* <Nav logoURL={logoURL} /> */}
        <Nav/>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-stretch overflow-hidden bg-lime-300">
        <div className="max-w-xl relative flex-1 flex flex-col justify-center px-10 md:px-20 py-20 md:py-32 clip-left-diagonal z-10">
          <h2 className="text-17xl md:text-20xl font-dm-sans text-gray-800 font-extrabold mb-6 leading-tight max-w-xl">
            Work With Us
          </h2>
          <p className="text-gray-800 font-opensans font-normal text-xl mb-8 max-w-md leading-relaxed">
            Serving diverse industries with expert legal solutions you can trust.
          </p>

          {/* 👇 Dot animation synced with video */}
          <DotIndicator videos={videos} />
        </div>

        {/* Client Component fetches its own videos */}
        <VideoCarousel videos={videos} />
      </section>

      {/* Sectors Grid */}
      {/* <section className="max-w-7xl mx-auto px-6 py-20 font-dm-sans">
        <h2 className="text-18xl font-medium uppercase text-gray-800 mb-12 text-left">
          Where We Make an Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-10">
          {sectors.length > 0 ? (
            sectors.map((sector: any, index: number) => (
              <div
                key={index}
                className="flex flex-col group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="w-full h-64 object-cover mb-4"
                />
                <span className="bg-gray-800 text-gray-100 text-sm font-medium px-4 py-2 w-fit mb-3">
                  {sector.tag}
                </span>
                <h3 className="text-lg font-medium text-gray-900 leading-snug group-hover:text-blue-900 transition-colors">
                  {sector.title}
                </h3>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-full text-center">
              No sectors available right now.
            </p>
          )}
        </div>
      </section> */}

       <section className="max-w-7xl mx-auto px-6 py-20 font-dm-sans">
          <h2 className="text-18xl font-medium uppercase text-gray-800 mb-12 text-left">
            Where We Make an Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-10">
            {sectors.length > 0 ? (
              sectors.map((sector: any, index: number) => (
                <Link key={index} href={`/Sectors/${sector.slug}`}>
                  <div className="flex flex-col group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                    {/* <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-64 object-cover mb-4"
                    /> */}
                    <Image
                        src={sector.image}
                        alt={sector.title}
                        width={800}          // required
                        height={500}         // required
                        className="w-full h-64 object-cover mb-4"
                      />
                    <span className="bg-gray-800 text-gray-100 text-sm font-medium px-4 py-2 w-fit mb-3">
                      {sector.tag}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900 leading-snug group-hover:text-blue-900 transition-colors">
                      {sector.title}
                    </h3>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-lg col-span-full text-center">
                No sectors available right now.
              </p>
            )}
          </div>
        </section>

      <Footer />
    </>
  );
};

export default Sectors;
