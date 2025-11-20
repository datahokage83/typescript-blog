// 'use client';

// import Nav from "@/components/nav";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Footer from "@/components/Footer/Footer";


// const styles = {
//   container: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
//   title: "text-4xl md:text-5xl font-dm-serif-display font-bold text-center text-gray-900 mb-8 leading-tight",
//   meta: "max-w-3xl mx-auto px-4 text-left text-gray-500 text-sm mb-12",
//   content: "max-w-3xl mx-auto px-4 text-gray-800",
//   paragraph: "text-lg leading-relaxed mb-6 text-gray-700",
//   imageContainer: "my-12 w-full flex justify-center",
//   imageWrapper: "w-full max-w-[800px] rounded-xl overflow-hidden shadow-lg",
//   image: "rounded-xl shadow-md object-cover w-full h-auto transition-transform duration-300 hover:scale-[1.02]",
//   link: "text-blue-600 underline hover:text-blue-800 transition-colors",
// };


// const RenderContent = (content: any[]) => {
//   return content.map((block, i) => {
//     if (block.type === "paragraph") {
//       return (
//         <motion.div
//           key={`block-${i}`}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.1, duration: 0.3 }}
//           className="text-lg text-gray-700 leading-8 mb-6 max-w-3xl mx-auto px-4"
//         >
//           {block.children.map((child: any, j: number) => {
//             if (child.type === "text") {
//               return (
//                 <span className="blog-content" key={`text-${i}-${j}`}>
//                   {child.text}
//                 </span>
//               );
//             }

//             if (child.type === "link") {
//               return (
//                 <a
//                   key={`link-${i}-${j}`}
//                   href={child.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline hover:text-blue-800 transition-colors blog-content"
//                 >
//                   {child.children?.[0]?.text || "Link"}
//                 </a>
//               );
//             }

//             return null;
//           })}
//         </motion.div>
//       );
//     }

//     if (block.type === "image") {
//       const { url, width, height } = block.image;
//       return (
//         <motion.div
//           key={`image-${i}`}
//           className="my-10 w-full flex justify-center"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <div className="blog-image-container">
//             <div className="blog-image-wrapper">
//               <Image
//                 src={url}
//                 alt={block.name || "Image"}
//                 width={600}
//                 height={400}
//                 className="blog-image"
//                 priority
//               />
//             </div>
//           </div>
//         </motion.div>
//       );
//     }

//     return null;
//   });
// };
// const Page = async ({ strapiData, blog }: any) => {
  
//   const { Title } = strapiData.data.attributes;
//   const { title, content, cover } = blog.data.attributes;
//   const imageUrl = "https://typescript-blog-backend.onrender.com" + cover?.data?.attributes?.url;

//   return (
//     <>
     
//       <motion.div
//         className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="blog-content">
//           {title}
//         </h1>
//         <br></br>
//         <br></br>
//         <div className="blog-meta">
//           Published on <strong>23-23-2342</strong>
//         </div>
//         <div className="blog-image-container">
//   <div className="blog-image-wrapper">
//         {imageUrl && (
//           <div className="flex justify-center my-8">
         
//             <Image
//               src={imageUrl}
//               alt=""
//               width={600}
//               height={400}
//               className="blog-image"
//               priority
//             />
           
//             </div>

//         )}
//  </div>
//  </div>
//         <div className="prose prose-lg text-gray-800 max-w-3xl mx-auto px-6 font-dm-sans text-left">
//           {RenderContent(content)}
//         </div>

        
//       </motion.div>
//     </>
//   );
// };

// export default Page;

// 'use client';

// import Nav from "@/components/nav";
// import Image from "next/image";
// import { motion } from "framer-motion";

// const styles = {
//   container: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
//   title:
//     "text-4xl md:text-5xl font-dm-serif-display font-bold text-center text-gray-900 mb-8 leading-tight",
//   meta: "max-w-3xl mx-auto px-4 text-left text-gray-500 text-sm mb-12",
//   content: "max-w-3xl mx-auto px-4 text-gray-800",
//   paragraph: "text-lg leading-relaxed mb-6 text-gray-700",
//   imageContainer: "my-12 w-full flex justify-center",
//   imageWrapper:
//     "w-full max-w-[800px] rounded-xl overflow-hidden shadow-lg",
//   image:
//     "rounded-xl shadow-md object-cover w-full h-auto transition-transform duration-300 hover:scale-[1.02]",
//   link: "text-blue-600 underline hover:text-blue-800 transition-colors",
// };

