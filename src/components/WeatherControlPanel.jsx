"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaSun,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
  FaCloud,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WeatherControlPanel = ({ onWeatherChange, onClose }) => {
  const panelRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleWeatherClick = (weather) => {
    onWeatherChange(weather);
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsVisible(false);
        setTimeout(() => onClose(), 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const weatherOptions = [
    { id: "sunny", icon: <FaSun size={32} />, color: "text-yellow-500" },
    { id: "rainy", icon: <FaCloudRain size={32} />, color: "text-blue-500" },
    { id: "snowy", icon: <FaSnowflake size={32} />, color: "text-cyan-400" },
    { id: "stormy", icon: <FaBolt size={32} />, color: "text-yellow-400" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center z-40">
      <div
        ref={panelRef}
        className="relative w-[400px] h-[400px] shadow-lg backdrop-blur-sm rounded-full flex items-center justify-center"
      >
        <AnimatePresence>
          {isVisible &&
            weatherOptions.map((option, index) => {
              const angle = (index / weatherOptions.length) * 2 * Math.PI;
              const x = Math.cos(angle) * 140;
              const y = Math.sin(angle) * 140;

              return (
                <motion.div
                  key={option.id}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x, y }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`absolute p-4 rounded-full border-4 border-blue-200 shadow-lg cursor-pointer bg-white ${option.color}`}
                  onClick={() => handleWeatherClick(option.id)}
                >
                  {option.icon}
                </motion.div>
              );
            })}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="absolute w-20 h-20 flex items-center justify-center bg-white border-4 border-blue-200 rounded-full shadow-lg cursor-pointer"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
        >
          <FaCloud size={40} className="text-yellow-500" />
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherControlPanel;