'use client';
import { useState,useEffect } from 'react';
// import emailjs from '@emailjs/browser';
import { usePathname } from "next/navigation";
import * as React from "react";
import { Oval } from "react-loader-spinner"; 
import { motion, AnimatePresence } from "framer-motion"; 


interface InternshipFormProps {
  onClose: () => void;
}


export default function InternshipForm({ onClose }: InternshipFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [university, setUniversity] = useState('');
  const [location, setLocation] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [graduationStatus, setGraduationStatus] = useState('');
  const [batch, setBatch] = useState('');
  const [practise,setPractise] = useState('');
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



   function handleChange(field: string, value: string | File) {
      switch (field) {
        case 'firstName':
          setFirstName(value as string);
          break;
        case 'lastName':
          setLastName(value as string);
          break;
        case 'email':
          setEmail(value as string);
          break;
        case 'phone':
          setPhone(value as string);
          break;
        case 'graduationStatus':
          setGraduationStatus(value as string);
          break;
        case 'university':
          setUniversity(value as string);
          break;
        case 'location':
          setLocation(value as string);
          break;
        case 'currentYear':
          setCurrentYear(value as string);
          break;
        case 'batch':
          setBatch(value as string);
          break;
        case 'practise':
          setPractise(value as string);
          break;
        case 'description':
          setDescription(value as string);
          break;
        case 'selectedFile':
          setSelectedFile(value as File);
          break;
      }

      


      // Clear error for this field if value is present
      setErrors((prev) => {
        const copy = { ...prev };
        if (
          (typeof value === 'string' && value.trim() !== '') ||
          (field === 'selectedFile' && value instanceof File)
        ) {
          delete copy[field];
        }
        return copy;
      });
    }



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; 

        const allowedExtensions = /(\.pdf|\.docx)$/i;

         const fileNameRegex = /^[A-Za-z]+_Resume\.(pdf|docx)$/i;

        if (file.size > maxSize) {
          setError("File size exceeds the 5MB limit. Please choose a smaller file.");
          setSelectedFile(null);
        } else if (!allowedExtensions.test(file.name)) {
          setError("Not a PDF or DOCX. Please upload a file in PDF or DOCX format.");
          setSelectedFile(null);}
          else if (!fileNameRegex.test(file.name)) {
            setError('Invalid file name. Rename as "YourName_Resume.pdf" or ".docx".');
            setSelectedFile(null);
          }
           else {
          setSelectedFile(file);
          setError(""); // clear previous error
        }
      }
    };

    const handleRemoveFile = () => {
      setSelectedFile(null);
      setErrorMessage("");
    };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCountryCode('+91');
    setCurrentYear('');
    setGraduationStatus('');
    setLocation('');
    setUniversity('');
    setBatch('');
    setPractise('');
    setDescription('');
    setSelectedFile(null);
  };


// async function uploadFile(file: File): Promise<number> {
//   const formData = new FormData();
//   formData.append('files', file);

//   const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`, {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`File upload failed: ${errorText}`);
//   }

//   const data = await response.json();

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     throw new Error('Unexpected response from upload API');
//   }

//   console.log('Uploaded file response:', data[0]); // For debugging

