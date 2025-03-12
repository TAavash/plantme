"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Watering from "../../public/assets/Watering.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const WateringAnimation = ({ direction, isPlaying, onComplete }) => {
  const [playAnimation, setPlayAnimation] = useState(isPlaying);
  const [animationKey, setAnimationKey] = useState(0);

  // Sync playAnimation with parent state
  useEffect(() => {
    if (isPlaying) {
      setPlayAnimation(true);
      setAnimationKey((prevKey) => prevKey + 1); // Force re-render
    }
  }, [isPlaying]);

  return (
    playAnimation && (
      <div
        className={`absolute top-0 ${
          direction === "left" ? "left-0" : "right-0 transform scale-x-[-1]"
        } w-[500px]`}
      >
        <Lottie
          key={animationKey} // Force Lottie to reset
          animationData={Watering}
          loop={false}
          onComplete={() => {
            setPlayAnimation(false);
            if (onComplete) onComplete();
          }}
        />
      </div>
    )
  );
};

export default WateringAnimation;
