import React from "react";

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Doctor Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search, filter, manage medical specialists, and view patient allocations.
          </p>
        </div>

        {/* <CreateDoctorModal /> */}
      </div>
    </div>
  );
}
