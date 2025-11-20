
'use client';
import { useState, useEffect } from 'react';
// import emailjs from '@emailjs/browser';
import { usePathname } from "next/navigation";
import * as React from "react";
import { Oval } from "react-loader-spinner"; 
import { motion, AnimatePresence } from "framer-motion"; 

interface ApplicationFormProps {
  onClose: () => void;
}



export default function ApplicationForm({ onClose }: ApplicationFormProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [expertise, setExpertise] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [university, setUniversity] = useState('');
  const [batch, setBatch] = useState('');
  const [organization, setOrganization] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = React.useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  const pathname = usePathname();
  if (pathname !== "/ContactUs/Careers") return null;


  
 const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!expertise) newErrors.expertise = "Area of Expertise is required";
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email =
        "Email must be a valid Gmail address (ending with @gmail.com)";
    }

    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!experience.trim()) newErrors.experience = "Experience is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!university.trim()) newErrors.university = "University name is required";
    if (!batch.trim()) newErrors.batch = "Batch year is required";
    if (!organization.trim())
      newErrors.organization = "Current organization is required";
    if (!noticePeriod.trim()) newErrors.noticePeriod = "Notice period is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!selectedFile) newErrors.selectedFile = "Resume upload is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // File upload
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          const maxSize = 5 * 1024 * 1024; // 5MB in bytes
          const allowedExtensions = /(\.pdf|\.docx)$/i;

          const fileNameRegex = /^[A-Za-z]+_Resume\.(pdf|docx)$/i;
  
          if (file.size > maxSize) {
            setError("File size exceeds the 5MB limit. Please choose a smaller file.");
            setSelectedFile(null);
          }else if (!allowedExtensions.test(file.name)) {
          setError("Not a PDF or DOCX. Please upload a file in PDF or DOCX format.");
          setSelectedFile(null);}
          else if (!fileNameRegex.test(file.name)) {
            setError('Invalid file name. Rename as "YourName_Resume.pdf" or ".docx".');
            setSelectedFile(null);
          }
           else {
            setSelectedFile(file);
            setError(""); 
          }
        }
      };
  
      const handleRemoveFile = () => {
        setSelectedFile(null);
        setErrorMessage("");
      };

  // Reset form
  const handleReset = () => {
    setJobTitle("");
    setExpertise("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setExperience("");
    setLocation("");
    setUniversity("");
    setBatch("");
    setOrganization("");
    setNoticePeriod("");
    setDescription("");
    setSelectedFile(null);
  };

  // Upload resume to Strapi
  async function uploadFile(file: File): Promise<{ id: number; url: string }> {
    const formData = new FormData();
    formData.append("files", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`File upload failed: ${errorText}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("Unexpected response from upload API");
    }

    // return data[0].id;
    const uploaded = data[0];

  // ✅ Return both ID and full URL
  return {
    id: uploaded.id,
    url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${uploaded.url}`,
  };
  }

  // Submit form
  const handleSubmit = async () => {
    if (!validate()) return;

    // try {
    //   let fileId = null;

    //   if (selectedFile) {
    //     fileId = await uploadFile(selectedFile);
    //   }
    try {
    let uploadedFileData = null;

    if (selectedFile) {
      // 1️⃣ Upload resume to Strapi
      uploadedFileData = await uploadFile(selectedFile);
    }

      setLoading(true); 

      const formData = {
        jobTitle,
        expertise,
        firstName,
        lastName,
        email,
        phone: `${phone}`,
        experience,
        // yearsOfExperience: experience, 
        location,
        university,
        batch,
        organization,
        noticePeriod,
        description,
        // UploadResume: fileId,
        uploadedFile: uploadedFileData
        ? { id: uploadedFileData.id, url: uploadedFileData.url }
        : null,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/job-application/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: formData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setShowSuccessPopup(true);
      handleReset();
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setErrorMessage(
        error.message || "Failed to send application. Please try again."
      );
      setShowErrorPopup(true);
    }
    finally {
    setLoading(false);
    }
  };

  // Handle field updates
  const handleChange = (field: string, value: string | File | null) => {
    switch (field) {
      case "jobTitle":
        setJobTitle(value as string);
        break;
      case "expertise":
        setExpertise(value as string);
        break;
      case "firstName":
        setFirstName(value as string);
        break;
      case "lastName":
        setLastName(value as string);
        break;
      case "email":
        setEmail(value as string);
        break;
      case "phone":
        setPhone(value as string);
        break;
      case "experience":
        setExperience(value as string);
        break;
      case "location":
        setLocation(value as string);
        break;
      case "university":
        setUniversity(value as string);
        break;
      case "batch":
        setBatch(value as string);
        break;
      case "organization":
        setOrganization(value as string);
        break;
      case "noticePeriod":
        setNoticePeriod(value as string);
        break;
      case "description":
        setDescription(value as string);
        break;
      case "selectedFile":
        setSelectedFile(value as File | null);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

   const dropIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.45 } },
  };



  return (
     <AnimatePresence mode="wait">
      <motion.div
        key="application-form"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="inset-0 flex items-start justify-center font-dm-sans"
      >
    <div className="inset-0 flex  items-start justify-center  font-dm-sans">
      <div className="bg-white w-full max-w-3xl rounded-md shadow-lg relative flex flex-col h-[80vh] overflow-y-auto">

        {loading && (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm overflow-hidden">
                <Oval
                  height={60}
                  width={60}
                  color="#ffffff"
                  secondaryColor="#e0e0e0"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                  ariaLabel="loading"
                />
                
              </div>
            )} 
       
        {showSuccessPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-md p-6 max-w-sm text-center shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Success!</h2>
                <p>Your application was sent successfully.</p>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className=" bg-black text-white px-4 py-2 rounded-md hover:bg-opacity-90 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          
          {showErrorPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-md p-6 max-w-sm text-center shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-red-600">Error</h2>
                <p>{errorMessage}</p>
                <button
                  onClick={() => setShowErrorPopup(false)}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-opacity-90 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}






        <div className="p-6 md:p-8  -mb-10 -ml-3">
          <h3 className="text-lg font-semibold text-black mt-2">Add Experience</h3>
          <p className="text-sm text-gray-500 mt-2">Highlight your previous workplaces on your profile.</p>
        </div>

        {/* Scrollable content */}
        <div className=" px-6 md:px-8 py-6 flex-1 space-y-8 -ml-3 mt-3 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 -mt-1">

            <div>
                <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Job Title</label>
                <select
                  value={jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  className={`w-full border rounded-md py-2 px-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                    errors.jobTitle ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                  }`}>
                  <option value="">Choose Title</option>
                  <option value="Trainee">Trainee</option>
                  <option value="Associate">Associate</option>
                  <option value="Senior Associate">Senior Associate</option>
                  <option value="Group Head">Group Head</option>
                  <option value="Partner">Partner</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Others">Others</option>
                </select>

                {errors.jobTitle && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.jobTitle}</p>}
              </div>


            <div >
                <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Areas of Expertise</label>
                <select
                  value={expertise}
                  onChange={(e) => handleChange('expertise', e.target.value)}
                  className={`w-full border rounded-md px-2 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                  errors.expertise ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                  }`}>
                  <option value="">Select Expertise</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Employment Law">Employment Law</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Dispute Resolution">Dispute Resolution</option>
                  <option value="Tax">Tax</option>
                  <option value="Mergers & Acquistions">Mergers &amp; Acquisitions</option>
                  <option value="Technology Law">Technology Law</option>
                  <option value="Government">Government</option>
                  <option value="Others">Others</option>
                </select>
                {errors.expertise && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.expertise}</p>}
              </div>


            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">First name</label>
              <input
                type="text"
                placeholder="Rajesh"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-[100%] border border-gray-400 rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
               {errors.firstName && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Last name</label>
              <input
                type="text"
                placeholder="Kumar"
                value={lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                  errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}/>
                 {errors.lastName && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.lastName}</p>}
            </div>

            

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Phone</label>
              <div className="flex">
                <span className="flex items-center pl-4 pr-4 rounded-l-md border border-gray-400 bg-black text-xs text-white">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ""))}
                  maxLength={10}
                  className={`w-[90%] border rounded-r-md pl-2 pr-14 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => handleChange('email',  e.target.value.toLowerCase())}
                pattern="[a-z0-9._%+-]+@gmail\.com$"
                className={`w-[100%] border lowercase rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.email && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Years of Experience</label>
              <input
                type="number"
                min="1"
                placeholder="3"
                value={experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                errors.experience ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}/>
                {errors.experience && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.experience}</p>}
            </div>


           <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Current location</label>
              <input
                type="text"
                placeholder="Bengaluru"
                value={location}
                onChange={(e) => handleChange('location', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                errors.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.location && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">College/University Name</label>
              <input
                type="text"
                placeholder="XYZ University"
                value={university}
                onChange={(e) => handleChange('university', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                errors.university ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.university && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.university}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Batch</label>
              <input
                type="number"
                placeholder="2025"
                min="2000"
                max="2099"
                step="1"
                value={batch}
                onChange={(e) => handleChange('batch', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                errors.batch ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.batch && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.batch}</p>}
            </div>

             <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Current Organization</label>
              <input
                type="text"
                placeholder="Acme Corp"
                value={organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                errors.organization ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.organization && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.organization}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Notice Period</label>
              <input
                type="text"
                placeholder="15 days"
                value={noticePeriod}
                onChange={(e) => handleChange('noticePeriod', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                  errors.noticePeriod ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.noticePeriod && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.noticePeriod}</p>}
          
          </div>
          </div>

          
         
          <div>
            <label className="block text-sm font-medium text-black mb-3 text-left ml-1">Upload your Resume</label>
            <div
              className={`w-12/12 border-2 border-dashed rounded-md p-6 text-center text-sm relative ${
                errors.selectedFile ? 'border-red-500' : 'border-gray-400'
              }`}
            >
              {!selectedFile ? (
                <>
                  <p className="mb-2 text-gray-500">{`Choose a file or drag & drop it here.`}</p>
                  <p className="mb-4 text-gray-500">{`pdf, doc, docx, – Up to 5MB`}</p>
                  <p className="mb-4 text-gray-500">{`Please ensure your uploaded resume is named using the format: "YourName_Resume.pdf"`}</p>
                 {error && (
                    <p className="mb-4 text-red-600 text-2xl">{error}</p>
                  )}
                 
                  <label htmlFor="resumeUpload">
                    <span className="bg-black text-white px-4 py-2 rounded-md text-2xl hover:bg-opacity-85 cursor-pointer">
                      Browse Files
                    </span>
                  </label>
                  <input
                    id="resumeUpload"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpeg,.jpg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  <span className="truncate">{selectedFile.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            {errors.selectedFile && (
              <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.selectedFile}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Description</label>
            <textarea
              rows={3}
              placeholder="Describe your experience here!"
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`w-[100%] border rounded-md px-3 py-4 text-sm font-dm-sans resize-none focus:outline-none focus:ring-2 ${
              errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
              }`}
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.description}</p>
            )}
        </div>
        </div>

        {/* Footer buttons */}
        <div className="max-w-[46.5rem] p-6  flex justify-between items-center gap-2">
            {/* Left Side - Close */}
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 rounded-md border-none bg-red-600 cursor-pointer text-white text-2xl hover:bg-opacity-90 font-dm-sans font-medium"
            >
              Close
            </button>

            {/* Right Side - Reset + Submit */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm px-4 py-2 rounded-md border text-2xl border-black cursor-pointer hover:bg-gray-100 font-dm-sans font-medium"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-black text-white text-2xl px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-85 font-dm-sans font-medium"
              >
                Submit
              </button>
            </div>
          </div>


       
      </div>
    </div>
    </motion.div>
    </AnimatePresence>
  );
}
