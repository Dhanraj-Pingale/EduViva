import React from "react";
import { useNavigate } from "react-router-dom";

const VivaEnd = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/user/home"); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
      {/* Content Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Viva Session Ended</h1>
        <p className="text-gray-600 mb-6">
          Thank you for participating in the viva session. We appreciate your efforts and wish you the best of luck!
        </p>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
        >
          ← Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default VivaEnd;
