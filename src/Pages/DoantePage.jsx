import { useState } from 'react';
import axios from 'axios';

const DonatePage = () => {
  const [donorType, setDonorType] = useState('Personal');
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    email: '',
  });
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: '',
    location: '',
    contactNumber: '',
    email: '',
    foodItems: [''],
  });
  const [donationType, setDonationType] = useState('');
  const [moneyAmount, setMoneyAmount] = useState('');
  const [donationId, setDonationId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle donor type selection
  const handleDonorTypeChange = (e) => {
    setDonorType(e.target.value);
  };

  // Handle personal detail changes
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle restaurant detail changes
  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle adding/removing food items for restaurant donation
  const handleFoodItemChange = (e, index) => {
    const newFoodItems = [...restaurantDetails.foodItems];
    newFoodItems[index] = e.target.value;
    setRestaurantDetails((prevDetails) => ({
      ...prevDetails,
      foodItems: newFoodItems,
    }));
  };

  const handleAddFoodItem = () => {
    setRestaurantDetails((prevDetails) => ({
      ...prevDetails,
      foodItems: [...prevDetails.foodItems, ''],
    }));
  };

  const handleRemoveFoodItem = (index) => {
    const newFoodItems = [...restaurantDetails.foodItems];
    newFoodItems.splice(index, 1);
    setRestaurantDetails((prevDetails) => ({
      ...prevDetails,
      foodItems: newFoodItems,
    }));
  };

  const handleDonationTypeChange = (e) => {
    setDonationType(e.target.value);
  };

  const handleMoneyAmountChange = (e) => {
    setMoneyAmount(e.target.value);
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (donorType === 'Personal') {
      // Validate personal data
      if (!personalDetails.name || !personalDetails.age || !personalDetails.phoneNumber || !personalDetails.email) {
        setErrorMessage('Please fill in all personal details');
        return;
      }

      const donationData = {
        donorType,
        personalDetails,
        donationType,
        moneyAmount,
      };

      try {
        const response = await axios.post('http://localhost:5000/api/donate/personal', donationData);
        setDonationId(response.data.donationId); // Assuming the response includes a unique donation ID
      } catch (error) {
        setErrorMessage('Error submitting donation');
      }

    } else if (donorType === 'Restaurant') {
      // Validate restaurant data
      if (!restaurantDetails.name || !restaurantDetails.location || !restaurantDetails.contactNumber || !restaurantDetails.email) {
        setErrorMessage('Please fill in all restaurant details');
        return;
      }

      const donationData = {
        donorType,
        restaurantDetails,
        donationType,
        moneyAmount,
      };

      try {
        const response = await axios.post('http://localhost:5000/api/donate/restaurant', donationData);
        setDonationId(response.data.donationId); // Assuming the response includes a unique donation ID
      } catch (error) {
        setErrorMessage('Error submitting donation');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Make a Donation</h2>
      
      {/* Donor Type Selection */}
      <div className="flex justify-center mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="donorType"
            value="Personal"
            checked={donorType === 'Personal'}
            onChange={handleDonorTypeChange}
            className="mr-2"
          />
          Personal
        </label>
        <label>
          <input
            type="radio"
            name="donorType"
            value="Restaurant"
            checked={donorType === 'Restaurant'}
            onChange={handleDonorTypeChange}
            className="mr-2"
          />
          Restaurant
        </label>
      </div>

      {/* Personal Details */}
      {donorType === 'Personal' && (
        <div className="mb-6 space-y-4">
          <input
            type="text"
            name="name"
            value={personalDetails.name}
            onChange={handlePersonalChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="age"
            value={personalDetails.age}
            onChange={handlePersonalChange}
            placeholder="Age"
            min="1"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="tel"
            name="phoneNumber"
            value={personalDetails.phoneNumber}
            onChange={handlePersonalChange}
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={personalDetails.email}
            onChange={handlePersonalChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      )}

      {/* Restaurant Details */}
      {donorType === 'Restaurant' && (
        <div className="mb-6 space-y-4">
          <input
            type="text"
            name="name"
            value={restaurantDetails.name}
            onChange={handleRestaurantChange}
            placeholder="Restaurant Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="location"
            value={restaurantDetails.location}
            onChange={handleRestaurantChange}
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="tel"
            name="contactNumber"
            value={restaurantDetails.contactNumber}
            onChange={handleRestaurantChange}
            placeholder="Contact Number"
            pattern="[0-9]{10}"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={restaurantDetails.email}
            onChange={handleRestaurantChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />

          {/* Add Food Items */}
          {restaurantDetails.foodItems.map((food, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={food}
                onChange={(e) => handleFoodItemChange(e, index)}
                placeholder="Food Item"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveFoodItem(index)}
                className="bg-red-500 text-white p-2 rounded"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFoodItem}
            className="bg-green-500 text-white p-2 rounded"
          >
            + Add Food Item
          </button>
        </div>
      )}

      {/* Donation Type */}
      <div className="mb-6">
        <label className="block text-lg mb-2">Donation Type</label>
        <select
          value={donationType}
          onChange={handleDonationTypeChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select donation type</option>
          <option value="Money">Money</option>
          <option value="Study Related Kit">Study Related Kit</option>
          <option value="Food Plates">Food Plates</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Show Money Amount Input if "Money" is selected */}
      {donationType === 'Money' && (
        <div className="mb-6">
          <label className="block text-lg mb-2">Amount</label>
          <input
            type="number"
            value={moneyAmount}
            onChange={handleMoneyAmountChange}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-6 rounded-md w-full"
      >
        Donate Now
      </button>

      {donationId && (
        <div className="mt-4 text-green-500">
          <p>Donation successful! Your donation ID is {donationId}.</p>
        </div>
      )}
    </div>
  );
};

export default DonatePage;
