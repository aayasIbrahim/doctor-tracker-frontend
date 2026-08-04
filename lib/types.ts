import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IUser {
  success: boolean;
  statusCode?: number;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: "ADMIN" | "DOCTOR" | "PATIENT";
    createdAt: string;
    updatedAt: string;
    __v: number;
  } | null;
}

export interface IRegisterApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IUser;
}

export type FormActionState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IUser | null;
};

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

export type LoginActionState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data: IAuthTokens | null;
};
export type NavbarProps = {
  user: IUser;
};

export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}
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