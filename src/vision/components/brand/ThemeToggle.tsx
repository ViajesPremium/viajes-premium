import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("vp-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return stored ? stored === "dark" : prefers;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("vp-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="group relative h-9 w-9 inline-flex items-center justify-center rounded-full border border-hairline hover:border-foreground transition-colors duration-500"
    >
      <Sun className="h-3.5 w-3.5 absolute transition-all duration-500 dark:opacity-0 dark:rotate-90" strokeWidth={1.25} />
      <Moon className="h-3.5 w-3.5 absolute opacity-0 -rotate-90 transition-all duration-500 dark:opacity-100 dark:rotate-0" strokeWidth={1.25} />
    </button>
  );
}
