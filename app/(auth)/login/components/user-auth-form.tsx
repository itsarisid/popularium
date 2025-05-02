"use client";

import { HTMLAttributes, SyntheticEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { ENDPOINTS } from "@/api/endpoints";
import { AlertError } from "@/components/elements/alert-error";
import { LoginModel } from "@/models/login";
import { cn } from "@/lib/utils";
import {Http} from '@/api/api-client'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);
  const router = useRouter();

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    Http
      .post(ENDPOINTS.login,JSON.stringify({
        email: "khanalex301@gmail.com",
        password: "Sprinkle@832",
      }))
      .then((response: { data: LoginModel }) => {
        const { message } = response.data;
        console.log("🚀 ~ file: user-auth-form.tsx:54 ~ message:", message)
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log("🚀 ~ file: user-auth-form.tsx:58 ~ error:", error)
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <Card className={cn(className, "w-full")} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {hasError && (
            <AlertError
              message="Enter valid email address"
              title={"Invalid Login Attempt"}
            />
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="name@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              placeholder="*****"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading} onClick={onSubmit} className="w-full">
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          {/* <ThemeToggle/> */}
        </div>
      </CardContent>
    </Card>
  );
}
