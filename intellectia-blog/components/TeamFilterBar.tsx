// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

// interface TeamFilterBarProps {
//   onFilterChange?: (filters: {
//     search: string;
//     practice: string;
//     sector: string;
//     position: string;
//   }) => void;
// }

// interface DropdownProps {
//   label: string;
//   value: string;
//   options: { label: string; value: string }[];
//   onChange: (value: string) => void;
//   open: boolean;
//   onToggle: () => void;
//   dropdownRef: React.RefObject<HTMLDivElement>;
// }

// const Dropdown: React.FC<DropdownProps> = ({
//   label,
//   value,
//   options,
//   onChange,
//   open,
//   onToggle,
//   dropdownRef,
// }) => {
//   const selectedLabel =
//     options.find((opt) => opt.value === value)?.label || label;

//   return (
//     <div ref={dropdownRef} className="relative w-full md:w-1/4">
//       <button
//         type="button"
//         onClick={onToggle}
//         className="w-full font-opensans text-[17px] bg-gray-800 text-gray-100 px-5 py-4 text-left flex justify-between items-center hover:bg-gray-700 transition tracking-wide"
//       >
//         {selectedLabel}
//         {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//       </button>

//       {open && (
//         <div className="absolute w-full text-left z-20 bg-gray-200  border-none">
//           {options.map((opt) => (
//             <div
//               key={opt.value}
//               onClick={() => {
//                 onChange(opt.value);
//                 onToggle(); // close when selecting
//               }}
//               className={`px-5 py-3 text-gray-700 font-opensans cursor-pointer hover:bg-black/35 hover:text-black transition ${
//                 value === opt.value ? "bg-gray-400" : ""
//               }`}
//             >
//               {opt.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const TeamFilterBar: React.FC<TeamFilterBarProps> = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     search: "",
//     practice: "",
//     sector: "",
//     position: "",
//   });

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//   // 🔹 Refs for dropdowns to detect outside click
//   const practiceRef = useRef<HTMLDivElement>(null);
//   const sectorRef = useRef<HTMLDivElement>(null);
//   const positionRef = useRef<HTMLDivElement>(null);

//   const handleChange = (key: string, value: string) => {
//     const newFilters = { ...filters, [key]: value };
//     setFilters(newFilters);
//     onFilterChange?.(newFilters);
//   };

//   const toggleDropdown = (key: string) => {
//     setOpenDropdown((prev) => (prev === key ? null : key));
//   };

//   // 🔹 Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         practiceRef.current &&
//         !practiceRef.current.contains(event.target as Node) &&
//         sectorRef.current &&
//         !sectorRef.current.contains(event.target as Node) &&
//         positionRef.current &&
//         !positionRef.current.contains(event.target as Node)
//       ) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-24 px-4">
//       {/* Search Input */}
//       <div className="relative w-full md:w-1/3">
//         <input
//           type="text"
//           placeholder="Name"
//           value={filters.search}
//           onChange={(e) => handleChange("search", e.target.value)}
//           className="bg-gray-200 text-gray-800 font-opensans text-[17px] w-full px-4 py-4 pr-12 border-2 border-gray-800 outline-none focus:ring-0 focus:border-gray-800 rounded-none"
//         />
//         <button
//           onClick={() => console.log("Search:", filters.search)}
//           className="bg-gray-800 absolute right-0 top-0 h-full border-none px-4 text-gray-100 hover:bg-opacity-95 transition outline-none focus:ring-0"
//         >
//           <ArrowRight size={22} />
//         </button>
//       </div>

//       {/* Practice Filter */}
//       <Dropdown
//         label="Practices"
//         value={filters.practice}
//         onChange={(value) => handleChange("practice", value)}
//         open={openDropdown === "practice"}
//         onToggle={() => toggleDropdown("practice")}
//         dropdownRef={practiceRef}
//         options={[
//           { label: "Employment", value: "Employment" },
//           { label: "Intellectual Property", value: "Intellectual Property (IP)" },
//           { label: "Disputes", value: "Disputes" },
//           { label: "Property Law", value: "Property Law" },
//         ]}
//       />

//       {/* Sector Filter */}
//       <Dropdown
//         label="Sectors"
//         value={filters.sector}
//         onChange={(value) => handleChange("sector", value)}
//         open={openDropdown === "sector"}
//         onToggle={() => toggleDropdown("sector")}
//         dropdownRef={sectorRef}
//         options={[
//           { label: "Real Estate", value: "Real Estate" },
//           { label: "Banking", value: "Banking" },
//           { label: "Healthcare", value: "Healthcare" },
//           { label: "Technology", value: "Technology" },
//           { label: "Corporate", value: "Corporate" },
//            { label: "Employment & Labour", value: "Employment & Labour" },
//         ]}
//       />

//       {/* Position Filter */}
//       <Dropdown
//         label="Positions"
//         value={filters.position}
//         onChange={(value) => handleChange("position", value)}
//         open={openDropdown === "position"}
//         onToggle={() => toggleDropdown("position")}
//         dropdownRef={positionRef}
//         options={[
//           { label: "Managing Partner", value: "Managing Partner" },
//           { label: "Senior Partner", value: "Senior Partner" },
//           { label: "Junior Partner", value: "Junior Partner" },
//           { label: "Senior Counsel", value: "Senior Counsel" },
//           { label: "Associate", value: "Associate" },
//           { label: "Legal Secretary", value: "Legal Secretary" },
//           { label: "Associate Attorney", value: "Associate attorney" },
//           { label: "Paralegal", value: "Paralegal" },
//           { label: "Compliance Officer", value: "Compliance Officer" },
//           { label: "Legal Analyst", value: "Legal Analyst" },
//         ]}
//       />
//     </div>
//   );
// };

