import { SettingsIcon } from "lucide-react";

import {
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
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  );
}
