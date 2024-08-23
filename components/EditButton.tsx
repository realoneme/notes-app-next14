"use client";
import { useEffect, useState } from "react";
import { getNoteAction } from "@/actions/notes";
import NoteDialog from "./NoteDialog";
import { Dialog } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { Note } from "@/db/schemas/notes";

type Props = {
  noteId: number;
};

const EditButton = ({ noteId }: Props) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<Note>();

  useEffect(() => {
    if (open) {
      (async () => {
        const { note, errorMessage } = await getNoteAction(noteId);
        if (!errorMessage) {
          note && setNote(note[0]);
        } else {
          toast.error(errorMessage);
        }
      })();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Edit className="size-5 text-muted-foreground" />
      </DialogTrigger>
      <NoteDialog setOpen={setOpen} type="update" note={note} />
    </Dialog>
  );
};

export default EditButton;
