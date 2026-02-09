/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

export default function InputModal({ open, title, onSave, onClose }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open) setValue("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-96 shadow-lg">
        <h2 className="mb-4 font-semibold">{title}</h2>

        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter name..."
          className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-3 py-2"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            disabled={!value.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => {
              onSave(value.trim());
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
