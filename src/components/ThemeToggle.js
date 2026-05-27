"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) {
        setTheme(stored);
        document.documentElement.setAttribute("data-theme", stored);
        return;
      }

      // Default to dark mode when no preference is stored
      const initial = "dark";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    } catch (e) {
      // ignore
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="btn-slide"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
