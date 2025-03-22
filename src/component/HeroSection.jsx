// src/HeroSection.jsx
import bannerImage from '/Images/hero-banner1.png'; 

const HeroSection = () => (
  <section className="w-full flex justify-center my-8">
    <img
      src={bannerImage} // Replace with the actual path to your banner image
      alt="Dharmakarm Foundation Banner"
      className="w-11/12 rounded-lg shadow-lg"
    />
  </section>
);

export default HeroSection;
