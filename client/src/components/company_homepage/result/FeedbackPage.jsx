import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_PORT_URL

const FeedbackPage = () => {
  const { vivaID } = useParams(); // Extract vivaID from URL
  const [vivaData, setVivaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchVivaData = async () => {
      try {
        const response = await fetch(
          `${URL}/interviewer/getlistofcandidate?vivaID=${vivaID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        

        // Find the viva data with the matching vivaID
        // const viva = data.find((item) => item.vivaID === vivaID);

        if (Array.isArray(data)) {
          setVivaData(data); // Set the viva data to state
        } else {
          setError("Viva ID not found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVivaData();
  }, [vivaID]);

  const goBack = () => navigate(-1); // Go back to the previous page

  const downloadFeedback = () => {
    const headers = ["Name", "Score", "Rank"];
    const rows = vivaData.list.map((feedback) => [
      feedback.name,
      feedback.Score,
      feedback.rank,
    ]);

    // Convert to CSV format
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `viva_${vivaID}_feedback.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-600 font-semibold">Error: {error}</div>
      </div>
    );
  }

  if (!vivaData) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <button
            onClick={goBack}
            className="px-4 py-2 bg-blue-800 rounded hover:bg-blue-700 transition duration-300"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold text-center">Viva Feedback</h1>
          <button
            onClick={downloadFeedback}
            className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition duration-300"
          >
            Download CSV
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 mt-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Feedback for Viva ID: <span className="text-blue-600">{vivaID}</span>
        </h2>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {vivaData.map((feedback, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {feedback.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                    {feedback.Score}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                    {feedback.rank}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      to={`/company/feedback/${vivaID}/${feedback.name}`}
                      className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Show Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
