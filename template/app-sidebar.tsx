"use client";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/data/sidebar-data";
import { NavGroup as NavGroupModel } from "@/models/types";
import { NavGroup } from "./nav-group";
import { AppLogo } from "@/shared/app-logo";
import { SettingSidebar } from "./setting-sidebar";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}
        <AppLogo className="ms-1"/>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map(
          (props: React.JSX.IntrinsicAttributes & NavGroupModel) => (
            <NavGroup key={props.title} {...props} />
          )
        )}
      </SidebarContent>
      <SidebarFooter>
        <SettingSidebar/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
