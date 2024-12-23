import React from "react";

const Guideline = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Viva Guidelines
        </h1>
        
        {/* Introduction */}
        <p className="text-gray-600 text-center mb-8">
          Follow these guidelines to prepare and perform well in your viva.
        </p>

        {/* Guidelines Section */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="text-blue-500 text-2xl">📌</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                1. Understand the Purpose
              </h3>
              <p className="text-gray-600">
                A viva voce is conducted to test your understanding of the topic, project, or subject matter. Be clear about the objective and goals of the viva.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-blue-500 text-2xl">📖</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                2. Prepare Thoroughly
              </h3>
              <p className="text-gray-600">
                Review your project, thesis, or topics thoroughly. Be ready to explain your thought process, challenges faced, and key learnings.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-blue-500 text-2xl">🗣️</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                3. Practice Clear Communication
              </h3>
              <p className="text-gray-600">
                Speak clearly and confidently. Use precise terminology and structure your answers logically: Introduction, Explanation, and Conclusion.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-blue-500 text-2xl">🤝</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                4. Be Honest and Polite
              </h3>
              <p className="text-gray-600">
                If you don’t know an answer, be honest. Politely state that you need to review that topic further, and remain calm under pressure.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-blue-500 text-2xl">📝</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                5. Prepare for Common Questions
              </h3>
              <p className="text-gray-600">
                Anticipate frequently asked questions, such as:
                <ul className="list-disc list-inside mt-2 text-gray-500">
                  <li>Can you explain your project briefly?</li>
                  <li>What challenges did you face?</li>
                  <li>How did you solve specific problems?</li>
                  <li>What are the future improvements?</li>
                </ul>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-blue-500 text-2xl">⏰</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                6. Manage Your Time
              </h3>
              <p className="text-gray-600">
                Be concise and to the point. Avoid rambling or oversharing unnecessary details. Stick to the question being asked.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-blue-500 text-2xl">💡</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                7. Dress and Act Professionally
              </h3>
              <p className="text-gray-600">
                Dress in formal attire and maintain professional body language. Sit upright, maintain eye contact, and listen attentively.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Notes */}
        <div className="mt-8 text-center">
          <p className="text-gray-700">
            Follow these steps to present yourself confidently and ace your viva!
          </p>
          <div className="mt-4">
            <span className="text-blue-500 text-4xl">🎓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guideline;
