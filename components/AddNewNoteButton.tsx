"use client";
import { useState } from "react";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog } from "./ui/dialog";
import { Plus } from "lucide-react";

import NoteDialog from "./NoteDialog";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
const AddNewNoteButton = ({ className }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger
        className={cn(
          className,
          "text-popover-foreground transition-colors duration-200 ease-in-out hover:text-primary",
        )}
        onClick={() => setOpen(true)}
      >
        <Plus className="size-10 sm:size-12" />
      </DialogTrigger>
      <NoteDialog setOpen={setOpen} type="create" />
    </Dialog>
  );
};

export default AddNewNoteButton;
