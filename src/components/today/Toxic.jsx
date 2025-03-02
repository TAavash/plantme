import React from "react";

const Toxic = () => {
  return (
    <div
      className="w-[400px] h-[300px] bg-[#3B1C0A] shadow-amber-950 inset-shadow-xl rounded-full 
    flex items-center justify-center"
    >
      <div className="w-[270px] h-[250px] p-4 flex flex-col text-white">
        <h2 className="flex h-fit text-xl font-medium">
          Your Today’s Toxic Intake:
        </h2>
        <h2 className="flex flex-col h-full w-full text-justify p-2 text-lg">
          <li>Alcohol</li>
          <li>Tobacco</li>
          <li>Vape</li>
        </h2>
      </div>
    </div>
  );
};

export default Toxic;
