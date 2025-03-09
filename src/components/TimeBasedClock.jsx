"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

export default function TimeBasedClock() {
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [manualTime, setManualTime] = useState(""); // Always reflects current time
  const clockRef = useRef(null);
  const isDragging = useRef(false);

  // Auto-update time every second in automatic mode
  useEffect(() => {
    if (isAutoTime) {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAutoTime]);

  // Update theme based on current time
  useEffect(() => {
    const hour = time.getHours();
    setTheme(hour >= 6 && hour < 18 ? "light" : "dark");
  }, [time, setTheme]);

  // Sync manual time input when switching from automatic to manual
  useEffect(() => {
    if (!isAutoTime) {
      setManualTime(time.toTimeString().slice(0, 5)); // Update manual input with latest automatic time
    }
  }, [isAutoTime, time]);

  // Get rotation for clock hands
  const getRotation = (unit, max) => (unit / max) * 360;

  // Handle manual dragging of the minute hand
  const handleMouseMove = (e) => {
    if (!isDragging.current || !clockRef.current || isAutoTime) return;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) +
      90;
    const minutes = Math.round((angle < 0 ? 360 + angle : angle) / 6);

    const newTime = new Date(time);
    newTime.setMinutes(minutes);
    newTime.setSeconds(0);
    setTime(newTime);
    setManualTime(newTime.toTimeString().slice(0, 5)); // Sync manual input
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Handle manual time input
  const handleManualTimeChange = (e) => {
    setManualTime(e.target.value);
    const [hours, minutes] = e.target.value.split(":").map(Number);

    if (!isNaN(hours) && !isNaN(minutes)) {
      const newTime = new Date();
      newTime.setHours(hours);
      newTime.setMinutes(minutes);
      newTime.setSeconds(0);
      setTime(newTime);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        onClick={() => {
          setIsAutoTime((prev) => !prev);
          if (!isAutoTime) {
            setTime(new Date()); // Reset to real-time when switching back
          }
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
      >
        {isAutoTime ? "Switch to Manual Time" : "Switch to Auto Time"}
      </button>

      {!isExpanded ? (
        <div
          className="relative w-20 h-20 bg-blue-400 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
          onClick={() => setIsExpanded(true)}
        >
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h2>
        </div>
      ) : (
        <div
          ref={clockRef}
          className="relative w-64 h-64 border-4 border-gray-400 rounded-full bg-gradient-to-br from-blue-200 to-sky-500 dark:from-gray-800 dark:to-black shadow-2xl"
        >
          {/* Clock Hands */}
          <div className="absolute w-full h-full flex items-center justify-center">
            {/* Hour Hand */}
            <div
              className="absolute w-1 h-20 bg-gray-900 dark:bg-gray-100 origin-bottom"
              style={{
                transform: `translateY(-50%) rotate(${
                  (time.getHours() % 12) * 30 + time.getMinutes() * 0.5
                }deg)`,
              }}
            />
            {/* Minute Hand - Draggable */}
            <div
              className="absolute w-1 h-28 bg-yellow-400 origin-bottom cursor-pointer"
              style={{
                transform: `translateY(-50%) rotate(${getRotation(
                  time.getMinutes(),
                  60
                )}deg)`,
              }}
              onMouseDown={!isAutoTime ? handleMouseDown : undefined}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
          >
            ✖
          </button>

          {/* Manual Time Input */}
          {!isAutoTime && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
              <input
                type="time"
                value={manualTime}
                onChange={handleManualTimeChange}
                className="px-3 py-1 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none dark:bg-gray-800 dark:text-white"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
