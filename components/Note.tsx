"use client";

import { Note as NoteType } from "@/db/schemas/notes";
import { useLongPress } from "@uidotdev/usehooks";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import clsx from "clsx";
import { notojp } from "@/app/styles/fonts";

type Props = {
  note: NoteType;
  swapy: any;
};

const Note = ({ note, swapy }: Props) => {
  const attrs = useLongPress(
    () => {
      swapy.enable(true);
    },
    {
      onStart: (event) => console.log("Press started"),
      onFinish: (event) => swapy.enable(false),
      onCancel: (event) => console.log("Press cancelled"),
      threshold: 500,
    },
  );
  return (
    <div data-swapy-slot={note.id + "" + note.createAt} {...attrs}>
      <div
        data-swapy-item={note.id}
        className="custom-scrollbar h-96 w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words rounded-lg bg-muted/80 p-6"
      >
        <div className="relative mb-2 flex items-center gap-2">
          <h2 className="front-semibold text-lg text-muted-foreground">
            {note.updateAt.toISOString().slice(0, 10)}
          </h2>
          <EditButton noteId={note.id} />
          <DeleteButton noteId={note.id} />
        </div>
        <p className={clsx(notojp.variable)}>{note.text}</p>
      </div>
    </div>
  );
};

export default Note;
