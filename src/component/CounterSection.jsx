import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Custom Hook for Count-Up Animation
const useCountUp = (end) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Animation duration in ms
    const stepTime = 16; // Frame interval (approx. 60 FPS)
    const increment = end / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        setCount(end); // Ensure final value
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [end]);

  return count;
};

// Counter Item Component (Reusable)
const CounterItem = ({ label, end, index }) => {
  const count = useCountUp(end);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
    >
      <span className="text-4xl font-bold text-orange-500">{count}+</span>
      <span className="mt-2 text-lg font-medium text-gray-700">{label}</span>
    </motion.div>
  );
};

// Main Counter Section
const CounterSection = () => {
  const counterData = [
    { label: "Children Helped", end: 320 },
    { label: "Volunteers", end: 50 },
    { label: "No. of Donations", end: 78 },
  ];

  return (
    <div className="flex justify-center">
      <div className="flex justify-around items-center w-11/12 my-16 p-8 bg-orange-50 rounded-lg shadow-lg">
        {counterData.map((item, index) => (
          <CounterItem key={index} {...item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CounterSection;
