"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaTools } from "react-icons/fa";
import { FaCloudShowersWater } from "react-icons/fa6";
import TimeBasedClock from "../components/TimeBasedClock";

const ExpandableActionPanel = ({ onWatering }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClockExpanded, setIsClockExpanded] = useState(false);
  const panelRef = useRef(null);

  // Close panel when clicking outside or toggle button
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !isClockExpanded
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isClockExpanded]);

  return (
    <>
      {isClockExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40"
          onClick={() => setIsClockExpanded(false)}
        ></div>
      )}

      <div className="fixed bottom-[50px] left-10 z-50" ref={panelRef}>
        <div
          className={`relative transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute bottom-24 left-0">
            <TimeBasedClock
              isExpanded={isClockExpanded}
              setIsExpanded={setIsClockExpanded}
            />
          </div>
          <div className="absolute bottom-0 left-0">
            <div className="flex cursor-pointer items-center justify-center w-20 h-20 rounded-full bg-white border-5 border-blue-500">
              <FaCloudShowersWater
                className="text-blue-500"
                size={36}
                onClick={() => onWatering()}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex cursor-pointer items-center justify-center mt-6 w-20 h-20 p-4 border-8 border-yellow-500 bg-white text-black rounded-full shadow-lg hover:scale-[1.10]"
        >
          <FaTools className="text-yellow-600" size={36} />
        </button>
      </div>
    </>
  );
};

export default ExpandableActionPanel;
