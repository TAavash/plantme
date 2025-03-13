"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import RainyDay from "../../../public/assets/animation/Rainy.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const RainyAnimation = ({ isPlaying = true }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute z-15 inset-x-0 flex items-center justify-evenly pointer-events-none">
      <Lottie
        animationData={RainyDay}
        loop={true}
        autoplay={true}
        style={{ width: "500px", height: "500px" }}
      />
      <Lottie
        animationData={RainyDay}
        loop={true}
        autoplay={true}
        style={{ width: "500px", height: "500px" }}
      />
    </div>
  );
};

export default RainyAnimation;