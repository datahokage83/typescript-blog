// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const AccordionSection = () => {
//   const [faqs, setFaqs] = useState<any[]>([]);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   // Fetch FAQs from Strapi
//   useEffect(() => {
//     const fetchFaqs = async () => {
//       try {
//         const res = await fetch("https://typescript-blog-backend.onrender.com/api/faqs"); // ✅ Strapi endpoint
//         const data = await res.json();
//         if (data && data.data) {
//           // Adjust to match Strapi's response structure
//           const formatted = data.data.map((item: any) => ({
//             question: item.attributes.Questions,
//             answer: item.attributes.Answer,
//           }));
//           setFaqs(formatted);
//         }
//       } catch (error) {
//         console.error("Error fetching FAQs:", error);
//       }
//     };

//     fetchFaqs();
//   }, []);

//   const toggleAccordion = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <ul className="space-y-4 text-lg">
//       {faqs.length > 0 ? (
//         faqs.map((item, index) => (
//           <li key={index} className="border-b border-white/20 pb-2">
//             <button
//               onClick={() => toggleAccordion(index)}
//               className="w-full flex justify-between items-center cursor-pointer focus:outline-none"
//             >
//               <span>{item.question}</span>
//               <motion.span
//                 animate={{ rotate: activeIndex === index ? 45 : 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="text-xl"
//               >
//                 +
//               </motion.span>
//             </button>

//             <AnimatePresence initial={false}>
//               {activeIndex === index && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden mt-2 text-base text-gray-400"
//                 >
//                   {item.answer}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </li>
//         ))
//       ) : (
//         <p className="text-gray-400">No FAQs found.</p>
//       )}
//     </ul>
//   );
// };

// export default AccordionSection;

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AccordionSection = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Fetch FAQs from Strapi
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("https://typescript-blog-backend.onrender.com/api/faqs"); // ✅ Strapi endpoint
        const data = await res.json();
        if (data && data.data) {
          // Adjust to match Strapi's response structure
          const formatted = data.data.map((item: any) => ({
            question: item.attributes.Questions,
            answer: item.attributes.Answer,
          }));
          setFaqs(formatted);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ul className="space-y-4 text-lg">
      {faqs.length > 0 ? (
        faqs.map((item, index) => (
          <li key={index} className="border-b border-white/20 pb-2">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center cursor-pointer focus:outline-none"
            >
              <span>{item.question}</span>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-2 text-base text-gray-400"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></motion.div>
              )}
            </AnimatePresence>
          </li>
        ))
      ) : (
        <p className="text-gray-400">No FAQs found.</p>
      )}
    </ul>
  );
};

export default AccordionSection;
