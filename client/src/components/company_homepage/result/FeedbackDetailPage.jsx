import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DownloadComponentContent from "./DownloadComponentContent";


const URL = import.meta.env.VITE_PORT_URL

const FeedbackDetailPage = () => {
  const { studentName, vivaID } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch(`${URL}/interviewer/seeindividualfeedback?vivaID=${vivaID}&name=${studentName}`);
        // console.log(response);
        
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log(data);
        
        // const viva = data.find((item) => item.vivaID === vivaID);

        if (data) {
          // const studentFeedback = data.find(
          //   (feedback) => feedback.name === studentName
          // );
          setFeedback(data);
        } else {
          setError("Viva ID not found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, [vivaID, studentName]);

  const goBack = () => navigate(-1);

  // Function to dynamically render breakdown from the feedback string
  const renderFeedbackBreakdown = (feedbackText) => {
    if (!feedbackText) return null;

    const lines = feedbackText.split("\n"); // Split the feedback into lines

    return lines.map((line, index) => {
      const [label, content] = line.split(":").map((str) => str.trim());
      if (label && content) {
        return (
          <p key={index} className="mt-2">
            <strong className="text-gray-800">{label}:</strong>{" "}
            <span className="text-gray-600">{content}</span>
          </p>
        );
      }
      return (
        <p key={index} className="mt-2 text-gray-600 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <p className="text-red-600 text-xl font-semibold">
          {error || "Feedback not found for the specified student."}
        </p>
      </div>
    );
  }
    // Generate HTML content for download
    const generateDownloadableContent = () => {
      return `
        <html>
          <head>
            <title>Feedback for ${feedback.name}</title>
          </head>
          <body>
            <h1>Feedback for ${feedback.name}</h1>
            <h2>Viva Details</h2>
            <p><strong>Viva ID:</strong> ${vivaID}</p>
            <p><strong>Score:</strong> ${feedback.Score}</p>
            <p><strong>Rank:</strong> ${feedback.rank}</p>
            <h2>Full Feedback</h2>
            <pre>${feedback.feedback}</pre>
            <h2>Provided Questions & Answers</h2>
            ${feedback.providedQAndA
              .map(
                (qna) =>
                  `<div>
                    <p><strong>Question:</strong> ${qna.question}</p>
                    <p><strong>Answer:</strong> ${qna.userans}</p>
                    <p><strong>Score:</strong> ${qna.score}</p>
                    <p><strong>Feedback:</strong> ${qna.feedback}</p>
                    <p><strong>Summary:</strong> ${qna.summary}</p>
                  </div>`
              )
              .join("<hr />")}
          </body>
        </html>
      `;
    };

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <div className="flex justify-start mb-6">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          ← Back
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Feedback for <span className="text-blue-600">{feedback.name}</span>
      </h1>

      {/* Feedback Card */}
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        {/* Viva Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Viva Details</h2>
          <p className="text-gray-600">
            <strong className="font-medium">Viva ID:</strong> {vivaID}
          </p>
          <p className="text-gray-600">
            <strong className="font-medium">Score:</strong> {feedback.Score}
          </p>
          <p className="text-gray-600">
            <strong className="font-medium">Rank:</strong> {feedback.rank}
          </p>
        </div>

        {/* Full Feedback */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Full Feedback</h2>
          {renderFeedbackBreakdown(feedback.feedback)}
        </div>

        {/* Q&A Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Provided Questions & Answers
          </h2>
          {feedback.providedQAndA.length === 0 ? (
            <p className="text-gray-500">No questions and answers provided.</p>
          ) : (
            feedback.providedQAndA.map((qna, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4 shadow-sm"
              >
                <p className="font-medium text-gray-800 mb-2">
                  <strong>Question:</strong> {qna.question}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Answer:</strong> {qna.userans}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Score:</strong> {qna.score}
                </p>

                {/* Dynamically Render Feedback */}
                <div className="mt-4 text-gray-700">
                  <h3 className="font-semibold text-gray-800 mb-1">Feedback:</h3>
                  {renderFeedbackBreakdown(qna.feedback)}
                </div>

                <div className="mt-2">
                  <h4 className="font-medium text-gray-700">Summary:</h4>
                  <pre className="text-sm bg-gray-100 text-gray-800 p-2 rounded-md overflow-auto">
                    {qna.summary}
                  </pre>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <DownloadComponentContent
        content={generateDownloadableContent()}
        filename={`${feedback.name}_feedback.pdf`}
      />
    </div>
  );
};

export default FeedbackDetailPage;
