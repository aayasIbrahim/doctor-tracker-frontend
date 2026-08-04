import { Stethoscope, Users, TrendingUp } from "lucide-react";
// import DashboardCharts from "@/components/dashboard/DashboardCharts";
import { getDashboardStats } from "../../_action/getDashboardStats";
import { StatsCard } from "./StatsCard";
import DashboardCharts from "./DashboardCharts";

export async function DashboardDataContent() {
  const statsData = await getDashboardStats();
  const totalDoctors = statsData?.data.overview?.totalDoctors || 0;
  const totalPatients = statsData?.data.overview?.totalPatients || 0;
  const avgPatients =
    totalDoctors > 0 ? (totalPatients / totalDoctors).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* 3 Main Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Doctors"
          value={totalDoctors}
          subtitle="Registered Practitioners"
          icon={Stethoscope}
          iconColor="text-blue-600 bg-blue-500/10 dark:text-blue-400"
        />

        <StatsCard
          title="Total Patients"
          value={totalPatients}
          subtitle="Enrolled Patients"
          icon={Users}
          iconColor="text-emerald-600 bg-emerald-500/10 dark:text-emerald-400"
        />

        <StatsCard
          title="Avg. Patients / Doctor"
          value={avgPatients}
          subtitle="Patient load per practitioner"
          icon={TrendingUp}
          iconColor="text-purple-600 bg-purple-500/10 dark:text-purple-400"
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      {/* Visual Analytics Charts */}
      <DashboardCharts stats={statsData} />
    </div>
  );
}
