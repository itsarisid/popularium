"use client";
import React, { SyntheticEvent, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react';
import Link from 'next/link';

const ForgotPasswordForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard')
    }, 1000);
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
        <CardDescription className="text-center">
          Enter registered email to send reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
          <Button disabled={isLoading} onClick={onSubmit} className="w-full">
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Link
          </Button>
          <div className="flex items-center">
              <Link href="/login" className="ml-auto inline-block text-sm underline">
                Back to login
              </Link>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;