import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useTheme,
} from "../context/ThemeContext";

export default function ThemeToggle() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border border-slate-300 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      {theme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}
