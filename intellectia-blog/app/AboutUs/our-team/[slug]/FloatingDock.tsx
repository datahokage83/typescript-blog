

"use client";

import { useEffect, useState } from "react";

export default function FloatingDock() {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "education", label: "Education" },
    { id: "related-sectors", label: "Sectors" },
    { id: "languages", label: "Languages" },
  ];

  const [activeSection, setActiveSection] = useState("overview");
  const [showDock, setShowDock] = useState(false); // <-- visibility state

  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0].id;

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            current = sec.id;
          }
        }
      }

      setActiveSection(current);

      // Show dock only if Overview section has reached the top of viewport
      const overviewEl = document.getElementById("overview");
      if (overviewEl) {
        setShowDock(overviewEl.getBoundingClientRect().top <= window.innerHeight / 9);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showDock) return null; // hide dock until Overview is reached

  return (
    <>
      {/* Desktop Dock */}
      <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/70 px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
        <div className="flex gap-4 text-sm font-medium">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
                activeSection === sec.id
                  ? "bg-gray-800 text-white no-underline"
                  : "text-gray-300  no-underline"
              }`}
            >
              {sec.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Dock */}
      <nav className="flex md:hidden fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/70 px-2 py-2 rounded-full shadow-lg backdrop-blur-md">
        <div className="flex gap-1 text-[14px] font-medium">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-2 py-1 rounded-full transition-all duration-300 ${
                activeSection === sec.id
                  ? "bg-gray-800 text-white no-underline"
                  : "text-white no-underline"
              }`}
            >
              {sec.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
