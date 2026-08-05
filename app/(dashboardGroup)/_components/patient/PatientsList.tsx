import { removePatientFromDoctor } from "../../_action/doctorActions";
import { DeleteButton } from "../DeleteButton";
import { DataTable } from "../DataTable";
import { Paginations } from "../Paginations";
import { IPatient } from "@/lib/types";
import { PatientFormDialog } from "./PatientFormDailog";
import { getAllPatients } from "../../_action/patientAction";
import { PatientColumns } from "./PatientsTableColums";

export async function PatientsList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getAllPatients({ query });

  if (!result.success) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No Patients found.
      </p>
    );
  }

  return (
    <>
      {" "}
      <DataTable
        data={result?.data || []}
        columns={PatientColumns}
        keyExtractor={(patinet: IPatient) => patinet._id}
        emptyMessage="No doctors found matching the query criteria."
        actions={(patients) => (
          <>
        
            {/* Edit Dialog */}
            <PatientFormDialog
              mode="edit"
              patient={patients}
              doctorId={patients.doctorId}
            />

            <DeleteButton
              id={patients._id}
              deleteAction={removePatientFromDoctor.bind(null, patients._id)}
              title="Remove Patient?"
              description={`Are you sure you want to remove ${patients.name} from this patients list?`}
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
