"use client";

import LowGround from "../components/LowGround";
import SugFood from "../components/suggestions/SugFood";
import SugHealth from "../components/suggestions/SugHealth";
import SugToxic from "../components/suggestions/SugToxic";
import React from "react";

const LowPage = () => {
  return (
    <div className="relative w-screen min-h-screen bg-[#3B1C0A] flex flex-col items-center p-4 overflow-hidden">
      <LowGround />
      <h1 className="mt-20 z-20 text-center font-inknut text-white text-3xl md:text-5xl lg:text-7xl">
        Daily Suggestions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-[1200px] z-20">
        <SugFood />
        <SugToxic />
        <SugHealth />
      </div>
    </div>
  );
};

export default LowPage;
