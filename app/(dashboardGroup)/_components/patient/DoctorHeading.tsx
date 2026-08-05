import { IDoctor } from "@/lib/types";
import React from "react";
interface doctorCardProps {
  doctor: IDoctor;
}
function DoctorHeading({ doctor }: doctorCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{doctor.name}</h1>
      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
      <p className="text-xs text-muted-foreground mt-1">{doctor.hospital}</p>
    </div>
  );
}

export default DoctorHeading;
