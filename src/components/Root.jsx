import React from "react";

const Root = () => {
  return (
    <div
        className="absolute inset-x-0 top-0 h-[200px] w-[200px] 
        bg-cover bg-bottom bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/assets/Plant/Root.png')" }}
      ></div>
  );
};

export default Root;
