"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

export default function TimeBasedClock() {
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [manualTime, setManualTime] = useState("");
  const getRotation = (unit, max) => (unit / max) * 360;
  const [prevMinuteAngle, setPrevMinuteAngle] = useState(
    getRotation(time.getMinutes(), 60)
  );
  const clockRef = useRef(null);
  const isDragging = useRef(false);
  const intervalRef = useRef(null);
  const clickInsideRef = useRef(false);

  // Auto-update time
  const startClock = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);
  };

  useEffect(() => {
    if (isAutoTime) {
      clearInterval(intervalRef.current);
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    } else {
      startClock();
    }
  }, [isAutoTime]);

  useEffect(() => {
    const hour = time.getHours();
    setTheme(hour >= 6 && hour < 18 ? "light" : "dark");
  }, [time, setTheme]);

  useEffect(() => {
    if (!isAutoTime) {
      setManualTime(time.toTimeString().slice(0, 5));
    }
  }, [isAutoTime, time]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clockRef.current &&
        !clockRef.current.contains(event.target) &&
        !clickInsideRef.current
      ) {
        setTimeout(() => setIsExpanded(false), 200);
      }
      clickInsideRef.current = false;
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleMouseMove = (e) => {
    if (!isDragging.current || !clockRef.current || isAutoTime) return;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) +
      90;
    const degrees = angle < 0 ? 360 + angle : angle;

    const minutes = Math.round(degrees / 6);

    const newTime = new Date(time);
    newTime.setMinutes(minutes);
    newTime.setSeconds(0);

    // 🟢 Adjust hour only on full-circle minute rotations
    if (prevMinuteAngle > 300 && degrees < 60) {
      newTime.setHours(newTime.getHours() + 1); // Forward hour on full turn
    } else if (prevMinuteAngle < 60 && degrees > 300) {
      newTime.setHours(newTime.getHours() - 1); // Backward hour on full turn
    }

    setPrevMinuteAngle(degrees);
    setTime(newTime);
    setManualTime(newTime.toTimeString().slice(0, 5));
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

  const handleManualTimeChange = (e) => {
    setManualTime(e.target.value);
    const [hours, minutes] = e.target.value.split(":").map(Number);

    if (!isNaN(hours) && !isNaN(minutes)) {
      const newTime = new Date();
      newTime.setHours(hours);
      newTime.setMinutes(minutes);
      newTime.setSeconds(0);
      setTime(newTime);
      startClock();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center z-[40]">
      <div
        className={`relative w-20 h-20 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg ${
          isExpanded ? "z-30" : "z-40"
        }`}
        style={{
          backgroundImage: "url(/assets/clock/clock-no-hand.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => {
          clickInsideRef.current = true;
          setIsExpanded((prev) => !prev);
        }}
      >
        <h2 className="text-sm font-bold text-green-600 dark:text-gray-100">
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h2>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 top-1/2 transform -translate-y-1/2 backdrop-blur-sm flex flex-col mx-auto w-120 h-120 shadow-lg rounded-full justify-center items-center">
          <div
            ref={clockRef}
            className="relative w-90 h-90 rounded-full bg-gradient-to-br from-green-200 to-sky-500 dark:from-gray-800 dark:to-black shadow-2xl"
            style={{
              backgroundImage:
                theme === "dark"
                  ? "url(/assets/clock/clock-dark.png)"
                  : "url(/assets/clock/clock.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute w-full h-full flex items-center justify-center">
              <button
                onClick={() => {
                  setIsAutoTime((prev) => !prev);
                  if (!isAutoTime) {
                    setTime(new Date());
                  }
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
              >
                {isAutoTime ? "Switch to Manual Time" : "Switch to Auto Time"}
              </button>
              <div
                className="absolute w-1 h-20 bg-gray-900 dark:bg-gray-100 origin-bottom"
                style={{
                  transform: `translateY(-50%) rotate(${
                    (time.getHours() % 12) * 30 + time.getMinutes() * 0.5
                  }deg)`,
                }}
              />
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
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 w-8 h-8 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
            >
              ✖
            </button>

            {!isAutoTime && (
              <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
                <input
                  type="time"
                  value={manualTime}
                  onChange={handleManualTimeChange}
                  className="px-3 py-1 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
