"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon } from "lucide-react";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import { sidebarMenuItems } from "../_config/adminSidebarItems";

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  // 1. Role Resolution with Fallback
  const role = user?.data?.role || "ADMIN";

  // 2. Dynamic Items Based on Role
  const navItems: ISidebarItem[] =
    sidebarMenuItems[role as keyof typeof sidebarMenuItems] ||
    sidebarMenuItems.ADMIN ||
    [];

  return (
    <Sidebar
      collapsible="none"
      className=" h-[calc(100svh-0rem)] border-r border-sidebar-border"
      // collapsible="offcanvas"
      // className="h-[calc(100vh-4rem)] border-r border-sidebar-border bg-sidebar"
    >
      {/* 🔹 Main Navigation Links */}
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      className={`h-10 px-3 font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs font-semibold hover:bg-primary hover:text-primary-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3"
                      >
                        {Icon && <Icon className="h-4 w-4 shrink-0" />}
                        <span className="text-sm truncate">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 🔹 Sidebar User Footer */}
      <SidebarFooter className="p-3 border-t border-sidebar-border/60 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-sidebar-accent/50 border border-sidebar-border/40">
          <Avatar className="h-9 w-9 border">
            {/* <AvatarImage
              src={user?.data || user?.data}
              alt={user?.data?.name || "User"}
            /> */}
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
              {user?.data?.name ? (
                user.data.name.substring(0, 2).toUpperCase()
              ) : (
                <UserIcon className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-sidebar-foreground truncate">
              {user?.data?.name || "Logged User"}
            </span>
            <span className="text-[10px] text-muted-foreground truncate">
              {user?.data?.email || "user@medipulse.com"}
            </span>
          </div>

          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0.5 border-primary/30 text-primary"
          >
            {role}
          </Badge>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
