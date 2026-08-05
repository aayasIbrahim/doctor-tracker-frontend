import React, { Suspense } from "react";
import { DashboardSkeleton } from "../_components/DashboardSkeleton";
import { DashboardDataContent } from "../_components/dashboardStats/DashboardDataContent";

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
