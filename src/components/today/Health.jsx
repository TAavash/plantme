import React from "react";

const Health = () => {
  return (
    <div
      className="w-[460px] h-[300px] bg-[#3B1C0A] shadow-amber-950 inset-shadow-xl rounded-full 
    flex items-center justify-center"
    >
      <div className="w-[330px] h-[250px] p-4 flex flex-col text-white">
        <h2 className="flex h-fit text-xl font-medium">
          Your Today’s Health Condition:
        </h2>
        <h2 className="flex flex-col h-full w-full p-2 text-lg">
          <li>Diabetes</li>
        </h2>
      </div>
    </div>
  );
};

export default Health;
