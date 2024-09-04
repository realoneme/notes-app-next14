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

  return notes.map((note) => <Note key={note.id} note={note} swapy={swapy} />);
};

export default NoteList;
