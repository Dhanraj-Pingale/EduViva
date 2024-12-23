import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_PORT_URL

const QuestionsPage = () => {
  const { vivaID } = useParams(); // Extract vivaID from URL
  const [vivaData, setVivaData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${URL}/interviewer/showVivas`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch vivas data");
        }
        const data = await response.json();
        const specificViva = data.find((viva) => viva.vivaID === vivaID); // Find specific viva by ID
        if (specificViva) {
          setVivaData(specificViva); // Set the specific viva data
          setQuestions(specificViva.questionSet || []); // Set questions from the specific viva
        } else {
          setError("Viva not found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [vivaID]); // Re-fetch data when vivaID changes

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-lg text-red-600">{`Error: ${error}`}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md transition duration-300"
        >
          &larr; Back
        </button>
        <h1 className="text-2xl font-semibold">Viva {vivaID} Questions</h1>
        <div></div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto p-6 mt-6">
        {questions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow hover:shadow-lg p-6 transition duration-300 border border-gray-200"
              >
                <h2 className="text-lg font-semibold text-blue-600 mb-4">
                  Question {index + 1}
                </h2>
                <p className="text-gray-800 font-medium mb-3">
                  {question.question}
                </p>
                <div className="text-gray-600 text-sm space-y-2">
                  <p>
                    <strong className="font-semibold">NOS:</strong>{" "}
                    {question.NOS}
                  </p>
                  <p>
                    <strong className="font-semibold">PCS:</strong>{" "}
                    {question.PCS}
                  </p>
                  <p>
                    <strong className="font-semibold">Difficulty:</strong>{" "}
                    {question.difficulty}
                  </p>
                  <p>
                    <strong className="font-semibold">Answer:</strong>{" "}
                    {question.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-12">
            <p className="text-lg">No questions found for this Viva.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
