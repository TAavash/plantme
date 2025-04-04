import React from "react";

const foodSuggestions = [
  "Have more healthy foods, the plant is withering.",
  "Push in some greens in your diet.",
];

const SugFood = () => {
  return (
    <div
      className="w-full max-w-[400px] bg-[#4D2814] shadow-amber-950 inset-shadow-xl rounded-2xl 
    flex items-center justify-center p-4 md:p-6 lg:p-8 text-white"
    >
      <div className="w-full">
        <h2 className="text-lg md:text-xl font-medium">Food Suggestions:</h2>
        <ul className="text-sm md:text-base lg:text-lg list-disc pl-5 mt-2">
          {foodSuggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SugFood;
