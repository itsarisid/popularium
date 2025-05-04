import { Calendar, Home, Inbox, Search, Settings, SettingsIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function SettingSidebar() {
  return (
    <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="hover:text-primary [&>svg]:size-5">
            <Link href={"/settings"}>
              <SettingsIcon/>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  );
}
