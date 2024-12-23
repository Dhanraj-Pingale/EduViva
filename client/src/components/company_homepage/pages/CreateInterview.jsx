import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import xcel from "../../../assets/Default_Template.xlsx"

const URL = import.meta.env.VITE_PORT_URL;

const CreateInterview = () => {
  const [companyName, setCompanyName] = useState("");
  const [interviewDomain, setInterviewDomain] = useState("");
  const [timeforthinking, settimetothink] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answer: "", difficulty: "easy" },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [isExcelUploaded, setIsExcelUploaded] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  // Fetch CSRF token
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(`${URL}/get-csrf-token`);
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
    setIsExcelUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("interviewDomain", interviewDomain);
    formData.append("timeforthinking", timeforthinking);
    formData.append("questions", JSON.stringify(questions));
    if (excelFile) {
      formData.append("excelFile", excelFile);
    }

    try {
      const response = await axios.post(
        `${URL}/interviewer/createinterview`,
        formData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Viva created successfully!");

      setTimeout(() => {
        navigate("/company/result");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error creating interview. Please try again.");
    }
  };

  const downloadTemplate = async () => {
    try {
      const fileUrl = xcel; // Your file path
      const response = await axios.get(fileUrl, {
        responseType: "arraybuffer", // To get raw data
      });

      // Create a Blob from the response data
      const file = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // MIME type for xlsx
      });

      // Save the file using FileSaver
      saveAs(file, "Default_Template.xlsx");
    } catch (error) {
      console.error("Error downloading the template:", error);
      alert("Failed to download the template. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header with button for template download */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Create New Viva</h2>
        <button
          onClick={downloadTemplate}
          className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow hover:shadow-md transition duration-200"
        >
          Download Excel Template
        </button>
      </div>

      {/* Success and error messages */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg shadow">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Viva Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-indigo-500 transition duration-200"
            required
          />
        </div>

        {/* Interview Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Viva Domain
          </label>
          <input
            type="text"
            value={interviewDomain}
            onChange={(e) => setInterviewDomain(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-indigo-500 transition duration-200"
            required
          />
        </div>

        {/* Time for Thinking */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time for Thinking (in minutes)
          </label>
          <input
            type="number"
            value={timeforthinking}
            onChange={(e) => settimetothink(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-indigo-500 transition duration-200"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Excel File
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
            {isExcelUploaded ? (
              <div className="text-green-600 font-medium">
                {excelFile.name} uploaded successfully.
              </div>
            ) : (
              <label
                htmlFor="cv-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 fill-gray-500"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-gray-600 font-medium">Upload file</span>
                <input
                  id="cv-upload"
                  type="file"
                  className="hidden"
                  onChange={handleExcelUpload}
                  disabled={isExcelUploaded}
                />
              </label>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow hover:shadow-md transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInterview;
