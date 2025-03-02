import React from "react";

const SugFood = () => {
  return (
    <div
      className="w-[400px] h-[300px] bg-[#4D2814] shadow-amber-950 inset-shadow-xl rounded-full 
  flex items-center justify-center"
    >
      <div className="w-[270px] h-[250px] p-4 flex flex-col text-white">
        <h2 className="flex h-fit text-xl font-medium">
          Food Suggestions:
        </h2>
        <h2 className="flex flex-col h-full w-full text-justify p-2 text-lg">
          <li>Have more healthy foods the plant is withering.</li>
          <li>Push in some greens in your diet.</li>
        </h2>
      </div>
    </div>
  );
};

export default SugFood;
