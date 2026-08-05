import React, { Suspense } from "react";
import { DoctorFormDialog } from "../../_components/doctor/DoctorFormDailog";
import { DoctorList } from "../../_components/doctor/DoctorList";
import { DoctorSkeleton } from "../../_components/doctor/DoctorSkeleton";


export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

 
  
  
  return (
    <div className="p-6 space-y-4">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
      
            Doctor Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Search, filter, manage medical specialists, and view patient allocations.
          </p>
        </div>

        {/* Modal Trigger */}
        <div className="flex-shrink-0">
          <DoctorFormDialog mode="create" />
        </div>
      </div>

      {/* 2. Main Content Section (Data Table / List) */}
      <main className="w-full">
        <Suspense fallback={<DoctorSkeleton />}>
          <DoctorList searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}