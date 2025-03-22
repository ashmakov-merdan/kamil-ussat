"use client"
import { useCallback, useEffect } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";
import useTheme from "@/store/use-theme";

const SwitchTheme = () => {
  const { isDark, switchTheme } = useTheme();

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;

    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    switchTheme(isDark ? "light" : "dark");
  }, [isDark]);

  return (
    <button
      onClick={toggleTheme}
      className="bg-[#F2F4F7] hover:bg-[#F2F4F7]/80 dark:bg-[#1F242F] dark:hover:bg-[#1F242F]/50 px-3 py-2 rounded-lg transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ?
        <MoonIcon className="text-[#94969C]" size={24} /> :
        <SunIcon className="text-[#475467]" size={24} />
      }
    </button>
  );
};

export default SwitchTheme;