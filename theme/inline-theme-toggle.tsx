"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Cog, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function InlineThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex border items-center p-1 justify-between rounded-full">
      <Button variant="ghost" size="icon"
        className={`me-2 dark:text-zinc-500 text-zinc-70 size-8`}
        onClick={() => setTheme("system")}
      >
        <Cog />
      </Button>
      <Button variant="ghost" size="icon"
        className={`me-1 dark:text-zinc-500 text-zinc-700 size-8`}
        onClick={() => setTheme("light")}
      >
        <Sun />
      </Button>
      <Button variant="ghost" size="icon"
        className={` dark:text-zinc-500 text-zinc-700 size-8`}
        onClick={() => setTheme("dark")}
      >
        <Moon />
      </Button>
    </div>
  );
}
