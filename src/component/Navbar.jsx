import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import { useState, useRef, useEffect } from 'react';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-orange-500 text-white">
      {/* Logo and Title */}
      <div className="flex items-center gap-1">
        <img
          src={logo}
          alt="Dharmakarm Foundation Logo"
          className="w-8 rounded-full"
        />
        <Link to="/" className="text-2xl font-bold">Dharmakarm Foundation</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link to="/gallery" className="font-bold hover:underline">Gallery</Link>
        <Link to="/programs" className="font-bold hover:underline">Our Programs</Link>
        <Link to="/about" className="font-bold hover:underline">About Us</Link>
        <Link to="/contact" className="font-bold hover:underline">Contact Us</Link>
        {isAuthenticated && (
          <Link to="/volunteers" className="font-bold hover:underline">Volunteers</Link>
        )}
      </div>

      {/* Login Button or Profile Icon */}
      <div className="relative" ref={profileMenuRef}>
        {isAuthenticated ? (
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 font-semibold focus:outline-none"
          >
            <span className="material-icons">account_circle</span>
          </button>
        ) : (
          <Link to="/login" className="bg-white text-orange-500 px-6 font-semibold py-2 rounded">Login</Link>
        )}

        {/* Profile Dropdown Menu */}
        {isAuthenticated && isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
            <Link
              to="/Donors"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setProfileMenuOpen(false)}
            >
              Donors
            </Link>
            <Link
              to="/volunteers-list"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setProfileMenuOpen(false)}
            >
              Volunteers
            </Link>
            <button
              onClick={() => {
                onLogout();
                setProfileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
