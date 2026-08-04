import { ISidebarItem } from "@/lib/types";
import {
  Award,
  CalendarCheck,
  CreditCard,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Doctors", href: "/admin-dashboard/doctors", icon: Stethoscope },
  { label: "Patients", href: "/admin-dashboard/patients", icon: Users },
  {
    label: "Appointments",
    href: "/admin-dashboard/appointments",
    icon: CalendarCheck,
  },
  // { label: "Specialties", href: "/admin-dashboard/specialties", icon: Award },
  // { label: "Payments", href: "/admin-dashboard/payments", icon: CreditCard },
  // {
  //   label: "System Settings",
  //   href: "/admin-dashboard/settings",
  //   icon: Settings,
  // },
];
export const sidebarMenuItems = {
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
