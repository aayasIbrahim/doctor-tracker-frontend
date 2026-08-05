"use server";

import config from "@/config";
import { ISingleDoctorResponse } from "@/lib/types";
import { getAccessToken } from "@/services/getAccessToken";
import { revalidatePath } from "next/cache";


export const addPatientUnderDoctor = async (
  doctorId: string,
  prevState: ISingleDoctorResponse | null,
  formData: FormData,
): Promise<ISingleDoctorResponse | null> => {
  const { error, token } = await getAccessToken();
  if (error) {
    throw new Error("Unauthorized");
  }
  const payload = {
    name: formData.get("name"),
    age: Number(formData.get("age")),
    gender: formData.get("gender"),
    condition: formData.get("condition"),
    phone: formData.get("phone"),
  };
  const res = await fetch(
    `${config.backend_url}/api/doctors/${doctorId}/patients`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();
  if (result?.success) {
    revalidatePath(`/admin-dashboard/doctors/${doctorId}`);
  }
  return result;
};
export const updatePatient = async (
  patientId: string,
  pravState: ISingleDoctorResponse | null,
  formData: FormData,
): Promise<ISingleDoctorResponse | null> => {
  const { error, token } = await getAccessToken();
  if (error) {
    throw new Error("Unauthorized");
  }
  const payload = {
    name: formData.get("name"),
    specialization: formData.get("specialization"),
    hospital: formData.get("hospital"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };
  const res = await fetch(
    `${config.backend_url}/api/patinets/${patientId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();
  if (result?.success) {
    revalidatePath(`/admin-dashboard/doctors`);
  }
  return result;
};

export const getAllPatients = async ({
  query,
}: {
  query?: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const params = new URLSearchParams();
  const { error, token } = await getAccessToken();
  if (error) {
    return error;
  }
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          params.set(key, JSON.stringify(value));
        } else {
          params.set(key, String(value));
        }
      }
    });
  }
  const res = await fetch(
    `${config.backend_url}/api/patients?${params.toString()}`,
    {
      headers: {
        cookie: `accessToken=${token}`,
      },
      cache: "no-store",
    },
  );
  const result = await res.json();
  return result;
};
