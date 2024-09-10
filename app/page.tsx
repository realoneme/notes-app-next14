import Header from "@/components/Header";
import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { eq } from "drizzle-orm";

import { getUser } from "@/lib/auth";

import NoteList from "@/components/NoteList";

import { NoteType } from "@/types/note";

export default async function Home() {
  const user = await getUser();
  const _notes: NoteType[] = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, user.id))
    .orderBy(notes.updateAt);

  return (
    <main>
      <Header />
      <div className="mt-8">
        <NoteList notes={_notes} />
      </div>
    </main>
  );
}
