import { Plus, Trash2, GripVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useSheetStore } from "../../store/useSheetStore";
import SortableRow from "../common/SortableRow";

export default function Sidebar({ setModal }) {
  const store = useSheetStore();

  return (
    <aside className="w-64 border-r p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Topics</h2>
        <Plus
          size={16}
          className="cursor-pointer"
          onClick={() => setModal({ type: "topic" })}
        />
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over) return;
          store.reorderTopics(
            store.topicsOrder.indexOf(active.id),
            store.topicsOrder.indexOf(over.id),
          );
        }}
      >
        <SortableContext items={store.topicsOrder}>
          {store.topicsOrder.map((id) => (
            <SortableRow key={id} id={id}>
              {({ attributes, listeners }) => (
                <div className="flex justify-between items-center p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900">
                  <div className="flex gap-2 items-center">
                    <span
                      {...attributes}
                      {...listeners}
                      className="cursor-grab"
                    >
                      <GripVertical size={14} />
                    </span>
                    {store.topicsMap[id].name}
                  </div>

                  <Trash2
                    size={14}
                    className="cursor-pointer text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      store.deleteTopic(id);
                    }}
                  />
                </div>
              )}
            </SortableRow>
          ))}
        </SortableContext>
      </DndContext>
    </aside>
  );
}
