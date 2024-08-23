"use client";

import { LogOut, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { signoutAction } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  user: User;
  className?: string;
};
const UserButton = ({ user, className }: Props) => {
  const router = useRouter();
  const handleSignOut = async () => {
    const toastId = toast.loading("Signing out...");
    await signoutAction();
    router.replace("login");
    toast.dismiss(toastId);
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "text-popover-foreground transition-colors duration-200 ease-in-out hover:text-primary",
        )}
      >
        <UserCircle className="size-10 sm:size-12" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="ml-4 mt-5 sm:mt-4">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
