import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate("/slogin");
  };

  const handleUserRegister = () => {
    navigate("/sregister");
  };

  const handleCompanyLogin = () => {
    navigate("/clogin");
  };

  return (
    <main
      className="bg-blue-100 min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header Section */}
      <header className="w-full flex justify-between items-center p-6 bg-transparent">
        <h1 className="text-2xl font-bold text-blue-600">Eduvantage</h1>
        <div className="space-x-4">
          <button
            onClick={handleCompanyLogin}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 w-full"
          >
            Login as Company
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-start px-6 py-12">
        <div className="md:w-1/2 text-left space-y-6 pl-2">
          <h2 className="text-5xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">EduViva</span> <br />
            The new <span className="text-blue-600">AI driven</span> Platform!
          </h2>
          <p className="text-gray-600">
            We are redefining assessments with AI-powered viva solutions,
            connecting talent with opportunities. Our platform enables seamless
            evaluations, supports skill development, and bridges the gap between
            job seekers and industry needs.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8 px-4 sm:px-0">
            {/* Student Card */}
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-xl mb-4 text-blue-600">
                For Students
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Ace AI-powered viva sessions and boost your performance.
              </p>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleUserRegister}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
                >
                  Register as Student
                </button>
                <button
                  onClick={handleUserLogin}
                  className="bg-gray-100 text-blue-500 py-2 px-4 rounded-lg hover:bg-gray-200 hover:text-blue-600 transition duration-300 w-full border border-blue-500"
                >
                  Login as Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white shadow-inner py-4 text-center bg-transparent">
        <p className="text-gray-600 text-sm">
          &copy; 2024 EduViVa. Revolutionizing Assessments. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
