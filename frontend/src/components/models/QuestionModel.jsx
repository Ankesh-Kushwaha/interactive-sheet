/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

export default function QuestionModal({ open, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setDetail("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-105 shadow-lg">
        <h2 className="mb-4 font-semibold">Add Question</h2>

        <input
          placeholder="Question Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-3 py-2 mb-3"
        />

        <textarea
          placeholder="Question Detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={4}
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
            disabled={!title.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => {
              onSave({
                title: title.trim(),
                detail: detail.trim(),
              });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
