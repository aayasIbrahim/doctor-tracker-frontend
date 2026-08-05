import { Badge } from "@/components/ui/badge";
import { Column, IDoctor } from "@/lib/types";
import { Building2, Calendar, Mail, Phone } from "lucide-react";
export const DoctorColumns: Column<IDoctor>[] = [
  {
    header: "Doctor Name",
    accessorKey: "name",
    className: "font-semibold text-sm text-foreground py-3.5",
  },
  {
    header: "Specialization",
    cell: (doctor:IDoctor) => (
      <Badge
        variant="secondary"
        className="text-xs font-medium bg-primary/10 text-primary border-0"
      >
        {doctor.specialization}
      </Badge>
    ),
  },
  {
    header: "Hospital",
    cell: (doctor) => (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Building2 className="h-3.5 w-3.5" />
        <span>{doctor.hospital}</span>
      </div>
    ),
  },
  {
    header: "Contact Info",
    cell: (doctor) => (
      <div className="text-xs space-y-1">
        <p className="font-medium text-foreground flex items-center gap-1.5">
          <Mail className="h-3 w-3 text-muted-foreground/70" />
          {doctor.email}
        </p>
        {doctor.phone && (
          <p className="text-muted-foreground flex items-center gap-1.5">
            <Phone className="h-3 w-3 text-muted-foreground/70" />
            {doctor.phone}
          </p>
        )}
      </div>
    ),
  },
  {
    header: "Joined Date",
    cell: (doctor) => (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        {new Date(doctor.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })}
      </div>
    ),
  },
];
