// import Root from "@/components/Root";
import Food from "@/components/today/Food";
import Health from "@/components/today/Health";
import Toxic from "@/components/today/Toxic";
import React from "react";

const MidPage = () => {
  return (
    <div className="w-screen h-screen bg-[#4D2814] flex flex-col relative p-2">
      {/* <div className="flex w-full items-center justify-center">
        <Root />
      </div> */}
      <div className="w-full flex items-center justify-center">
        <h1 className="mt-10 z-20 p-10 text-white font-inknut text-7xl">PLANT ME</h1>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex justify-evenly">
          <Food />
          <Toxic />
        </div>
        <div className="flex items-center justify-center">
          <Health />
        </div>
      </div>
    </div>
  );
};

export default MidPage;
