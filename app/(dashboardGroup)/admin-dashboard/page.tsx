import React, { Suspense } from "react";
import { DashboardSkeleton } from "../../../components/shared/DashboardSkeleton";
import { DashboardDataContent } from "../_components/stats/DashboardDataContent";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to the MediPulse Admin Management System.
      </p>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardDataContent />
      </Suspense>
    </div>
  );
}
