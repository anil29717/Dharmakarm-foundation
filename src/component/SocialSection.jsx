import { FaYoutube, FaTwitter, FaInstagram, FaGlobe, FaFacebook } from 'react-icons/fa';

const SocialSection = () => (
  <section className="text-center p-8">
    <h3 className="text-2xl font-bold text-orange-500 mb-6">Social Handles</h3>
    <div className="flex justify-center gap-6">
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
        <FaYoutube className="text-red-600 text-2xl" />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
        <FaTwitter className="text-blue-400 text-2xl" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
        <FaInstagram className="text-pink-500 text-2xl" />
      </a>
      <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
        <FaGlobe className="text-orange-500 text-2xl" />
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
        <FaFacebook className="text-blue-600 text-2xl" />
      </a>
    </div>
  </section>
);

export default SocialSection;