"use client";

import React, { useState } from "react";
import BlockTitle from "./BlockTitle";

const FoodInput = ({ onClose }) => {
  const individualFoods = [
    "Rice",
    "Lentils",
    "Apple",
    "Burger",
    "Chocolate",
    "Pasta",
    "Milk",
    "Cheese",
    "Almonds",
    "Chicken",
    "Hot Dog",
    "Fish",
    "Eggs",
    "Carrots",
    "Tomato",
    "Ice Cream",
    "Butter",
    "Broccoli",
    "Mango",
    "Avocado",
    "Pizza",
    "Chips",
    "Candy",
    "Cola",
  ];

  const [selectedFoods, setSelectedFoods] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedFoods);
    onClose();
  };

  const handleClose = (e) => {
    e.preventDefault(); // Prevent the default button behavior
    setSelectedFoods([]); // Unselect all foods
    onClose(); // Close the component
  };

  const toggleSelection = (food) => {
    setSelectedFoods((prevSelected) =>
      prevSelected.includes(food)
        ? prevSelected.filter((item) => item !== food)
        : [...prevSelected, food]
    );
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white/20 border-2 border-[#34C759] max-w-2xl w-[90%] h-auto flex flex-col rounded-lg shadow-lg p-5">
        <div className="text-center">
          <h1 className="text-green-600 text-3xl font-bold">
            Regular Food Section
          </h1>
          <p className="text-gray-600 text-lg">What did you eat today?</p>
        </div>
        <form className="p-2">
          <h2 className="text-black text-2xl font-bold mb-3">
            Select the foods you ate today:
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {individualFoods.map((food, index) => (
              <BlockTitle
                key={index}
                title={food}
                isSelected={selectedFoods.includes(food)}
                onClick={() => toggleSelection(food)}
              />
            ))}
          </div>

          <div className="flex gap-2 justify-between pt-4">
            <div className="flex gap-2 justify-start pt-4">
              <button
                className=" text-white hover:underline px-4 py-2 rounded-md shadow-md"
                  onClick={handleClose}
              >
                Skip
              </button>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <button
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md shadow-md"
                //   onClick={handleSubmit}
              >
                Update
              </button>
              <button
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md shadow-md"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodInput;
