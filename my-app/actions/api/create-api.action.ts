"use server";

import { apiService } from "@/services/api.service";

export async function createApiAction(data: unknown) {
  try {
    const validatedData = apiSchema.parse(data);

    const api = await apiService.create(validatedData);

    return {
      success: true,
      data: api,
    };
  } catch (error) {
    console.error("Create API Error:", error);

    return {
      success: false,
      error: "Failed to create API",
    };
  }
}