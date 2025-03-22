import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Home, Phone, Mail, PlusCircle, MinusCircle, DollarSign, Gift, Coffee, Heart } from 'lucide-react';

const DonatePage = () => {
  const navigate = useNavigate();
  const [donorType, setDonorType] = useState('Personal');
  const [personalDetails, setPersonalDetails] = useState({ name: '', age: '', phoneNumber: '', email: '' });
  const [restaurantDetails, setRestaurantDetails] = useState({ name: '', location: '', contactNumber: '', email: '', foodItems: [''] });
  const [donationType, setDonationType] = useState('');
  const [moneyAmount, setMoneyAmount] = useState('');
  const [donationId, setDonationId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle personal details input change
  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle restaurant details input change
  const handleRestaurantInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle food item change
  const handleFoodItemChange = (index, value) => {
    const newFoodItems = [...restaurantDetails.foodItems];
    newFoodItems[index] = value;
    setRestaurantDetails(prev => ({
      ...prev,
      foodItems: newFoodItems
    }));
  };

  // Remove food item
  const removeFoodItem = (index) => {
    const newFoodItems = [...restaurantDetails.foodItems];
    newFoodItems.splice(index, 1);
    setRestaurantDetails(prev => ({
      ...prev,
      foodItems: newFoodItems
    }));
  };

  // Add food item
  const addFoodItem = () => {
    setRestaurantDetails(prev => ({
      ...prev,
      foodItems: [...prev.foodItems, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (donorType === 'Personal' && Object.values(personalDetails).some(val => !val)) {
      setErrorMessage('Please fill in all personal details');
      return;
    } else if (donorType === 'Restaurant' &&
      (Object.values(restaurantDetails).some((val, key) => !val && key !== 'foodItems') ||
        !restaurantDetails.foodItems[0])) {
      setErrorMessage('Please fill in all restaurant details');
      return;
    }

    try {
      const donationData = {
        donorType,
        ...(donorType === 'Personal' ? { personalDetails } : { restaurantDetails }),
        donationType,
        ...(donationType === 'Money' && { moneyAmount })
      };

      const endpoint = `http://localhost:5000/api/donate/${donorType.toLowerCase()}`;
      const response = await axios.post(endpoint, donationData);
      setDonationId(response.data.donationId);
      navigate('/');

    } catch (error) {
      setErrorMessage('Error submitting donation');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-orange-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-700">Make a Donation</h2>

      {/* Donor Type Toggle Switch */}
      <div className="flex justify-center mb-6">
        <div className="relative bg-white p-1 rounded-full shadow-md w-64">
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 ease-in-out ${donorType === 'Personal' ? 'left-1' : 'left-1/2'
              } bg-orange-500`}
          />
          <div className="flex relative z-10">
            <button
              type="button"
              onClick={() => setDonorType('Personal')}
              className={`flex items-center justify-center w-1/2 py-2 rounded-full transition-colors duration-200 ${donorType === 'Personal' ? 'text-white' : 'text-orange-700'
                }`}
            >
              <User size={20} className="mr-2" />
              Personal
            </button>
            <button
              type="button"
              onClick={() => setDonorType('Restaurant')}
              className={`flex items-center justify-center w-1/2 py-2 rounded-full transition-colors duration-200 ${donorType === 'Restaurant' ? 'text-white' : 'text-orange-700'
                }`}
            >
              <Home size={20} className="mr-2" />
              Restaurant
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Details Form */}
        {donorType === 'Personal' && (
          <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-orange-700">Personal Details</h3>

            {/* Name Input */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
              <div className="p-2 bg-orange-50">
                <User className="text-orange-600" />
              </div>
              <input
                type="text"
                name="name"
                value={personalDetails.name}
                onChange={handlePersonalInputChange}
                placeholder="Full Name"
                className="w-full p-2 outline-none"
                required
              />
            </div>

            {/* Age Input */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
              <div className="p-2 bg-orange-50">
                <User className="text-orange-600" />
              </div>
              <input
                type="number"
                name="age"
                value={personalDetails.age}
                onChange={handlePersonalInputChange}
                placeholder="Age"
                min="1"
                max="100"
                className="w-full p-2 outline-none"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
              <div className="p-2 bg-orange-50">
                <Phone className="text-orange-600" />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={personalDetails.phoneNumber}
                onChange={handlePersonalInputChange}
                placeholder="Phone Number"
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full p-2 outline-none"
                required
              />

            </div>

            {/* Email Input */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
              <div className="p-2 bg-orange-50">
                <Mail className="text-orange-600" />
              </div>
              <input
                type="email"
                name="email"
                value={personalDetails.email}
                onChange={handlePersonalInputChange}
                placeholder="Email"
                className="w-full p-2 outline-none"
                required
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-orange-700 mb-3">Donation Type</h3>
              <div className="relative">
                <select
                  value={donationType}
                  onChange={e => setDonationType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pl-10"
                  required
                >
                  <option value="">Select donation type</option>
                  <option value="Money">Money</option>
                  <option value="Study Related Kit">Study Related Kit</option>
                  <option value="Food Plates">Food Plates</option>
                  <option value="Other">Other</option>
                </select>
                <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600" size={20} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-orange-700 mb-3">Amount</h3>
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <div className="p-2 bg-orange-50">
                    <DollarSign className="text-orange-600" />
                  </div>
                  <input
                    type="number"
                    value={moneyAmount}
                    onChange={e => setMoneyAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-2 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
            </div>
          
        )}

            {/* Restaurant Details Form */}
            {donorType === 'Restaurant' && (
              <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-orange-700">Restaurant Details</h3>

                {/* Restaurant Name Input */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                  <div className="p-2 bg-orange-50">
                    <Home className="text-orange-600" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={restaurantDetails.name}
                    onChange={handleRestaurantInputChange}
                    placeholder="Restaurant Name"
                    className="w-full p-2 outline-none"
                    required
                  />
                </div>

                {/* Location Input */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                  <div className="p-2 bg-orange-50">
                    <Home className="text-orange-600" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={restaurantDetails.location}
                    onChange={handleRestaurantInputChange}
                    placeholder="Location"
                    className="w-full p-2 outline-none"
                    required
                  />
                </div>

                {/* Contact Number Input */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                  <div className="p-2 bg-orange-50">
                    <Phone className="text-orange-600" />
                  </div>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={restaurantDetails.contactNumber}
                    onChange={handleRestaurantInputChange}
                    placeholder="Contact Number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="w-full p-2 outline-none"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                  <div className="p-2 bg-orange-50">
                    <Mail className="text-orange-600" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={restaurantDetails.email}
                    onChange={handleRestaurantInputChange}
                    placeholder="Email"
                    className="w-full p-2 outline-none"
                    required
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-orange-700 mb-2">Food Items</h4>
                  {restaurantDetails.foodItems.map((food, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white flex-grow">
                        <div className="p-2 bg-orange-50">
                          <Coffee className="text-orange-600" />
                        </div>
                        <input
                          type="text"
                          value={food}
                          onChange={(e) => handleFoodItemChange(index, e.target.value)}
                          placeholder="Food Item"
                          className="w-full p-2 outline-none"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFoodItem(index)}
                        className="bg-red-500 text-white p-2 rounded-full"
                        disabled={restaurantDetails.foodItems.length === 1}
                      >
                        <MinusCircle size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFoodItem}
                    className="flex items-center justify-center w-full p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    <PlusCircle size={20} className="mr-2" /> Add Food Item
                  </button>
                </div>
              </div>
            )}



            {/* Error message */}
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {errorMessage}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 px-6 text-white font-bold rounded-md shadow-md transition-all bg-orange-500 hover:bg-orange-600 flex items-center justify-center"
            >
              <Heart size={24} className="mr-2" />
              Donate Now
            </button>

            {/* Success message */}
            {donationId && (
              <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                Donation successful! Your donation ID is <span className="font-bold">{donationId}</span>.
              </div>
            )}
          </form>
    </div>
  );
};

export default DonatePage;