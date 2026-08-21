"use server";

import { createApi } from "../../services/api.services";
import { CreateApiInput } from "../../validations/api.interface";

export async function createApiAction(data: CreateApiInput) {
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
