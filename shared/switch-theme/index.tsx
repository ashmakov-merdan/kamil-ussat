"use client"
import { useEffect, useState } from "react";
import Button from "../button";

const SwitchTheme = () => {
  const [isDark, setDark] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      toDark()
    } else {
      toLight();
    }
  }, []);

  const toDark = () => {
    setDark(true);
    const root = document.querySelector("html");
    if (!root) return;
    !root.classList.contains("dark") && root.classList.add("dark");
    localStorage.theme = "dark";
  };

  const toLight = () => {
    setDark(false);
    const root = document.querySelector("html");
    if (!root) return;
    root.classList.remove("dark");
    localStorage.theme = "light";
  };

  const toggleMode = () => {
    if (localStorage.theme === "light") {
      toDark();
    } else {
      toLight();
    }
  };

  return <Button
    label={isDark ? "Dark" : "Light"}
    onClick={toggleMode}
    variant={"light"}
    size={"sm"}
  />
};

export default SwitchTheme;