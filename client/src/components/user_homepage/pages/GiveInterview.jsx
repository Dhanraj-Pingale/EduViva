import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

const URL = import.meta.env.VITE_PORT_URL

const GiveInterview = () => {
    const location = useLocation();
    const { username } = location.state || {};
  // const [username, setUsername] = useState('');
  const [interviewId, setInterviewId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // For loading spinner
  const navigate = useNavigate();
  console.log("username for viva is : ",username);
  

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading
    try {
      // Submit the username for login
      // const loginResponse = await axios.post(`${URL}/interviewee/login`, {
      //   params: { username: username },
      // });

      // if (loginResponse.data !== "Login successful") {
      //   setError("Invalid username. Please try again.");
      //   setLoading(false);
      //   return;
      // }

      // Fetch the interview question set
      const interviewResponse = await axios.get(`${URL}/interviewee/getQASet`, {
        params: { id: interviewId, username: username },
      });
      // if(interviewResponse.data=="")

      if (interviewResponse.data.questionset) {
        navigate("/my-interview", {
          state: {
            username: username,
            interviewId: interviewId,
            vivadata: interviewResponse.data,
          },
        });
      } else {
        setError(interviewResponse.data);
      }
    } catch (err) {
      setError("Error: Unable to connect to the server. Try again later.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
        {/* Form Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Start Your Viva
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              // onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2.5 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Interview ID Input */}
          <div>
            <label
              htmlFor="interviewId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Viva ID
            </label>
            <input
              type="text"
              id="interviewId"
              value={interviewId}
              onChange={(e) => setInterviewId(e.target.value)}
              placeholder="Enter your viva ID"
              className="w-full p-2.5 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Start Viva"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
          Please ensure you have a valid <span className="font-medium">username</span> and{" "}
          <span className="font-medium">Viva ID</span> before proceeding.
        </p>
      </div>
    </div>
  );
};

export default GiveInterview;
