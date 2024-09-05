"use client";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { NoteType } from "@/types/note";
import Note from "@/components/Note";

interface NoteListProps {
  notes: NoteType[];
}
const NoteList = ({ notes }: NoteListProps) => {
  const [currentNotes, setNotes] = useState(notes);
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
      let newNotes: NoteType[] = [...notes];
      [newNotes[oldIndex], newNotes[newIndex]] = [
        newNotes[newIndex],
        newNotes[oldIndex],
      ];
      setNotes(newNotes);
    }
  }
  useEffect(() => {
    console.log(notes);
  }, [notes]);
  return (
    <div className="grid h-screen w-full max-w-6xl grid-cols-1 gap-4 overflow-scroll sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={currentNotes}
          strategy={verticalListSortingStrategy}
        >
          {currentNotes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default NoteList;
