import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSearch, FaSort, FaSortUp, FaSortDown, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const VolunteersListPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const volunteersPerPage = 8;

  useEffect(() => {
    // Fetch volunteers data from the server
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://dharmakarm-foundation.onrender.com/api/volunteers');
        if (Array.isArray(response.data)) {
          setVolunteers(response.data);
          setFilteredVolunteers(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
          setError("Unexpected data format received from the server.");
        }
      } catch (err) {
        console.error('Error fetching volunteers:', err);
        setError('Could not fetch volunteers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredVolunteers(volunteers);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const results = volunteers.filter(
        volunteer => 
          volunteer.name.toLowerCase().includes(lowercasedSearch) ||
          volunteer.phone.includes(searchTerm) ||
          (volunteer.email && volunteer.email.toLowerCase().includes(lowercasedSearch)) ||
          (volunteer.state && volunteer.state.toLowerCase().includes(lowercasedSearch))
      );
      setFilteredVolunteers(results);
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, volunteers]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setFilteredVolunteers(prev => [...prev].sort((a, b) => {
      // Handle null or undefined values
      if (!a[key] && !b[key]) return 0;
      if (!a[key]) return 1;
      if (!b[key]) return -1;

      // For string comparison
      if (typeof a[key] === 'string') {
        if (direction === 'ascending') {
          return a[key].localeCompare(b[key]);
        } else {
          return b[key].localeCompare(a[key]);
        }
      } 
      // For number comparison
      else {
        if (direction === 'ascending') {
          return a[key] - b[key];
        } else {
          return b[key] - a[key];
        }
      }
    }));
  };

  // Get current volunteers for pagination
  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = filteredVolunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);
  const totalPages = Math.ceil(filteredVolunteers.length / volunteersPerPage);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Get sort icon based on current sort configuration
  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <FaSort className="text-gray-400" />;
    }
    return sortConfig.direction === 'ascending' ? <FaSortUp className="text-orange-600" /> : <FaSortDown className="text-orange-600" />;
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="text-orange-600 text-4xl animate-spin mb-4" />
        <p className="text-gray-600">Loading volunteers data...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 max-w-md mx-auto px-4">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <p className="text-red-500 text-lg font-medium mb-2">Error</p>
        <p className="text-gray-700 text-center">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Display empty state
  if (!volunteers.length) {
    return (
      <div className="text-center mt-16 p-8 max-w-md mx-auto bg-white rounded-lg shadow">
        <FaUser className="text-orange-300 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Volunteers Found</h2>
        <p className="text-gray-600 mb-6">There are currently no volunteers registered in the system.</p>
        <a 
          href="/volunteer" 
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded transition"
        >
          Become a Volunteer
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6 px-6">
          <h1 className="text-3xl font-bold text-white">Volunteers Directory</h1>
          <p className="text-orange-100 mt-1">Displaying {filteredVolunteers.length} registered volunteers</p>
        </div>
        
        {/* Search bar */}
        <div className="p-4 bg-orange-50 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, phone, email or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 pr-4 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
          </div>
        </div>
        
        {/* No results after search */}
        {searchTerm && filteredVolunteers.length === 0 && (
          <div className="text-center py-8">
            <FaExclamationTriangle className="text-orange-300 text-4xl mx-auto mb-2" />
            <p className="text-gray-600">No volunteers found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-3 text-orange-600 hover:text-orange-800 underline"
            >
              Clear search
            </button>
          </div>
        )}
        
        {/* Table */}
        {filteredVolunteers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-4 text-left font-semibold text-gray-600 w-14">Photo</th>
                  <th 
                    className="p-4 text-left font-semibold text-gray-600 cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    <div className="flex items-center">
                      <span className="mr-1">Name</span>
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    className="p-4 text-left font-semibold text-gray-600 cursor-pointer"
                    onClick={() => requestSort('age')}
                  >
                    <div className="flex items-center">
                      <span className="mr-1">Age</span>
                      {getSortIcon('age')}
                    </div>
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-600">Contact</th>
                  <th 
                    className="p-4 text-left font-semibold text-gray-600 cursor-pointer"
                    onClick={() => requestSort('state')}
                  >
                    <div className="flex items-center">
                      <span className="mr-1">Location</span>
                      {getSortIcon('state')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentVolunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="border-b border-gray-100 hover:bg-orange-50 transition-colors">
                    <td className="p-4">
                      {volunteer.image ? (
                        <img
                          src={volunteer.image}
                          alt={`${volunteer.name}'s avatar`}
                          className="w-10 h-10 rounded-full object-cover border-2 border-orange-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <FaUser className="text-orange-400" />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{volunteer.name}</div>
                      <div className="text-sm text-gray-500">{volunteer.designation}</div>
                    </td>
                    <td className="p-4 text-gray-700">{volunteer.age}</td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700 mb-1">
                        <FaPhone className="text-orange-500 mr-2" />
                        {volunteer.phone}
                      </div>
                      {volunteer.email && (
                        <div className="flex items-center text-gray-700 text-sm">
                          <FaEnvelope className="text-orange-500 mr-2" />
                          {volunteer.email}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {volunteer.state && (
                        <div className="flex items-center text-gray-700">
                          <FaMapMarkerAlt className="text-orange-500 mr-2" />
                          {volunteer.state}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {filteredVolunteers.length > volunteersPerPage && (
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-orange-600 hover:bg-orange-700'
                } text-white px-4 py-2 rounded`}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-orange-600 hover:bg-orange-700'
                } text-white px-4 py-2 rounded ml-3`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstVolunteer + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastVolunteer, filteredVolunteers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredVolunteers.length}</span> volunteers
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`${
                      currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                    } relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500`}
                  >
                    &laquo; Previous
                  </button>
                  
                  {/* Page number buttons */}
                  {[...Array(totalPages).keys()].map(number => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`${
                        currentPage === number + 1
                          ? 'bg-orange-50 border-orange-500 text-orange-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                      {number + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`${
                      currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                    } relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500`}
                  >
                    Next &raquo;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteersListPage;