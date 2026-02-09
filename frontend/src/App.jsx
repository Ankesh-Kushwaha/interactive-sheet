import { useEffect, useState } from "react";
import { useSheetStore } from "./store/useSheetStore";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import MainContent from "./components/layout/MainComponent";

import InputModal from "./components/models/InputModel";
import QuestionModal from "./components/models/QuestionModel";

export default function App() {
  const store = useSheetStore();

  const [modal, setModal] = useState(null);

  // Initialize default data
  useEffect(() => {
    store.init();
  }, []);

  return (
    <div className={store.theme === "dark" ? "dark" : ""}>
      <div className="h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar setModal={setModal} />
          <MainContent setModal={setModal} />
        </div>

        <InputModal
          open={modal?.type === "topic"}
          title="Add Topic"
          onClose={() => setModal(null)}
          onSave={(value) => {
            store.addTopic(value);
            setModal(null);
          }}
        />

        <InputModal
          open={modal?.type === "sub"}
          title="Add Subtopic"
          onClose={() => setModal(null)}
          onSave={(value) => {
            store.addSubTopic(modal.tId, value);
            setModal(null);
          }}
        />

        <QuestionModal
          open={modal?.type === "q"}
          onClose={() => setModal(null)}
          onSave={(payload) => {
            store.addQuestion(modal.tId, modal.sId, payload);
            setModal(null);
          }}
        />
      </div>
    </div>
  );
}
