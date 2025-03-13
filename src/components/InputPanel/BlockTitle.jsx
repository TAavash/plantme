import React from "react";

const BlockTitle = ({ title, isSelected, onClick }) => {
  return (
    <button
      className={`px-4 py-2 border rounded-md ${
        isSelected ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-800"
      } hover:bg-green-400 hover:text-white transition-all`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {title}
    </button>
  );
};

export default BlockTitle;
