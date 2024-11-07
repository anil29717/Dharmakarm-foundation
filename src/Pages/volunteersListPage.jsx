// src/Pages/volunteersListPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteersListPage = () => {
  const [volunteers, setVolunteers] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch volunteers data from the server
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/volunteers');
        if (Array.isArray(response.data)) {
          setVolunteers(response.data); // Set data if it's an array
        } else {
          console.error("Expected an array but received:", response.data);
          setError("Unexpected data format received from the server.");
        }
      } catch (err) {
        console.error('Error fetching volunteers:', err);
        setError('Could not fetch volunteers');
      }
    };

    fetchVolunteers();
  }, []);

  // Handle loading and error states
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!volunteers.length) {
    return <div className="text-center mt-6">No volunteers found.</div>; // Show if the list is empty
  }

  // Display all volunteer data in a table
  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Volunteers List</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-4 text-gray-600">Name</th>
            <th className="py-3 px-4 text-gray-600">Age</th>
            <th className="py-3 px-4 text-gray-600">Phone</th>
            <th className="py-3 px-4 text-gray-600">Avatar</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            <tr key={volunteer._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-700">{volunteer.name}</td>
              <td className="py-3 px-4 text-gray-700">{volunteer.age}</td>
              <td className="py-3 px-4 text-gray-700">{volunteer.phone}</td>
              <td className="py-3 px-4">
                <img
                  src={volunteer.image}
                  alt={`${volunteer.name}'s avatar`}
                  className="w-12 h-12 object-cover"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteersListPage;
