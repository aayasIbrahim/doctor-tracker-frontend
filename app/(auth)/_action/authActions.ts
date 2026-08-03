"use server";

import config from "@/config";
import { FormActionState, LoginActionState } from "@/types";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const createLogin = async (
  prevState: LoginActionState | null,
  formdata: FormData,
) => {
  const payload = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };
  if (!payload.email && !payload.password) {
    return {
      success: false,
      statusCode: 400,
      message: "Email & Password fields require!",
    };
  }
  const res = await fetch(`${config.backend_url}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      statusCode: result.statusCode || res.status,
      message: result.message || "Invalid credentials or login failed",
    };
  }

  if (result.data?.accessToken && result.data?.refreshToken) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      path: "/",
    });
  }

  const decodeaccsseToken = jwt.decode(result.data.accessToken) as JwtPayload;
  if (decodeaccsseToken.role === "ADMIN") {
    redirect("/admin-dashboard");
  }
  return result;
};

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
