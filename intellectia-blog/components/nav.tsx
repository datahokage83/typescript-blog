
// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import type { NextPage } from "next";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import {
//   mobileNavContainerVariant,
//   mobileNavListVariant,
//   mobileNavExitProps,
// } from "../data/animationConfig";
// import Image from "next/image";


// export type NavType = {
//   className?: string;
//   logoURL?: string;
// };

// const links = [
//   { href: "/AboutUs", text: "About" },
//   { href: "/Blogs", text: "Resources" },
//   { href: "/Practices", text: "Practices" },
//   { href: "/Sectors", text: "Sectors" },
//   { href: "/ContactUs", text: "Contact Us" },  
// ];

// const Nav: NextPage<NavType> = ({ className = "", logoURL }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   // const imageUrl = logoURL || "/default-logo.png";
//   const imageUrl =
//   logoURL?.startsWith("http")
//     ? logoURL
//     : logoURL
//     ? "https://typescript-blog-backend.onrender.com" + logoURL
//     : "/default-logo.png";


//   // Ensure Framer Motion only runs on client to prevent hydration issues
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const toggleNavbar = () => setIsOpen(!isOpen);

//   return (
//     <div
//       className={`flex dark:bg-gray-800 flex-wrap items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 text-left text-5xl font-dm-sans ${className}`}
//     >
//       {/* Logo */}
//       <div className="flex flex-col items-start justify-start p-2 box-border">
//         <div className="w-119xl text-bold flex-1 relative">
//           <Link href="/" className="cursor-pointer">
//             {/* <img src={logoURL} className="logo-image" alt="Logo" /> */}
//             <Image
//               src={imageUrl || "/default-logo.png"} 
//               alt="Logo"
//               width={160}           
//               height={60}           
//               className="logo-image w-auto h-auto"
//               priority  
//               unoptimized            
//             />

//           </Link>
//         </div>
//       </div>

//       {/* Desktop Menu */}
//       <div className="w-1/2 self-stretch flex-row items-start justify-between gap-[60px] text-3xl mhidden md1">
//         <div className="flex-1 relative">
//           <ul className="flex justify-end py-12 rounded-sm">
//             {links.map((p) => (
//               <li className="pr-[2.5rem] li-bulletremove" key={p.href}>
//                 {isClient ? (
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     variants={mobileNavListVariant}
//                     {...mobileNavExitProps}
//                   >
//                     <Link href={p.href} className="li-a">
//                       {p.text}
//                     </Link>
//                   </motion.div>
//                 ) : (
//                   <div>
//                     <Link href={p.href} className="li-a">
//                       {p.text}
//                     </Link>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Mobile Toggle Button */}
//       <div className="flex flex-wrap justify-end mhidden">
//         <button className="bg-gray-800 text-gray-100" onClick={toggleNavbar}>
//           {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence mode="wait">
//         {isOpen && (
//           <motion.div
//             layout="position"
//             key="nav-links"
//             variants={mobileNavContainerVariant}
//             initial="hidden"
//             animate="show"
//             className="mt-6 basis-full mhidden"
//           >
//             <ul>
//               {links.map((p) => (
//                 <li className="pl-[2.5rem] li-bulletremove" key={p.href}>
//                   {isClient ? (
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       variants={mobileNavListVariant}
//                       {...mobileNavExitProps}
//                     >
//                       <Link href={p.href} className="li-a">
//                         {p.text}
//                       </Link>
//                     </motion.div>
//                   ) : (
//                     <div>
//                       <Link href={p.href} className="li-a">
//                         {p.text}
//                       </Link>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Nav;


"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  mobileNavContainerVariant,
  mobileNavListVariant,
  mobileNavExitProps,
} from "../data/animationConfig";
import Image from "next/image";

// ⭐ Local Logo Import
import intellectiaLogo from "@/public/images/intellectia.png";

export type NavType = {
  className?: string;
};

const links = [
  { href: "/AboutUs", text: "About" },
  { href: "/Blogs", text: "Resources" },
  { href: "/Practices", text: "Practices" },
  { href: "/Sectors", text: "Sectors" },
  { href: "/ContactUs", text: "Contact Us" },
];

const Nav: NextPage<NavType> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Run animations on client only
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`flex dark:bg-gray-800 flex-wrap items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 text-left text-5xl font-dm-sans ${className}`}
    >
      {/* Logo */}
      <div className="flex flex-col items-start justify-start p-2 box-border">
        <div className="w-119xl text-bold flex-1 relative">
          <Link href="/" className="cursor-pointer">
            <Image
              src={intellectiaLogo}
              alt="Logo"
              width={160}
              height={60}
              className="logo-image w-auto h-auto"
              priority
            />
          </Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="w-1/2 self-stretch flex-row items-start justify-between gap-[60px] text-3xl mhidden md1">
        <div className="flex-1 relative">
          <ul className="flex justify-end py-12 rounded-sm">
            {links.map((p) => (
              <li className="pr-[2.5rem] li-bulletremove" key={p.href}>
                {isClient ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    variants={mobileNavListVariant}
                    {...mobileNavExitProps}
                  >
                    <Link href={p.href} className="li-a">
                      {p.text}
                    </Link>
                  </motion.div>
                ) : (
                  <Link href={p.href} className="li-a">
                    {p.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Button */}
      <div className="flex flex-wrap justify-end mhidden">
        <button className="bg-gray-800 text-gray-100" onClick={toggleNavbar}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            layout="position"
            key="nav-links"
            variants={mobileNavContainerVariant}
            initial="hidden"
            animate="show"
            className="mt-6 basis-full mhidden"
          >
            <ul>
              {links.map((p) => (
                <li className="pl-[2.5rem] li-bulletremove" key={p.href}>
                  {isClient ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      variants={mobileNavListVariant}
                      {...mobileNavExitProps}
                    >
                      <Link href={p.href} className="li-a">
                        {p.text}
                      </Link>
                    </motion.div>
                  ) : (
                    <Link href={p.href} className="li-a">
                      {p.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