// export default TeamFilterBar;


"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

interface TeamFilterBarProps {
  onFilterChange?: (filters: {
    search: string;
    practice: string;
    sector: string;
    position: string;
  }) => void;
}

interface DropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  open: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  open,
  onToggle,
  dropdownRef,
}) => {
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || label;

  return (
    <div ref={dropdownRef} className="relative w-full md:w-1/3">
      <button
        type="button"
        onClick={onToggle}
        className="w-full font-opensans text-[17px] bg-gray-800 text-gray-100 px-5 py-4 text-left flex justify-between items-center hover:bg-gray-700 transition tracking-wide"
      >
        {selectedLabel}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && (
        <div className="absolute w-full text-left z-20 bg-gray-200 border-none shadow-md">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                onToggle(); // close dropdown when selecting
              }}
              className={`px-5 py-3 text-gray-700 font-opensans cursor-pointer hover:bg-black/35 hover:text-black transition ${
                value === opt.value ? "bg-gray-400" : ""
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TeamFilterBar: React.FC<TeamFilterBarProps> = ({ onFilterChange }) => {
  // 🔹 Local filters (typed values)
  const [filters, setFilters] = useState({
    search: "",
    practice: "",
    sector: "",
    position: "",
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // 🔹 Refs for dropdowns to detect outside click
  const practiceRef = useRef<HTMLDivElement>(null);
  const sectorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);

  // const handleInputChange = (key: string, value: string) => {
  //   setFilters((prev) => ({ ...prev, [key]: value }));
  // };

   const handleInputChange = (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));

      // If the search box is cleared, show all members again
      if (key === "search" && value.trim() === "") {
        onFilterChange?.({
          ...filters,
          [key]: "",
        });
      }
    };

  const handleDropdownChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters); // Apply immediately for dropdowns
  };

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  // 🔹 Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !practiceRef.current?.contains(event.target as Node) &&
        !sectorRef.current?.contains(event.target as Node) &&
        !positionRef.current?.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔹 Trigger search manually
  const handleSearchClick = () => {
    onFilterChange?.(filters);
  };


 


  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-24 px-4">
      {/* Search Input */}
      <div className="relative w-full md:w-1/3">
       <input
            type="text"
            placeholder="Search by Name"
            value={filters.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            className="bg-gray-200 text-gray-800 placeholder-gray-500 font-opensans text-[17px] w-full px-4 py-4 border-2 border-gray-800 outline-none focus:ring-0 focus:border-gray-800 rounded-none"
          />

      </div>

      {/* Practice Filter */}
      <Dropdown
        label="Practices"
        value={filters.practice}
        onChange={(value) => handleDropdownChange("practice", value)}
        open={openDropdown === "practice"}
        onToggle={() => toggleDropdown("practice")}
        dropdownRef={practiceRef}
        options={[
          { label: "Workplace Law", value: "Employment" },
          { label: "Intellectual Property", value: "Intellectual Property (IP)" },
          { label: "Disputes", value: "Disputes" },
          { label: "Property Law", value: "Property Law" },
        ]}
      />

      {/* Sector Filter */}
      <Dropdown
        label="Sectors"
        value={filters.sector}
        onChange={(value) => handleDropdownChange("sector", value)}
        open={openDropdown === "sector"}
        onToggle={() => toggleDropdown("sector")}
        dropdownRef={sectorRef}
        options={[
          { label: "Real Estate", value: "Real Estate" },
          { label: "Banking", value: "Banking" },
          { label: "Healthcare", value: "Healthcare" },
          { label: "Technology", value: "Technology" },
          { label: "Corporate", value: "Corporate" },
          { label: "Employment", value: "Employment & Labour" },
        ]}
      />

      {/* Position Filter */}
      <Dropdown
        label="Positions"
        value={filters.position}
        onChange={(value) => handleDropdownChange("position", value)}
        open={openDropdown === "position"}
        onToggle={() => toggleDropdown("position")}
        dropdownRef={positionRef}
        options={[
          { label: "Managing Partner", value: "Managing Partner" },
          { label: "Senior Partner", value: "Senior Partner" },
          { label: "Junior Partner", value: "Junior Partner" },
          { label: "Senior Counsel", value: "Senior Counsel" },
          { label: "Associate", value: "Associate" },
          { label: "Legal Secretary", value: "Legal Secretary" },
          { label: "Associate Attorney", value: "Associate attorney" },
          { label: "Paralegal", value: "Paralegal" },
          { label: "Compliance Officer", value: "Compliance Officer" },
          { label: "Legal Analyst", value: "Legal Analyst" },
        ]}
      />

      {/* 🔹 Manual Search Button */}
      <button
            onClick={() => onFilterChange?.(filters)}
            className="w-full md:w-1/4 bg-gray-800 text-white text-left px-6 py-4 font-opensans hover:bg-gray-700 transition"
          >
            Search
          </button>

    </div>
  );
};

export default TeamFilterBar;
