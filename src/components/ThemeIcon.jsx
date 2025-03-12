"use client";

import { useTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function ThemeIcon() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="absolute top-14 right-14">
      {resolvedTheme === "dark" ? (
        <IoMoon className="w-20 h-20 text-white" />
      ) : (
        <IoSunny className="w-20 h-20 text-yellow-500" />
      )}
    </div>
  );
}
