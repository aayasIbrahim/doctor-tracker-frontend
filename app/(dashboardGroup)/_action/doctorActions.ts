"use server";
import { ISingleDoctorResponse } from "./../../../lib/types";

import config from "@/config";
import { getAccessToken } from "@/services/getAccessToken";
import { isAccessTokenExist } from "@/services/refreshToken";
import { revalidateTag } from "next/cache";


export const getAllDoctors = async ({
  query,
}: {
  query?: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const { error, token } = await getAccessToken();

  if (error) {
    return error;
  }
  const params = new URLSearchParams();

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
    `${config.backend_url}/api/doctors?${params.toString()}`,
    {
      headers: {
        cookie: `accessToken=${token}`,
      },
      cache: "no-store",
    },
  );
  const result = await res.json();
  // if (result?.success) {
  //   revalidateTag("doctors");
  // }
  return result;
};

export const createDoctor = async (
  prevState: ISingleDoctorResponse | null,
  formData: FormData,
): Promise<ISingleDoctorResponse> => {
  const payload = {
    name: formData.get("name"),
    specialization: formData.get("specialization"),
    hospital: formData.get("hospital"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };
  if (!payload.name || !payload.email || !payload.specialization) {
    return {
      success: false,
      statusCode: 400,
      message: "Required fields (Name, Email, Specialization) are missing.",
    };
  }
    const token=await isAccessTokenExist()
  const res = await fetch(`${config.backend_url}/api/doctors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: `accessToken=${token}`,
    },
    body: JSON.stringify(payload),
  });
  const result: ISingleDoctorResponse = await res.json();
  if (result?.success) {
    revalidateTag("doctors", "revalidate");
  }
  return result;
};

export const updateDoctor = async (
  doctorId: string,
  prevState: ISingleDoctorResponse | null,
  formData: FormData,
): Promise<ISingleDoctorResponse> => {
  const payload = {
    name: formData.get("name") ?? "",
    specialization: formData.get("specialization") ?? "",
    hospital: formData.get("hospital") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
  };

  const token=await isAccessTokenExist()
  const res = await fetch(`${config.backend_url}/api/doctors/${doctorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      cookie: `accessToken=${token}`,
    },
    body: JSON.stringify(payload),
  });
  const result: ISingleDoctorResponse = await res.json();
  
  return result;
};
export const deleteDoctor = async (doctorId: string) => {
  const { error, token } = await getAccessToken();

  if (error) {
    return error;
  }
  const res = await fetch(`${config.backend_url}/api/doctors/${doctorId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      cookie: `accessToken=${token}`,
    },
  });
  const result: ISingleDoctorResponse = await res.json();
  if (result?.success) {
    revalidateTag("doctors", "revalidate");
  }
  return result;
};
