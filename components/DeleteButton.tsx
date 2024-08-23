"use client";

import { useTransition, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { deleteNoteAction } from "@/actions/notes";
import toast from "react-hot-toast";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteNote = async () => {
    startTransition(async () => {
      // delete note
      const { errorMessage } = await deleteNoteAction(noteId);
      if (!errorMessage) {
        setOpen(false);
        toast.success("ノートを削除しました");
      } else {
        toast.error(errorMessage);
      }
    });
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger className="absolute -right-2">
        <Trash2
          className="size-5 text-destructive-foreground/50"
          onClick={() => setOpen(true)}
        />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>本当にこのノートを削除しますか？</AlertDialogHeader>
        <AlertDialogDescription>
          この操作は取り消せません。このノートを削除すると、元に戻すことはできません。
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            キャンセル
          </AlertDialogCancel>
          <form action={handleDeleteNote}>
            <AlertDialogAction
              type="submit"
              disabled={isPending}
              className="text-forground bg-destructive hover:bg-destructive hover:brightness-110"
            >
              {isPending ? "削除中..." : "削除"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
