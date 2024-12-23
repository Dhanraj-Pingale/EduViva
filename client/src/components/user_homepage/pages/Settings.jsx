import React, { useState } from "react";

const Settings = () => {
  const [birthdate, setBirthdate] = useState("");
  const [college, setCollege] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Add save logic here
    alert("Settings saved successfully!");
  };

  return (
    <div className="h-full bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center">
            <label className="block mb-4 text-gray-700 font-medium">
              Upload Profile Image
            </label>
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center mb-4">
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">//</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm text-gray-600"
            />
          </div>

          {/* Input Fields */}
          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="birthdate"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter your Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full text-black p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="college"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter your College
              </label>
              <input
                type="text"
                id="college"
                placeholder="Your College Name"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full text-black p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;