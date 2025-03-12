"use client";

import React, { useState, useEffect } from "react";
import Ground from "../components/Ground";
import Seed from "../components/stages/Seed";
import Leaf from "../components/stages/Leaf";
import Bud from "../components/stages/Bud";
import Steam from "../components/stages/Steam";
import Flower from "../components/stages/Flower";
import ThemeIcon from "../components/ThemeIcon";
import ExpandableActionPanel from "../components/ExpandableActionPanel";
import WateringAnimation from "../components/WateringAnimation"

const HomePage = () => {
  const [stage, setStage] = useState(0);
  const [isWatering, setIsWatering] = useState(false);

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
      
      {isWatering && <WateringAnimation direction="left" />}
      <ExpandableActionPanel onWatering={() => setIsWatering(true)} />

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
