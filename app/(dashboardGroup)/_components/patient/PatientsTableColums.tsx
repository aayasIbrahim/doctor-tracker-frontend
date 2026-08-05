import { Badge } from "@/components/ui/badge";
import { Column, IPatient } from "@/lib/types";
import { Activity, Calendar, Mail, Phone } from "lucide-react";

export const PatientColumns: Column<IPatient>[] = [
  {
    header: "Patient Name",
    accessorKey: "name",
    className: "font-semibold text-sm text-foreground py-3.5",
  },
  {
    header: "Medical Condition",
    cell: (patient: IPatient) => (
      <Badge
        variant="secondary"
        className="text-xs font-medium bg-primary/10 text-primary border-0"
      >
        {patient.condition || "General Checkup"}
      </Badge>
    ),
  },
  {
    header: "Age & Gender",
    cell: (patient: IPatient) => (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Activity className="h-3.5 w-3.5" />
        <span>
          {patient.age} Yrs ({patient.gender})
        </span>
      </div>
    ),
  },
  {
    header: "Contact Info",
    cell: (patient: IPatient) => (
      <div className="text-xs space-y-1">
        {patient.email && (
          <p className="font-medium text-foreground flex items-center gap-1.5">
            <Mail className="h-3 w-3 text-muted-foreground/70" />
            {patient.email}
          </p>
        )}
        {patient.phone ? (
          <p className="text-muted-foreground flex items-center gap-1.5">
            <Phone className="h-3 w-3 text-muted-foreground/70" />
            {patient.phone}
          </p>
        ) : (
          !patient.email && (
            <span className="text-muted-foreground/60 italic">No Contact</span>
          )
        )}
      </div>
    ),
  },
  {
    header: "Joined Date",
    cell: (patient: IPatient) => (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        {patient.createdAt
          ? new Date(patient.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
          : "N/A"}
      </div>
    ),
  },
];