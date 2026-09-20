"use server";

import { headers } from "next/headers";
import { getDashboardData } from "../../services/dashboard.service";
import { auth } from "../../lib/auth";

export const getDashboardAction = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const data = await getDashboardData(userId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Dashboard action error:", error);

    return {
      success: false,
      message: "Failed to load dashboard",
    };
  }
};