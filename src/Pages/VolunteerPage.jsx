// src/Pages/VolunteerPage.jsx
import axios from "axios";
import { useState } from 'react';

const VolunteerPage = () => {
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({ name: '', age: '', dob: '', gender: '' });
  const [contactDetails, setContactDetails] = useState({ phone: '', whatsapp: '', email: '', designation: '' });
  const [addressDetails, setAddressDetails] = useState({ address: '', state: '', termsAccepted: false });
  const [image, setImage] = useState(null); // State for the uploaded image

  const handleFinish = async () => {
    // Create a FormData object to send data and image
    const formData = new FormData();
    formData.append('image', image); // Append the image file if exists
    formData.append('name', personalDetails.name);
    formData.append('age', personalDetails.age);
    formData.append('dob', personalDetails.dob);
    formData.append('gender', personalDetails.gender);
    formData.append('phone', contactDetails.phone);
    formData.append('whatsapp', contactDetails.whatsapp);
    formData.append('email', contactDetails.email);
    formData.append('designation', contactDetails.designation);
    formData.append('address', addressDetails.address);
    formData.append('state', addressDetails.state);
    formData.append('termsAccepted', addressDetails.termsAccepted);
    

    // Send the volunteer data to the backend
    try {
      const response = await axios.post('http://localhost:5000/api/volunteers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating volunteer:', error);
      alert('There was an error creating your volunteer profile. Please try again.');
    }
    // Resetting the form and state
    setStep(1);
    setPersonalDetails({ name: '', age: '', dob: '', gender: '' });
    setContactDetails({ phone: '', whatsapp: '', email: '', designation: '' });
    setAddressDetails({ address: '', state: '', termsAccepted: false });
    setImage(null); // Reset the image state
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Become a Volunteer</h1>
      <div className="flex justify-center mb-4">
        {[1, 2, 3].map((dot) => (
          <div key={dot} className={`w-3 h-3 rounded-full mx-2 ${step === dot ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
        ))}
      </div>

      {step === 1 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            onChange={(e) => setImage(e.target.files[0])} // Set the image state
          />
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={personalDetails.name}
            onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={personalDetails.age}
            onChange={(e) => setPersonalDetails({ ...personalDetails, age: e.target.value })}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={personalDetails.dob}
            onChange={(e) => setPersonalDetails({ ...personalDetails, dob: e.target.value })}
          />
          <select
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={personalDetails.gender}
            onChange={(e) => setPersonalDetails({ ...personalDetails, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button className="bg-orange-600 text-white p-2 rounded" onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
          <input
            type="tel"
            placeholder="Phone Number"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={contactDetails.phone}
            onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
          />
          <input
            type="tel"
            placeholder="WhatsApp Number"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={contactDetails.whatsapp}
            onChange={(e) => setContactDetails({ ...contactDetails, whatsapp: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={contactDetails.email}
            onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
          />
          <select
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={contactDetails.designation}
            onChange={(e) => setContactDetails({ ...contactDetails, designation: e.target.value })}
          >
            <option value="">Select Designation</option>
            <option value="student">Student</option>
            <option value="job">Job</option>
            <option value="business">Business Man</option>
          </select>
          <button className="bg-orange-600 text-white p-2 rounded" onClick={handleBack}>Back</button>
          <button className="bg-orange-600 text-white p-2 rounded ml-4" onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Address Details</h2>
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={addressDetails.address}
            onChange={(e) => setAddressDetails({ ...addressDetails, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 p-2 rounded w-full mb-2"
            value={addressDetails.state}
            onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
          />
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={addressDetails.termsAccepted}
              onChange={(e) => setAddressDetails({ ...addressDetails, termsAccepted: e.target.checked })}
            />
            I accept the <a href="/terms" className="text-orange-600 ml-1 inline-block">Terms and Conditions</a>
          </label>
          
          
          
          <button
            className="bg-orange-600 text-white p-2 rounded"
            disabled={!addressDetails.termsAccepted}
            onClick={handleFinish}
          >
            Become a Volunteer
          </button>
        </div>
      )}
    </div>
  );
};

export default VolunteerPage;  
