"use server";

import { headers } from "next/headers";
import { auth } from "../../lib/auth";
import { checkAllApis } from "../../services/monitor.serveice";

export const checkAllApisAction = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "You are not authenticated",
      };
    }

    const userId = session.user.id;

    const results = await checkAllApis(userId);

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("Check all APIs error", error);

    return {
      success: false,
      message: "Failed to check API",
    };
  }
};