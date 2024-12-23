import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_PORT_URL

const Result = () => {
  const [vivaData, setVivaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeInputs, setTimeInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${URL}/interviewer/showVivas`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setVivaData(data);
        setLoading(false);

        const initialTimeInputs = {};
        data.forEach((viva) => {
          initialTimeInputs[viva.vivaID] = viva.timeforthinking.toString();
        });
        setTimeInputs(initialTimeInputs);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateAndUpdateTime = (vivaID) => {
    const newTime = timeInputs[vivaID];
    if (!newTime || isNaN(newTime) || newTime <= 0) {
      setErrorMessage("Please enter a valid number greater than 0.");
      return;
    }
    setErrorMessage("");
    updateTimeForThinking(vivaID, newTime);
  };

  const updateTimeForThinking = async (vivaID, newTime) => {
    try {
      const response = await fetch(
        `${URL}/interviewer/updatetimer?vivaID=${vivaID}&newtime=${newTime}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error("Failed to update time");

      alert("Time for thinking updated successfully");
      const updatedVivaData = vivaData.map((viva) =>
        viva.vivaID === vivaID ? { ...viva, timeforthinking: newTime } : viva
      );
      setVivaData(updatedVivaData);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleTimeChange = (vivaID, value) => {
    setTimeInputs((prev) => ({ ...prev, [vivaID]: value }));
  };

  const handleDeleteViva = async (vivaID) => {
    try {
      const response = await fetch(
        `${URL}/interviewer/deleteVIVA?vivaID=${vivaID}`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error("Failed to delete viva");

      setVivaData(vivaData.filter((viva) => viva.vivaID !== vivaID));
      alert("Viva deleted successfully");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-red-500 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 border-b-4 border-gray-300 pb-2">
        Viva Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {vivaData.length > 0 ? (
          vivaData.map((viva) => (
            <div
              key={viva.vivaID}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                {viva.nameofviva}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Domain:</strong> {viva.domain}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                <strong>Viva ID:</strong> {viva.vivaID}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <label className="text-sm text-gray-700 font-medium">
                  Time for Thinking (minutes):
                </label>
                <input
                  type="number"
                  value={timeInputs[viva.vivaID] || ""}
                  onChange={(e) =>
                    handleTimeChange(viva.vivaID, e.target.value)
                  }
                  className="w-14 p-2 text-gray-700 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={() => validateAndUpdateTime(viva.vivaID)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all text-sm"
                >
                  Update Time
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
              )}
              <div className="space-y-3">
                <Link
                  to={`/company/questions/${viva.vivaID}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                >
                  View Questions
                </Link>
                <Link
                  to={`/company/feedback/${viva.vivaID}`}
                  className="block text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
                >
                  View Feedback
                </Link>
                <button
                  onClick={() => handleDeleteViva(viva.vivaID)}
                  className="block w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
                >
                  Delete Viva
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full text-lg">
            No viva data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Result;