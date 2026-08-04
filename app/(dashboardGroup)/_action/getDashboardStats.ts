"use server";

import config from "@/config";
import { getAccessToken } from "@/services/getAccessToken";

export const getDashboardStats = async () => {
  const { error, token } = await getAccessToken();

  if (error) {
    return error;
  }

  const res = await fetch(`${config.backend_url}/api/stats/dashboard`, {
    headers: {
      cookie: `accessToken=${token}`,
    },
    cache: "no-store",
  });

  const result = await res.json();

  return result;
};
