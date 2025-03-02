import React from "react";

const Ground = () => {
  return (
    <div
        className="absolute inset-x-0 bottom-0 h-[400px] w-full 
        bg-cover bg-bottom bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/assets/Plant/Ground.png')" }}
      ></div>
  );
};

export default Ground;
