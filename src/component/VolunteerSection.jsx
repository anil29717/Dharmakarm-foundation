import { useNavigate } from 'react-router-dom';

const VolunteerSection = () => {
  const navigate = useNavigate();

  const handleVolunteerClick = () => {
    navigate('/volunteers');
  };

  return (
    <section className="flex justify-center items-center my-8">
      <button
        onClick={handleVolunteerClick}
        className="bg-orange-500 text-white px-6 py-3 rounded shadow-lg hover:bg-orange-600 transition"
      >
        Join as a Volunteer
      </button>
    </section>
  );
};

export default VolunteerSection;