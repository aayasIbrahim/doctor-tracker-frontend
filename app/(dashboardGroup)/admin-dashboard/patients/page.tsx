import React, { Suspense } from "react";
import { TableSkeleton } from "../../../../components/shared/TableSkeleton";
import { PatientsList } from "../../_components/patient/PatientsList";
import { SearchAndFilter } from "../../../../components/shared/SearchAndFilter";
import { patientFilters } from "../../_config/filter";

export default function Patientspage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Patient Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Search, filter, manage medical specialists, and view patient
            allocations.
          </p>
        </div>
      </div>
      <SearchAndFilter
        searchPlaceholder="Search doctors by name or hospital..."
        filters={patientFilters}
      />

      <main className="w-full">
        <Suspense fallback={<TableSkeleton />}>
          <PatientsList searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