// const RenderContent = (content: any[]) => {
//   return content.map((block, i) => {
//     if (block.type === "paragraph") {
//       return (
//         <motion.div
//           key={`block-${i}`}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.1, duration: 0.3 }}
//           className="text-lg text-gray-700 leading-8 mb-6 max-w-3xl mx-auto px-4"
//         >
//           {block.children.map((child: any, j: number) => {
//             if (child.type === "text") {
//               return (
//                 <span className="blog-content" key={`text-${i}-${j}`}>
//                   {child.text}
//                 </span>
//               );
//             }

//             if (child.type === "link") {
//               return (
//                 <a
//                   key={`link-${i}-${j}`}
//                   href={child.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline hover:text-blue-800 transition-colors blog-content"
//                 >
//                   {child.children?.[0]?.text || "Link"}
//                 </a>
//               );
//             }

//             return null;
//           })}
//         </motion.div>
//       );
//     }

//     if (block.type === "image") {
//       const { url } = block.image;
//       return (
//         <motion.div
//           key={`image-${i}`}
//           className="my-10 w-full flex justify-center"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <div className="blog-image-container">
//             <div className="blog-image-wrapper">
//               <Image
//                 src={url}
//                 alt={block.name || "Image"}
//                 width={600}
//                 height={400}
//                 className="blog-image"
//                 priority
//               />
//             </div>
//           </div>
//         </motion.div>
//       );
//     }

//     return null;
//   });
// };

// const Page = ({ strapiData, blog }: any) => {
//   const { Title } = strapiData.data.attributes;
//   const { title, content, cover } = blog.data.attributes;
//   const imageUrl =
//     "https://typescript-blog-backend.onrender.com" + cover?.data?.attributes?.url;

//   return (
//     <>
//       <motion.div
//         className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="blog-content">{title}</h1>

//         <br />
//         <br />

//         <div className="blog-meta">
//           Published on <strong>23-23-2342</strong>
//         </div>

//         {imageUrl && (
//           <div className="flex justify-center my-8">
//             <Image
//               src={imageUrl}
//               alt={title}
//               width={600}
//               height={400}
//               className="blog-image"
//               priority
//             />
//           </div>
//         )}

//         <div className="prose prose-lg text-gray-800 max-w-3xl mx-auto px-6 font-dm-sans text-left">
//           {RenderContent(content)}
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default Page;

// 'use client';

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Mail } from "lucide-react";
// import { FaLinkedinIn, FaFacebookSquare, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";


// const Page = ({ strapiData, blog }: any) => {
//   const { Title } = strapiData.data.attributes;
//   const { title, content, cover } = blog.data.attributes;
//   const imageUrl = "https://typescript-blog-backend.onrender.com" + cover?.data?.attributes?.url;

//   const RenderContent = (content: any[]) => {
//     return content.map((block, i) => {
//       if (block.type === "paragraph") {
//         return (
//           <motion.p
//             key={`para-${i}`}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1, duration: 0.3 }}
//             className="text-[18px] text-gray-800 leading-8 mb-6 font-dm-sans"
//           >
//             {block.children.map((child: any, j: number) => {
//               if (child.type === "text") return <span key={j}>{child.text}</span>;
//               if (child.type === "link")
//                 return (
//                   <a
//                     key={j}
//                     href={child.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-green-700 hover:text-green-900 underline transition-colors"
//                   >
//                     {child.children?.[0]?.text || "Link"}
//                   </a>
//                 );
//               return null;
//             })}
//           </motion.p>
//         );
//       }
//       return null;
//     });
//   };

//   return (
//     <motion.section
//       className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Left Content Section */}
//       <div>
//         <motion.h1
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="font-dm-sans text-4xl md:text-19xl font-semibold text-gray-800 leading-tight mb-6 cursor-pointer "
//         >
//           {title}
//         </motion.h1>

//         {/* Cover Image below content */}
//         {imageUrl && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.98 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-center mt-10"
//           >
//             <Image
//               src={imageUrl}
//               alt={title}
//               width={900}
//               height={500}
//               className=" object-cover"
//               priority
//             />
//           </motion.div>
//         )}

