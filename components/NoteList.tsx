"use client";
import { useEffect } from "react";
import { createSwapy } from "swapy";

import { NoteType } from "@/types/note";
import Note from "@/components/Note";

import { Keyboard } from "lucide-react";

interface NoteListProps {
  notes: NoteType[];
}
const NoteList = ({ notes }: NoteListProps) => {
  useEffect(() => {
    const container = document.querySelector(".container");
    console.log(container);

    if (container) {
      console.log(container);

      const swapy = createSwapy(container, {
        animation: "dynamic", // or spring or none
      });
      swapy.enable(true);
    }
  }, []);

  return notes.map((note) => <Note key={note.id} note={note} />);
};

export default NoteList;
