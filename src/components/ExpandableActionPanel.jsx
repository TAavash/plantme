"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaTools } from "react-icons/fa";
import { FaCloudShowersWater } from "react-icons/fa6";
import TimeBasedClock from "../components/TimeBasedClock";

const ExpandableActionPanel = () => {
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
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-100"></div>
      )}

      <div className="fixed bottom-[50px] left-10 z-50" ref={panelRef}>
        <div
          className={`relative flex flex-col items-center space-y-4 transition-all duration-300 transform ${
            isOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-4 opacity-0 scale-90"
          } pointer-events-auto`}
        >
          <TimeBasedClock
            isExpanded={isClockExpanded}
            setIsExpanded={setIsClockExpanded}
          />
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white border-5 border-blue-500">
          <FaCloudShowersWater className="text-blue-500" size={36}/>
          </div>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-center mt-6 w-20 h-20 p-4 border-8 border-yellow-500 bg-white text-black rounded-full shadow-lg hover:scale-[1.10]"
        >
          <FaTools className="text-yellow-600" size={36} />
        </button>
      </div>
    </>
  );
};

export default ExpandableActionPanel;
