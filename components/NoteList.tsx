"use client";
import { useEffect, useState } from "react";
import SortState from "@/store/sortStore";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";

import { NoteType } from "@/types/note";
import Note from "@/components/Note";

interface NoteListProps {
  notes: NoteType[];
}
const NoteList = ({ notes }: NoteListProps) => {
  const { isSort } = SortState();
  const [currentNotes, setNotes] = useState<NoteType[]>([]);
  useEffect(() => {
    if (notes) setNotes(notes);
  }, [notes]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
  );
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = notes.findIndex((note) => note.id === active.id);
      const newIndex = notes.findIndex((note) => note.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      let newNotes: NoteType[] = [...currentNotes];
      [newNotes[oldIndex], newNotes[newIndex]] = [
        newNotes[newIndex],
        newNotes[oldIndex],
      ];
      setNotes(newNotes);
    }
  }
  const InnerNote = () =>
    currentNotes.map((note) => <Note key={note.id} note={note} />);
  return (
    <div className="m-auto grid w-full max-w-6xl grid-cols-2 gap-4 overflow-scroll sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isSort ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={currentNotes} strategy={rectSwappingStrategy}>
            <InnerNote />
          </SortableContext>
        </DndContext>
      ) : (
        <InnerNote />
      )}
    </div>
  );
};

export default NoteList;
