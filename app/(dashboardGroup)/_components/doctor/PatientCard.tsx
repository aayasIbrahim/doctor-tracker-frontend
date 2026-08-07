import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Phone, Activity, Calendar, UserX } from "lucide-react";
import { IPatient } from "@/lib/types";
import { DeleteButton } from "../../../../components/shared/DeleteButton";
import { removePatientFromDoctor } from "../../_action/doctorActions";

interface PatientCard {
  patients: IPatient[];
  doctorId?: string;
}

export function PatientCard({ patients }: PatientCard) {
  if (!patients || patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 p-10 text-center animate-in fade-in-50">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <UserX className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-foreground">
          No Patients Assigned
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-xs">
          There are currently no patients assigned to this doctor.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => {
        const initials =
          patient.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || "P";

        return (
          <Card
            key={patient._id}
            className="group relative overflow-hidden border-border/60 transition-all duration-200 hover:border-border hover:shadow-md dark:bg-card"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                {/* User Info with Avatar */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-border/50 bg-primary/5 text-primary font-medium text-xs">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-semibold tracking-tight line-clamp-1">
                      {patient.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 font-normal uppercase tracking-wider"
                      >
                        {patient.gender}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Top Right Action */}
                <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                  <DeleteButton
                    deleteAction={removePatientFromDoctor.bind(
                      null,
                      patient.doctorId,
                      patient._id,
                    )}
                    title="Remove Patient?"
                    description={`Are you sure you want to remove ${patient.name} from this doctor's list?`}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pt-0 text-xs">
              {/* Condition Block */}
              <div className="rounded-lg bg-accent/40 border border-accent p-2.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                  Medical Condition
                </span>
                <p className="font-medium text-foreground flex items-center gap-1.5 text-xs">
                  <Activity className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="line-clamp-1">
                    {patient.condition || "General Checkup"}
                  </span>
                </p>
              </div>

              {/* Patient Meta Details */}
              <div className="grid grid-cols-2 gap-2 text-muted-foreground pt-0.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                  <span>{patient.age} Years Old</span>
                </div>

                {patient.phone ? (
                  <div className="flex items-center gap-1.5 truncate">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                    <span className="truncate">{patient.phone}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                    <span>No Phone</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default PatientCard;
