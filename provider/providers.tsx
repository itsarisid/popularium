"use client";
import React from "react";
import { ActiveThemeProvider } from "./active-theme";
import { AppSidebar } from "@/template/app-sidebar";
import Header from "@/template/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Providers({
  activeThemeValue,
  children,
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </ActiveThemeProvider>
    </>
  );
}
