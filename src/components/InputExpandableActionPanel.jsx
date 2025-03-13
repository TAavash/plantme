"use client";

import React, { useState, useEffect, useRef } from "react";
import { PiPottedPlantBold } from "react-icons/pi";
import { IoFastFood } from "react-icons/io5";
import { GiCigarette } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";

const InputExpandableActionPanel = ({
  onFoodClick,
  onToxicClick,
  onHealthClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  return (
    <>
      <div className="fixed top-[50px] left-10 z-50" ref={panelRef}>
        <div
          className={`relative transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute top-72 left-0">
            <div
              className="flex cursor-pointer items-center justify-center w-20 h-20 p-4 border-8 border-white bg-green-500 rounded-full shadow-lg hover:scale-[1.10]"
              onClick={onHealthClick}
            >
              <MdHealthAndSafety className="text-white" size={36} />
            </div>
          </div>

          <div className="absolute top-48 left-0">
            <div
              className="flex cursor-pointer items-center justify-center w-20 h-20 p-4 border-8 border-white bg-green-500 rounded-full shadow-lg hover:scale-[1.10]"
              onClick={onToxicClick}
            >
              <GiCigarette className="text-white" size={36} />
            </div>
          </div>

          <div className="absolute top-24 left-0">
            <div
              className="flex cursor-pointer items-center justify-center w-20 h-20 p-4 border-8 border-white bg-green-500 rounded-full shadow-lg hover:scale-[1.10]"
              onClick={onFoodClick}
            >
              <IoFastFood className="text-white" size={36} />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex cursor-pointer items-center justify-center mb-6 w-20 h-20 p-4 border-8 border-white rounded-full shadow-lg hover:scale-[1.10] ${
            isOpen ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          <PiPottedPlantBold className="text-white" size={36} />
        </button>
      </div>
    </>
  );
};

export default InputExpandableActionPanel;
