import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDonorListPage = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch donations from the server
    axios.get('http://localhost:5000/api/donations')
      .then(response => setDonations(response.data))
      .catch(error => console.error('Error fetching donations:', error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 shadow-md rounded-lg p-4 bg-blue-300">
        Donor List
      </h2>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <th className="px-4 py-3 text-lg font-semibold">Donor Name</th>
              <th className="px-4 py-3 text-lg font-semibold">Donor Type</th>
              <th className="px-4 py-3 text-lg font-semibold">Phone Number</th>
              <th className="px-4 py-3 text-lg font-semibold">Donation Type</th>
              <th className="px-4 py-3 text-lg font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr
                key={index}
                className="text-center border-t hover:bg-blue-50 transition duration-300 ease-in-out"
              >
                <td className="px-4 py-4 text-gray-700">
                  {donation.donorType === 'Personal' ? donation.personalDetails.name : donation.restaurantDetails.name}
                </td>
                <td className="px-4 py-4 text-gray-700">{donation.donorType}</td>
                <td className="px-4 py-4 text-gray-700">
                  {donation.donorType === 'Personal' ? donation.personalDetails.phoneNumber : donation.restaurantDetails.contactNumber}
                </td>
                <td className="px-4 py-4 text-gray-700">{donation.donationType}</td>
                <td className="px-4 py-4 text-gray-700">{donation.moneyAmount || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDonorListPage;
