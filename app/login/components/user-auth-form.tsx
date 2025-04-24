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
import http from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import { AlertError } from "@/components/elements/alert-error";
import { LoginModel } from "@/models/login";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);
  const router = useRouter();

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    let data = JSON.stringify({
      email: "khanalex301@gmail.com",
      password: "Sprinkle@832",
      rememberMe: true,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: ENDPOINTS.login,
      data: data,
    };

    http
      .request(config)
      .then((response: { data: LoginModel }) => {
        const { message } = response.data;
        router.push("/dashboard");
      })
      .catch((error: any) => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <Card className="w-full">
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
