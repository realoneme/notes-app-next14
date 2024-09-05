"use client";
import { useEffect, useState } from "react";
import { createSwapy } from "swapy";

import { NoteType } from "@/types/note";
import Note from "@/components/Note";

interface NoteListProps {
  notes: NoteType[];
}
const NoteList = ({ notes }: NoteListProps) => {
  const [swapy, setSwapy] = useState<any>(null);
  useEffect(() => {
    const container = document.querySelector(".container");
    if (container) {
      console.log(container);

      const swapy = createSwapy(container, {
        animation: "dynamic", // or spring or none
      });
      setSwapy(swapy);
      // swapy.enable(true);
    }
  }, []);

  return (
    <div className="grid h-screen w-full max-w-6xl grid-cols-1 gap-4 overflow-scroll sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes.map((note) => (
        <Note key={note.id} note={note} swapy={swapy} />
      ))}
    </div>
  );
};

export default NoteList;
