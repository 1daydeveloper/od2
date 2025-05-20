"use client"; // Ensure this runs on the client side

import { SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const localTheme = localStorage.getItem("theme");
      if (localTheme) {
        return localTheme;
      }
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);

    const body = document.body;
    body.classList.add("theme-change");
    setTimeout(() => {
      body.classList.remove("theme-change");
    }, 1000);

    const button = document.querySelector("button[aria-label='theme-toggle']");
    if (button) {
      button.classList.add("button-highlight");
      setTimeout(() => {
        button.classList.remove("button-highlight");
      }, 1000);
    }
  }, [theme]);

  return (
    <button aria-label="theme-toggle" title="toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 m-0  hover:!scale-100 transition-transform duration-200"
    >
      {theme === "dark" ? (
        <SunMoon size={24} className="text-white" />
      ) : (
        <SunMoon size={24} className="text-black" />
      )}
    </button>
  );
}
