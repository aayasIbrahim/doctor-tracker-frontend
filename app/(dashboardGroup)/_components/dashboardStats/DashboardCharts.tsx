"use client";

import { Calendar, Stethoscope } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { ChartCard } from "./ChartCard";
import { IDashboardStats } from "@/lib/types";

interface ChartsProps {
  stats: IDashboardStats | null;
}

export default function DashboardCharts({ stats }: ChartsProps) {

  const formattedDateData =
    stats?.data.dateBasedPatients?.map((item) => ({
      ...item,
      formattedDate: new Date(item._id).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
    })) || [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 1. Daily Registration Trend */}
      <ChartCard
        title="Patient Registration Trend"
        description="Daily patient registration count over time"
        icon={Calendar}
      >
        {formattedDateData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedDateData}>
              <defs>
                <linearGradient id="patientColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.15}
              />
              <XAxis
                dataKey="formattedDate"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={11}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  borderColor: "#334155",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="New Patients"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#patientColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState text="No admission data available." />
        )}
      </ChartCard>

      {/* 2. Patients Per Doctor */}
      <ChartCard
        title="Patients Assigned Per Doctor"
        description="Total patients under each practitioner"
        icon={Stethoscope}
      >
        {stats?.data.patientsPerDoctor &&
        stats.data.patientsPerDoctor.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.data.patientsPerDoctor}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.15}
              />
              <XAxis
                dataKey="doctorName"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={11}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-popover border border-border p-3 rounded-lg shadow-md text-xs space-y-1">
                        <p className="font-semibold text-popover-foreground">
                          {data.doctorName}
                        </p>
                        <p className="text-muted-foreground">
                          {data.specialization}
                        </p>
                        <p className="text-primary font-bold">
                          Total Patients: {data.totalPatients}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="totalPatients"
                name="Patients"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState text="No doctor-patient assignments found." />
        )}
      </ChartCard>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="h-full flex items-center justify-center text-sm text-muted-foreground border border-dashed rounded-lg">
      {text}
    </div>
  );
}
