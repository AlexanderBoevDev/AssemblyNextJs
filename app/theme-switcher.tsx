"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, SunMoon } from "lucide-react";

export default function ThemeSwitcher() {
  const { setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  const [themeIndex, setThemeIndex] = useState(0);

  const themes = [
    { name: "light", icon: <Sun /> },
    { name: "dark", icon: <Moon /> },
    { name: "system", icon: <SunMoon /> }
  ];

  const toggleTheme = () => {
    const nextIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextIndex);
    setTheme(themes[nextIndex].name);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={toggleTheme} className="ml-4 text-dark-1 dark:text-white">
      {themes[themeIndex].icon}
    </button>
  );
}
