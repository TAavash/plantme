"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-20 h-10 bg-gradient-to-r from-blue-300 to-sky-500 dark:from-gray-900 dark:to-black rounded-full flex items-center px-1 transition-all"
    >
      <div
        className={`absolute w-8 h-8 bg-yellow-400 dark:bg-gray-400 rounded-full shadow-lg transform transition-all ${
          theme === "dark" ? "translate-x-10" : "translate-x-0"
        }`}
      />

      <div className="absolute w-full h-full flex items-center justify-between px-2">
        <IoSunny className="w-6 h-6 text-white" />
        <IoMoon className="w-6 h-6 text-white" />
      </div>
    </button>
  );
}
