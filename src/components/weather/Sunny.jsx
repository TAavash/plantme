"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SunnyDay from "../../../public/assets/animation/Sunny.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SunnyAnimation = ({ isPlaying = true }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <Lottie 
        animationData={SunnyDay} 
        loop={true} 
        autoplay={true} 
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
};

export default SunnyAnimation;