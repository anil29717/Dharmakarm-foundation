import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CounterSection = () => {
  const counterData = [
    { label: "Children Helped", end: 320 },
    { label: "Volunteers", end: 50 },
    { label: "No. of Donations", end: 78 },
  ];

  // Helper function to animate the count
  const useCountUp = (end) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 2000; // Duration of the count-up animation in ms
      const increment = end / (duration / 16); // Calculate increment per frame (16ms per frame for smooth animation)

      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(interval);
          setCount(end); // Ensure the final count is the target end value
        } else {
          setCount(Math.floor(start));
        }
      }, 16); // Update roughly every 16ms for smooth effect

      return () => clearInterval(interval);
    }, [end]);

    return count;
  };

  return (
    <div className='flex justify-center'>
      <div className="flex justify-around items-center w-11/12 my-16 p-8 bg-orange-50 rounded-lg shadow-lg">
      {counterData.map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
        >
          <span className="text-4xl font-bold text-orange-500">
            {useCountUp(item.end)}+
          </span>
          <span className="mt-2 text-lg font-medium text-gray-700">{item.label}</span>
        </motion.div>
      ))}
    </div>
    </div>
  );
};

export default CounterSection;
