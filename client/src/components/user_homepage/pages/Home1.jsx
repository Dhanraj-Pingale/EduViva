import React from "react";

const Home = () => {
  const user = {
    name: "John Doe",
    role: "Student",
    profileImage:
      "https://via.placeholder.com/150", // Replace this URL with the user's profile image
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* User Info Section */}
        <div className="flex items-center space-x-6 border-b pb-6 mb-6">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to EDUVIVA
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Simplifying vivas and assessments with AI-powered solutions.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="/user/guideline"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              View Guidelines
            </a>
            <a
              href="/user/give-viva"
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Give a Viva
            </a>
            <a
              href="/user/report-issue"
              className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Report an Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
