import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL = import.meta.env.VITE_PORT_URL;

const StudentRegister = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(`${URL}/get-csrf-token`);
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);
  console.log(csrfToken);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      console.log("csrf: ", csrfToken);
      console.log(formData);

      const response = await axios.post(
        `${URL}/interviewee/register`,
        formData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data == "Registration successful!") {
        setMessage("Registration successful!");
        setTimeout(() => navigate("/slogin"), 1000);
      } else {
        setMessage(data);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Student Registration
        </h1>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", name: "name" },
            { label: "Father's Name", name: "fatherName" },
            { label: "Surname", name: "surname" },
            { label: "Username", name: "username" },
            { label: "Email", name: "email", type: "email" },
          ].map((field) => (
            <div className="mb-4" key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
