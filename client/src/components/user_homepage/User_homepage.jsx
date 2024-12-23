import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Home from "./pages/home";
import { useLocation } from "react-router-dom";

export default function UserDashboard() {
  const location = useLocation();
  const { username } = location.state || {};
  const [currentSection, setCurrentSection] = useState("user");
  const [isHovered, setIsHovered] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    setCurrentSection(section);
    navigate(section,{state:{
      username:username
    }},);
  };
  console.log(username);
  

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex text-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isHovered ? "w-64" : "w-24"
        } bg-blue-600 shadow-lg flex flex-col p-4 justify-between transition-all duration-500 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center">
            {isHovered ? (
              <h2 className="text-2xl font-bold text-white">EDUVIVA</h2>
            ) : (
              <h2 className="text-m font-bold text-white">EDUVIVA</h2>
            )}
          </div>

          {/* Menu Items */}
          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${
              currentSection === "/user/home"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-700"
            }`}
            onClick={() => handleNavigation("/user/home",)}
          >
            <span className="text-xl">🏠</span>
            {isHovered && <span>Home</span>}
          </button>

          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${
              currentSection === "/user/guideline"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-700"
            }`}
            onClick={() => handleNavigation("/user/guideline")}
          >
            <span className="text-xl">📜</span>
            {isHovered && <span>Guidelines</span>}
          </button>

          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${
              currentSection === "/user/give-viva"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-700"
            }`}
            onClick={() => handleNavigation("/user/give-viva" )}
          >
            <span className="text-xl">🎤</span>
            {isHovered && <span>Give-Viva</span>}
          </button>

          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${
              currentSection === "/user/demo-viva"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-700"
            }`}
            onClick={() => handleNavigation("/user/demo-viva")}
          >
            <span className="text-xl">📝</span>
            {isHovered && <span>Demo-Viva</span>}
          </button>

          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${
              currentSection === "/user/settings"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-700"
            }`}
            onClick={() => handleNavigation("/user/settings")}
          >
            <span className="text-xl">⚙️</span>
            {isHovered && <span>Settings</span>}
          </button>

          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${
              currentSection === "/user/report-issue"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-700"
            }`}
            onClick={() => handleNavigation("/user/report-issue")}
          >
            <span className="text-xl">🐞</span>
            {isHovered && <span>Report Issue</span>}
          </button>
        </div>

        {/* Logout */}
        <div className="flex justify-center">
          <button
            className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white"
            onClick={handleLogout}
          >
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h2 className="text-gray-700 text-xl font-semibold">
            Student Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-xs">img</span>
            </div>
            <span className="text-gray-600">{username}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-300 p-6 overflow-auto">
          {currentSection === "user" ? <Home /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}
