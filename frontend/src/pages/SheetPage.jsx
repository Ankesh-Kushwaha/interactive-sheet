/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSheetStore } from "../store/sheet.store";
import Header from "../components/layout";
import Sidebar from "../components/layout/Sidebar";
import TopicCard from "../components/sheet/TopicCard";
import InputModal from "../components/modals/InputModal";
import QuestionModal from "../components/modals/QuestionModal";

export default function SheetPage() {
  const store = useSheetStore();
  const [modal, setModal] = useState(null);

  useEffect(() => store.init(), []);

  return (
    <div className={store.theme === "dark" ? "dark" : ""}>
      <div className="h-screen bg-white dark:bg-zinc-950 flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar setModal={setModal} />
          <main className="flex-1 p-6 overflow-auto">
            {store.topicsOrder.map((id) => (
              <TopicCard key={id} id={id} setModal={setModal} />
            ))}
          </main>
        </div>

        <InputModal modal={modal} setModal={setModal} />
        <QuestionModal modal={modal} setModal={setModal} />
      </div>
    </div>
  );
}
