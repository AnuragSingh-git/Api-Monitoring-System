"use server";

import { createApi } from "../../services/api.services";

export async function createApiAction(data: any) {
  try {
    const api = await createApi(data);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(api)),
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create API",
    };
  }
}