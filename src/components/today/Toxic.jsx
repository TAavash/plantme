import React, { useState, useRef, useEffect } from "react";

const Toxic = () => {
  const toxicItems = ["Cigratte", "Alcohol", "Vape"];
  const [showPopup, setShowPopup] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);
  const popupRef = useRef(null);

  const visibleItems = toxicItems.slice(0, 4);
  const hasMore = toxicItems.length > 4;

  const openPopup = () => {
    setShowPopup(true);
    setTimeout(() => setAnimatePopup(true), 10);
  };

  const closePopup = () => {
    setAnimatePopup(false);
    setTimeout(() => setShowPopup(false), 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <>
      <div
        className="w-full max-w-[400px] bg-[#3B1C0A] shadow-amber-950 rounded-full 
        flex items-center justify-center p-6 md:p-8 lg:p-10"
      >
        <div className="w-full text-white">
          <h2 className="text-xl font-medium text-center">
            Your Today’s Toxic Intake:
          </h2>
          <ul className="mt-3 space-y-2 text-lg text-center">
            {visibleItems.map((toxic, index) => (
              <li key={index}>🚬 {toxic}</li>
            ))}
          </ul>

          {hasMore && (
            <div className="text-center mt-4">
              <button
                onClick={openPopup}
                className="text-sm text-amber-200 underline hover:text-white transition"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-60 flex justify-center items-center z-50">
          <div
            ref={popupRef}
            className={`bg-[#3B1C0A] text-white p-6 rounded-2xl max-w-[90%] w-[350px] max-h-[80%] overflow-auto relative transition-all duration-200 transform ${
              animatePopup ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <h2 className="text-xl font-medium text-center sticky top-0 bg-[#3B1C0A] py-2 z-10">
              Your Today’s Toxic Intake:
            </h2>
            <ul className="mt-3 space-y-2 text-lg text-center">
              {toxicItems.map((toxic, index) => (
                <li key={index}>🚬 {toxic}</li>
              ))}
            </ul>
            <div className="text-center mt-4">
              <button
                onClick={closePopup}
                className="text-sm text-amber-200 underline hover:text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toxic;
