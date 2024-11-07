import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white pt-10 pb-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0 lg:space-x-20">
        
        {/* About Section */}
        <div className="flex flex-col space-y-4 w-full lg:w-1/3 lg:mr-8">
          <h2 className="text-lg font-bold">About Us</h2>
          <p className="text-sm">
            We are committed to bringing smiles and support to those in need. Through donations and volunteer work, we aim to make a difference in our community.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-4 w-4/6 lg:w-1/3 lg:ml-8 lg:mr-4">
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/programs" className="hover:underline">Our Programs</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/donate" className="hover:underline">Donate</a></li>
          </ul>
        </div>

        {/* Social Media and CTA */}
        <div className="flex flex-col items-center lg:items-center space-y-8 w-full lg:w-1/3 lg:ml-24">
          <h2 className="text-lg font-bold ">Connect with Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <button className="mt-4 bg-orange-700 hover:bg-orange-800 text-white py-2 px-4 rounded-md shadow-md transition">
            Donate Now
          </button>
        </div>
      </div>
      <div className="mt-8 border-t border-orange-500 pt-4 text-center text-sm text-gray-200">
        &copy; {new Date().getFullYear()} Your Foundation Name. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
