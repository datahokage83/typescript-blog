'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/nav";

// Strapi fetch helper
async function getStrapiData(url: string) {
  const baseURL = "https://typescript-blog-backend.onrender.com";
  const res = await fetch(baseURL + url);
  const data = await res.json();
  return data;
}

function buildURL(url?: string) {
  if (!url) return "/placeholder.jpg";
  return url.startsWith("http")
    ? url
    : "https://typescript-blog-backend.onrender.com" + url;
}


const PracticeDetailPage = () => {
  const { slug } = useParams();
  const practiceSlug = Array.isArray(slug) ? slug[0] : slug;

  const [practice, setPractice] = useState<any>(null);
  const [subAreas, setSubAreas] = useState<any[]>([]);
  const [logoURL, setLogoURL] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!practiceSlug) {
          setNotFound(true);
          return;
        }

        // Fetch logo
        const homeData = await getStrapiData("/api/home-page?populate=*");
        const logo = homeData.data?.attributes?.Logo?.data?.attributes?.url;
        if (logo) setLogoURL("https://typescript-blog-backend.onrender.com" + logo);

        // Fetch Practice
        const practiceData = await getStrapiData(
          `/api/practice-areas?filters[slug][$eq]=${encodeURIComponent(practiceSlug)}&populate=*`
        );

        if (!practiceData.data || practiceData.data.length === 0) {
          setNotFound(true);
          return;
        }

        const selectedPractice = practiceData.data[0];
        setPractice(selectedPractice);

        // Fetch SubAreas
        const subAreaData = await getStrapiData(
          `/api/sub-areas?filters[SubAreaCategory][$eq]=${encodeURIComponent(selectedPractice.attributes.slug)}&populate=*`
        );

        setSubAreas(subAreaData.data);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      }
    };

    fetchData();
  }, [practiceSlug]);

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Practice Area Not Found</h2>
        <p className="text-gray-600">{`We couldn’t find details for this practice area.`}</p>
        <a href="/Practices" className="text-blue-600 underline mt-4 inline-block">
          ← Back to Practices
        </a>
      </div>
    );
  }

  if (!practice) return <p className="text-center py-20">Loading...</p>;

  // const practiceImage = practice.attributes.PracticeAreaImage?.data?.attributes?.url
  //   ? `https://typescript-blog-backend.onrender.com${practice.attributes.PracticeAreaImage.data.attributes.url}`
  //   : "/placeholder.jpg";

  const practiceImage = buildURL(
  practice.attributes.PracticeAreaImage?.data?.attributes?.url
);


  const quote = practice.attributes.quote;

  return (
    <>
      {logoURL && <Nav logoURL={logoURL} />}

      {/* Practice Info */}
      <section className="max-w-5xl mx-auto p-6 font-dm-sans">
        <h1 className="font-bold mb-6 font-dm-sans  text-gray-800 text-17xl">
          {practice.attributes.title}
        </h1>

        {/* Quote */}
        
        {quote && (
          <p className="text-lg mt-10 text-gray-700 italic mb-4">
            {`"${quote}"`}
          </p>
        )}

        {/* Practice Image */}
        {/* <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-md mb-6">
          <Image
            src={practiceImage}
            alt={practice.attributes.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div> */}

        {/* Description */}
        {practice.attributes.Description && (
          <p className="text-lg leading-relaxed text-gray-700">
            {practice.attributes.Description}
          </p>
        )}
      </section>

      {/* SubAreas */}
      {subAreas.length > 0 && (
        <section className="bg-gray-100 py-12 mt-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold font-dm-sans mb-8 text-gray-800 text-start">
              Focus Areas
            </h2>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {subAreas.map((sub: any) => {
                // const imageUrl = sub?.attributes?.SubAreaImg?.data?.[0]?.attributes?.url
                //   ? `https://typescript-blog-backend.onrender.com${sub.attributes.SubAreaImg.data[0].attributes.url}`
                //   : "/placeholder.jpg";
                const imageUrl = buildURL(
                    sub?.attributes?.SubAreaImg?.data?.[0]?.attributes?.url
                  );


                return (
                  <Link
                    key={sub.id}
                    href={`/Practices/services/${practice.attributes.slug}/FocusedArea/${sub.attributes.slug}`}
                  >
                    <div className="text-center cursor-pointer group">
                      <div className="w-40 h-36 border overflow-hidden shadow-md group-hover:shadow-lg group-hover:scale-105 transform transition-all duration-300 mx-auto relative">
                        <Image
                          src={imageUrl}
                          alt={sub.attributes.SubAreaName || "Focus Area"}
                          fill
                          className="object-cover"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <p className="mt-2 font-medium">{sub.attributes.SubAreaName}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default PracticeDetailPage;
