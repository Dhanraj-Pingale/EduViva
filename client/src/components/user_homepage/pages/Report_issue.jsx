import React, { useState } from "react";

const ReportIssue = () => {
  const [issue, setIssue] = useState(""); // State to track the input value
  const [submitted, setSubmitted] = useState(false); // State to show submission message

  const handleSubmit = (e) => {
    e.preventDefault();
    if (issue.trim() !== "") {
      setSubmitted(true);
      setIssue(""); // Clear the input field
      // Add logic here to send the issue to backend or API
      console.log("Issue Submitted:", issue);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Raise a Ticket
        </h1>

        {/* Submission Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              placeholder="Enter your issue here..."
              rows="5"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Confirmation Message */}
        {submitted && (
          <div className="mt-6 text-center text-green-600 font-semibold">
            🎉 Your issue has been submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportIssue;
