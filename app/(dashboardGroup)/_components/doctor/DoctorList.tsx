import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, Eye, Mail, Phone,  } from "lucide-react";
import { IDoctor } from "@/lib/types";
import { deleteDoctor, getAllDoctors } from "../../_action/doctorActions";
import { Paginations } from "../Paginations";
import { DoctorFormDialog } from "./DoctorFormDailog";
import { DeleteButton } from "./DeleteButton";

export async function DoctorList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getAllDoctors({ query });

  if (!result.success) {
    return (
      <p className="py-12 text-center text-muted-foreground">No Doctor found.</p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="font-semibold text-xs">
                Doctor Name
              </TableHead>
              <TableHead className="font-semibold text-xs">
                Specialization
              </TableHead>
              <TableHead className="font-semibold text-xs">Hospital</TableHead>
              <TableHead className="font-semibold text-xs">
                Contact Info
              </TableHead>
              <TableHead className="font-semibold text-xs">
                Joined Date
              </TableHead>
              <TableHead className="text-right font-semibold text-xs pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result?.success && result?.data?.length > 0 ? (
              result?.data?.map((doctor: IDoctor) => (
                <TableRow
                  key={doctor._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {/* Doctor Name */}
                  <TableCell className="font-semibold text-sm text-foreground py-3.5">
                    {doctor.name}
                  </TableCell>

                  {/* Specialization */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/15 border-0"
                    >
                      {doctor.specialization}
                    </Badge>
                  </TableCell>

                  {/* Hospital */}
                  <TableCell className="text-muted-foreground text-xs">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground/70" />
                      <span>{doctor.hospital}</span>
                    </div>
                  </TableCell>

                  {/* Contact Info */}
                  <TableCell className="text-xs space-y-1">
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
                  </TableCell>

                  {/* Joined Date */}
                  <TableCell className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
                      {new Date(doctor.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </div>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* 1. View Patients Button */}
                      <Link href={`/doctors/${doctor._id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>

                      {/* 2. Edit Doctor Button / Dialog */}
                      <DoctorFormDialog mode="edit" doctor={doctor} />

                      {/* 3. Delete Doctor via Server Action Form */}
                      
                      <DeleteButton
                        id={doctor._id}
                        deleteAction={deleteDoctor}
                        title="Delete Doctor"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-36 text-center text-muted-foreground text-sm"
                >
                  No doctors found matching the query criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <Paginations
        totalPages={result?.meta?.totalPages || 1}
        currentPage={result?.meta?.currentPage || 1}
      />
    </div>
  );
}
