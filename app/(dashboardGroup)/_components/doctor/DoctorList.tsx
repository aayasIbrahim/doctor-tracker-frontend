import Link from "next/link";

import { Button } from "@/components/ui/button";

import { deleteDoctor, getAllDoctors } from "../../_action/doctorActions";

import { DoctorFormDialog } from "./DoctorFormDailog";
import { DeleteButton } from "../../../../components/shared/DeleteButton";
import { DataTable } from "../../../../components/shared/DataTable";
import { Paginations } from "../../../../components/shared/Paginations";
import { Eye } from "lucide-react";
import { IDoctor } from "@/lib/types";
import { DoctorColumns } from "./DoctorTableColums";

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

  return (
    <>
      {" "}
      <DataTable
        data={result?.data || []}
        columns={DoctorColumns}
        keyExtractor={(doctor: IDoctor) => doctor._id}
        emptyMessage="No doctors found matching the query criteria."
        actions={(doctor) => (
          <>
          
            <Link href={`/admin-dashboard/doctors/${doctor._id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>

           
            <DoctorFormDialog mode="edit" doctor={doctor} />

            <DeleteButton
              deleteAction={deleteDoctor.bind(null, doctor._id)}
              title="Remove Doctor?"
              description={`Are you sure you want to remove ${doctor.name} from this doctor's list?`}
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
