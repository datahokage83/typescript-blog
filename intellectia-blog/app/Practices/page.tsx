

'use client';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/nav";
import { motion } from "framer-motion";

// Dynamically import CardNew to reduce initial JS bundle size
const CardNew = dynamic(() => import("@/components/CardNew"), {
  loading: () => (
    <div className="bg-gray-200 h-56 w-full animate-pulse rounded-2xl"></div>
  ),
});

const Practice = () => {
  const [practiceAreas, setPracticeAreas] = useState<any[]>([]);
  const [logoURL, setLogoURL] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseURL = "https://typescript-blog-backend.onrender.com";

    const fetchData = async () => {
      try {
        // Fetch both endpoints in parallel
        const [practiceRes, homeRes] = await Promise.all([
          fetch(`${baseURL}/api/practice-areas?populate=*`, { cache: "no-store" }),
          fetch(`${baseURL}/api/home-page?populate=*`, { cache: "force-cache" }),
        ]);

        const [practiceData, homeData] = await Promise.all([
          practiceRes.json(),
          homeRes.json(),
        ]);

        // setPracticeAreas(practiceData?.data || []);
        setPracticeAreas(
          (practiceData?.data || []).sort((a: any, b: any) => a.id - b.id)
        );

        // setLogoURL(baseURL + homeData.data.attributes.Logo.data.attributes.url);
            const cloudinaryLogo = homeData?.data?.attributes?.Logo?.data?.attributes?.url;
            setLogoURL(cloudinaryLogo || "");
      } catch (error) {
        console.error("Error fetching practice data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {logoURL && <Nav logoURL={logoURL} />}


      <section className="bg-gray-200 py-16 md:py-20">
            <div className="max-w-6xl md:max-w-7xl mx-auto px-4">
              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-5xl md:text-18xl font-medium text-gray-800 mb-10 font-dm-sans"
              >
                Our Approach to Law
              </motion.h2>

              {/* Top Description */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 text-gray-700 font-dm-sans">
                <div>
                  <p className="text-[17px] leading-relaxed">
                    At our firm, we combine strong legal knowledge with practical insight 
                    to achieve the best outcomes for our clients.
                  </p>
                  {/* <p className="mt-2 text-sm text-gray-500">1.5k+ readers</p> */}
                </div>
                <div>
                  <p className="text-[17px] leading-relaxed">
                    {`We apply informed judgment to every matter, ensuring
                    our advice supports our clients’ long-term interests.`}
                  </p>
                  {/* <p className="mt-2 text-sm text-gray-500">Trusted by 100+ businesses</p> */}
                </div>
                <div>
                  <p className="text-[17px] leading-relaxed">
                    {`We analyze complex cases, manage disputes effectively, and ensure
                    our clients’ interests are always at the forefront.`}
                  </p>
                  {/* <p className="mt-2 text-sm text-gray-500">80% success rate</p> */}
                </div>
                <div>
                  <p className="text-[17px] leading-relaxed">
                    We believe in transparent effective communication, timely updates, and a
                    collaborative approach that builds trust.
                  </p>
                  {/* <p className="mt-2 text-sm text-gray-500">4.9★ client satisfaction</p> */}
                </div>
              </div>

              


             {/* MOBILE VERSION (visible only on mobile) */}
                    <div className="grid grid-cols-2 gap-2 md:hidden">
                      {[
                        {
                          title: "Client-Centric",
                          desc: "Understanding client goals closely.",
                          number: "01",
                        },
                        {
                          title: "Strategic Insight",
                          desc: "Combining legal expertise with strategy.",
                          number: "02",
                        },
                        {
                          title: "Collaborative",
                          desc: "Teams work together across domains.",
                          number: "03",
                        },
                        {
                          title: "Transparency",
                          desc: "Clear, honest communication always.",
                          number: "04",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-gray-800 p-4 h-44 text-gray-100 font-dm-sans shadow-sm hover:bg-opacity-95"
                        >
                          <p className="text-xs text-gray-300">{item.number}</p>
                          <h3 className="text-base font-semibold mt-1">{item.title}</h3>
                          <p className="text-sm mt-1 opacity-80">{item.desc}</p>
                        </div>
                      ))}
                    </div>



                    {/* DESKTOP VERSION (visible only on md and above) */}
                   <div className="hidden md:grid grid-cols-4 gap-6">
                {[
                  {
                    title: "Client-Centric Solutions",
                    desc: "Every case begins with understanding the client’s goals and crafting a personalized legal plan.",
                    color: "bg-gray-800",
                    number: "01",
                  },
                  {
                    title: "Strategic Insight",
                    desc: "We combine legal experience with practical strategies to guide clients toward favorable outcomes.",
                    color: "bg-gray-800",
                    number: "02",
                  },
                  {
                    title: "Collaborative Approach",
                    desc: "Our teams across different legal domains work together to deliver comprehensive support.",
                    color: "bg-gray-800",
                    number: "03",
                  },
                  {
                    title: "Integrity & Transparency",
                    desc: "Honesty and clarity are at the heart of every interaction, ensuring client confidence.",
                    color: "bg-gray-800",
                    number: "04",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className={`${item.color} relative  overflow-hidden group h-40 md:h-60 shadow-sm hover:bg-opacity-95 hover:shadow-md transition-all duration-500 cursor-pointer`}
                  >
                    <div className="absolute inset-0 flex flex-col justify-center items-start p-8  transition-all duration-500 group-hover:justify-start group-hover:pt-8">
                      <p className="absolute top-2 left-2 text-sm text-gray-200 mb-2 font-semibold">{item.number}</p>

                      
                      <motion.h3
                        initial={false}
                        animate={{ y: 60 }}
                        whileHover={{ y: -25 }}
                        className="absolute bottom-0 left-4 text-xl font-semibold text-gray-100 font-dm-sans transition-all duration-100"
                      >
                        {item.title}
                      

                      
                      <p className="opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-500 text-gray-200 text-base leading-relaxed  font-dm-sans font-normal px-1 mt-3">
                        {item.desc}
                      </p>

                      </motion.h3>
                    </div>
                  </motion.div>
                ))}
              </div>

                                
             

            </div>
          </section>


          {/* MAIN LAYOUT SECTION */}
          <section className="py-14">
            <div className="max-w-full md:max-w-7xl mx-auto px-4">

              {/* HEADING */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-dm-sans uppercase font-medium text-[23px] md:text-18xl text-gray-800 tracking-wider mb-12 mt-4"
              >
                practices we do
              </motion.p>

              {/* WRAPPER: Left (Cards) + Right (Text) */}
              <div className="flex flex-col lg:flex-row items-start gap-14 lg:gap-14">

                {/* LEFT COLUMN – PRACTICE CARDS */}
                <div
                  className="
                    w-full
                    max-w-[320px]
                    sm:max-w-[560px]
                   
                    grid grid-cols-2
                    gap-3
                    mx-auto
                  "
                >
                  {loading
                    ? Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl"></div>
                        ))
                    : practiceAreas.map((area: any) => (
                        <CardNew key={area.id} BlogPosts={area} />
                      ))}
                </div>

                {/* RIGHT COLUMN – PARAGRAPHS */}
                <div className="w-full  text-gray-700 font-dm-sans">
                  <p className="text-[20px] md:text-[21px] leading-relaxed tracking-wide mb-3 -mt-3">
                    Our firm provides a broad range of legal services designed to meet
                    the needs of individuals, businesses, and organizations. We are
                    committed to providing expert guidance and practical solutions across
                    multiple areas of law. With professionalism and diligence, we help
                    clients navigate complex legal matters with clarity. We build lasting
                    client relationships through personalized and effective legal support. 
                    We stay updated on legal developments to provide timely, informed advice.
                  </p>

                  <p className="text-[20px] md:text-[21px] leading-relaxed tracking-wide mt-4">
                    From protecting intellectual property and managing property-related
                    transactions to handling litigation and advising on compliance
                    matters, our team approaches every case with care and attention to
                    detail. By combining deep expertise with clear communication, we
                    ensure that our clients receive reliable advice, effective
                    representation, and solutions tailored to their unique requirements.
                  </p>
                </div>
              </div>
            </div>
          </section>


      
      <Footer />
    </>
  );
};

export default Practice;
