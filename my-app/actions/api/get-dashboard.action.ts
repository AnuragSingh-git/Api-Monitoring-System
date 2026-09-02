"use server";

import { getDashboardData } from "../../services/dashboard.service";

export const getDashboardAction = async () => {
  try {
    const data = await getDashboardData();

    return {
      success: false,
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