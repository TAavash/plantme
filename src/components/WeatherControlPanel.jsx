import React, { useState, useRef, useEffect } from "react";
import { FaSun, FaCloudRain, FaSnowflake, FaBolt, FaCloud } from "react-icons/fa";

const WeatherControlPanel = ({ onWeatherChange, onClose }) => {
  const [activeWeather, setActiveWeather] = useState(null);
  const panelRef = useRef(null);

  const handleWeatherClick = (weather) => {
    setActiveWeather(weather);
    onWeatherChange(weather);
  };

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setTimeout(() => onClose(), 100);
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
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-blue-300 rounded-full shadow-xl"></div>

        {weatherOptions.map((option, index) => {
          const angle = (index / weatherOptions.length) * 2 * Math.PI;
          const x = Math.cos(angle) * 140;
          const y = Math.sin(angle) * 140;

          return (
            <div
              key={option.id}
              className={`absolute p-4 rounded-full border-4 border-blue-200 shadow-lg cursor-pointer bg-white ${option.color}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => handleWeatherClick(option.id)}
            >
              {option.icon}
            </div>
          );
        })}

        <div
          className="absolute w-20 h-20 flex items-center justify-center bg-white border-4 border-blue-200 rounded-full shadow-lg cursor-pointer"
          onClick={onClose}
        >
          <FaCloud size={40} className="text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default WeatherControlPanel;
