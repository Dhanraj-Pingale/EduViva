import React, { useState, useEffect } from "react";
import Chat from "../Interview/Chat.jsx";
import Meet from "../Interview/Meet.jsx";

function Interview() {
  const [messages, setMessages] = useState([]);

  const addUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { name: "User", message, avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=User" },
    ]);
  };

  // Function to enter full screen
  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  // Prevent refresh and going back
  useEffect(() => {
    // Disable browser back and refresh functionality
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';  // Standard way to prevent page unload
    };

    const handleKeyDown = (e) => {
      if (e.key === "F5" || (e.key === "r" && e.ctrlKey)) {
        e.preventDefault(); // Prevent F5 or Ctrl + R refresh
      }
      if (e.key === "Backspace" || e.key === "ArrowLeft") {
        e.preventDefault(); // Prevent backspace or left arrow key (navigation)
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // Enter full-screen mode
    enterFullScreen();

    // Cleanup listeners
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 h-full p-4">
        {/* Chat Section */}
        <div className="w-full md:w-6/7 bg-stone-50 rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b-4 pb-4 mb-6">
            Questions will be displayed here
          </h2>
          <Chat messages={messages} />
        </div>

        {/* Meet Section */}
        <div className="w-full md:w-1/2 bg-stone-50 rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b-4 pb-4 mb-6">
            Eduvantage
          </h2>
          <Meet addUserMessage={addUserMessage} />
        </div>
      </div>
    </div>
  );
}

export default Interview;
