import Link from "next/link";
import Image from 'next/image';
import React from "react";
const BlogCardImg = ({ BlogData }: any) => {
    let ID = BlogData.id;
    const imageUrl = "https://typescript-blog-backend.onrender.com" + BlogData.attributes.cover.data.attributes.url;
    console.log(ID)
    return (
        <div className="rounded-lg shadow-md p-4 mb-4 overflow-hidden border border-gray-600 cursor-pointer">
            <Link href={"/Blogs/" + ID}>
                <div className="relative h-auto max-w-full" style={{ paddingBottom: "100%" }}>
                    <Image
                        priority
                        layout="fill"
                        src={imageUrl}
                        alt={""}
                        className="rounded-t-lg"
                    />
                </div>
                <div className="p-2">
                    <h2 className="text-xl font-semibold mb-2 overflow-ellipsis">
                        {BlogData.attributes.title}
                    </h2>
                </div>
            </Link>
            <p className="text-gray-600">{BlogData.attributes.ShortDesc}</p>
        </div>
    )
}
export default BlogCardImg;