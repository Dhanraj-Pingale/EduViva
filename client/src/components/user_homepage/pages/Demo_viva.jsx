import React from "react";

const Demo_viva = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Start Your Demo Viva
          </h1>
          <p className="text-gray-600 mt-2">
            Experience a demo viva session and prepare yourself for the real assessment.
          </p>
        </div>

        {/* Start Button */}
        <div className="flex justify-center mb-6">
          <button
            className="bg-blue-600 text-white text-lg px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={() => alert("Starting Demo Viva...")}
          >
            Start a Demo Viva
          </button>
        </div>

        {/* Information Section */}
        <div className="text-gray-700 text-md">
          <h2 className="text-xl font-semibold mb-4">What to Expect:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Simulated viva experience to help you practice and improve.</li>
            <li>Realistic questions tailored to test your understanding.</li>
            <li>Instant feedback to help you analyze your performance.</li>
            <li>Learn how to structure your answers confidently.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Demo_viva;
