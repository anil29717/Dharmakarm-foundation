
import { useNavigate } from "react-router-dom";


const CTASection = () => {

  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/donate');
  };

    return (
      <section className="w-full flex justify-center items-center my-8">
      <div className="w-11/12 flex flex-col md:flex-row items-center justify-between p-6 bg-orange-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Let’s Give a Smile, Get blessed
        </h2>
        <button 
        onClick={handleDonateClick} 
        className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition">

          Donate
        </button>
      </div>
    </section>
    )
};
  
  export default CTASection;