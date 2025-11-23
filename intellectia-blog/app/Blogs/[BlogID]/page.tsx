
import Nav from "@/components/nav";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer/Footer";
import BlogContent from "@/components/BlogContent";

async function fetchBlog(id: number) {
  const baseURL = `https://typescript-blog-backend.onrender.com/api/posts/${id}?populate=*`;
  const response = await fetch(baseURL, { cache: "no-cache" });
  return await response.json();
}

async function getStrapiData(url: string) {
  const baseURL = "https://typescript-blog-backend.onrender.com";
  const response = await fetch(baseURL + url, { cache: "no-cache" });
  return await response.json();
}



const Page = async ({ params }: any) => {
  const strapiData = await getStrapiData("/api/home-page?populate=*");
  const blog = await fetchBlog(params.BlogID);
  const { Title, Logo } = strapiData.data.attributes;
  // const logoURL = "https://typescript-blog-backend.onrender.com" + Logo.data.attributes.url;
  const rawLogo = Logo?.data?.attributes?.url;

  const logoURL = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : "https://typescript-blog-backend.onrender.com" + rawLogo
    : "/logo.png";
    const { title, content, cover } = blog.data.attributes;
  const imageUrl = "https://typescript-blog-backend.onrender.com" + cover?.data?.attributes?.url;

  return (
    <>
      <Nav />
      <br></br>
      <BlogContent strapiData={strapiData} blog={blog}/>
      <Footer/>
    </>
  );
};

export default Page;
