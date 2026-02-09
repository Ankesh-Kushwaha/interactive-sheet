import { Sun, Moon } from "lucide-react";
import { useSheetStore } from "../../store/useSheetStore";

export default function Header() {
  const { theme, toggleTheme } = useSheetStore();

  return (
    <header className="border-b px-6 py-4 flex justify-between">
      <div>
        <h1 className="text-xl font-bold ">
          Interactive Question Management Sheet
        </h1>
        <p className="text-sm text-zinc-500">
          Organize, track, and master  topics
        </p>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
