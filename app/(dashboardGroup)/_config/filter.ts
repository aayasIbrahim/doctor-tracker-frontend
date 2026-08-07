import { FilterConfig } from "@/lib/types";

export const patientFilters: FilterConfig[] = [
  {
    key: "dateRange",
    placeholder: "Filter by Date",
    type: "dateRange",
    options: [
      { label: "Today", value: "today" },
      { label: "Last 7 Days", value: "last_7_days" },
      { label: "Last 30 Days", value: "last_30_days" },
    ],
  },
  {
    key: "Condition",
    placeholder: "condititon",
    options: [
      { label: "Today", value: "today" },
      { label: "Last 7 Days", value: "last_7_days" },
      { label: "Last 30 Days", value: "last_30_days" },
    ],
  },
  {
    key: "gender",
    placeholder: "Gender",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
  },
 
];
export const doctorFilters: FilterConfig[] = [
  {
    key: "specialization",
    placeholder: "Specialization",
    options: [
      { label: "Cardiology", value: "cardiology" },
      { label: "Gynecology", value: "Gynecology" },
      { label: "Pediatrics", value: "pediatrics" },
      { label: "Orthopedics", value: "Orthopedics" },
      { label: "Gastroenterology", value: "Gastroenterology" },
    ],
  },
];
