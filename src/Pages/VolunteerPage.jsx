import axios from "axios";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaVenusMars, FaPhone, FaWhatsapp, FaEnvelope, FaBriefcase, FaMapMarkerAlt, FaFlag, FaCheckCircle, FaArrowRight, FaArrowLeft, FaUpload, FaTimes } from 'react-icons/fa';
import { MdContacts } from "react-icons/md";
import { Navigate } from "react-router-dom";

const VolunteerPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({ name: '', age: '', dob: '', gender: '' });
  const [contactDetails, setContactDetails] = useState({ phone: '', whatsapp: '', email: '', designation: '' });
  const [addressDetails, setAddressDetails] = useState({ address: '', state: '', termsAccepted: false });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleDOBChange = (e) => {
    const dob = e.target.value;
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - birthYear;

    setPersonalDetails({ ...personalDetails, dob, age: calculatedAge });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Ensure it's an image
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }

      // Ensure file size is less than 2MB
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB!");
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle input change for personal details
  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle input change for contact details
  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone and whatsapp to ensure they only contain digits
    if (name === 'phone' || name === 'whatsapp') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setContactDetails(prev => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setContactDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle input change for address details
  const handleAddressDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setAddressDetails(prev => ({ ...prev, [name]: newValue }));
  };

  // Validate the current step
  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!personalDetails.name.trim()) newErrors.name = 'Name is required';
      if (!personalDetails.age) {
        newErrors.age = 'Age is required';
      } else if (isNaN(personalDetails.age) || personalDetails.age <= 0 || personalDetails.age > 100) {
        newErrors.age = 'Age must be between 1 and 100';
      }
      if (!personalDetails.dob) newErrors.dob = 'Date of birth is required';
      if (!personalDetails.gender) newErrors.gender = 'Gender is required';
    } else if (stepNumber === 2) {
      if (!contactDetails.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(contactDetails.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }

      if (contactDetails.whatsapp && !/^\d{10}$/.test(contactDetails.whatsapp)) {
        newErrors.whatsapp = 'WhatsApp number must be 10 digits';
      }

      if (!contactDetails.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(contactDetails.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (!contactDetails.designation) newErrors.designation = 'Designation is required';
    } else if (stepNumber === 3) {
      if (!addressDetails.address.trim()) newErrors.address = 'Address is required';
      if (!addressDetails.state.trim()) newErrors.state = 'State is required';
      if (!addressDetails.termsAccepted) newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleFinish = async () => {
    if (!validateStep(step)) return;

    // Create a FormData object
    const formData = new FormData();
    formData.append('image', image);
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

    try {
      const response = await axios.post('https://dharmakarm-foundation.onrender.com/api/volunteers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);

      // Reset form
      setStep(1);
      setPersonalDetails({ name: '', age: '', dob: '', gender: '' });
      setContactDetails({ phone: '', whatsapp: '', email: '', designation: '' });
      setAddressDetails({ address: '', state: '', termsAccepted: false });
      setImage(null);
      setImagePreview(null);
      setErrors({});
      navigate('/');
    } catch (error) {
      console.error('Error creating volunteer:', error);
      alert('There was an error creating your volunteer profile. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">Become a Volunteer</h1>

      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3].map((dot) => (
          <div key={dot} className="flex flex-col items-center mx-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === dot
                  ? 'bg-orange-600 text-white border-orange-600'
                  : step > dot
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-gray-200 text-gray-600 border-gray-300'
                }`}
            >
              {step > dot ? <FaCheckCircle /> : dot}
            </div>
            <span className="text-xs mt-1">
              {dot === 1 ? 'Personal' : dot === 2 ? 'Contact' : 'Address'}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Personal Details */}
      {step === 1 && (
        <div className="transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center">
            <FaUser className="mr-2" /> Personal Details
          </h2>

          {/* Profile Image Upload */}
          <div className="mb-6 flex flex-col items-center">
            <div
              className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-orange-300 flex items-center justify-center mb-2 relative"
              style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {!imagePreview && <FaUser className="text-gray-400 text-4xl" />}
              {imagePreview && (
                <button
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white"
                  title="Remove image"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
              id="profileImage"
            />
            <label
              htmlFor="profileImage"
              className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded flex items-center hover:bg-orange-600 transition"
            >
              <FaUpload className="mr-2" /> Upload Photo
            </label>
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-50 w-10 h-10 p-3 text-orange-500">
                <FaUser />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="p-2 w-full outline-none"
                value={personalDetails.name}
                onChange={handlePersonalDetailsChange}
                name="name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Age Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-50 w-10 h-10 p-3 text-orange-500">
                <FaCalendarAlt />
              </div>
              <input
                type="number"
                placeholder="Age"
                className="p-2 w-full outline-none"
                value={personalDetails.age}
                onChange={handlePersonalDetailsChange}
                name="age"
                min="1"
                max="100"
              />
            </div>
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Date of Birth Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-50 w-10 h-10 p-3 text-orange-500">
                <FaCalendarAlt />
              </div>
              <input
                type="date"
                placeholder="Date of Birth"
                className="p-2 w-full outline-none"
                value={personalDetails.dob}
                onChange={handleDOBChange}
                name="dob"
              />
            </div>
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-50 w-10 h-10 p-3 text-orange-500">
                <FaVenusMars />
              </div>
              <select
                className="p-2 w-full outline-none"
                value={personalDetails.gender}
                onChange={handlePersonalDetailsChange}
                name="gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div className="flex justify-end">
            <button
              className="flex items-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition"
              onClick={handleNext}
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Contact Details */}
      {step === 2 && (
        <div className="transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center">
            <MdContacts className="mr-2" /> Contact Details
          </h2>

          {/* Phone Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-50 w-10 h-10 p-3 text-orange-500">
                <FaPhone />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="p-2 w-full outline-none"
                value={contactDetails.phone}
                onChange={handleContactDetailsChange}
                name="phone"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* WhatsApp Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-50 w-10 h-10 p-3 text-orange-500">
                <FaWhatsapp />
              </div>
              <input
                type="tel"
                placeholder="WhatsApp Number (optional)"
                className="p-2 w-full outline-none"
                value={contactDetails.whatsapp}
                onChange={handleContactDetailsChange}
                name="whatsapp"
              />
            </div>
            {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-50 w-10 h-10 p-3 text-orange-500">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 w-full outline-none"
                value={contactDetails.email}
                onChange={handleContactDetailsChange}
                name="email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Designation Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-50 w-10 h-10 p-3 text-orange-500">
                <FaBriefcase />
              </div>
              <select
                className="p-2 w-full outline-none"
                value={contactDetails.designation}
                onChange={handleContactDetailsChange}
                name="designation"
              >
                <option value="">Select Designation</option>
                <option value="student">Student</option>
                <option value="job">Job</option>
                <option value="business">Business Person</option>
              </select>
            </div>
            {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
          </div>

          <div className="flex justify-between">
            <button
              className="flex items-center bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
              onClick={handleBack}
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <button
              className="flex items-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition"
              onClick={handleNext}
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Address Details */}
      {step === 3 && (
        <div className="transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-orange-700 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Address Details
          </h2>

          {/* Address Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-600 p-2 text-white">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="p-2 w-full outline-none"
                value={addressDetails.address}
                onChange={handleAddressDetailsChange}
                name="address"
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* State Field */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="bg-orange-600 p-2 text-white">
                <FaFlag />
              </div>
              <input
                type="text"
                placeholder="State"
                className="p-2 w-full outline-none"
                value={addressDetails.state}
                onChange={handleAddressDetailsChange}
                name="state"
              />
            </div>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600"
                checked={addressDetails.termsAccepted}
                onChange={handleAddressDetailsChange}
                name="termsAccepted"
              />
              <span className="ml-2">I accept the <a href="/terms" className="text-orange-600 hover:underline">Terms and Conditions</a></span>
            </label>
            {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
          </div>

          <div className="flex justify-between">
            <button
              className="flex items-center bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
              onClick={handleBack}
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <button
              className={`flex items-center py-2 px-6 rounded transition ${addressDetails.termsAccepted
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              disabled={!addressDetails.termsAccepted}
              onClick={handleFinish}
            >
              <FaCheckCircle className="mr-2" /> Become a Volunteer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerPage;