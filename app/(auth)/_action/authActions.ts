"use server";

import config from "@/config";
import { FormActionState } from "@/types";

export const createRegister = async (
  prevState: FormActionState | null,
  formdata: FormData,
): Promise<FormActionState> => {
  const payload = {
    name: formdata.get("name") as string,
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
    confirmPassword: formdata.get("confirmPassword") as string,
  };

  if (payload.confirmPassword !== payload.password) {
    return {
      success: false,
      statusCode: 400,
      message: "Passwords do not match",
    };
  }
  if (!payload.name || !payload.email || !payload.password) {
    return {
      success: false,
      statusCode: 400,
      message: "Please fill in all required fields",
    };
  }
  const res = await fetch(`${config.backend_url}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();

  return result;
};