//   return data[0].id;
// }

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

  const uploaded = data[0];

  // ✅ Return both ID and full URL
  return {
    id: uploaded.id,
    url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${uploaded.url}`,
  };
}




const handleSubmit = async () => {
  const newErrors: { [key: string]: string } = {};

  // Required field checks
  if (!firstName.trim()) newErrors.firstName = "First name is required";
  if (!lastName.trim()) newErrors.lastName = "Last name is required";
  if (!email.trim()) newErrors.email = "Email is required";
  if (!phone.trim()) newErrors.phone = "Phone is required";
  if (!graduationStatus.trim())
    newErrors.graduationStatus = "Graduation status is required";
  if (!university.trim()) newErrors.university = "University name is required";
  if (!location.trim()) newErrors.location = "Location is required";
  if (!currentYear.trim()) newErrors.currentYear = "Current year is required";
  if (!batch.trim()) newErrors.batch = "Batch year is required";
  if (!practise.trim()) newErrors.practise = "Area of expertise is required";
  if (!description.trim()) newErrors.description = "Description is required";
  if (!selectedFile) newErrors.selectedFile = "Resume upload is required";

  // Custom validations
  if (email && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
    newErrors.email = "Email must be a valid gmail address (ending with @gmail.com)";
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    newErrors.phone = "Phone number must be exactly 10 digits";
  }

  // Stop submission if errors exist
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

    setLoading(true); 
    

  // try {
  //   // let uploadedFile = null;
  //   // if (selectedFile) {
  //   //   uploadedFile = await uploadFile(selectedFile);
  //   // }

  //   let uploadedFile = null;
  //     if (selectedFile) {
  //       uploadedFile = await uploadFile(selectedFile);
  //     }

    try {
    let uploadedFileData = null;

    if (selectedFile) {
      // 1️⃣ Upload resume to Strapi
      uploadedFileData = await uploadFile(selectedFile);
    }




    // Prepare payload matching your backend controller field names
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      graduationStatus,
      university,
      location,
      currentYear,
      batch,
      practise,
      description,
      // fileName: fileId,
      // fileUrl: uploadedFile?.url || null, 
      uploadedFile: uploadedFileData
        ? { id: uploadedFileData.id, url: uploadedFileData.url }
        : null,
    };

    // Send form data to Strapi API endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/intership-application/send`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }), // wrap inside `data` key as controller expects
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit internship application");
    }

    await response.json();

    setShowSuccessPopup(true);
    handleReset();
  } catch (error: any) {
    console.error("Error submitting internship application:", error);
    setErrorMessage(
      error.message ||
        "Failed to send internship application. Please try again."
    );
    setShowErrorPopup(true);
  }
  finally {
    setLoading(false);
    }
};

  const dropIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.55 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.55 } },
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

    <div className="inset-0 flex items-start justify-center font-dm-sans">
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
              <div className="bg-white rounded-md p-6 max-w-sm  text-center shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Success!</h2>
                <p>Your internship application was sent successfully.</p>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className=" bg-black text-white px-4 py-2 rounded-md hover:bg-opacity-90 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Error Popup */}
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
          <h3 className="text-lg font-semibold text-black">Internship Application</h3>
          <p className="text-sm text-gray-500 mt-1 ">Fill in your details to apply for an internship.</p>
        </div>

        {/* Scrollable content */}
        <div className="px-6 md:px-8 py-6 flex-1 space-y-8 -ml-3 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 -mt-1">

             <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">First name</label>
              <input
                type="text"
                placeholder="Rajesh"
                value={firstName}
                onChange={e => handleChange('firstName', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm  font-dm-sans  focus:outline-none focus:ring-2 ${
                  errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Last name</label>
              <input
                type="text"
                placeholder="Kumar"
                value={lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans  focus:outline-none focus:ring-2 ${
                  errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.lastName}</p>
              )}
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
                  maxLength={10}
                  onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ""))}
                  className={`w-11/12 border rounded-r-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
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
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => handleChange('email',  e.target.value.toLowerCase())}
                pattern="[a-z0-9._%+-]+@gmail\.com$"
                className={`w-[100%] border lowercase rounded-md pl-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                errors.email ?  ' border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.email && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">
                Graduation Status
              </label>
              <select
                value={graduationStatus}
                onChange={(e) => handleChange('graduationStatus', e.target.value)}
                className={`w-[100%] border rounded-md py-2 px-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                  errors.graduationStatus ? 'border-red-600 focus:ring-red-600' : 'border-gray-400 focus:ring-gray-900'
                }`}
                >
                <option value="">Status</option>
                <option value="Graduated">Graduated</option>
                <option value="Not Graduated">Not Graduated</option>
              </select>
              {errors.graduationStatus && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.graduationStatus}</p>}
         
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Area of Expertise</label>
              <select
               value={practise}
               onChange={(e) => handleChange('practise', e.target.value)}
                className={`w-[100%] border rounded-md px-2 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                  errors.practise ? 'border-red-600 focus:ring-red-600' : 'border-gray-400 focus:ring-gray-900'
                }`}>
                 <option value="">Select Expertise</option>
                <option value="Corporate">Corporate</option>
                <option value="Employment Law">Employment Law</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Dispute Resolutions">Dispute Resolution</option>
                <option value="Tax">Tax</option>
                <option value="Technology Law">Technology Law</option>
                <option value="Government">Government</option>
                <option value="Others">Others</option>
              </select>
              {errors.practise && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.practise}</p>}
           
            </div>

           

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">College/University Name</label>
              <input
                type="text"
                placeholder="XYZ University"
                value={university}
                onChange={(e) => handleChange('university', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                errors.university ? 'border-red-600 focus:ring-red-600' : 'border-gray-400 focus:ring-gray-900'
                }`}
                />
                {errors.university && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.university}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Current location</label>
              <input
                type="text"
                placeholder="Bengaluru"
                value={location}
                 onChange={(e) => handleChange('location', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2  text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                  errors.location ? 'border-red-600 focus:ring-red-600' : 'border-gray-400 focus:ring-gray-900'
                }`}
              />
              {errors.location && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">
                Current Year in Course
              </label>
              <select
                value={currentYear}
                onChange={(e) => handleChange('currentYear', e.target.value)}
                className={`w-[100%] border rounded-md py-2 px-2  text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                  errors.currentYear ? 'border-red-600 focus:ring-red-600' : 'border-gray-400 focus:ring-gray-900'
                }`}>
                <option value="">Select Year</option>
                <option value="Three">Three</option>
                <option value="Four">Four</option>
                <option value="Five">Five</option>
                <option value="Completed">Completed</option>
              </select>
               {errors.currentYear && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.currentYear}</p>}
         
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1.5 text-left ml-1 ">Batch Year</label>
              <input
                type="number"
                placeholder="2025"
                value={batch}
                min="2000"
                max="2099"
                step="1"
                onChange={(e) => handleChange('batch', e.target.value)}
                className={`w-[100%] border rounded-md px-3 py-2  text-sm font-dm-sans focus:outline-none focus:ring-2 ${
                  errors.batch ? 'border-red-600 focus:ring-red-600' : 'border-gray-400 focus:ring-gray-900'
                }`}/>
                 {errors.batch && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.batch}</p>}
            </div>
          </div>

          <div >
            <label className="block text-sm font-medium text-black mb-3 text-left ml-1">Upload your Resume</label>
            <div
              className={`w-[100%] border-2 border-dashed rounded-md p-6 text-center text-sm relative ${
                errors.selectedFile ? 'border-red-600 text-red-600' : 'border-gray-400 text-gray-500'
              }`}
            >
              {!selectedFile ? (
                <>
                  <p className="mb-2 text-gray-500">{`Choose a file or drag & drop it here.`}</p>
                  <p className="mb-4 text-gray-500">{`pdf, doc, docx – Up to 5MB`}</p>
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
                    onClick={handleRemoveFile}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            {errors.selectedFile && <p className="text-red-600 text-xs mt-2 ml-1 text-left">{errors.selectedFile}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-2 text-left ml-1">Description</label>
            <textarea
              rows={3}
              placeholder="Briefly outline your skills, experience, or achievements."
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`w-[100%] border rounded-md px-2 py-4 text-sm font-dm-sans resize-none focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-600 focus:ring-red-600' : 'border-gray-400 focus:ring-gray-900'
              }`}
            />
            {errors.description && <p className="text-red-600 text-xs mt-1 ml-1 text-left">{errors.description}</p>}
         
          </div>
        </div>

        {/* Footer buttons */}
        
         <div className="max-w-[48rem] p-6  flex justify-between items-center gap-2">
            {/* Left Side - Close */}
            <button
              type="button"
              onClick={onClose}
              className="text-2xl px-4 py-2 rounded-md border cursor-pointer bg-red-600 text-white border-none hover:bg-opacity-90 font-dm-sans font-medium"
            >
              Close
            </button>

            {/* Right Side - Reset + Submit */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-2xl px-4 py-2 rounded-md cursor-pointer border border-black hover:bg-gray-100 font-dm-sans font-medium"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-black text-white cursor-pointer text-2xl px-4 py-2 rounded-md hover:bg-opacity-85 font-dm-sans font-medium"
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
