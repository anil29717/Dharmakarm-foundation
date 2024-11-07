const DonateSection = () => (
    <section className="text-center p-8">
      <h3 className="text-2xl font-bold text-orange-500 mb-6">What We Donate</h3>
      <div className="grid grid-cols-3 gap-4 mx-auto h-36 w-10/12">
        <div className="rounded-lg shadow-lg p-4 mt-6 bg-white">
          <div className="text-orange-500">📘 Stationery Kit</div>
          <p className="text-gray-600 mt-2">Providing essential learning materials for children.</p>
        </div>
        <div className="rounded-lg shadow-lg p-4 mt-6 bg-white">
          <div className="text-orange-500">🍲 Food</div>
          <p className="text-gray-600 mt-2">Nourishing meals for the needy.</p>
        </div>
        <div className="rounded-lg shadow-lg mt-6 p-4 bg-white">
          <div className="text-orange-500">👚 Clothes</div>
          <p className="text-gray-600 mt-2">Warm clothing for all seasons.</p>
        </div>
      </div>
    </section>
  );
  
  export default DonateSection;