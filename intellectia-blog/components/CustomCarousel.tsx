// 'use client'
// import Carousel from "@/components/Carousel";
// import { NextPage } from "next";
// import Link from "next/link";

//     export type CustomCarousel = {
//         id:any
//       };

// const CustomCarousel : NextPage<CustomCarousel> = ({ id }) => {
//     const imageURL="https://typescript-blog-backend.onrender.com"+id.attributes.url;
// return(
    
//         <div>
//         <img src={imageURL}/> 
//         </div>
    
           
//   )};
// export default CustomCarousel;
'use client'
import { NextPage } from "next";
import Image from "next/image";


export type CustomCarouselProps = {
  id: any; // Ideally, replace `any` with a stricter type
};

const CustomCarousel: NextPage<CustomCarouselProps> = ({ id }) => {
  const imageURL = "https://typescript-blog-backend.onrender.com" + id.attributes.url;

  return (
    // <div>
    //   <img src={imageURL} alt="carousel-item" />
    // </div>
          <div className="w-full h-full">
            <Image
              src={imageURL}
              alt="carousel-item"
              width={1200}     
              height={600}    
              className="object-cover w-full h-full"
            />
    </div>
  );
};

export default CustomCarousel;
