"use client";

import dynamic from "next/dynamic";
import Watering from "../../public/assets/Watering.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const WateringAnimation = ({ direction }) => {
  return (
    <div
      className={`absolute top-0 ${
        direction === "left" ? "left-0" : "right-0 transform scale-x-[-1]"
      } w-[500px]`}
    >
      <Lottie animationData={Watering} loop={false} />
    </div>
  );
};

export default WateringAnimation;
