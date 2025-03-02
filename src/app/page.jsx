import HomePage from "@/components/HomePage";
import MidPage from "@/components/MidPage";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <HomePage />
      <MidPage />
    </div>
  );
};

export default page;