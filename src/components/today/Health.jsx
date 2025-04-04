import React from "react";

const Health = () => {
  const healthItems = ["Diabetes"];
  return (
    <div
      className="w-full max-w-[400px] bg-[#3B1C0A] shadow-amber-950 rounded-full 
        flex items-center justify-center p-6 md:p-8 lg:p-10"
    >
      <div className="w-full text-white">
        <h2 className="text-xl font-medium text-center">
          Your Today’s Health Condition:
        </h2>
        <ul className="mt-3 space-y-2 text-lg text-center">
          {healthItems.map((health, index) => (
            <li key={index}>🍽️ {health}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Health;
