import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";

import { useSheetStore } from "../../store/useSheetStore";
import ProgressBar from "../common/ProgressBar";
import { calcProgress } from "../../utils/progress";

export default function MainContent({ setModal }) {
  const store = useSheetStore();

  return (
    <main className="flex-1 p-6 overflow-auto space-y-6">
      {store.topicsOrder.map((tId) => {
        const t = store.topicsMap[tId];

        const topicQs = t.subTopicsOrder.flatMap(
          (sid) => t.subTopics[sid].questions,
        );

        return (
          <section
            key={tId}
            className="group border border-zinc-300 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition"
          >
            <div
              className="flex items-center gap-3 px-5 py-4 cursor-pointer"
              onClick={() => store.toggleTopic(tId)}
            >
              {t.collapsed ? <ChevronRight /> : <ChevronDown />}

              <h2 className="font-semibold text-lg">{t.name}</h2>

              <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">
                {topicQs.length} Qs
              </span>

              <div className="ml-2">
                <ProgressBar value={calcProgress(topicQs)} />
              </div>

              {/* Hover Action */}
              <Plus
                size={16}
                className="ml-auto opacity-0 group-hover:opacity-100 transition cursor-pointer text-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setModal({ type: "sub", tId });
                }}
              />
            </div>

            <div
              className={`transition-all overflow-hidden ${
                t.collapsed ? "max-h-0" : "max-h-500"
              }`}
            >
              {!t.collapsed &&
                t.subTopicsOrder.map((sId) => {
                  const s = t.subTopics[sId];

                  return (
                    <div
                      key={sId}
                      className="ml-6 mr-4 mb-4 border-l border-zinc-300 dark:border-zinc-800 pl-4"
                    >
                      <div
                        className="flex justify-between items-center py-2 cursor-pointer group"
                        onClick={() => store.toggleSubTopic(tId, sId)}
                      >
                        <div className="flex gap-2 items-center">
                          <span className="font-medium">{s.name}</span>

                          <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">
                            {s.questions.length}
                          </span>
                        </div>

                        <Trash2
                          size={14}
                          className="text-red-400 opacity-0 group-hover:opacity-100 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            store.deleteSubTopic(tId, sId);
                          }}
                        />
                      </div>

                      {!s.collapsed && (
                        <div className="space-y-2 ml-2">
                          {s.questions.map((q) => (
                            <div
                              key={q.id}
                              className="flex justify-between items-center px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition group"
                            >
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="accent-blue-500 w-4 h-4"
                                  checked={q.done}
                                  onChange={() =>
                                    store.toggleQuestion(tId, sId, q.id)
                                  }
                                />

                                <span
                                  className={`text-sm ${
                                    q.done ? "line-through text-zinc-500" : ""
                                  }`}
                                >
                                  {q.title}
                                </span>
                              </label>

                              <Trash2
                                size={14}
                                className="text-red-400 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                onClick={() =>
                                  store.deleteQuestion(tId, sId, q.id)
                                }
                              />
                            </div>
                          ))}

                          <button
                            className="text-blue-500 text-sm hover:underline"
                            onClick={() => setModal({ type: "q", tId, sId })}
                          >
                            + Add Question
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
