"use client";

import LowGround from "../components/LowGround";
import SugFood from "../components/suggestions/SugFood";
import SugHealth from "../components/suggestions/SugHealth";
import SugToxic from "../components/suggestions/SugToxic";
import React from "react";

const LowPage = () => {
  return (
    <div className="w-screen h-screen bg-[#3B1C0A] flex flex-col relative p-2">
      <LowGround />
      <div className="w-full flex items-center justify-center">
        <h1 className="mt-10 z-20 p-10 font-inknut text-white text-7xl">
          Daily Suggestions
        </h1>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex justify-evenly">
          <SugFood />
          <SugToxic />
        </div>
        <div className="flex items-center justify-center">
          <SugHealth />
        </div>
      </div>
    </div>
  );
};

export default LowPage;
