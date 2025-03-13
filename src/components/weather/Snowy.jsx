"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SnowyDay from "../../../public/assets/animation/Snowy.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SnowyAnimation = ({ isPlaying = true }) => {
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
        animationData={SnowyDay}
        loop={true}
        autoplay={true}
        style={{ width: "400px", height: "400px" }}
      />
      <Lottie
        animationData={SnowyDay}
        loop={true}
        autoplay={true}
        style={{ width: "400px", height: "400px" }}
      />
    </div>
  );
};

export default SnowyAnimation;