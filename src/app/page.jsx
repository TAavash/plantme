import HomePage from "@/pages/HomePage";
import LowPage from "@/pages/LowPage";
import MidPage from "@/pages/MidPage";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden snap-y snap-mandatory">
      <div className="snap-start w-screen h-screen">
        <HomePage />
      </div>
      <div className="snap-start w-screen h-screen">
        <MidPage />
      </div>
      <div className="snap-start w-screen h-screen">
        <LowPage />
      </div>
    </div>
  );
};

export default page;
