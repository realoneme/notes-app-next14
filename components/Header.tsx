import { getUser } from "@/lib/auth";
import { Lilita_One } from "next/font/google";

import UserButton from "./UserButton";
import AddNewNoteButton from "./AddNewNoteButton";
import clsx from "clsx";

const lilita = Lilita_One({ weight: "400", subsets: ["latin"] });
const Header = async () => {
  const user = await getUser();
  return (
    <div className="relative m-auto mt-2 flex h-20 w-full max-w-6xl items-center justify-between rounded-lg bg-popover px-4">
      <UserButton user={user} />
      <h1
        className={clsx(
          lilita.className,
          "text-4xl text-popover-foreground sm:text-5xl",
        )}
      >
        SIMPLE NOTES
      </h1>
      <AddNewNoteButton />
    </div>
  );
};

export default Header;
