"use server";

import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createNoteAction = async (formData: FormData) => {
  // create note
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("ログインしていません");
    }
    const text = formData.get("text") as string;
    const insertedNote = await db
      .insert(notes)
      .values({ text, userId: user.id })
      .returning({ id: notes.id });
    const generatedId = insertedNote[0].id;
    await db
      .update(notes)
      .set({
        order: generatedId.toString(),
      })
      .where(eq(notes.id, generatedId));
    revalidatePath("/");
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const getNoteAction = async (noteId: number) => {
  // get note
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("ログインしていません");
    }
    const note = await db
      .select()
      .from(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));
    return { note, errorMessage: null };
  } catch (error) {
    return { note: null, errorMessage: getErrorMessage(error) };
  }
};

export const deleteNoteAction = async (noteId: number) => {
  // delete note
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("ログインしていません");
    }
    await db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));
    revalidatePath("/");
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const updateNoteAction = async (formData: FormData) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("ログインしていません");
    }
    const text = formData.get("text") as string;
    const noteId = Number(formData.get("noteId"));
    await db
      .update(notes)
      .set({ text, updateAt: new Date() })
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));
    revalidatePath("/");
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};
