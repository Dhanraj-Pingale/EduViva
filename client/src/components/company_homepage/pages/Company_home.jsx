import React, { useEffect, useState } from "react";

const Company_home = () => {
  const [vivaCount, setVivaCount] = useState(0); // State to store the number of vivas
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors

  // Fetch viva count from API
  useEffect(() => {
    const fetchVivaCount = async () => {
      try {
        const URL = import.meta.env.VITE_PORT_URL
        const response = await fetch(`${URL}/interviewer/showVivas`);
        if (!response.ok) {
          throw new Error("Failed to fetch viva data");
        }
        const data = await response.json(); // Assuming API returns an array of vivas
        setVivaCount(data.length); // Count the number of vivas
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVivaCount();
  }, []);

  return (
    <div className="h-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            Welcome to the Company Dashboard
          </h1>
          <p className="text-sm mt-1">
            Manage your operations efficiently and view performance metrics.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8">
        {/* Company Overview Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Here you can view insights, see details, and monitor the
            performance of students.
          </p>
        </section>

        {/* Stats or Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Vivas Created */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Vivas Created</h3>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {vivaCount}
              </p>
            )}
          </div>

          {/* Total Users - Static Count */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              12
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Company_home;
