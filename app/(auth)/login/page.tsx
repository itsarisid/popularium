"use client";

import { AppLogo } from "@/shared/app-logo";
import Image from "next/image";
import { UserAuthForm } from "./components/user-auth-form";

export default function AuthenticationPage() {

  return (
    <div className="w-full lg:grid  lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="center z-20 flex justify-center text-lg font-medium">
              <AppLogo className="size-24" />
            </div>
          </div>
          <div className="grid gap-4">
            <UserAuthForm />
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
