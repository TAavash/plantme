import React from "react";

const LowGround = () => {
  return (
    <div
        className="absolute inset-x-0 top-0 h-[200px] w-full 
        bg-cover bg-bottom bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/assets/Plant/Low Ground.png')" }}
      ></div>
  );
};

export default LowGround;
