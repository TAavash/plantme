"use client";

import React, { useState, useEffect } from "react";
import Ground from "../components/Ground";
import Seed from "../components/stages/Seed";
import Leaf from "../components/stages/Leaf";
import Bud from "../components/stages/Bud";
import Steam from "../components/stages/Steam";
import Flower from "../components/stages/Flower";
import ThemeIcon from "../components/ThemeIcon";
import Sunny from "../components/weather/Sunny";
import Rainy from "../components/weather/Rainy";
import Stormy from "../components/weather/Stormy";
import Snowy from "../components/weather/Snowy";
import FoodInput from "../components/InputPanel/FoodInput";
import ToxicInput from "../components/InputPanel/ToxicInput";
import HealthInput from "../components/InputPanel/HealthInput";
import ExpandableActionPanel from "../components/ExpandableActionPanel";
import InputExpandableActionPanel from "../components/InputExpandableActionPanel";
import WateringAnimation from "../components/WateringAnimation";
import WeatherControlPanel from "../components/WeatherControlPanel";

const HomePage = () => {
  const [stage, setStage] = useState(0);
  const [isWatering, setIsWatering] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isWeatherPanelOpen, setIsWeatherPanelOpen] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const handleOpenInput = (inputType) => {
    setActiveInput((prev) => (prev === inputType ? null : inputType));
    // Clicking again closes the current input
  };

  const handleWeatherChange = (weather) => {
    setCurrentWeather(weather);
    setTimeout(() => setCurrentWeather(null), 60000); // Stop animation after 60 seconds
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 5); // Cycle through 5 stages
    }, 15000); // 75 sec total, 15 sec per stage

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col relative">
      <div className="w-full flex items-center justify-center">
        <h1 className="mt-10 z-20 p-10 font-inknut text-7xl">PLANT ME</h1>
      </div>
      <ThemeIcon />

      {isWatering && (
        <WateringAnimation
          direction="left"
          isPlaying={isWatering}
          onComplete={() => setIsWatering(false)}
        />
      )}

      {currentWeather === "sunny" && <Sunny isPlaying={true} />}
      {currentWeather === "rainy" && <Rainy isPlaying={true} />}
      {currentWeather === "stormy" && <Stormy isPlaying={true} />}
      {currentWeather === "snowy" && <Snowy isPlaying={true} />}

      {isWeatherPanelOpen && (
        <WeatherControlPanel
          onWeatherChange={(weather) => handleWeatherChange(weather)}
          onClose={() => setIsWeatherPanelOpen(false)}
        />
      )}

      <ExpandableActionPanel
        onWatering={() => setIsWatering(true)}
        onWeather={() => setIsWeatherPanelOpen(true)}
      />

      <InputExpandableActionPanel
        onFoodClick={() => handleOpenInput("food")}
        onHealthClick={() => handleOpenInput("health")}
        onToxicClick={() => handleOpenInput("toxic")}
      />

      {activeInput === "food" && (
        <FoodInput onClose={() => setActiveInput(null)} />
      )}

      {activeInput === "toxic" && (
        <ToxicInput onClose={() => setActiveInput(null)} />
      )}

      {activeInput === "health" && (
        <HealthInput onClose={() => setActiveInput(null)} />
      )}

      <div>
        {stage === 0 && <Seed />}
        {stage === 1 && <Bud />}
        {stage === 2 && <Leaf />}
        {stage === 3 && <Steam />}
        {stage === 4 && <Flower />}
      </div>

      <Ground />
    </div>
  );
};

export default HomePage;