//         <div className="font-dm-sans text-gray-600 text-md mb-10 mt-8">
//           Press releases | <span className=" font-medium">07 August 2025</span>
//         </div>

//         <div className="flex flex-col  mt-4 mb-6 text-gray-500">

//           <div>
//           <p className="text-gray-400 text-3xl mb-4"> Share to :</p>
//           </div>
//         <div className="flex flex-row gap-4">
//         <a
//           href="https://wa.me/?text=Check%20out%20this%20blog!"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="p-2 border text-gray-800 border-gray-800 rounded-full hover:bg-gray-800 hover:text-gray-100 transition-colors duration-200 flex items-center justify-center"
//         >
//           <FaWhatsapp size={20} />
//         </a>

//         <a
//           href="https://www.instagram.com/"
//           target="_blank"
//           rel="noopener noreferrer"
//            className="p-2 border text-gray-800  border-gray-800 rounded-full  hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
//         >
//           <FaInstagram  size={20} />
//         </a>
//         <a
//           href="https://www.facebook.com/sharer/sharer.php?u=https://yourblogurl.com"
//           target="_blank"
//           rel="noopener noreferrer"
//            className="p-2 border text-gray-800  border-gray-800 rounded-full  hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
//         >
//           <FaFacebookSquare  size={20} />
//         </a>
//         <a
//           href="https://twitter.com/intent/tweet?url=https://yourblogurl.com"
//           target="_blank"
//           rel="noopener noreferrer"
//            className="p-2 border text-gray-800  border-gray-800 rounded-full  hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
//         >
//           <FaXTwitter  size={20} />
//         </a>
//         <a
//           href="https://www.linkedin.com/shareArticle?url=https://yourblogurl.com"
//           target="_blank"
//           rel="noopener noreferrer"
//            className="p-2 border text-gray-800  border-gray-800 rounded-full  hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
//         >
//           <FaLinkedinIn  size={20} />
//         </a>
//         </div>
//       </div>

//         <div className="prose prose-lg text-gray-800 font-dm-sans max-w-none">
//           {RenderContent(content)}
//         </div>
        
//       </div>

//       {/* Right Sidebar (Press Contact) */}
//       <aside className="lg:pl-6 mt-2">
//         <h2 className="text-5xl font-dm-sans font-thin text-gray-900 mt-0 md:mt-16 mb-4">
//           Press contacts
//         </h2>

//         <div className="bg-gray-200 p-8 shadow-sm">
//           <div className="flex justify-center mb-4">
//             <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="white"
//                 viewBox="0 0 24 24"
//                 width="48"
//                 height="48"
//               >
//                 <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zM12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
//               </svg>
//             </div>
//           </div>
//           <div className="text-center font-dm-sans">
//             <h3 className="text-gray-900 font-semibold text-lg">
//               Kathleen Dailey
//             </h3>
//             <p className="text-gray-600 text-sm mb-3">
//               Public Relations Manager
//             </p>
//             <div className="flex items-center justify-center gap-2 text-gray-800 hover:text-blue-900 font-medium cursor-pointer">
//               <Mail className="w-4 h-4" />
//               <span>Email me</span>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </motion.section>
//   );
// };

// export default Page;


'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import {
  FaLinkedinIn,
  FaFacebookSquare,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import BlogCard from "@/components/BlogCard";
import BlogThumbnail from "./BlogThumbnail";

