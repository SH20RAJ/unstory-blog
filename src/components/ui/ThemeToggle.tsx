"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const applyTheme = (nextTheme: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const isDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const initialTheme = isDark ? "dark" : "light";
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-[4px] bg-un-paper border border-un-border hover:border-brand hover:bg-un-bg transition-all active:scale-95 group"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-un-muted group-hover:text-un-text transition-colors" />
      ) : (
        <Sun className="w-4 h-4 text-brand group-hover:text-brand transition-colors" />
      )}
    </button>
  );
}
