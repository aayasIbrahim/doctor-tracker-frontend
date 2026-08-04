import Link from "next/link";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, Eye, Mail, Phone } from "lucide-react";
import { IDoctor } from "@/lib/types";
import { deleteDoctor, getAllDoctors } from "../../_action/doctorActions";
// import { Paginations } from "../Paginations";
import { DoctorFormDialog } from "./DoctorFormDailog";
import { DeleteButton } from "../DeleteButton";
import { Column, DataTable } from "../DataTable";
import { Paginations } from "../Paginations";

export async function DoctorList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getAllDoctors({ query });

  if (!result.success) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No Doctor found.
      </p>
    );
  }
  const doctorColumns: Column<IDoctor>[] = [
    {
      header: "Doctor Name",
      accessorKey: "name",
      className: "font-semibold text-sm text-foreground py-3.5",
    },
    {
      header: "Specialization",
      cell: (doctor) => (
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
  return (
    <>
      {" "}
      <DataTable
        data={result?.data || []}
        columns={doctorColumns}
        keyExtractor={(doctor) => doctor._id}
        emptyMessage="No doctors found matching the query criteria."
        actions={(doctor) => (
          <>
            {/* View Details */}
            <Link href={`/doctors/${doctor._id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>

            {/* Edit Dialog */}
            <DoctorFormDialog mode="edit" doctor={doctor} />

            {/* Reusable Delete Button */}
            <DeleteButton
              id={doctor._id}
              deleteAction={deleteDoctor}
              title="Delete Doctor"
            />
          </>
        )}
      />
      {/* Pagination Controls */}
      <Paginations
        totalPages={result?.meta?.totalPages || 1}
        currentPage={result?.meta?.currentPage || 1}
      />
    </>
  );
}
