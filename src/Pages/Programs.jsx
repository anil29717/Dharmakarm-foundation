

const OurPrograms = () => {
  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Programs</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Food Recovery Program</h2>
        <p>
          Our Food Recovery Program connects with local restaurants, catering services, and food suppliers to collect surplus food that would otherwise go to waste. This initiative not only helps to reduce food waste but also ensures that individuals in need receive nutritious meals.
        </p>
        <h3 className="font-semibold mt-4">How It Works:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Partnerships: We establish connections with local food businesses and create a network of restaurants willing to donate surplus food.</li>
          <li>Food Collection: Our team coordinates scheduled pickups from participating restaurants and responds to emergency alerts for unexpected food availability.</li>
          <li>Food Distribution: Collected food is redistributed to local shelters, food banks, and community organizations, ensuring that those in need have access to wholesome meals.</li>
          <li>Awareness and Education: We promote awareness about food waste and encourage sustainable practices in our community.</li>
        </ul>
        <h4 className="font-semibold">Benefits:</h4>
        <ul className="list-disc ml-6">
          <li>Reduces food waste and environmental impact.</li>
          <li>Nourishes families and individuals facing food insecurity.</li>
          <li>Fosters community partnerships and supports local businesses.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Meal Distribution Program</h2>
        <p>
          Our Meal Distribution Program aims to provide hot, nutritious meals to individuals and families in need. We partner with local chefs and volunteers to prepare and deliver meals to underserved communities.
        </p>
        <h3 className="font-semibold mt-4">Key Features:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Weekly Meal Deliveries: Hot meals are prepared and delivered weekly to various neighborhoods.</li>
          <li>Community Events: We organize community meal events to promote togetherness and support.</li>
          <li>Nutritional Education: Providing educational resources on healthy eating and cooking practices.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Donation Drives</h2>
        <p>
          We organize regular donation drives to collect essential items such as clothing, toiletries, and school supplies for individuals and families in need. Our goal is to provide necessary resources that can help improve their quality of life.
        </p>
        <h3 className="font-semibold mt-4">How You Can Help:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Host a Drive: Organize a donation drive in your community, workplace, or school.</li>
          <li>Volunteer: Join us in sorting and distributing donated items to those in need.</li>
          <li>Spread the Word: Share information about our drives to encourage community participation.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Community Workshops</h2>
        <p>
          Our Community Workshops are designed to empower individuals with skills and knowledge. We offer a variety of workshops on topics such as financial literacy, job readiness, and health and wellness.
        </p>
        <h3 className="font-semibold mt-4">Workshop Highlights:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Skill Development: Learn valuable skills that can enhance employability and personal growth.</li>
          <li>Support Networks: Connect with community members and build supportive networks.</li>
          <li>Guest Speakers: Hear from experts in various fields who can provide insights and guidance.</li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
        <p>
          Join us in our mission to create a supportive and sustainable community. Whether you are interested in volunteering, donating, or participating in our programs, there are many ways to get involved. Together, we can make a difference!
        </p>
      </section>

      <section className="text-center mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you would like more information about our programs or how to get involved, please reach out to us at 
          <a href="mailto:contact@dharmakarmfoundation.org" className="text-blue-500"> contact@dharmakarmfoundation.org</a> or call us at (123) 456-7890.
        </p>
      </section>
    </div>
  );
};

export default OurPrograms;
