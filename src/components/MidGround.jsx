import React from "react";

const MidGround = () => {
  return (
    <div
      className="absolute inset-x-0 bottom-0 h-[200px] w-full 
        bg-cover bg-bottom bg-no-repeat pointer-events-none z-10"
      style={{ backgroundImage: "url('/assets/Plant/Mid Ground.png')" }}
    ></div>
  );
};

export default MidGround;
