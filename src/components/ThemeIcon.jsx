"use client";

import { useTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";

export default function ThemeIcon() {
  const { theme } = useTheme();

  return (
    <div className="absolute top-14 right-14">
      {theme === "dark" ? (
        <IoMoon className="w-20 h-20 text-white" />
      ) : (
        <IoSunny className="w-20 h-20 text-yellow-500" />
      )}
    </div>
  );
}
