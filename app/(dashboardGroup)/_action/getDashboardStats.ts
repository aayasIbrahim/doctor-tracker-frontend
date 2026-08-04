"use server";

import config from "@/config";
import { cookies } from "next/headers";

export const getDashboardStats = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  if (!accessToken) {
    return {
      success: false,
      message: "Your not accessable this Dashboard Stats",
    };
  }

  const res = await fetch(`${config.backend_url}/api/stats/dashboard`, {
    headers: {
      cookie :`accessToken=${accessToken}`,
    },
    cache: "no-store",
  });

  const result=await res.json()
  
  
  return result
};
