import React, { useState } from "react";
import "./step.css";
import { TiTick } from "react-icons/ti";
import InputField from "components/fields/InputField";

export default function NewProduct() {
  const steps = ["Info Barang", "Media", "Harga", "Konfirmasi"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

  // Function to handle text input change
  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };
  
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Function to handle "Next" or "Finish" button click
  const handleNextOrFinish = async () => {
    if (currentStep === steps.length) {
      // Post data when Finish button is clicked
      try {
        // Perform HTTP request to post data to backend
        const response = await fetch("your_backend_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerName: textInput }), // Example: Sending customer name as data
        });
        if (response.ok) {
          setComplete(true); // Set complete to true when the data is successfully posted
        } else {
          // Handle error response from server
          console.error("Failed to post data:", response.statusText);
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error.message);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className=" flex flex-col items-center pt-2 lg:pt-2 relative">
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }`}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      {/* Text input field */}
      {currentStep === 1 && (
        <div className="mb-4 w-full mx-auto mt-20">
          <label className="ml-3 block font-sans text-gray-700 font-bold mb-2" for="text">
            Nama Barang
          </label>
          <input 
          className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-500"
          id="email"
          type="email"
          placeholder="contoh: Kue Salju">
          </input>

          <label className="ml-3 block font-sans text-gray-700 font-bold mb-2" for="text">
            Deskripsi
          </label>
          <textarea 
          className="h-40 px-3 text-sm py-1 outline-none border-gray-500 w-full resize-none border rounded placeholder:text-sm" 
          placeholder="Tambahkan deskripsi"></textarea>  
     </div>
      )}

      {currentStep === 2 && (
        
        <div className="w-full h-full flex bg-black bg-opacity-60">
      <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
        <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" style={{ width: '450px' }}>
          <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <img src={file} alt="" />
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input className="text-sm cursor-pointer w-36 hidden" type="file" onChange={handleChange}/>
              <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
            </label>
            <div className="title text-indigo-500 uppercase">or drop files here</div>
          </div>
        </div>
      </div>
    </div>
      )}

      {/* Next or Finish button */}
      {!complete && (
        <div className="flex flex-row justify-between w-full">
        {currentStep !== 1 && (
          <button className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90" onClick={handlePrev}>
            Previous
          </button>
        )}
        {currentStep === 1 && (
          <button className="pointer-events-none linear rounded-[20px] bg-brand-100 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90" onClick={handlePrev}>
            Previous
          </button>
        )}
        <button
          onClick={handleNextOrFinish}
          className=" linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
      
      )}

      {/* Success message */}
      {complete && (
        <p className="text-green-500 mt-4">Success! Your product has been submitted.</p>
      )}
    </div>
  );
}
