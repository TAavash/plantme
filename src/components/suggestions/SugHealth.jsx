import React from "react";

const SugHealth = () => {
  return (
    <div
      className="w-[460px] h-[300px] bg-[#4D2814] shadow-amber-950 inset-shadow-xl rounded-full 
    flex items-center justify-center"
    >
      <div className="w-[330px] h-[250px] p-4 flex flex-col text-white">
        <h2 className="flex h-fit text-xl font-medium">Health Suggestions:</h2>
        <h2 className="flex flex-col h-full w-full text-justify p-2 text-lg">
          <li>
            You’re suffering from diabetes, mind slowing down on those mangoes.
          </li>
        </h2>
      </div>
    </div>
  );
};

export default SugHealth;
