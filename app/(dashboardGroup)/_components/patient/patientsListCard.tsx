import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Activity, Calendar } from "lucide-react";
import { IPatient } from "@/lib/types";

interface PatientGridListProps {
  patients: IPatient[];
}

export function PatientCardList({ patients }: PatientGridListProps) {
  if (!patients || patients.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <User className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
        <p className="text-sm text-muted-foreground font-medium">
          No patients found for this doctor.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => (
        <Card
          key={patient._id}
          className="shadow-xs hover:shadow-md transition-shadow border-border/60"
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base font-semibold">
                {patient.name}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {patient.gender}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Calendar className="h-3 w-3" /> Age: {patient.age} Yrs
            </p>
          </CardHeader>

          <CardContent className="space-y-2 text-xs">
            <div className="rounded-md bg-muted/50 p-2.5">
              <span className="text-muted-foreground block text-[10px] font-semibold uppercase tracking-wider">
                Condition
              </span>
              <p className="font-medium text-primary flex items-center gap-1.5 mt-0.5">
                <Activity className="h-3.5 w-3.5" />
                {patient.condition || "General Illness"}
              </p>
            </div>

            {patient.phone && (
              <div className="flex items-center gap-1.5 text-muted-foreground pt-1">
                <Phone className="h-3.5 w-3.5" />
                <span>{patient.phone}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PatientCardList;