"use client";

import MidGround from "../components/MidGround";
import Food from "../components/today/Food";
import Health from "../components/today/Health";
import Toxic from "../components/today/Toxic";
import React from "react";

const MidPage = () => {
  return (
    <div className="relative w-screen min-h-screen bg-[#4D2814] flex flex-col items-center p-4 overflow-hidden">
      <MidGround />

      <h1 className="mt-10 z-20 text-center font-inknut text-white text-3xl md:text-5xl lg:text-7xl">
        PLANT ME
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-[1200px] z-20">
        <Food />
        <Toxic />
        <Health />
      </div>
    </div>
  );
};

export default MidPage;
