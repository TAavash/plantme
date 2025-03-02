"use client";

import React, { useState, useEffect } from "react";
import Ground from "./Ground";
import Seed from "./Seed";
import Leaf from "./Leaf";
import Bud from "./Bud";
import Steam from "./Steam";
import Flower from "./Flower";

const HomePage = () => {
  const [stage, setStage] = useState(0);

  // Cycle through stages with a 15-second loop
  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 5); // Cycle through 5 stages
    }, 3000); // 15 sec total, 3 sec per stage

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen bg-white flex flex-col relative">
      <div className="w-full flex items-center justify-center">
        <h1 className="mt-10 z-20 p-10 text-7xl">PLANT ME</h1>
      </div>

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
