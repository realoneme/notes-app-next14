import { Dispatch, SetStateAction, useTransition } from "react";
import { Button } from "./ui/button";
import { DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import { createNoteAction, updateNoteAction } from "@/actions/notes";
import { Note } from "@/db/schemas/notes";
import clsx from "clsx";
import { roboto } from "@/app/styles/fonts";

type Props = {
  type: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  note?: Note;
};
const NoteDialog = ({ setOpen, type, note }: Props) => {
  const buttonText = type === "create" ? "作成" : "更新";
  const [isPending, startTransition] = useTransition();
  const handleCreateNote = async (formData: FormData) => {
    startTransition(async () => {
      // create note
      const { errorMessage } = await createNoteAction(formData);
      if (!errorMessage) {
        setOpen(false);
        toast.success("ノートを作成しました");
      } else {
        toast.error(errorMessage);
      }
    });
  };
  const handleUpdateNote = async (formData: FormData) => {
    startTransition(async () => {
      // update note
      formData.set("noteId", String(note?.id));
      const { errorMessage } = await updateNoteAction(formData);
      if (!errorMessage) {
        setOpen(false);
        toast.success("ノートを更新しました");
      } else {
        toast.error(errorMessage);
      }
    });
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogTitle className="text-center">
        {type === "create" ? "新しいノートを作成" : "ノート編集"}
      </DialogTitle>
      <form
        className="flex flex-col gap-4"
        action={type === "create" ? handleCreateNote : handleUpdateNote}
      >
        <Textarea
          id="text"
          name="text"
          className={clsx(roboto.variable, "mb-6 mt-2 min-h-80")}
          defaultValue={note && note.text}
        />

        <DialogFooter>
          <Button
            className="btn-primary w-40"
            disabled={isPending}
            type="submit"
          >
            {isPending ? buttonText + "中..." : buttonText}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default NoteDialog;
