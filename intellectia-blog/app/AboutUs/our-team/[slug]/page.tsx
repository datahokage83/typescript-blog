import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import MemberTabs from "./Tabs";
import Footer from "@/components/Footer/Footer";
import { FaLinkedinIn } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { GrMailOption } from "react-icons/gr";
// import { AiOutlineFilePdf } from "react-icons/ai";
// import { PiMicrosoftWordLogo } from "react-icons/pi";
import { MdOutlineFileDownload } from "react-icons/md";

interface Media {
  data?: {
    attributes?: {
      url?: string;
    };
  }[];
}

interface TeamMember {
  id: number;
  attributes: {
    TeamMemberName: string;
    TeamMemberDesignation: string;
    TeamMemberDescription?: string;
    TeamMemberEducation?: string;
    TeamMemberExpertise?: string;
    TeamMemberEmail?: string;
    TeamMemberPhone?: string;
    TeamMemberLinkedinLink?: string;
    TeamMemberSlug: string; // ✅ fixed field name
    TeamMemberPhoto?: { data?: { attributes?: { url?: string } } };
    TeamMemberPdfLink?: Media;
    TeamMemberDocxLink?: Media;
  };
}

interface PageProps {
  params: { slug: string };
}

async function fetchStrapi(path: string, cache: RequestCache = "no-store") {
  const baseURL = "https://typescript-blog-backend.onrender.com";
  const res = await fetch(`${baseURL}${path}`, { cache });
  if (!res.ok) throw new Error(`Failed to fetch: ${path}`);
  return res.json();
}

function getSafeUrl(raw?: string | null) {
  if (!raw) return "/placeholder.jpg";
  if (raw.startsWith("http")) return raw;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${raw}`;
}

export default async function TeamMemberPage({ params }: PageProps) {
  try {
    const slug = params.slug.trim().toLowerCase();

   const [homeData, memberData] = await Promise.all([
  fetchStrapi("/api/home-page?populate=*", "force-cache"),
  fetchStrapi(
    `/api/team-members?filters[TeamMemberSlug][$eqi]=${slug}&populate=*`
  ),
]);


    if (!memberData?.data?.length) return notFound();

    const member: TeamMember = memberData.data[0];

    // const logoURL = homeData?.data?.attributes?.Logo?.data?.attributes?.url
    //   ? `https://typescript-blog-backend.onrender.com${homeData.data.attributes.Logo.data.attributes.url}`
    //   : undefined;

    const logoRaw = homeData?.data?.attributes?.Logo?.data?.attributes?.url;
    const logoURL = getSafeUrl(logoRaw);


    // const imageUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url
    //   ? `https://typescript-blog-backend.onrender.com${member.attributes.TeamMemberPhoto.data.attributes.url}`
    //   : "/placeholder.jpg";

      const photoRaw = member.attributes.TeamMemberPhoto?.data?.attributes?.url;
      const imageUrl = getSafeUrl(photoRaw);


    const pdfDownloadUrl =
      member.attributes.TeamMemberPdfLink?.data?.[0]?.attributes?.url
        ? `https://typescript-blog-backend.onrender.com${member.attributes.TeamMemberPdfLink.data[0].attributes.url}`
        : undefined;

    const docxDownloadUrl =
      member.attributes.TeamMemberDocxLink?.data?.[0]?.attributes?.url
        ? `https://typescript-blog-backend.onrender.com${member.attributes.TeamMemberDocxLink.data[0].attributes.url}`
        : undefined;

    // const pdfDownloadUrl =
    //   member.attributes.TeamMemberPdfLink?.data?.[0]?.attributes?.url
    //     ? getSafeUrl(member.attributes.TeamMemberPdfLink.data[0].attributes.url)
    //     : undefined;

    // const docxDownloadUrl =
    //   member.attributes.TeamMemberDocxLink?.data?.[0]?.attributes?.url
    //     ? getSafeUrl(member.attributes.TeamMemberDocxLink.data[0].attributes.url)
    //     : undefined;

    return (
      <>
        {/* <Nav logoURL={logoURL} /> */}
         <Nav />

        {/* Hero Section */}
        <div className="bg-gray-800 relative w-full min-h-[65vh] md:min-h-[85vh] flex justify-center items-center">
          <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
            {/* Profile Image */}
            <div className="relative w-full h-[400px] md:w-[450px] md:h-[500px]">
              <Image
                src={imageUrl}
                alt={member.attributes.TeamMemberName}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="bg-gray-400 h-[280px] flex-1 px-10 py-8 flex flex-col justify-center -mt-4 md:mt-16">
              <div className="flex flex-row items-center text-gray-800">
                <h1 className="text-19xl font-bold font-dm-sans">
                  {member.attributes.TeamMemberName}
                </h1>
                <span className="sm:inline-block w-[2px] h-6 md:h-8 bg-gray-800 mx-3"></span>
                <p className="text-17xl font-dm-sans pt-1">
                  {member.attributes.TeamMemberDesignation}
                </p>
              </div>

              {/* Socials */}
              <div className="flex space-x-4 mt-4 -ml-0.5 md:ml-0">
                {member.attributes.TeamMemberLinkedinLink && (
                  <a
                    href={member.attributes.TeamMemberLinkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-gray-100 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  >
                    <FaLinkedinIn size={20} />
                  </a>
                )}

                {member.attributes.TeamMemberPhone && (
                  <a
                    href={`tel:${member.attributes.TeamMemberPhone}`}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-gray-100 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  >
                    <LuPhone size={20} />
                  </a>
                )}

                {member.attributes.TeamMemberEmail && (
                  <a
                    href={`mailto:${member.attributes.TeamMemberEmail}`}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-gray-100 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  >
                    <GrMailOption size={20} />
                  </a>
                )}

                <span className="block md:hidden">
                    <a
                      href={pdfDownloadUrl}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-gray-100 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                    >
                       <MdOutlineFileDownload className="w-7 h-7" />
                    </a>
                 
                  </span>
              </div>
            </div>
          </div>

          {/* Download Buttons (Desktop) */}
          <div className="absolute bottom-4 right-8 hidden md:flex items-center gap-6">
            {/* {docxDownloadUrl && (
              <a href={docxDownloadUrl}>
                
                <img src="/images/word.png" className="h-10 w-10 cursor-pointer hover:scale-105" title="DownloadResume"/>
               
              </a>
            )}
            {pdfDownloadUrl && (
              <a href={pdfDownloadUrl}>
                <img src="/images/pdf.png" className="h-10 w-10 cursor-pointer hover:scale-105" title="DownloadResume"/>
               
              </a>
            )} */}
            {docxDownloadUrl && (
                  <a href={docxDownloadUrl}>
                    <Image
                      src="/images/word.png"
                      alt="Download Word Resume"
                      width={40}
                      height={40}
                      className="h-10 w-10 cursor-pointer hover:scale-105"
                    />
                  </a>
                )}

                {pdfDownloadUrl && (
                  <a href={pdfDownloadUrl}>
                    <Image
                      src="/images/pdf.png"
                      alt="Download PDF Resume"
                      width={40}
                      height={40}
                      className="h-10 w-10 cursor-pointer hover:scale-105"
                    />
                  </a>
                )}

          </div>

          
        </div>

        {/* Tabs + Footer */}
        <MemberTabs member={member} />
        <Footer />
      </>
    );
  } catch (err) {
    console.error(err);
    return notFound();
  }
}
