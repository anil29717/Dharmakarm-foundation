import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Phone, Coffee, DollarSign, Utensils } from 'lucide-react';

const AdminDonorListPage = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch donations from the server
    axios.get('http://localhost:5000/api/donations')
      .then(response => setDonations(response.data))
      .catch(error => console.error('Error fetching donations:', error));
  }, []);

  // Get donor icon based on type
  const getDonorIcon = (donorType) => {
    if (donorType === 'Personal') {
      return <Users className="inline-block mr-2" size={18} />;
    } else {
      return <Utensils className="inline-block mr-2" size={18} />;
    }
  };

  // Get donation type icon
  const getDonationTypeIcon = (donationType) => {
    if (donationType === 'Money') {
      return <DollarSign className="inline-block mr-2" size={18} />;
    } else {
      return <Coffee className="inline-block mr-2" size={18} />;
    }
  };

  // Render donation type content
  const renderDonationType = (donation) => {
    if (donation.donorType === 'Personal') {
      return (
        <>
          {getDonationTypeIcon(donation.donationType)}
          {donation.donationType}
        </>
      );
    } else {
      // For Restaurant, show a dash since they can't donate money
      return (
        <>
          <Coffee className="inline-block mr-2" size={18} />
          Food Items
        </>
      );
    }
  };

  // Render amount or food items
  const renderAmountOrFoodItems = (donation) => {
    if (donation.donorType === 'Personal' && donation.donationType === 'Money') {
      return (
        <>
          <DollarSign className="inline-block mr-2" size={18} />
          {donation.moneyAmount}
        </>
      );
    } else if (donation.donorType === 'Restaurant') {
      // For restaurants, show the food items as a list
      const foodItems = donation.restaurantDetails.foodItems;
      if (Array.isArray(foodItems)) {
        return (
          <ul className="list-disc list-inside text-left">
            {foodItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      } else {
        // If foodItems is not an array, just display it as is
        return foodItems || '-';
      }
    } else {
      // For personal non-money donations, show a dash
      return '-';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-50 via-white to-orange-50">
      <h2 className="text-4xl font-bold mb-8 text-orange-800 shadow-md rounded-lg p-4 bg-orange-200">
        <Users className="inline-block mr-3" size={32} />
        Donor List
      </h2>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-orange-400 to-orange-600 text-white">
              <th className="px-4 py-3 text-lg font-semibold">Donor Name</th>
              <th className="px-4 py-3 text-lg font-semibold">Donor Type</th>
              <th className="px-4 py-3 text-lg font-semibold">Phone Number</th>
              <th className="px-4 py-3 text-lg font-semibold">Donation Type</th>
              <th className="px-4 py-3 text-lg font-semibold">Amount/Items</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr
                key={index}
                className="text-center border-t hover:bg-orange-50 transition duration-300 ease-in-out"
              >
                <td className="px-4 py-4 text-gray-700">
                  {getDonorIcon(donation.donorType)}
                  {donation.donorType === 'Personal' ? donation.personalDetails.name : donation.restaurantDetails.name}
                </td>
                <td className="px-4 py-4 text-gray-700">
                  {getDonorIcon(donation.donorType)}
                  {donation.donorType}
                </td>
                <td className="px-4 py-4 text-gray-700">
                  <Phone className="inline-block mr-2" size={18} />
                  {donation.donorType === 'Personal' ? donation.personalDetails.phoneNumber : donation.restaurantDetails.contactNumber}
                </td>
                <td className="px-4 py-4 text-gray-700 flex justify-start ml-10">
                  {renderDonationType(donation)}
                </td>
                <td className="px-4 py-4 text-gray-700 ">
                  {renderAmountOrFoodItems(donation)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDonorListPage;