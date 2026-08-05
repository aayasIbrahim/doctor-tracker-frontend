import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "DOCTOR";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUserApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IUser | null;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IAuthTokens;
}

export type NavbarProps = {
  user: IUserApiResponse;
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
export interface IDashboardStats {
  data: {
    overview: {
      totalDoctors: number;
      totalPatients: number;
    };
    patientsPerDoctor: {
      _id: string;
      totalPatients: number;
      doctorName: string;
      specialization: string;
    }[];
    dateBasedPatients: {
      _id: string;
      count: number;
    }[];
  };
}

export interface IDoctor {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IDoctorMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IDoctorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IDoctor[] | null;
  meta?: IDoctorMeta;
}

export interface ISingleDoctorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IDoctor | null;
}

export interface IDoctorQuery {
  searchTerm?: string;
  specialization?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
export interface IPatient {
  _id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  phone: string;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}


export interface IDoctorSummary {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
}


export interface IDoctorPatientsData {
  doctor: IDoctorSummary;
  totalPatients: number;
  patients: IPatient[];
}
export interface ISinglePatientResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IPatient | null;
}

export interface IDoctorPatientsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IDoctorPatientsData;
}