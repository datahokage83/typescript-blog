"use client";

import { AiOutlineFilePdf } from "react-icons/ai";
import { PiMicrosoftWordLogo } from "react-icons/pi";

interface DownloadButtonsProps {
  slug: string;
}

export default function DownloadButtons({ slug }: DownloadButtonsProps) {
  const downloadFile = (type: "pdf" | "docx") => {
    // Redirects to backend API which returns file
    window.location.href = `https://typescript-blog-backend.onrender.com/api/team-members/download?slug=${slug}&type=${type}`;
  };

  return (
    <div className="absolute bottom-4 right-8 flex items-center gap-6">
      <PiMicrosoftWordLogo
        size={45}
        className="cursor-pointer"
        onClick={() => downloadFile("docx")}
      />
      <AiOutlineFilePdf
        size={45}
        className="cursor-pointer"
        onClick={() => downloadFile("pdf")}
      />
    </div>
  );
}
