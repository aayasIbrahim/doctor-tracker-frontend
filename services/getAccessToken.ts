import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    const errorPayload = {
      success: false,
      statusCode: 401,
      message: "Unauthorized: Access token not found.",
      data: null,
    };

    console.error("❌ Auth Error:", errorPayload);

    return {
      error: errorPayload,
      token: null,
    };
  }

  return { error: null, token: accessToken };
}