const Page = ({ strapiData, blog }: any) => {
  const { Title } = strapiData?.data?.attributes || {};
  const { title, content, cover } = blog?.data?.attributes || {};
  const imageUrl =
    "https://typescript-blog-backend.onrender.com" + (cover?.data?.attributes?.url || "");

  const [blogData, setBlogData] = useState<any>(null);

  // ✅ Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://typescript-blog-backend.onrender.com/api/posts?populate=*"
        );
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching Strapi data:", error);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Render Rich Text from Strapi
  const RenderContent = (content: any[]) => {
    if (!Array.isArray(content)) return null;
    return content.map((block, i) => {
      if (block.type === "paragraph") {
        return (
          <motion.p
            key={`para-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="text-[18px] text-gray-800 leading-8 mb-6 font-dm-sans"
          >
            {block.children.map((child: any, j: number) => {
              if (child.type === "text") return <span key={j}>{child.text}</span>;
              if (child.type === "link")
                return (
                  <a
                    key={j}
                    href={child.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-900 underline transition-colors"
                  >
                    {child.children?.[0]?.text || "Link"}
                  </a>
                );
              return null;
            })}
          </motion.p>
        );
      }
      return null;
    });
  };

  return (
    <>
      {/* ========== Blog Info Section ========== */}
      <motion.section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left Content Section */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-dm-sans text-5xl md:text-19xl font-semibold text-gray-800 leading-tight mb-6 cursor-pointer "
        >
          {title}
        </motion.h1>

        {/* Cover Image below content */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-10"
          >
            <Image
              src={imageUrl}
              alt={title}
              width={900}
              height={500}
              className=" object-cover"
              priority
            />
          </motion.div>
        )}

        <div className="font-dm-sans text-gray-600 text-md mb-10 mt-8">
          Press releases | <span className=" font-medium">07 August 2025</span>
        </div>

        <div className="flex flex-col  mt-4 mb-6 text-gray-500">

          <div>
          <p className="text-gray-400 text-3xl mb-4"> Share to :</p>
          </div>
        <div className="flex flex-row gap-4">
        <a
          href="https://wa.me/?text=Check%20out%20this%20blog!"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border text-gray-800 border-gray-800 rounded-full hover:bg-gray-800 hover:text-gray-100 transition-colors duration-200 flex items-center justify-center"
        >
          <FaWhatsapp size={20} />
        </a>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
           className="p-2 border text-gray-800  border-gray-800 rounded-full  hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
        >
          <FaInstagram  size={20} />
        </a>
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=https://yourblogurl.com"
          target="_blank"
          rel="noopener noreferrer"
           className="p-2 border text-gray-800  border-gray-800 rounded-full  hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
        >
          <FaFacebookSquare  size={20} />
        </a>
        <a
          href="https://twitter.com/intent/tweet?url=https://yourblogurl.com"
          target="_blank"
          rel="noopener noreferrer"
           className="p-2 border text-gray-800  border-gray-800 rounded-full  hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
        >
          <FaXTwitter  size={20} />
        </a>
        <a
          href="https://www.linkedin.com/shareArticle?url=https://yourblogurl.com"
          target="_blank"
          rel="noopener noreferrer"
           className="p-2 border text-gray-800  border-gray-800 rounded-full  hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
        >
          <FaLinkedinIn  size={20} />
        </a>
        </div>
      </div>

        <div className="prose prose-lg text-gray-800 font-dm-sans max-w-none">
          {RenderContent(content)}
        </div>
        
      </div>

      {/* Right Sidebar (Press Contact) */}
      <aside className="lg:pl-6 mt-2">
        <h2 className="text-5xl font-dm-sans font-thin text-gray-900 mt-0 md:mt-16 mb-4">
          Press contacts
        </h2>

        <div className="bg-gray-200 p-8 shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="48"
                height="48"
              >
                <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zM12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
              </svg>
            </div>
          </div>
          <div className="text-center font-dm-sans">
            <h3 className="text-gray-900 font-semibold text-lg">
              Kathleen Dailey
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Public Relations Manager
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-800 hover:text-blue-900 font-medium cursor-pointer">
              <Mail className="w-4 h-4" />
              <span>Email me</span>
            </div>
          </div>
        </div>
      </aside>
    </motion.section>

      {/* ========== Next Blogs Section ========== */}
      {/* ========== Next Blogs Section ========== */}
            <motion.section
              className="max-w-full mx-auto px-4 sm:px-6 lg:px-10 py-20 bg-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-17xl md:text-18xl font-normal text-gray-800 mb-8 font-opensans uppercase">
                Recent Articles
              </h2>

              {blogData ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
                  {blogData.data
                    .filter((b: any) => b.id !== blog?.data?.id)
                    .slice(0, 3)
                    .map((b: any) => (
                      <BlogThumbnail key={b.id} BlogData={b} />
                    ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center mt-8">
                  Loading more blogs...
                </p>
              )}
            </motion.section>

    </>
  );
};

export default Page;


