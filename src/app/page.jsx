import Chatbox from "../components/Chatbox";
import Contact from "../pages/Contact";
import HomePage from "../pages/HomePage";
import LowPage from "../pages/LowPage";
import MidPage from "../pages/MidPage";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden snap-y snap-mandatory bg-inherit text-inherit">
      <div className="snap-start w-screen h-screen">
        <HomePage />
      </div>
      <div className="snap-start w-screen h-screen">
        <MidPage />
      </div>
      <div className="snap-start w-screen h-screen">
        <LowPage />
      </div>
      <div className="snap-start w-screen h-screen">
        <Contact />
      </div>
      <Chatbox />
    </div>
  );
};

export default page;
