import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, Stethoscope, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Doctors", href: "/admin-dashboard/doctors", icon: Stethoscope },
  { label: "Patients", href: "/admin-dashboard/patients", icon: Users },
];
export const sidebarMenuItems = {
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
