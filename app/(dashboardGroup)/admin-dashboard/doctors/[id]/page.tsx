import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getDoctorById,
  getDoctorPatients,
} from "@/app/(dashboardGroup)/_action/doctorActions";
import DoctorHeading from "@/app/(dashboardGroup)/_components/patient/DoctorHeading";
import PatientCardList from "@/app/(dashboardGroup)/_components/patient/patientsListCard";
import { PatientFormDialog } from "@/app/(dashboardGroup)/_components/patient/PatientFormDailog";
import { DashboardSkeleton } from "@/app/(dashboardGroup)/_components/dashboardStats/DashboardSkeleton";

export default async function DoctorSinglePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [doctorRes, patientsRes] = await Promise.all([
    getDoctorById(id),
    getDoctorPatients(id),
  ]);

  if (!doctorRes?.success || !doctorRes?.data) {
    return notFound();
  }

  const doctor = doctorRes.data;
  const patients = patientsRes?.data.patients || [];
  const totalPatients = patientsRes?.data.totalPatients || 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Doctor Info Section */}
      <DoctorHeading doctor={doctor} />

      {/* Patients Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Assigned Patients ({totalPatients})
          </h2>
          {/* Add form  */}
          <PatientFormDialog mode="create" doctorId={doctor._id} />
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <PatientCardList patients={patients} />
        </Suspense>
      </div>
    </div>
  );
}
