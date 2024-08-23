"use client";
import { useTransition } from "react";
import Link from "next/link";
import clsx from "clsx";

import { createAccountAction } from "@/actions/users";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { roboto } from "@/app/styles/fonts";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const CreateAccountPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickCreateAccountButton = async (formDate: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await createAccountAction(formDate);
      if (!errorMessage) {
        router.push("/");
        toast.success("アカウントを作成しました\nすでにログインしています", {
          duration: 4000,
        });
      } else {
        toast.error(errorMessage);
      }
    });
  };
  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-24">
      <div className="item-center relative flex w-full max-w-sm flex-col rounded-lg border p-8">
        <h1
          className={`mb-8 text-2xl font-semibold ${isPending && "opacity-50"}`}
        >
          登録
        </h1>
        {isPending && (
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2 text-primary">
            <p className="text-center">アカウント作成中...</p>
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}
        <form
          action={handleClickCreateAccountButton}
          className="flex w-full flex-col gap-4"
        >
          <Input
            type="text"
            name="email"
            placeholder="email"
            required
            className={clsx(isPending && "opacity-0", roboto.variable)}
            disabled={isPending}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            className={clsx(isPending && "opacity-0", roboto.variable)}
            disabled={isPending}
          />
          <Button
            disabled={isPending}
            className={`${isPending && "opacity-50"}`}
          >
            登録
          </Button>
          <p className={`mt-3 text-center text-xs ${isPending && "opacity-0"}`}>
            すでにアカウントをお持ちですか？
            <Link
              href="/login"
              className="ml-2 underline transition-colors duration-200 ease-in-out hover:text-primary"
            >
              ログイン
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default CreateAccountPage;
