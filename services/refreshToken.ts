"use server";
import config from "@/config";
import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh Token not provided",
    };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      cookie: `refreshToken=${refreshToken}`,
    },
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
};
export const isAccessTokenExist = async () => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  if (!accessToken && !refreshToken) {
    throw new Error("User Not Logged In!");
  }
  const decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    //access token has expired but refresh token is valid, get new access token from backend
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.newAccessToken;
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
        path: "/",
      });

      accessToken = newAccessToken;
    }
  }

  return accessToken;
};
